"use client";

import type { AuditField as AuditFieldSpec } from "@/config/audit";
import type { Tone } from "@/components/ui/Marker";

export type AuditValue = string | string[] | undefined;

const label: Record<Tone, string> = {
  light: "text-op-charcoal",
  dark: "text-op-white",
};
const helper: Record<Tone, string> = {
  light: "text-op-charcoal/75",
  dark: "text-op-white/75",
};
const hint: Record<Tone, string> = {
  light: "text-op-muted",
  dark: "text-op-white/55",
};

/** `.op-field` / `.op-choice` carry the tone-dependent border/placeholder/
    option colours that can't be expressed as a plain utility class — see
    the `--dark` modifiers in globals.css. */
const fieldCls = (tone: Tone) => `op-field${tone === "dark" ? " op-field--dark" : ""}`;
const choiceCls = (tone: Tone) => `op-choice${tone === "dark" ? " op-choice--dark" : ""}`;

/**
 * One question, rendered off `field.type` alone — this is what keeps a
 * 63-question form to one component instead of 63. Every choice control
 * (pills, checkboxes, both scales) is a real native <input type="radio"|
 * "checkbox">, visually hidden and driving a styled label via
 * `data-selected` — full keyboard and screen-reader behaviour for free,
 * nothing hand-rolled with ARIA state to keep in sync.
 *
 * Typography is sized for a form someone reads and re-reads 63 times over,
 * not for the small structural chrome (bracket tags, coordinate trackers)
 * the rest of this design system's mono scale is tuned for — the question
 * itself is a real sans-serif heading, not a caption.
 */
export default function AuditField({
  field,
  value,
  onChange,
  tone = "light",
  autoFocus = false,
}: {
  field: AuditFieldSpec;
  value: AuditValue;
  onChange: (id: string, value: AuditValue) => void;
  tone?: Tone;
  autoFocus?: boolean;
}) {
  const id = `audit-${field.id}`;

  return (
    <div>
      <label
        htmlFor={["text", "email", "tel", "textarea", "select"].includes(field.type) ? id : undefined}
        className={`block font-sans text-lg font-semibold leading-snug sm:text-xl ${label[tone]}`}
      >
        {field.label}
        {field.required && <span className="text-op-crimson"> *</span>}
      </label>
      {field.helper && (
        <p className={`mt-2 text-body-md ${helper[tone]}`}>{field.helper}</p>
      )}

      <div className="mt-4">
        {(field.type === "text" || field.type === "email" || field.type === "tel") && (
          <input
            id={id}
            type={field.type}
            required={field.required}
            autoFocus={autoFocus}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={fieldCls(tone)}
          />
        )}

        {field.type === "textarea" && (
          <textarea
            id={id}
            required={field.required}
            autoFocus={autoFocus}
            rows={4}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={`${fieldCls(tone)} resize-none`}
          />
        )}

        {field.type === "select" && (
          <select
            id={id}
            required={field.required}
            autoFocus={autoFocus}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={fieldCls(tone)}
          >
            <option value="" disabled>
              Select one
            </option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        {field.type === "pills" && (
          <div role="radiogroup" aria-label={field.label} className="flex flex-wrap gap-2.5">
            {field.options?.map((o) => (
              <label
                key={o}
                data-selected={value === o}
                className={`${choiceCls(tone)} inline-flex cursor-pointer items-center rounded-sm px-5 py-3 font-sans text-lg`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={o}
                  checked={value === o}
                  onChange={() => onChange(field.id, o)}
                  required={field.required}
                  className="sr-only"
                />
                {o}
              </label>
            ))}
          </div>
        )}

        {field.type === "checkboxes" && (
          <CheckboxGroup field={field} value={(value as string[]) ?? []} onChange={onChange} tone={tone} />
        )}

        {field.type === "scale10" && (
          <Scale10 field={field} value={value as string} onChange={onChange} tone={tone} />
        )}

        {field.type === "scale5" && (
          <Scale5 field={field} value={value as string} onChange={onChange} tone={tone} />
        )}
      </div>
    </div>
  );
}

function CheckboxGroup({
  field,
  value,
  onChange,
  tone,
}: {
  field: AuditFieldSpec;
  value: string[];
  onChange: (id: string, value: AuditValue) => void;
  tone: Tone;
}) {
  const atMax = !!field.max && value.length >= field.max;

  const toggle = (opt: string) => {
    const has = value.includes(opt);
    if (has) {
      onChange(field.id, value.filter((v) => v !== opt));
    } else {
      if (atMax) return;
      onChange(field.id, [...value, opt]);
    }
  };

  return (
    <div>
      {field.max && (
        <p className={`mb-2.5 font-mono text-[0.8125rem] uppercase tracking-wide ${hint[tone]}`}>
          Select up to {field.max} — {value.length}/{field.max} selected
        </p>
      )}
      <div role="group" aria-label={field.label} className="flex flex-wrap gap-2.5">
        {field.options?.map((o) => {
          const checked = value.includes(o);
          return (
            <label
              key={o}
              data-selected={checked}
              className={`${choiceCls(tone)} inline-flex items-center rounded-sm px-5 py-3 font-sans text-lg ${
                !checked && atMax ? "cursor-not-allowed opacity-40" : "cursor-pointer"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(o)}
                disabled={!checked && atMax}
                className="sr-only"
              />
              {o}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Scale10({
  field,
  value,
  onChange,
  tone,
}: {
  field: AuditFieldSpec;
  value: string | undefined;
  onChange: (id: string, value: AuditValue) => void;
  tone: Tone;
}) {
  return (
    <div>
      {/* Two rows of five on phones: ten across a 320px screen made each
          number a 28px target, easy to mis-tap. From sm up it is the single
          connected strip it was. */}
      <div role="radiogroup" aria-label={field.label} className="grid grid-cols-5 sm:flex">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <label
            key={n}
            data-selected={value === String(n)}
            className={`${choiceCls(tone)} op-scale flex-1 cursor-pointer py-3.5 text-center font-mono text-lg tabular`}
          >
            <input
              type="radio"
              name={field.id}
              value={n}
              checked={value === String(n)}
              onChange={() => onChange(field.id, String(n))}
              required={field.required}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      <div className={`mt-2 flex justify-between font-mono text-[0.8125rem] uppercase tracking-wide ${hint[tone]}`}>
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

function Scale5({
  field,
  value,
  onChange,
  tone,
}: {
  field: AuditFieldSpec;
  value: string | undefined;
  onChange: (id: string, value: AuditValue) => void;
  tone: Tone;
}) {
  return (
    <div role="radiogroup" aria-label={field.label} className="grid grid-cols-5 gap-2">
      {(field.scaleLabels ?? []).map((l, i) => {
        const n = i + 1;
        return (
          <label
            key={n}
            data-selected={value === String(n)}
            className={`${choiceCls(tone)} flex cursor-pointer flex-col items-center gap-2 rounded-sm px-2 py-4 text-center`}
          >
            <input
              type="radio"
              name={field.id}
              value={n}
              checked={value === String(n)}
              onChange={() => onChange(field.id, String(n))}
              required={field.required}
              className="sr-only"
            />
            <span className="font-mono text-xl tabular">{n}</span>
            <span className="text-[0.8125rem] font-sans leading-tight">{l}</span>
          </label>
        );
      })}
    </div>
  );
}
