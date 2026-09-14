"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Glyphs the label resolves through. Kept to bracket/operator characters —
   the technical register the rest of the page already speaks in. */
const CHARS = "/\\[]{}<>=+*·:;%#@";

/**
 * Scramble-on-hover CTA, adapted from the Originkit "Encrypt" button.
 *
 * The scramble is the reason to take this one: mono type resolving character
 * by character reads like a terminal settling, which is the exact register an
 * operations company wants. Dropped from the original:
 *
 *  - The sweeping indigo light band. It is a second, unrelated animation
 *    competing with the scramble, and a moving glow at rest is out of system.
 *  - The 16px radius and 48px padding, replaced with the site's 2px chip.
 *  - `setState` per frame on the whole label. This writes to one ref'd node
 *    via `textContent`, so a 60Hz scramble never re-renders React.
 */
export default function ScrambleButton({
  label,
  onClick,
  href,
  className = "",
  tone = "dark",
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const raf = useRef<number | null>(null);
  const [, force] = useState(0);
  const reduced = useReducedMotion();

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (textRef.current) textRef.current.textContent = label;
  }, [label]);

  const start = useCallback(() => {
    if (reduced) return;
    if (raf.current !== null) cancelAnimationFrame(raf.current);

    const letters = [...label];
    const cycles = 3;
    const stepMs = 1000 / 45;
    const total = letters.length * cycles;
    let step = 0;
    let last = 0;

    const tick = (now: number) => {
      if (!last) last = now;
      if (now - last >= stepMs) {
        last = now;
        const out = letters
          .map((ch, i) => {
            if (step / cycles > i) return ch;
            if (!ch.trim()) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        if (textRef.current) textRef.current.textContent = out;
        step += 1;
        if (step >= total) {
          if (textRef.current) textRef.current.textContent = label;
          raf.current = null;
          return;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [label, reduced]);

  /* Label can change between renders (it comes from config); keep the resting
     text in sync when no scramble is running. */
  useEffect(() => {
    if (raf.current === null && textRef.current) {
      textRef.current.textContent = label;
    }
    force((n) => n + 1);
  }, [label]);

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    []
  );

  const onInk = tone === "dark";
  const Tag = (href ? "a" : "button") as "a" | "button";

  return (
    <Tag
      {...(href ? { href } : { type: "button" as const, onClick })}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={`group inline-flex h-[54px] items-center gap-3 rounded-[10px] border px-8 transition-colors duration-300 ease-op-editorial sm:px-9 ${
        onInk
          ? "border-pa-hair-2 bg-white/[0.03] text-pa-chalk hover:border-white/35 hover:bg-white/[0.07]"
          : "border-op-rule-strong bg-transparent text-op-charcoal hover:border-op-crimson hover:text-op-crimson"
      } ${className}`}
    >
      {/* Reserve the resting width so scrambled glyphs never reflow the row. */}
      <span className="relative inline-block">
        <span className="invisible whitespace-nowrap font-mono text-mono-sm uppercase tracking-tracker">
          {label}
        </span>
        <span
          ref={textRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center whitespace-nowrap font-mono text-mono-sm uppercase tracking-tracker"
        >
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 ease-op-editorial group-hover:translate-x-[6px]"
      >
        &rarr;
      </span>
    </Tag>
  );
}
