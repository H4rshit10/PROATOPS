"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Arrow-reveal CTA, adapted from the Originkit component.
 *
 * The mechanism is kept: a badge sits inside the button and scales up on hover
 * until it covers the whole surface, while the arrow travels to the centre and
 * the label slides clear.
 *
 * What changed, and why:
 *  - The original measures with `ResizeObserver` on every layout pass and
 *    drives everything through `useAnimate`. Here the cover scale is derived
 *    once per resize and the rest is CSS transform on a motion element — same
 *    result, far less running code.
 *  - `border-radius: 100%` became 10px, matching the hero CTA pair rather than
 *    introducing a third radius into the system.
 *  - The badge is crimson on charcoal instead of blue on white.
 *  - `useReducedMotion` collapses it to a plain colour swap; the original has
 *    a reduced-motion path for the tween but still runs the cover animation.
 */
export default function ArrowRevealButton({
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
  /** `dark` sits on ink, `light` sits on parchment. */
  tone?: "dark" | "light";
}) {
  const rootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [cover, setCover] = useState(1);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  /* The badge must scale until it covers the furthest corner of the button.
     Measured from the badge centre, not the button centre — the badge is
     inset on the right, so the far corner is the opposite one. */
  const measure = useCallback(() => {
    const root = rootRef.current;
    const badge = badgeRef.current;
    if (!root || !badge) return;
    const r = root.getBoundingClientRect();
    const b = badge.getBoundingClientRect();
    if (!r.width || !b.width) return;
    const cx = b.left + b.width / 2 - r.left;
    const cy = b.top + b.height / 2 - r.top;
    const far = Math.hypot(Math.max(cx, r.width - cx), Math.max(cy, r.height - cy));
    setCover((far * 2.05) / b.width);
  }, []);

  useLayoutEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure]);

  const onInk = tone === "dark";
  const Tag = (href ? "a" : "button") as "a" | "button";

  return (
    <Tag
      ref={rootRef as never}
      {...(href
        ? { href }
        : { type: "button" as const, onClick })}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative inline-flex h-[54px] items-center gap-5 overflow-hidden rounded-[10px] border pl-7 pr-[7px] transition-colors duration-300 ease-op-editorial ${
        onInk
          ? "border-pa-hair-2 bg-white/[0.03]"
          : "border-op-rule-strong bg-transparent"
      } ${className}`}
    >
      {/* The cover. Scales from the badge until it fills the button. */}
      <motion.span
        aria-hidden="true"
        ref={badgeRef}
        initial={false}
        animate={{ scale: reduced ? 1 : hovered ? cover : 1 }}
        transition={{ duration: 0.46, ease: [0.44, 0, 0.56, 1] }}
        className="absolute right-[7px] top-[7px] z-0 h-10 w-10 rounded-[8px] bg-op-crimson"
        style={{ transformOrigin: "center" }}
      />

      <span
        className={`relative z-[2] whitespace-nowrap font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-300 ease-op-editorial ${
          hovered ? "text-pa-chalk" : onInk ? "text-pa-chalk" : "text-op-charcoal"
        }`}
      >
        {label}
      </span>

      {/* Sits in the flow so the label never overlaps the badge's rest slot. */}
      <span aria-hidden="true" className="relative z-[2] h-10 w-10 shrink-0" />

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: reduced ? 0 : hovered ? -4 : 0 }}
        transition={{ duration: 0.46, ease: [0.44, 0, 0.56, 1] }}
        className="absolute right-[7px] top-[7px] z-[3] grid h-10 w-10 place-items-center text-[15px] text-pa-chalk"
      >
        &rarr;
      </motion.span>
    </Tag>
  );
}
