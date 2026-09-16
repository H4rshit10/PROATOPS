"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Deterministic word-by-word rise — cubic-bezier(0.4, 0, 0.2, 1), no springs. */
export default function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: WordRevealProps) {
  const reduced = useReducedMotionSafe();
  const words = text.split(" ");

  /* Reduced motion gets the text outright — no fade, no hidden initial state.
     Fading in from opacity 0 is still motion, and it leaves the copy invisible
     for anyone whose animation frames never arrive. */
  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {/* `aria-label` on the visible markup below would do this job on a
         heading or paragraph, but a plain `span` has role "generic", which
         the ARIA spec explicitly excludes from taking an accessible name —
         assistive tech drops the label silently. A real visually-hidden text
         node works on every tag and every screen reader, so it's used for
         all of them rather than branching on `as`. */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        /* Words are separated by a real space character that sits *between*
           the masked inline-blocks, never inside one: a trailing space inside
           an inline-block collapses, and a CSS margin instead of a space made
           copied text come out as "ISYOURBUSINESS". The rise itself — mask,
           110% travel, 0.045s stagger, easing — is unchanged. */
        <Fragment key={`${word}-${i}`}>
          <span
            className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.045,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
