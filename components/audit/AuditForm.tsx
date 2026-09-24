"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUDIT_CTA,
  AUDIT_INTRO,
  AUDIT_SECTIONS,
  AUDIT_THANKS,
  AUDIT_THEME,
  INDUSTRY_SECTIONS,
  SCHEMELESS_LINK,
  VISITOR_AUTORESPONSE_TEXT,
  type AuditSection,
} from "@/config/audit";
import { CONTACT_EMAIL } from "@/lib/contact";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { Crosshair, SectionRule } from "@/components/ui/Marker";
import AuditField, { type AuditValue } from "@/components/audit/AuditField";

type Values = Record<string, AuditValue>;
type Status = "intro" | "form" | "sending" | "sent" | "error";
type HistoryState = { status: "form" | "sent"; step: number };

const STORAGE_KEY = "proatops-audit-draft-v1";
const EASE = [0.16, 1, 0.3, 1] as const;

/* Every tone-dependent class in this file reads AUDIT_THEME once, here —
   see that constant in config/audit.ts for why. */
const TONE = AUDIT_THEME;
const isDark = TONE === "dark";
const ink = isDark ? "text-op-white" : "text-op-charcoal";
const inkBody = isDark ? "text-op-white/80" : "text-op-charcoal/80";
const inkMuted = isDark ? "text-op-white/55" : "text-op-muted";
const rule = isDark ? "border-op-border" : "border-op-rule";
const ruleBg = isDark ? "bg-op-border" : "bg-op-rule";
const primaryBtn = isDark
  ? "bg-op-white text-op-charcoal hover:bg-op-crimson hover:text-op-white"
  : "bg-op-charcoal text-op-white hover:bg-op-crimson hover:text-op-white";
const ghostBtn = isDark
  ? "border-op-border text-op-white hover:border-op-crimson hover:text-op-crimson"
  : "border-op-rule-strong text-op-charcoal hover:border-op-crimson hover:text-op-crimson";
const backLink = isDark
  ? "text-op-white/70 hover:text-op-white"
  : "text-op-charcoal/70 hover:text-op-charcoal";

/** Best-effort only — a private window or blocked storage should never break
    the form, just silently lose the resume convenience. */
function loadDraft(): { values: Values; step: number; id?: string } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveDraft(values: Values, step: number, id: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step, id }));
  } catch {
    /* ignore */
  }
}
function clearDraft() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** One id per assessment, not per click. crypto.randomUUID needs a secure
    context and a 2022+ browser; the fallback only has to be unique enough to
    tell one visitor's submission from another's. */
