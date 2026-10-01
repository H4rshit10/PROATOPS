"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { EASE } from "@/lib/motion";

/**
 * A hairline that draws left to right as it scrolls into view (transform
 * only). Used by SectionRule so every section opens the same way. Static
 * under reduced motion.
 */
export default function RuleLine({ className = "" }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <span aria-hidden="true" className={className} />;
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`origin-left ${className}`}
    />
  );
}
