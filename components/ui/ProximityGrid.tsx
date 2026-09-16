"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * A grid whose cell borders light as the pointer approaches them.
 *
 * Distilled from the reference's MagicBento + BorderGlow, keeping the two ideas
 * that carry the effect and dropping the rest:
 *
 *  - **Grid-wide proximity.** A cell lights before the pointer reaches it,
 *    scaled by distance, so the whole grid responds as one surface rather than
 *    six unrelated hover targets. (MagicBento)
 *  - **Edge bias.** Intensity rises as the pointer nears a cell's edge, which
 *    is what makes the light read as landing on a border rather than sitting
 *    behind the card. (BorderGlow's `getEdgeProximity`)
 *
 * Deliberately not carried over: particles, 3D tilt, magnetism, click ripples,
 * the purple, and the 20-28px radii. Those belong to a playful product; this
 * system has one accent, square corners, and nothing glowing at rest.
 *
 * Implementation notes that matter:
 *  - One `pointermove` listener on the container, not one per cell. The
 *    reference attaches handlers to every card and also runs a document-level
 *    listener; at six cells that is seven listeners doing overlapping math.
 *  - Everything is written to CSS custom properties, never React state, so a
 *    move event never triggers a render.
 *  - No GSAP. The only thing being animated is a custom property the browser
 *    already interpolates via `transition`.
 */
export default function ProximityGrid({
  children,
  className = "",
  /** Distance in px beyond a cell's box at which its glow reaches full. */
  proximity = 120,
  /** Distance in px at which the glow has fallen to nothing. */
  falloff = 320,
}: {
  children: ReactNode;
  className?: string;
  proximity?: number;
  falloff?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const frame = useRef<number | null>(null);

  const clear = useCallback(() => {
    const cells = ref.current?.querySelectorAll<HTMLElement>("[data-prox-cell]");
    cells?.forEach((cell) => cell.style.setProperty("--glow", "0"));
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const host = ref.current;
      if (!host) return;

      /* Coalesce to one measurement per frame — pointermove can fire well
         above 60Hz on a high-polling mouse, and every cell is read below. */
      if (frame.current !== null) return;
      const { clientX, clientY } = e;

      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const cells = host.querySelectorAll<HTMLElement>("[data-prox-cell]");

        cells.forEach((cell) => {
          const r = cell.getBoundingClientRect();

          /* Distance from the pointer to the cell's box, not its centre: zero
             while inside, growing once outside. Centre-distance would make
             large cells light later than small ones. */
          const dx = Math.max(r.left - clientX, 0, clientX - r.right);
          const dy = Math.max(r.top - clientY, 0, clientY - r.bottom);
          const distance = Math.hypot(dx, dy);

          let glow: number;
          if (distance <= proximity) glow = 1;
          else if (distance >= falloff) glow = 0;
          else glow = (falloff - distance) / (falloff - proximity);

          cell.style.setProperty("--glow", glow.toFixed(3));
          cell.style.setProperty("--gx", `${clientX - r.left}px`);
          cell.style.setProperty("--gy", `${clientY - r.top}px`);
        });
      });
    },
    [proximity, falloff]
  );

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    []
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={clear}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * The glowing border ring for one cell.
 *
 * A radial gradient clipped to a 1px inset frame by `mask-composite: exclude`,
 * so the light lands on the border only and never washes the cell interior —
 * which is what keeps this compatible with the no-ambient-glow rule.
 */
export function ProximityBorder() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[3]"
      style={{
        padding: "1px",
        opacity: "var(--glow, 0)",
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        background: `radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), rgba(225,29,46,0.95) 0%, rgba(225,29,46,0.35) 38%, transparent 70%)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      }}
    />
  );
}
