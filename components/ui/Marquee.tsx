"use client";

import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * Infinite horizontal ticker, from the extracted Jingi component.
 *
 * The track holds the same list twice and translates -50%, so the loop is
 * seamless. The duplicate is aria-hidden — a screen reader should hear the
 * list once, not twice. Under reduced motion it stops being a marquee
 * entirely and renders as a plain wrapped list rather than an animation
 * held still at an arbitrary offset.
 */
export default function Marquee({
  items,
  tone = "light",
  className = "",
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  const dark = tone === "dark";
  const border = dark ? "border-op-white/20" : "border-op-rule-strong";
  const ink = dark ? "text-op-white/80" : "text-op-charcoal/80";

  if (reduced) {
    return (
      <div className={`border-y ${border} py-5 ${className}`}>
        <ul className={`shell-x mx-auto flex max-w-shell flex-wrap gap-x-8 gap-y-2 ${ink}`}>
          {items.map((i) => (
            <li key={i} className="font-mono text-[0.8125rem] uppercase tracking-wide">
              {i}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const run = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-10 pr-10 ${ink}`}
    >
      {items.map((i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-mono text-[0.8125rem] uppercase tracking-wide">{i}</span>
          <span aria-hidden="true" className="text-op-crimson">
            &bull;
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee border-y ${border} py-5 ${className}`}>
      <div className="marquee-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
