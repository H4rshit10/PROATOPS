"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUDIT_CTA,
  AUDIT_INTRO,
  AUDIT_SECTIONS,
  AUDIT_THANKS,
  INDUSTRY_SECTIONS,
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

/** Best-effort only — a private window or blocked storage should never break
    the form, just silently lose the resume convenience. */
function loadDraft(): { values: Values; step: number } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveDraft(values: Values, step: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
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

export default function AuditForm() {
  const [status, setStatus] = useState<Status>("intro");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [touched, setTouched] = useState(false);
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
    if (status === "form") saveDraft(values, step);
  }, [values, step, status]);

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

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values, honey: values._honey ?? "" }),
      });
      const result = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || result?.success !== true) throw new Error("send failed");
      clearDraft();
      window.history.pushState({ status: "sent", step } satisfies HistoryState, "", window.location.href);
      setStatus("sent");
    } catch {
      setStatus("error");
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
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
          <span>{AUDIT_CTA.step(step + 1, sections.length)}</span>
          <span>{Math.round(((step + 1) / sections.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-px w-full bg-op-border">
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
          <SectionRule index={current.index} label={current.title} tone="dark" />
          {current.intro && (
            <p className="mt-4 max-w-xl text-body-sm text-op-white/70">{current.intro}</p>
          )}

          <div className="mt-8 space-y-8">
            {visibleFields.map((field, i) => (
              <AuditField
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={setValue}
                autoFocus={i === 0 && step > 0}
              />
            ))}
          </div>

          {touched && !stepIsValid() && (
            <p className="mt-6 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
              Please fill in the required fields marked with *.
            </p>
          )}

          {status === "error" && isLastStep && (
            <p className="mt-6 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
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
                className="font-mono text-mono-sm uppercase tracking-tracker text-op-white/60 transition-colors duration-op-micro ease-op-micro hover:text-op-white"
              >
                &larr; {AUDIT_CTA.back}
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={status === "sending"}
              className="group ml-auto inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-op-white px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white disabled:cursor-not-allowed disabled:opacity-60"
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
          {isLastStep && (
            <p className="mt-4 text-body-sm text-op-white/60">{AUDIT_CTA.subCta}</p>
          )}
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
      <h1 className="headline mt-5 text-display-lg tracking-display text-op-white">
        {AUDIT_INTRO.title}
      </h1>
      <p className="mt-6 max-w-xl text-body-md font-medium text-op-white">{AUDIT_INTRO.lede}</p>
      <p className="mt-4 max-w-xl text-body-sm text-op-white/70">{AUDIT_INTRO.body}</p>

      <div className="mt-8 space-y-2 border-t border-op-border pt-6">
        <p className="font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
          {AUDIT_INTRO.time}
        </p>
        <p className="max-w-xl text-body-sm text-op-white/70">{AUDIT_INTRO.confidentiality}</p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-op-white px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white"
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
      <h1 className="headline mt-5 text-display-lg tracking-display text-op-white">
        {AUDIT_THANKS.title}
      </h1>
      {AUDIT_THANKS.body.map((p) => (
        <p key={p} className="mt-4 max-w-xl text-body-sm text-op-white/70">
          {p}
        </p>
      ))}

      <p className="mt-10 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
        {AUDIT_THANKS.nextLabel}
      </p>
      <ol className="mt-4 divide-y divide-op-border border-t border-op-border">
        {AUDIT_THANKS.steps.map((s) => (
          <li key={s.index} className="flex gap-5 py-5">
            <span className="font-mono text-mono-sm tabular text-op-white/50">{s.index}</span>
            <div>
              <p className="headline text-display-sm tracking-display text-op-white">
                {s.title}
              </p>
              <p className="mt-1 text-body-sm text-op-white/70">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <a
        href="/"
        className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-sm border border-op-border px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-micro ease-op-micro hover:border-op-crimson hover:text-op-crimson"
      >
        {AUDIT_THANKS.backHome}
      </a>
    </div>
  );
}
