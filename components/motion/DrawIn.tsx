"use client";

import { Children, isValidElement, type ReactElement, type ReactNode, type RefObject } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/* Which SVG tags this can animate. Shared by every icon set in the project —
   see Glyphs.tsx's Frame, the original of this, for why only these four. */
const MOTION_TAG = {
  path: motion.path,
  rect: motion.rect,
  circle: motion.circle,
  ellipse: motion.ellipse,
} as const;

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
        initial={isFilledAccent ? { opacity: 0, scale: 0.6 } : { pathLength: 0, opacity: 0.3 }}
        animate={
          inView
            ? isFilledAccent
              ? { opacity: restOpacity, scale: 1 }
              : { pathLength: 1, opacity: 1 }
            : undefined
        }
        transition={{
          duration: isFilledAccent ? 0.4 : 0.55,
          delay: i * 0.06 + (isFilledAccent ? 0.3 : 0),
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    );
  });
}
