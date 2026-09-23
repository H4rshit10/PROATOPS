"use client";

import Reveal from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/Revealers";
import { CeilingDiagram } from "@/components/svg/Diagrams";
import { SectionRule } from "@/components/ui/Marker";
import { V2_CONSEQUENCE } from "@/config/v2";

/**
 * §4 — the consequence. The section that has to land the cost, so it's the
 * first hard cut to charcoal after the parchment problem section.
 */
export default function V2Consequence() {
  return (
    <section
      id="consequence"
      className="grain grain-dark blueprint-dark scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_CONSEQUENCE.index} label={V2_CONSEQUENCE.eyebrow} tone="dark" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="headline max-w-3xl text-display-lg tracking-display text-op-white">
              {V2_CONSEQUENCE.headline}
            </h2>

            <LineReveal
              lines={V2_CONSEQUENCE.lines}
              className="mt-10 space-y-2 border-l border-op-crimson pl-6"
              lineClassName="text-body-md text-op-white/75"
            />

            <Reveal delay={0.15}>
              <p className="mt-10 text-body-md text-op-white/70">{V2_CONSEQUENCE.turn}</p>
              <p className="mt-2 text-body-lg font-medium text-op-white">
                {V2_CONSEQUENCE.emphasis}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="headline mt-12 text-display-md tracking-display text-op-crimson">
                {V2_CONSEQUENCE.statement}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <CeilingDiagram className="h-auto w-full text-op-white/70" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
