"use client";

import { Children, isValidElement, type ReactElement, type ReactNode, type RefObject } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { EASE } from "@/lib/motion";

/* Which SVG tags this can animate. Shared by every icon set in the project —
   see Glyphs.tsx's Frame, the original of this, for why only these four. */
const MOTION_TAG = {
  path: motion.path,
  rect: motion.rect,
  circle: motion.circle,
  ellipse: motion.ellipse,
} as const;

/**
 * Stroke-draw without Framer's `pathLength`.
 *
 * Framer's `pathLength` animation re-writes the SVG `pathLength` attribute on
 * every frame, and Blink re-lays-out the SVG each time that attribute is set
 * — measured at one layout pass per frame per animating shape, ~160 of the
 * homepage's ~240 layouts on a phone. So the path is normalised once with a
 * static `pathLength={1}` and the dash pattern "1 2" (a dash as long as the
 * path, then a gap longer than it), and only `stroke-dashoffset` animates:
 * 1 hides the path in the gap, 0 shows it whole. dashoffset and opacity are
 * paint-only, so no layout. Spread DRAW_ATTRS on the element, animate
 * strokeDashoffset from DRAW_HIDDEN to 0.
 */
export const DRAW_ATTRS = { pathLength: 1, strokeDasharray: "1 2" } as const;
export const DRAW_HIDDEN = 1;

/**
 * Turns a flat list of raw SVG shapes into the same shapes drawing in the
 * first time their `<svg>` scrolls into view — stroke first (pathLength
 * 0 -> 1), staggered per shape so a multi-part icon assembles rather than
 * appearing all at once.
 *
 * Shared by every icon set in the project rather than reimplemented per set:
 * the icon-set component calls `useRef` for its own `<svg>` and passes that
 * ref plus its raw children here; the hook itself owns the `useInView` +
 * reduced-motion logic so that isn't repeated at every call site either.
 *
 * A shape with `stroke="none"` (a solid fill accent, not an outline) draws
 * nothing via pathLength — there's no stroke to trace — so it fades and
 * settles in slightly after the outline instead, keeping whatever `opacity`
 * it already specified as its resting value rather than being forced to 1.
 */
export function useDrawnChildren(children: ReactNode, ref: RefObject<SVGSVGElement | null>): ReactNode {
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotionSafe();

  if (reduced) return children;

  return Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    const tag = child.type as keyof typeof MOTION_TAG;
    const Motion = MOTION_TAG[tag];
    if (!Motion) return child;

    const props = (child as ReactElement).props as Record<string, unknown>;
    const isFilledAccent = props.stroke === "none";
    const restOpacity = isFilledAccent ? (props.opacity as number | undefined) ?? 1 : 1;

    return (
      <Motion
        key={i}
        {...props}
        {...(isFilledAccent ? null : DRAW_ATTRS)}
        initial={isFilledAccent ? { opacity: 0 } : { strokeDashoffset: DRAW_HIDDEN, opacity: 0.3 }}
        animate={
          inView
            ? isFilledAccent
              ? { opacity: restOpacity }
              : { strokeDashoffset: 0, opacity: 1 }
            : undefined
        }
        transition={{
          duration: isFilledAccent ? 0.4 : 0.55,
          delay: i * 0.06 + (isFilledAccent ? 0.3 : 0),
          ease: EASE,
        }}
      />
    );
  });
}
