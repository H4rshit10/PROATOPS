import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact";
import { PROATOPS } from "@/config/proatops";
import {
  AUDIT_SECTIONS,
  INDUSTRY_SECTIONS,
  VISITOR_AUTORESPONSE_TEXT,
  type AuditField,
  type AuditSection,
} from "@/config/audit";

const { nav } = PROATOPS;

/**
 * Sends the 63-question business audit as a structured "Business
 * Intelligence Sheet" rather than a raw form dump — the spec is explicit
 * that the team shouldn't just receive field-by-field answers. This builds
 * that sheet from config/audit.ts directly (labels, section membership,
 * which industry block applies), so it can never drift from the questions
 * actually being asked.
 *
 * Deliberately not built here: a computed weighted "PROATOPS Business
 * Operating Score". The source spec calls that a *future* addition to
 * validate methodology against, not a day-one requirement — inventing
 * weights now would present a made-up number as if it meant something.
 * What ships instead is every 1-10 answer actually given, read as what it
 * is: the owner's own rating of that one thing, not a composite score.
 *
 * Sends through Resend from an authenticated proatops.in identity rather
 * than a shared third-party relay — a free relay used by an unknown number
 * of unrelated sites is exactly the sender profile mail providers flag as
 * spam. RESEND_API_KEY isn't set until the domain is verified with Resend
 * (SPF/DKIM in DNS) and the key is added to the project's env vars, so
 * until then this falls back to the same FormSubmit relay the site used
 * before (server-side now, with the Referer header FormSubmit's API
 * requires from a non-browser caller) — the form keeps working through
 * that gap and switches over automatically the day the key is set.
 */

const FROM = `${nav.brand} <enquiries@proatops.in>`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Long-answer fields are free text from an anonymous POST — cap length
   defensively regardless of transport. */
const MAX_FIELD_LEN = 4000;

type Values = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v.join(", ");
  return (v ?? "").toString().slice(0, MAX_FIELD_LEN);
}

/** Every field that could legitimately appear, in spec order: base 13
    sections plus whichever industry block Q8's answer selects. */
function fieldsForIndustry(industry: string | undefined): AuditField[] {
  const [profile, ...rest] = AUDIT_SECTIONS;
  const industrySection = industry ? INDUSTRY_SECTIONS[industry] : undefined;
  const sections = industrySection ? [profile, industrySection, ...rest] : [profile, ...rest];
  return sections.flatMap((s) => s.fields);
}

function requiredFieldIds(industry: string | undefined): string[] {
  return fieldsForIndustry(industry)
    .filter((f) => f.required)
    .map((f) => f.id);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* One pass, alternation ordered email-then-URL so the domain half of an
   address is never re-matched as a bare domain. Run over already-escaped
   text in a single replace rather than chained ones, so the pattern can
   never re-enter the markup it just produced. */
const LINK_RE =
  /([^\s<>"@]+@[^\s<>"@]+\.[a-zA-Z]{2,})|((?:https?:\/\/|www\.)[^\s<>"]+)|([a-zA-Z0-9][\w-]*(?:\.[\w-]+)*\.(?:com|in|co|net|org|io|app|me|dev|shop|store|online|biz|info)(?:\/[^\s<>"]*)?)/g;

const LINK_STYLE = 'style="color:#E11D2E;text-decoration:underline;"';

/**
 * Turns the links an owner pastes into links you can actually click.
 *
 * Q2 asks for "Website / Instagram / LinkedIn" and owners answer with
 * whatever they have — "proatops.in", "instagram.com/proatops",
 * "https://linkedin.com/company/x", often several in one line. Escaped and
 * dropped straight into a table cell they arrive as dead text: mail clients
 * auto-link a bare domain inconsistently and generally not at all when it
 * carries no scheme. Every href therefore gets an explicit https:// when
 * the answer omits one.
 */