function newSubmissionId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function AuditForm() {
  const [status, setStatus] = useState<Status>("intro");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [touched, setTouched] = useState(false);
  /* Honeypot — a real hidden field, not just a payload key. `values.q_`
     never gets set by anything a human can reach; a bot that indiscrimin-
     ately fills every input on the page fills this one too. */
  const [honey, setHoney] = useState("");
  /* Identifies this assessment across retries and reloads. A visitor whose
     send fails and who presses submit again is the same submission, and the
     sheet updates that row rather than recording them twice — which matters
     most exactly then, when the sheet may be the only record that arrived. */
  const [submissionId, setSubmissionId] = useState("");
  const reduced = useReducedMotionSafe();
  const topRef = useRef<HTMLDivElement>(null);

  /* Resume a draft left mid-assessment — an 8-12 minute form is exactly the
     kind of thing a visitor starts, gets pulled away from, and comes back
     to. Only offered once, on mount. `replaceState` (not push) because this
     is establishing where the page *starts* this visit, not a step forward
     from intro — the intro screen was never shown this time. */
  useEffect(() => {
    const draft = loadDraft();
    if (draft && Object.keys(draft.values).length > 0) {
      setValues(draft.values);
      setStep(draft.step);
      if (draft.id) setSubmissionId(draft.id);
      setStatus("form");
      window.history.replaceState(
        { status: "form", step: draft.step } satisfies HistoryState,
        "",
        window.location.href
      );
    }
  }, []);

  /* The browser's own Back button and this form's own Back button are the
     same action: each step forward is a real history entry (pushState,
     same URL — this isn't deep-linking, just making Back behave), and
     going back is always `history.back()`, never a direct step change. That
     means the two can never drift out of sync with each other, and Back
     always lands somewhere sensible: the previous step, then the intro,
     then off the page entirely once there's nothing left to unwind — rather
     than a lone SPA screen where Back has nowhere to go and does nothing. */
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const s = e.state as HistoryState | null;
      if (s && typeof s.step === "number") {
        setStatus(s.status);
        setStep(s.step);
      } else {
        setStatus("intro");
        setStep(0);
      }
      setTouched(false);
      topRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [reduced]);

  useEffect(() => {
    if (status === "form") saveDraft(values, step, submissionId);
  }, [values, step, status, submissionId]);

  const industry = values.q8 as string | undefined;

  /* Section 01 (profile) always runs first since it's where the industry
     pick that gates the next section lives; the industry-specific block, if
     any, is inserted right after it. */
  const sections: AuditSection[] = useMemo(() => {
    const [profile, ...rest] = AUDIT_SECTIONS;
    const industrySection = industry ? INDUSTRY_SECTIONS[industry] : undefined;
    return industrySection ? [profile, industrySection, ...rest] : [profile, ...rest];
  }, [industry]);

  const current = sections[step];
  const visibleFields = current.fields.filter((f) => !f.showIf || f.showIf(values));

  const setValue = (id: string, value: AuditValue) => {
    setValues((v) => ({ ...v, [id]: value }));
  };

  const stepIsValid = () =>
    visibleFields
      .filter((f) => f.required)
      .every((f) => {
        const v = values[f.id];
        return Array.isArray(v) ? v.length > 0 : !!v && String(v).trim() !== "";
      });

  const pushAndGo = (next: HistoryState) => {
    window.history.pushState(next, "", window.location.href);
    setStatus(next.status);
    setStep(next.step);
    topRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const start = () => pushAndGo({ status: "form", step: 0 });

  const goNext = () => {
    setTouched(true);
    if (!stepIsValid()) return;
    setTouched(false);
    if (step < sections.length - 1) {
      pushAndGo({ status: "form", step: step + 1 });
    } else {
      submit();
    }
  };

  /* Not a direct step change — see the popstate effect above for why. */
  const goBack = () => window.history.back();

  const succeed = () => {
    clearDraft();
    window.history.pushState({ status: "sent", step } satisfies HistoryState, "", window.location.href);
    setStatus("sent");
  };

  const submit = async () => {
    if (honey) return;
    const id = submissionId || newSubmissionId();
    if (!submissionId) setSubmissionId(id);
    saveDraft(values, step, id);
    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, honey, submissionId: id }),
      });
      const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || result?.success !== true) throw new Error("send failed");
      succeed();
    } catch {
      /* Last resort, straight from the browser.
         The server route's own FormSubmit fallback is blocked in production:
         FormSubmit sits behind Cloudflare, which refuses the request when it
         originates from Vercel's data-centre IPs — verified by the same
         request succeeding from an ordinary connection and failing from the
         deployed function, minutes apart. Sent from the visitor's own
         browser it is exactly the client-side request FormSubmit is built
         for, and it works. This keeps enquiries arriving while Resend's
         domain verification (the real fix, and the one that also solves the
         spam-folder problem) is still outstanding, and stops being reached
         at all the moment the server route can send on its own. */
      try {
        const flat: Record<string, string> = {};
        for (const section of sections) {
          for (const f of section.fields) {
            const v = values[f.id];
            let text = Array.isArray(v) ? v.join(", ") : (v ?? "").toString();
            /* The relay sends plain text, and a mail client will only turn a
               bare "instagram.com/x" into a link inconsistently — with a
               scheme in front of it, reliably. Applied to the links question
               alone, so no other answer gets rewritten. */
            if (f.id === "q2") text = text.replace(SCHEMELESS_LINK, "$1https://$2");
            if (text.trim()) flat[f.label] = text;
          }
        }
        const email = (values.q5 ?? "").toString();
        const relay = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...flat,
            email,
            _subject: `Business audit — ${(values.q1 ?? "New submission").toString()}`,
            _template: "table",
            _replyto: email,
            /* Parity with the server route: whichever path actually sends,
               the visitor gets the same acknowledgement. Without this the
               confirmation arrived only on the Resend path, so in production
               — where this relay is the path that runs — nobody got one. */
            _autoresponse: VISITOR_AUTORESPONSE_TEXT,
            _captcha: "false",
          }),
        });
        const relayResult = (await relay.json().catch(() => null)) as {
          success?: string | boolean;
        } | null;
        if (!relay.ok || String(relayResult?.success) !== "true") throw new Error("relay failed");
        succeed();
      } catch {
        setStatus("error");
      }
    }
  };

  if (status === "intro") {
    return <AuditIntro onStart={start} />;
  }

  if (status === "sent") {
    return <AuditThanks />;
  }

  const isLastStep = step === sections.length - 1;

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Honeypot — present for the whole "form" status regardless of which
          step is showing, not nested inside the per-step AnimatePresence. */}
      <input
        type="text"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Progress */}
      <div className="mb-8">
        <div className={`flex items-center justify-between font-mono text-[0.75rem] uppercase tracking-wide ${inkMuted}`}>
          <span>{AUDIT_CTA.step(step + 1, sections.length)}</span>
          <span>{Math.round(((step + 1) / sections.length) * 100)}%</span>
        </div>
        <div className={`mt-2 h-px w-full ${ruleBg}`}>
          <motion.div
            className="h-px bg-op-crimson"
            initial={false}
            animate={{ width: `${((step + 1) / sections.length) * 100}%` }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
        >
          <SectionRule index={current.index} label={current.title} tone={TONE} />
          {current.intro && (
            <p className={`mt-4 max-w-xl text-body-md ${inkBody}`}>{current.intro}</p>
          )}

          <div className="mt-8 space-y-9">
            {visibleFields.map((field, i) => (
              <AuditField
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={setValue}
                tone={TONE}
                autoFocus={i === 0 && step > 0}
              />
            ))}
          </div>

          {touched && !stepIsValid() && (
            <p className="mt-6 font-mono text-[0.875rem] uppercase tracking-wide text-op-crimson">
              Please fill in the required fields marked with *.
            </p>
          )}

          {status === "error" && isLastStep && (
            <p className="mt-6 font-mono text-[0.875rem] uppercase tracking-wide text-op-crimson">
              {AUDIT_THANKS.errorBody}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
            </p>
          )}

          <div className="mt-10 flex items-center gap-4">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className={`font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-op-micro ease-op-micro ${backLink}`}
              >
                &larr; {AUDIT_CTA.back}
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={status === "sending"}
              className={`group ml-auto inline-flex h-14 items-center justify-center gap-3 rounded-sm px-8 font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-op-micro ease-op-micro disabled:cursor-not-allowed disabled:opacity-60 ${primaryBtn}`}
            >
              {isLastStep
                ? status === "sending"
                  ? AUDIT_CTA.submitting
                  : AUDIT_CTA.submit
                : AUDIT_CTA.next}
              <span
                aria-hidden="true"
                className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </button>
          </div>
          {isLastStep && <p className={`mt-4 text-body-md ${inkBody}`}>{AUDIT_CTA.subCta}</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AuditIntro({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Crosshair />
        <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
          {AUDIT_INTRO.eyebrow}
        </span>
      </div>
      <h1 className={`headline mt-5 text-display-lg tracking-display ${ink}`}>
        {AUDIT_INTRO.title}
      </h1>
      <p className={`mt-6 max-w-xl text-body-lg font-medium ${ink}`}>{AUDIT_INTRO.lede}</p>
      <p className={`mt-4 max-w-xl text-body-md ${inkBody}`}>{AUDIT_INTRO.body}</p>

      <div className={`mt-8 space-y-2 border-t ${rule} pt-6`}>
        <p className={`font-mono text-[0.75rem] uppercase tracking-wide ${inkMuted}`}>
          {AUDIT_INTRO.time}
        </p>
        <p className={`max-w-xl text-body-md ${inkBody}`}>{AUDIT_INTRO.confidentiality}</p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className={`group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-sm px-8 font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-op-micro ease-op-micro ${primaryBtn}`}
      >
        {AUDIT_INTRO.start}
        <span
          aria-hidden="true"
          className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>
    </div>
  );
}

function AuditThanks() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Crosshair />
        <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
          {AUDIT_INTRO.eyebrow}
        </span>
      </div>
      <h1 className={`headline mt-5 text-display-lg tracking-display ${ink}`}>
        {AUDIT_THANKS.title}
      </h1>
      {AUDIT_THANKS.body.map((p) => (
        <p key={p} className={`mt-4 max-w-xl text-body-md ${inkBody}`}>
          {p}
        </p>
      ))}

      <p className="mt-10 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
        {AUDIT_THANKS.nextLabel}
      </p>
      <ol className={`mt-4 divide-y ${isDark ? "divide-op-border" : "divide-op-rule"} border-t ${rule}`}>
        {AUDIT_THANKS.steps.map((s) => (
          <li key={s.index} className="flex gap-5 py-5">
            <span className={`font-mono text-mono-sm tabular ${inkMuted}`}>{s.index}</span>
            <div>
              <p className={`headline text-display-sm tracking-display ${ink}`}>{s.title}</p>
              <p className={`mt-1 text-body-md ${inkBody}`}>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <a
        href="/"
        className={`group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-sm border px-8 font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-op-micro ease-op-micro ${ghostBtn}`}
      >
        {AUDIT_THANKS.backHome}
      </a>
    </div>
  );
}
