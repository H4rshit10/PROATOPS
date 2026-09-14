"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { BracketTag, Crosshair, SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { sectors } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Deployment sectors as an indexed register. Each row is a full-width rule
 * with a crimson index, the sector name in condensed caps, and a crosshair
 * that only appears on hover — the register reads as a manifest, not a
 * feature list.
 */
export default function Sectors() {
  const reduced = useReducedMotion();

  return (
    <section
      id="sectors"
      className="grain grain-dark relative scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="05" label={sectors.eyebrow} tone="dark" />

        <Reveal>
          <h2 className="headline mt-8 max-w-5xl text-balance text-display-lg text-op-white">
            {sectors.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <ul className="border-t border-op-border">
            {sectors.current.map((sector, i) => (
              <motion.li
                key={sector}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                className="group flex items-center gap-5 border-b border-op-border py-6 transition-colors duration-op-slow ease-op-micro hover:bg-op-surface sm:gap-8 sm:py-7"
              >
                <span className="font-mono text-mono-xs tabular tracking-micro text-op-crimson">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="headline flex-1 text-[1.65rem] leading-none tracking-display text-op-white transition-transform duration-op-slow ease-op-micro group-hover:translate-x-1.5 sm:text-[2.25rem]">
                  {sector}
                </h3>
                <span className="opacity-0 transition-opacity duration-op-slow ease-op-micro group-hover:opacity-100">
                  <Crosshair />
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Forward-looking note, set apart as a margin annotation. */}
          <Reveal delay={0.12}>
            <aside className="border-l border-op-crimson pl-6 lg:sticky lg:top-28">
              <BracketTag tone="dark" accent>
                ROADMAP
              </BracketTag>
              <p className="mt-5 text-pretty text-body-md text-op-white/70">
                {sectors.note}
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
