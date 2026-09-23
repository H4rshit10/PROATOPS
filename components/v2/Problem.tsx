"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { LineReveal, RuleDraw } from "@/components/motion/Revealers";
import { SectionRule } from "@/components/ui/Marker";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { V2_PROBLEM } from "@/config/v2";

/**
 * §3 — the first psychological hook.
 *
 * The cards are the working part of this section: the owner reads their own
 * business back to themselves. They're interactive because recognition is
 * an action — selecting the ones that land turns a wall of statements into
 * a self-diagnosis, which is the whole point of the section.
 */
export default function V2Problem() {
  const [picked, setPicked] = useState<string[]>([]);
  const reduced = useReducedMotionSafe();

  const toggle = (card: string) =>
    setPicked((p) => (p.includes(card) ? p.filter((c) => c !== card) : [...p, card]));

  return (
    <section id="problem" className="grain blueprint scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_PROBLEM.index} label={V2_PROBLEM.eyebrow} tone="light" />

        <div className="mt-10 max-w-4xl">
          <h2 className="headline text-display-lg tracking-display text-op-charcoal">
            {V2_PROBLEM.headlineA}
          </h2>
          <h2 className="headline mt-1 text-display-lg tracking-display text-op-crimson">
            {V2_PROBLEM.headlineB}
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <LineReveal
              lines={V2_PROBLEM.lead}
              lineClassName="text-body-lg text-op-charcoal"
              className="space-y-1"
            />
            <RuleDraw className="my-7" />
            <Reveal delay={0.1}>
              <p className="max-w-md text-pretty text-body-md text-op-charcoal/80">
                {V2_PROBLEM.body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-mono-sm uppercase tracking-tracker text-op-crimson">
                {V2_PROBLEM.prompt}
              </p>
            </Reveal>
          </div>

          {/* ---- the self-diagnosis cards ---- */}
          <ul className="grid gap-2.5">
            {V2_PROBLEM.cards.map((card, i) => {
              const on = picked.includes(card);
              return (
                <motion.li
                  key={card}
                  initial={reduced ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(card)}
                    aria-pressed={on}
                    className={`group flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors duration-op-micro ease-op-micro ${
                      on
                        ? "border-op-crimson bg-op-crimson text-op-white"
                        : "border-op-rule-strong text-op-charcoal hover:border-op-crimson"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center border text-[0.7rem] ${
                        on ? "border-op-white text-op-white" : "border-op-rule-strong text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span className="text-body-md">&ldquo;{card}&rdquo;</span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
