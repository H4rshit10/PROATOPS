"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { EASE, DUR } from "@/lib/motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Kept so existing call sites compile. Reveals no longer blur: animating
      `filter` forces a repaint of the whole block every frame, which is the
      most expensive thing a reveal can do on a phone. */
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/** The site's one scroll-in: opacity and a short rise, on the shared curve. */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotionSafe();

  /* Reduced motion renders the content plainly. Holding it at opacity 0 and
     waiting on an intersection callback is both still motion and a way for
     copy to go missing if those frames never arrive. */
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: DUR, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
