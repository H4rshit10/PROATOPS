"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

/**
 * Words fill from dim to bright as the block scrolls through the viewport —
 * the "reading light" effect.
 */
export default function ScrollFillText({
  text,
  className,
  dimClass = "text-op-charcoal/20",
  brightClass = "text-op-charcoal",
}: {
  text: string;
  className?: string;
  dimClass?: string;
  brightClass?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");

  /* Without this the copy sits permanently at `dimClass` for anyone whose
     scroll-linked frames never run — a paragraph rendered at 20% opacity,
     which fails contrast outright. Reduced motion gets it fully lit. */
  if (reduced) {
    return (
      <p ref={ref} className={`${className} ${brightClass}`}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            dimClass={dimClass}
            brightClass={brightClass}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dimClass,
  brightClass,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimClass: string;
  brightClass: string;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <span className={dimClass} aria-hidden="true">
        {children}
      </span>
      <motion.span
        style={{ opacity }}
        className={`absolute left-0 top-0 ${brightClass}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
