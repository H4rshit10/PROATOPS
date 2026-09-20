"use client";

import type { AuditField as AuditFieldSpec } from "@/config/audit";

export type AuditValue = string | string[] | undefined;

/**
 * One question, rendered off `field.type` alone — this is what keeps a
 * 63-question form to one component instead of 63. Every choice control
 * (pills, checkboxes, both scales) is a real native <input type="radio"|
 * "checkbox">, visually hidden and driving a styled label via
 * `data-selected` — full keyboard and screen-reader behaviour for free,
 * nothing hand-rolled with ARIA state to keep in sync.
 */
export default function AuditField({
  field,
  value,
  onChange,
  autoFocus = false,
}: {
  field: AuditFieldSpec;
  value: AuditValue;
  onChange: (id: string, value: AuditValue) => void;
  autoFocus?: boolean;
}) {
  const id = `audit-${field.id}`;

  return (
    <div>
      <label
        htmlFor={["text", "email", "tel", "textarea", "select"].includes(field.type) ? id : undefined}
        className="block font-mono text-mono-xs uppercase tracking-micro text-op-white/50"
      >
        {field.label}
        {field.required && <span className="text-op-crimson"> *</span>}
      </label>
      {field.helper && (
        <p className="mt-1.5 text-body-sm text-op-white/60">{field.helper}</p>
      )}

      <div className="mt-3">
        {(field.type === "text" || field.type === "email" || field.type === "tel") && (
          <input
            id={id}
            type={field.type}
            required={field.required}
            autoFocus={autoFocus}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="op-field"
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
            className="op-field resize-none"
          />
        )}

        {field.type === "select" && (
          <select
            id={id}
            required={field.required}
            autoFocus={autoFocus}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            className="op-field"
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
          <div role="radiogroup" aria-label={field.label} className="flex flex-wrap gap-2">
            {field.options?.map((o) => (
              <label
                key={o}
                data-selected={value === o}
                className="op-choice inline-flex cursor-pointer items-center rounded-sm px-4 py-2 font-mono text-mono-xs uppercase tracking-micro"
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
          <CheckboxGroup field={field} value={(value as string[]) ?? []} onChange={onChange} />
        )}

        {field.type === "scale10" && (
          <Scale10 field={field} value={value as string} onChange={onChange} />
        )}

        {field.type === "scale5" && (
          <Scale5 field={field} value={value as string} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

function CheckboxGroup({
  field,
  value,
  onChange,
}: {
  field: AuditFieldSpec;
  value: string[];
  onChange: (id: string, value: AuditValue) => void;
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
        <p className="mb-2 font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
          Select up to {field.max} — {value.length}/{field.max} selected
        </p>
      )}
      <div role="group" aria-label={field.label} className="flex flex-wrap gap-2">
        {field.options?.map((o) => {
          const checked = value.includes(o);
          return (
            <label
              key={o}
              data-selected={checked}
              className={`op-choice inline-flex items-center rounded-sm px-4 py-2 font-mono text-mono-xs uppercase tracking-micro ${
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
}: {
  field: AuditFieldSpec;
  value: string | undefined;
  onChange: (id: string, value: AuditValue) => void;
}) {
  return (
    <div>
      <div role="radiogroup" aria-label={field.label} className="flex">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <label
            key={n}
            data-selected={value === String(n)}
            className="op-choice op-scale flex-1 cursor-pointer py-2.5 text-center font-mono text-mono-sm tabular"
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
      <div className="mt-1.5 flex justify-between font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
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
}: {
  field: AuditFieldSpec;
  value: string | undefined;
  onChange: (id: string, value: AuditValue) => void;
}) {
  return (
    <div role="radiogroup" aria-label={field.label} className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {(field.scaleLabels ?? []).map((label, i) => {
        const n = i + 1;
        return (
          <label
            key={n}
            data-selected={value === String(n)}
            className="op-choice flex cursor-pointer flex-col items-center gap-1.5 rounded-sm px-1.5 py-3 text-center"
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
            <span className="font-mono text-mono-sm tabular">{n}</span>
            <span className="text-[0.65rem] leading-tight tracking-micro">{label}</span>
          </label>
        );
      })}
    </div>
  );
}
