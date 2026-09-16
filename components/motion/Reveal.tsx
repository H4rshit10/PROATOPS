"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/** Deterministic reveal — cubic-bezier(0.4, 0, 0.2, 1), no springs. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
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
      initial={{ opacity: 0, y, filter: blur ? "blur(6px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