function linkify(escaped: string): string {
  return escaped.replace(LINK_RE, (match, mail, scheme) => {
    /* A link closing a sentence must not swallow the punctuation. */
    const trail = match.match(/[.,;:!?)]+$/)?.[0] ?? "";
    const core = trail ? match.slice(0, -trail.length) : match;
    if (!core) return match;
    const href = mail
      ? `mailto:${core}`
      : scheme && !core.startsWith("www.")
        ? core
        : `https://${core}`;
    return `<a href="${href}" ${LINK_STYLE}>${core}</a>${trail}`;
  });
}

function row(label: string, value: string, link = true) {
  if (!value.trim()) return "";
  const body = escapeHtml(value).replace(/\n/g, "<br/>");
  return `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(
    label
  )}</strong></td><td style="padding:6px 0;">${link ? linkify(body) : body}</td></tr>`;
}

/** Phone gets its own row: a generic number pattern would light up revenue
    figures and 1-10 ratings, so only this known field becomes a tel: link. */
function telRow(label: string, value: string) {
  if (!value.trim()) return "";
  const digits = value.replace(/[^\d+]/g, "");
  if (digits.replace(/\D/g, "").length < 7) return row(label, value, false);
  return `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(
    label
  )}</strong></td><td style="padding:6px 0;"><a href="tel:${digits}" ${LINK_STYLE}>${escapeHtml(
    value
  )}</a></td></tr>`;
}

function section(title: string, rows: string) {
  if (!rows) return "";
  return `<h3 style="margin:28px 0 6px;font-family:monospace;text-transform:uppercase;letter-spacing:0.08em;color:#E11D2E;">${escapeHtml(
    title
  )}</h3><table cellpadding="0" cellspacing="0">${rows}</table>`;
}

