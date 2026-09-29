"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import WordReveal from "@/components/motion/WordReveal";
import { SectionRule } from "@/components/ui/Marker";
import {
  GlyphIntelligence,
  GlyphManagementView,
  GlyphOperatingPartner,
  GlyphPeople,
  GlyphSales,
  GlyphScale,
  GlyphSystems,
  type GlyphProps,
} from "@/components/svg/Glyphs";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { PROATOPS } from "@/config/proatops";

const { outcomes } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/* Keyed to `outcomes.rows[].glyph`. Existing glyphs, reused for their concept. */
const OUTCOME_GLYPHS: Record<string, (p: GlyphProps) => ReactElement> = {
  owner: GlyphOperatingPartner,
  people: GlyphPeople,
  systems: GlyphSystems,
  sales: GlyphSales,
  view: GlyphManagementView,
  automation: GlyphIntelligence,
  scale: GlyphScale,
};

/**
 * Problem → outcome, one row per problem an owner recognises.
 *
 * Built on the clarity deck's rule — explain the outcome first, the tools come
 * second — so every row turns: the problem sits dim on the left, a connector
 * draws across, and the outcome lands on the right in crimson. The problem is
 * deliberately quieter than the outcome; the outcome is what is being sold.
 *
 * Charcoal, because this is the one dark interruption between the parchment
 * sections either side of it on the homepage.
 */
export default function Outcomes() {
  const reduced = useReducedMotionSafe();

  return (
    <section
      id="outcomes"
      className="grain grain-dark blueprint-dark relative scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="03" label={outcomes.eyebrow} tone="dark" />

        <WordReveal
          as="h2"
          trigger="view"
          text={outcomes.headline}
          className="headline mt-8 max-w-4xl text-display-lg tracking-display text-op-white"
        />

        {/* Column labels — desktop only; on mobile each row labels itself by
            order (problem, then outcome). */}
        <div className="mt-14 hidden grid-cols-[1fr_5rem_1fr] border-b border-op-white/20 pb-4 font-mono text-mono-xs uppercase tracking-micro text-op-white/50 lg:grid">
          <span>{outcomes.problemLabel}</span>
          <span aria-hidden="true" />
          <span className="text-op-crimson">{outcomes.outcomeLabel}</span>
        </div>

        <ol className="mt-8 border-t border-op-white/20 lg:mt-0 lg:border-t-0">
          {outcomes.rows.map((row, i) => {
            const Glyph = OUTCOME_GLYPHS[row.glyph];
            return (
              <li
                key={row.outcome}
                className="group grid grid-cols-1 items-center gap-3 border-b border-op-white/20 py-6 lg:grid-cols-[1fr_5rem_1fr] lg:gap-0 lg:py-7"
              >
                {/* Problem */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  className="flex items-center gap-4"
                >
                  {Glyph && (
                    <span className="grid h-11 w-11 shrink-0 place-items-center border border-op-white/20 text-op-white/60 transition-colors duration-op-slow ease-op-micro group-hover:border-op-crimson group-hover:text-op-crimson">
                      <Glyph className="h-5 w-5" />
                    </span>
                  )}
                  <p className="text-body-lg text-op-white/70 transition-colors duration-op-slow ease-op-micro group-hover:text-op-white">
                    {row.problem}
                  </p>
                </motion.div>

                {/* Connector — draws once the problem has landed, then the
                    same marker that runs the Five Stages spine and the
                    homepage's shift strip travels it once. One recognizable
                    move, used everywhere this page turns a claim into a
                    result, rather than a different technique per section. */}
                <div aria-hidden="true" className="relative flex items-center pl-[3.75rem] lg:px-3 lg:pl-3">
                  <motion.span
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 + 0.25, ease: EASE }}
                    className="hidden h-px flex-1 origin-left bg-op-crimson lg:block"
                  />
                  {!reduced && (
                    <motion.span
                      initial={{ left: "0%", opacity: 0 }}
                      whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 + 0.3, ease: "linear" }}
                      className="absolute top-1/2 z-10 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-op-crimson lg:block"
                    />
                  )}
                  <span className="font-mono text-mono-sm text-op-crimson">
                    <span className="lg:hidden">&darr;</span>
                    <span className="hidden lg:inline">&rarr;</span>
                  </span>
                </div>

                {/* Outcome — resolves into focus rather than sliding in: this
                    is the thing being sold, so it should land with more
                    weight than the problem it answers. */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.45, ease: EASE }}
                  className="origin-left pl-[3.75rem] lg:pl-6"
                >
                  <p className="headline text-[1.6rem] leading-none tracking-display text-op-crimson sm:text-[1.9rem]">
                    {row.outcome}
                  </p>
                  <p className="mt-2 font-mono text-mono-xs uppercase tracking-micro text-op-white/60">
                    {row.result}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
