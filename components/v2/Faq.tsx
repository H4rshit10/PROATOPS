"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { SectionRule } from "@/components/ui/Marker";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { V2_FAQ } from "@/config/v2";

/**
 * §24 — FAQ.
 *
 * Real objections, answered plainly — including the two that decide the
 * sale: whether ownership changes hands, and whether this is only for
 * fitness businesses. Native <button> disclosure rather than <details>, so
 * the open/close can animate without fighting the element's own behaviour.
 */
export default function V2Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotionSafe();

  return (
    <section id="faq" className="grain scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_FAQ.index} label={V2_FAQ.eyebrow} tone="light" />

        <h2 className="headline mt-10 text-display-lg tracking-display text-op-charcoal">
          {V2_FAQ.headline}
        </h2>

        <div className="mt-12 max-w-3xl border-t border-op-rule-strong">
          {V2_FAQ.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="border-b border-op-rule-strong">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="mt-1 font-mono text-mono-xs tabular text-op-crimson">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-body-lg font-medium text-op-charcoal transition-colors duration-op-micro ease-op-micro group-hover:text-op-crimson">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 shrink-0 font-mono text-mono-sm text-op-charcoal/50 transition-transform duration-op-slow ease-op-micro ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-10 text-pretty text-body-md text-op-charcoal/80">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