function buildSheet(values: Values): string {
  const g = (id: string) => str(values[id]);
  const industry = g("q8");

  const snapshot = section(
    "Business Snapshot",
    [
      row("Business", g("q1")),
      row("Industry", industry),
      row("Locations", g("q11")),
      row("Team Size", g("q12")),
      row("Revenue Band", g("q14")),
      row("Business Stage", g("q13")),
      row("Owner", `${g("q3")} — ${g("q4")}`),
      row("Website / Social", g("q2")),
      row("Email", g("q5")),
      telRow("Phone / WhatsApp", g("q6")),
      row("City / Country", g("q7")),
    ].join("")
  );

  const health = section(
    "Operational Health (owner's own 1-10 ratings)",
    [
      row("Operations clarity", g("q20")),
      row("SOP consistency", g("q22")),
      row("Team performance", g("q26")),
      row("Team accountability", g("q27")),
      row("Management structure", g("q28")),
      row("Sales performance", g("q33")),
      row("Customer experience", g("q40")),
      row("Weekly financial visibility", g("q45")),
      row("Systems integration", g("q50")),
      row("Confidence operating without owner", g("q19")),
      row("Urgency to improve", g("q61")),
    ].join("")
  );

  const mostImportant = section(
    "Most Important",
    [
      row("Owner involvement day-to-day", g("q15")),
      row("If fixed one thing tomorrow", g("q57")),
      row("Biggest thing holding the business back", g("q59")),
      row("12-month concern if nothing changes", g("q64")),
      row("Where revenue is being lost", g("q39")),
      row("Biggest team issue to change", g("q32")),
      row("3-year vision", g("q56")),
      row("What's preventing faster scaling", g("q55")),
      row("Ready to begin", g("q62")),
      row("Already working with a consultant/agency", `${g("q63")}${g("q63_followup") ? ` — ${g("q63_followup")}` : ""}`),
    ].join("")
  );

  const opportunity = section("Proatops Opportunity", row("Owner thinks we could help with", g("q60")));

  const fields = fieldsForIndustry(industry);
  const highlighted = new Set([
    "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q11", "q12", "q13", "q14",
    "q15", "q19", "q20", "q22", "q26", "q27", "q28", "q32", "q33", "q39", "q40",
    "q45", "q50", "q55", "q56", "q57", "q59", "q60", "q61", "q62", "q63", "q63_followup", "q64",
  ]);
  const appendixRows = fields
    .filter((f) => !highlighted.has(f.id))
    .map((f) => row(f.label, g(f.id)))
    .join("");
  const appendix = section("Full Responses", appendixRows);

  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:14px;color:#0B0B0B;">
    ${snapshot}${health}${mostImportant}${opportunity}${appendix}
  </div>`;
}


async function sendViaFormSubmitFallback(values: Values, origin: string) {
  const industry = str(values.q8);
  const flat: Record<string, string> = {};
  for (const f of fieldsForIndustry(industry)) {
    const v = str(values[f.id]);
    if (v.trim()) flat[f.label] = v;
  }
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        /* FormSubmit's API refuses a server-to-server call with no Referer —
           see app/api/contact/route.ts for the full explanation. */
        Referer: origin,
      },
      body: JSON.stringify({
        ...flat,
        email: str(values.q5),
        _subject: `Business audit — ${str(values.q1) || "New submission"}`,
        _template: "table",
        _replyto: str(values.q5),
        _autoresponse: VISITOR_AUTORESPONSE_TEXT,
        _captcha: "false",
      }),
    });
    const result = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    if (!res.ok || String(result?.success) !== "true") {
      throw new Error(`FormSubmit fallback failed: ${res.status}`);
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error("Audit FormSubmit fallback failed:", err);
    return Response.json(
      { success: false, message: "Could not send your assessment. Please email us directly." },
      { status: 502 }
    );
  }
}

/* ---- Google Sheet log ------------------------------------------------ */

/**
 * One row per submission, one column per question.
 *
 * Every field from every industry block is sent on every submission, blank
 * where it doesn't apply. The first row written fixes the column order, so
 * sending only the fields one visitor saw would leave later industries'
 * columns tacked on at the far right in whatever order they happened to
 * arrive. Industry columns carry their block's name because two blocks ask
 * the same thing ("Repeat customers" is in both Retail and Hospitality) and
 * keyed by bare label one would silently overwrite the other.
 *
 * Every value is prefixed with an apostrophe, which Sheets reads as "this is
 * text" and does not display. Without it a phone number like "+91 98…" is
 * parsed as a formula and lands as #ERROR!, and a free-text "2-5" or "3/4"
 * is turned into a date.
 */
function sheetRow(values: Values, submissionId: string): Record<string, string> {
  /* First key, so it is the column right after the timestamp: the one the
     sheet matches on to update a retried submission instead of adding it. */
  const row: Record<string, string> = { "Submission ID": submissionId };
  const put = (label: string, id: string) => {
    const v = str(values[id]);
    row[label] = v.trim() ? `'${v}` : "";
  };

  const [profile, ...rest] = AUDIT_SECTIONS;
  for (const f of profile.fields) put(f.label, f.id);

  /* "Luxury / Fashion" is an alias of the Retail block — same object, so it
     is written once, not twice. */
  const seen = new Set<AuditSection>();
  for (const block of Object.values(INDUSTRY_SECTIONS)) {
    if (seen.has(block)) continue;
    seen.add(block);
    const name = block.title.replace(/\s+METRICS$/i, "");
    for (const f of block.fields) put(`${name} — ${f.label}`, f.id);
  }

  for (const section of rest) for (const f of section.fields) put(f.label, f.id);
  return row;
}

/**
 * Appends the submission to the Google Sheet behind GOOGLE_SHEET_WEBHOOK_URL
 * (an Apps Script web app; the URL carries its own ?key=).
 *
 * Best-effort by design: it never throws and never changes the response the
 * visitor gets. The sheet is a record, the email is the notification — a
 * slow or failing sheet must not cost anyone their submission. Awaited
 * rather than fired-and-forgotten because a serverless function is frozen
 * as soon as it responds, and anything still in flight is lost with it.
 *
 * Sent as text/plain: Apps Script reads the raw body either way, and a JSON
 * content type buys nothing here.
 */
