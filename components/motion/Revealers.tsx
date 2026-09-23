"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * Text revealers, beyond the word-by-word rise in WordReveal (which drives
 * the hero and is deliberately left alone).
 *
 * Every one of these follows the same rule as the rest of the motion here:
 * under reduced motion the content renders plainly and immediately. Copy is
 * never left sitting at opacity 0 waiting on frames that may never arrive.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------
   LineReveal — each line rises out of its own mask, in sequence.
   For stacked statement blocks where the rhythm is the point.
   --------------------------------------------------------------- */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.07,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  /* `useInView` + `animate` rather than `whileInView`. A percentage `y`
     inside an `overflow-hidden` mask stalls partway through under
     `whileInView` — the line ends up parked just below its mask, clipped
     and invisible. Driving the same animation from an explicit in-view
     flag is the pattern WordReveal already uses, and it lands reliably. */
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (reduced) {
    return (
      <div className={className}>
        {lines.map((l) => (
          <p key={l} className={lineClassName}>
            {l}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.62, delay: delay + i * stagger, ease: [0.4, 0, 0.2, 1] }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   CharReveal — character by character. Short strings only; at
   headline length this becomes noise rather than emphasis.
   --------------------------------------------------------------- */
export function CharReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className} aria-label={text}>
      {[...text].map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: "0.4em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: delay + i * 0.022, ease: EASE }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------
   MaskReveal — a clip wipe across any content, left to right.
   --------------------------------------------------------------- */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   CountUp — a figure that counts to its value once, on entry.
   Written through a spring rather than an interval so it can't
   drift or overshoot, and it lands exactly on the real number.
   --------------------------------------------------------------- */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (inView && !reduced) mv.set(value);
  }, [inView, reduced, mv, value]);

  useEffect(() => {
    if (reduced) return;
    return spring.on("change", (v) => setShown(Math.round(v)));
  }, [spring, reduced]);

  /* The real figure is always what's in the DOM for assistive tech and for
     anyone whose frames never arrive — the animation only replaces what's
     painted, never what's read. */
  const display = reduced || !inView ? value : shown;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}

/* ---------------------------------------------------------------
   RuleDraw — a hairline that draws itself across. Used as the
   structural separator between blueprint sections.
   --------------------------------------------------------------- */
export function RuleDraw({
  className = "",
  delay = 0,
  tone = "light",
}: {
  className?: string;
  delay?: number;
  tone?: "light" | "dark";
}) {
  const reduced = useReducedMotionSafe();
  const color = tone === "dark" ? "bg-op-white/25" : "bg-op-rule-strong";

  if (reduced) return <span className={`block h-px w-full ${color} ${className}`} />;

  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px w-full origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}
