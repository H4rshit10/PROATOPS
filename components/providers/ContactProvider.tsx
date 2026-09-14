"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/contact";
import { useIsTouch } from "@/lib/useMediaQuery";
import { CornerMarks, Crosshair } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { audit, meta, nav } = PROATOPS;

type ContactContextValue = { openForm: () => void; closeForm: () => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within <ContactProvider>");
  return ctx;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* Enquiries are relayed by FormSubmit to the business inbox. The inbox has to
   confirm the form once (FormSubmit emails an "Activate Form" link on the first
   submission); until then every submission is refused. */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const AUTORESPONSE = `Your audit request has been received by PROATOPS.

What happens next:
- Within two working days: a written operational read on your locations.
- A 30-minute call to walk through staffing, SOP gaps and unit economics.
- A deployment proposal with the staffing blueprint and the numbers behind it.

Prefer email? Reply directly to this message.

PROATOPS — Business Operations & Management
${CONTACT_EMAIL}`;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const isTouch = useIsTouch();

  const openForm = useCallback(() => {
    setStatus("idle");
    setOpen(true);
  }, []);

  const closeForm = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const email = String(data.get("email") || "").trim();

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Business: business || "—",
          /* Lower-case `email` is what FormSubmit reads for the visitor's
             address: it drives reply-to and the confirmation autoresponse. */
          email,
          Locations: String(data.get("locations") || "").trim(),
          "Operational issue": String(data.get("brief") || "").trim(),
          _subject: `Business audit request${business ? ` — ${business}` : ""}`,
          _template: "table",
          _replyto: email,
          _autoresponse: AUTORESPONSE,
          _captcha: "false",
          // honeypot — bots fill this, humans never see it
          _honey: String(data.get("_honey") || ""),
        }),
      });
      const result = (await res.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;
      /* FormSubmit answers 200 even when it refused the enquiry (form not yet
         activated, submission blocked). Only an explicit success counts as
         sent; anything else shows the error state with the direct email. */
      if (!res.ok || String(result?.success) !== "true") {
        throw new Error(result?.message || `Request failed: ${res.status}`);
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ContactContext.Provider value={{ openForm, closeForm }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={audit.title}
          >
            {/* Backdrop — flat parchment at low alpha, no blur. Blur is a
                depth cue this system does not use. */}
            <div
              className="fixed inset-0 bg-op-parchment/70"
              onClick={closeForm}
            />

            <div
              className="relative flex min-h-full items-center justify-center"
              style={{
                paddingTop: "max(1rem, env(safe-area-inset-top))",
                paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                paddingLeft: "max(1rem, env(safe-area-inset-left))",
                paddingRight: "max(1rem, env(safe-area-inset-right))",
              }}
            >
              <motion.div
                className="grain grain-dark relative w-full max-w-xl border border-op-border bg-op-charcoal"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.36, ease: EASE }}
              >
                {/* Registration marks */}
                <CornerMarks />

                <div className="relative z-[2] p-6 sm:p-9">
                  <div className="flex items-start justify-between gap-6 border-b border-op-border pb-5">
                    <div>
                      <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                        {nav.brand} · {nav.tagline}
                      </span>
                      <h2 className="headline mt-2.5 text-display-sm tracking-display text-op-white">
                        {audit.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={closeForm}
                      aria-label={audit.close}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-op-border font-mono text-mono-sm text-op-white/70 transition-colors duration-op-micro ease-op-micro hover:border-op-crimson hover:text-op-crimson"
                    >
                      ✕
                    </button>
                  </div>

                  {status === "sent" ? (
                    <div className="py-10">
                      <div className="flex items-center gap-3">
                        <Crosshair />
                        <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                          {meta.coordinates}
                        </span>
                      </div>
                      <h3 className="headline mt-5 text-display-md text-op-white">
                        {audit.sentTitle}
                      </h3>
                      <p className="mt-4 max-w-md text-body-sm text-op-white/70">
                        {audit.sentBody}
                      </p>
                      <button
                        type="button"
                        onClick={closeForm}
                        className="mt-8 inline-flex h-12 items-center justify-center rounded-sm bg-op-white px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white"
                      >
                        {audit.close}
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="mt-5 max-w-md text-body-sm text-op-white/60">
                        {audit.intro}
                      </p>

                      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          {/* autofocus on a phone throws the keyboard up over
                              the form before it can be read — pointers only */}
                          <Field
                            label={audit.fields.name}
                            name="name"
                            required
                            autoFocus={!isTouch}
                          />
                          <Field
                            label={audit.fields.email}
                            name="email"
                            type="email"
                            required
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label={audit.fields.business}
                            name="business"
                            required
                          />
                          <div>
                            <FieldLabel htmlFor="op-locations">
                              {audit.fields.locations}
                            </FieldLabel>
                            <select
                              id="op-locations"
                              name="locations"
                              defaultValue={audit.locationOptions[0]}
                              className="op-field"
                            >
                              {audit.locationOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <FieldLabel htmlFor="op-brief">
                            {audit.fields.brief}
                          </FieldLabel>
                          <textarea
                            id="op-brief"
                            name="brief"
                            required
                            rows={4}
                            className="op-field resize-none"
                          />
                        </div>

                        {/* honeypot: hidden from humans, catches bots */}
                        <input
                          type="text"
                          name="_honey"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          className="hidden"
                        />

                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-op-white font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {status === "sending" ? audit.sending : audit.submit}
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
                          >
                            &rarr;
                          </span>
                        </button>

                        {status === "error" ? (
                          <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                            {audit.errorBody}{" "}
                            <a
                              href={`mailto:${CONTACT_EMAIL}`}
                              className="underline underline-offset-4"
                            >
                              {CONTACT_EMAIL}
                            </a>
                          </p>
                        ) : (
                          <p className="font-mono text-mono-xs uppercase tracking-micro text-op-muted">
                            {meta.coordinates}
                          </p>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block font-mono text-mono-xs uppercase tracking-micro text-op-muted"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoFocus = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const id = `op-${name}`;
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        className="op-field"
      />
    </div>
  );
}