async function logToSheet(values: Values, submissionId: string): Promise<void> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(sheetRow(values, submissionId)),
      redirect: "follow",
      signal: ctrl.signal,
    });
    const out = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!res.ok || out?.success !== true) {
      console.error("Audit sheet log failed:", res.status, out?.message ?? "no JSON body");
    }
  } catch (err) {
    console.error("Audit sheet log failed:", err);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  let body: { values?: Values; honey?: string; submissionId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, message: "Malformed request." }, { status: 400 });
  }

  const values = body.values ?? {};
  if (str(body.honey)) {
    return Response.json({ success: true });
  }

  const industry = str(values.q8);
  const missing = requiredFieldIds(industry).filter((id) => {
    const v = values[id];
    return Array.isArray(v) ? v.length === 0 : !str(v).trim();
  });
  if (missing.length > 0) {
    return Response.json(
      { success: false, message: "Please complete all required fields." },
      { status: 400 }
    );
  }
  const email = str(values.q5);
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { success: false, message: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  /* Recorded in parallel with delivery, whichever delivery path runs — the
     sheet fills even while email is still going through the fallback. */
  const [response] = await Promise.all([
    deliver(values, email, req.headers.get("origin") || PROATOPS.meta.domain),
    /* Accepted only in the shape the client generates; anything else (an
       old cached page, a hand-rolled POST) gets a fresh id. Overwriting
       another visitor's row would take guessing their random UUID, which
       is never shown anywhere but the sheet itself. */
    logToSheet(
      values,
      /^[a-z0-9-]{8,64}$/i.test(str(body.submissionId)) ? str(body.submissionId) : crypto.randomUUID()
    ),
  ]);
  return response;
}

async function deliver(values: Values, email: string, origin: string): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    /* On Vercel the server-side relay cannot succeed — FormSubmit sits
       behind Cloudflare, which refuses requests from data-centre IPs. Trying
       anyway costs the visitor the full timeout before the browser relay
       even starts, and buries a real 502 in the logs on every single
       submission. Hand straight over to the client instead; anywhere else
       (local, any non-Vercel host) the server relay still works, so it is
       still attempted there. */
    if (process.env.VERCEL) {
      return Response.json(
        { success: false, relay: true, message: "Send from the client." },
        { status: 503 }
      );
    }
    return sendViaFormSubmitFallback(values, origin);
  }

  const resend = new Resend(apiKey);
  const business = str(values.q1);

  const [notification, autoresponse] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Business audit — ${business || "New submission"}`,
      html: buildSheet(values),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "PROATOPS — We've got your business audit",
      text: VISITOR_AUTORESPONSE_TEXT,
    }),
  ]);

  /* The Resend SDK doesn't throw on a failed send — even an invalid key or
     an unverified sending domain comes back as a normally *resolved*
     { data: null, error: {...} }, not a rejected promise. Checking
     `.status === "rejected"` here (the natural-looking check) can never be
     true for that shape and silently missed every real failure — the send
     would fail and the visitor would still see the thank-you screen. Both
     shapes are checked below: `.value.error` for how this SDK actually
     reports it, `.reason` as a defensive fallback for a genuine throw
     (network layer, a future SDK version) that never reaches that shape. */
  const notificationError =
    notification.status === "rejected" ? notification.reason : notification.value.error;

  if (notificationError) {
    /* RESEND_API_KEY being set doesn't mean Resend can actually send yet —
       the domain has to finish verifying (SPF/DKIM propagated) first, and
       there's a real window where the key exists but sends still fail. That
       state used to be an outright failure for every visitor; falling back
       to the same relay used when the key is absent means the form keeps
       working through that window too, exactly as it does before the key
       is set at all. */
    console.error("Resend audit notification failed, falling back to FormSubmit:", notificationError);
    return sendViaFormSubmitFallback(values, origin);
  }

  const autoresponseError =
    autoresponse.status === "rejected" ? autoresponse.reason : autoresponse.value.error;
  if (autoresponseError) {
    console.error("Resend audit autoresponse failed:", autoresponseError);
  }

  return Response.json({ success: true });
}
