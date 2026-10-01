"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * The signature marker — a hard-edged crimson square, turned 45 degrees —
 * travelling once along a connector.
 *
 * It rides the connector with `transform` only. The earlier version animated
 * `left`, which re-laid-out the strip on every frame; here the track is a size
 * container (`container-type: inline-size`) and the marker translates by
 * `cqw`, its width, so the browser never reflows anything.
 *
 * Place it inside a `relative` element that is as wide as the line it travels.
 * Renders nothing under reduced motion.
 */
export default function TrackMarker({
  delay = 0,
  duration = 0.5,
  className = "",
  margin = "-60px",
}: {
  delay?: number;
  duration?: number;
  /** Visibility classes for the track, e.g. "hidden lg:block". */
  className?: string;
  margin?: string;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return null;

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-1/2 z-10 h-0 [container-type:inline-size] ${className}`}
    >
      <motion.span
        initial={{ x: "0cqw", opacity: 0 }}
        whileInView={{ x: "100cqw", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true, margin }}
        transition={{ duration, delay, ease: "linear" }}
        className="absolute left-0 top-0 block h-0 w-0"
      >
        <span className="absolute left-0 top-0 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-op-crimson" />
      </motion.span>
    </span>
  );
}
