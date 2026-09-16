"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * A surface that lights where the cursor is.
 *
 * Translated from the reference's GlowCard, with two deliberate departures:
 *
 *  - One hue, not four. The reference rotates a conic gradient through pink,
 *    gold, green and blue; here it is a single crimson wash, because red is
 *    the only accent this identity has and a rainbow would read as a template.
 *  - Nothing at rest. The wash is fully transparent until the pointer enters,
 *    so the system's "no ambient glow at rest" rule still holds — this is an
 *    interaction, not decoration.
 *
 * The child stays the interactive element; this only supplies the lighting.
 */
export default function SpotlightCard({
  children,
  className = "",
  /** Radius of the wash in px. Larger reads softer, smaller reads like a torch. */
  radius = 340,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  /* Pointer position is written straight to CSS custom properties rather than
     React state — this fires on every mousemove, and re-rendering the subtree
     at that rate is how these effects end up janky. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group/spot relative ${className}`}
      style={
        { "--sx": "50%", "--sy": "50%" } as React.CSSProperties
      }
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 ease-op-editorial group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--sx) var(--sy), rgba(225,29,46,0.13), rgba(225,29,46,0.05) 38%, transparent 68%)`,
        }}
      />
    </div>
  );
}
