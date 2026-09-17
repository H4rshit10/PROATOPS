import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact";
import { PROATOPS } from "@/config/proatops";

const { nav } = PROATOPS;

/**
 * Sends enquiries through our own authenticated proatops.in identity instead
 * of a shared third-party relay.
 *
 * The form used to POST straight to FormSubmit's public ajax endpoint from
 * the browser. That worked, but every notification arrived carrying
 * formsubmit.co's reputation, not ours — a free relay used by thousands of
 * unrelated sites, which is exactly the profile spam filters are trained to
 * catch. Routing through Resend from a domain we've verified with SPF/DKIM
 * means the mail arrives as genuine proatops.in mail, the same as any other
 * message from this domain.
 *
 * This also moves validation server-side. The old client-only checks
 * (required/type=email) are trivially bypassed by anything that isn't a
 * browser form; a POST here gets the same checks run again regardless of
 * what sent it.
 */

/* This address only needs to exist as a *sending* identity that Resend has
   verified for the domain — nothing needs to be able to receive mail here.
   Replies are routed to CONTACT_EMAIL via replyTo on the admin copy, and to
   the visitor via replyTo on their autoresponse. */
const FROM = `${nav.brand} <enquiries@proatops.in>`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUTORESPONSE_TEXT = `Your audit request has been received by PROATOPS.

What happens next:
- Within two working days: a written operational read on your locations.
- A 30-minute call to walk through staffing, SOP gaps and unit economics.
- A deployment proposal with the staffing blueprint and the numbers behind it.

Prefer email? Reply directly to this message.

PROATOPS — Business Operations & Management
${CONTACT_EMAIL}`;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notificationHtml(fields: {
  name: string;
  business: string;
  email: string;
  locations: string;
  brief: string;
}) {
  const rows = [
    ["Name", fields.name],
    ["Business", fields.business || "—"],
    ["Email", fields.email],
    ["Locations", fields.locations],
    ["What's breaking", fields.brief],
  ];
  return `<table cellpadding="8" cellspacing="0">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("")}</table>`;
}

async function sendViaFormSubmitFallback(
  fields: {
    name: string;
    business: string;
    email: string;
    locations: string;
    brief: string;
  },
  origin: string
) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        /* FormSubmit's API rejects calls that don't look like they came from
           a browser tab on the registered page — a bare server-to-server
           fetch has no Referer at all and gets refused with "Make sure you
           open this page through a web server...". A browser always sends
           this on a same-origin fetch, so we send the same thing here. */
        Referer: origin,
      },
      body: JSON.stringify({
        Name: fields.name,
        Business: fields.business || "—",
        email: fields.email,
        Locations: fields.locations,
        "Operational issue": fields.brief,
        _subject: `Business audit request${fields.business ? ` — ${fields.business}` : ""}`,
        _template: "table",
        _replyto: fields.email,
        _autoresponse: AUTORESPONSE_TEXT,
        _captcha: "false",
      }),
    });
    const result = (await res.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;
    if (!res.ok || String(result?.success) !== "true") {
      throw new Error(result?.message || `FormSubmit fallback failed: ${res.status}`);
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error("FormSubmit fallback send failed:", err);
    return Response.json(
      { success: false, message: "Could not send your request. Please email us directly." },
      { status: 502 }
    );
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { success: false, message: "Malformed request." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const business = String(body.business ?? "").trim();
  const email = String(body.email ?? "").trim();
  const locations = String(body.locations ?? "").trim();
  const brief = String(body.brief ?? "").trim();
  /* Hidden field real visitors never fill in; bots that fill every field
     trip it. Reply with a normal-looking success so the bot doesn't learn to
     route around the honeypot, but skip actually sending anything. */
  const honey = String(body.honey ?? "").trim();

  if (honey) {
    return Response.json({ success: true });
  }

  if (!name || !business || !email || !locations || !brief) {
    return Response.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { success: false, message: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const fields = { name, business, email, locations, brief };
  const apiKey = process.env.RESEND_API_KEY;

  /* RESEND_API_KEY isn't set until the domain is verified in Resend (SPF/DKIM
     added to DNS) and the key is added to Vercel's project env vars — steps
     only whoever holds those accounts can do. Falling back to the same
     FormSubmit relay this form used before, called from here instead of the
     browser, means the form keeps working through that gap rather than
     breaking the moment this ships. The day the key is set and the project
     redeployed, every submission switches to Resend automatically — no
     further code change needed. */
  if (!apiKey) {
    const origin = req.headers.get("origin") || PROATOPS.meta.domain;
    return sendViaFormSubmitFallback(fields, origin);
  }

  const resend = new Resend(apiKey);

  const [notification, autoresponse] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Business audit request${business ? ` — ${business}` : ""}`,
      html: notificationHtml(fields),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "PROATOPS — Your audit request is in",
      text: AUTORESPONSE_TEXT,
    }),
  ]);

  /* The notification to us is the one enquiry actually depends on; the
     autoresponse is a courtesy. A submission only fails if we didn't
     receive it — an autoresponse hiccup gets logged but doesn't block the
     visitor's confirmation screen. */
  if (notification.status === "rejected") {
    console.error("Resend notification send failed:", notification.reason);
    return Response.json(
      { success: false, message: "Could not send your request. Please email us directly." },
      { status: 502 }
    );
  }
  if (autoresponse.status === "rejected") {
    console.error("Resend autoresponse send failed:", autoresponse.reason);
  }

  return Response.json({ success: true });
}
