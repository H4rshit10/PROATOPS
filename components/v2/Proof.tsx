"use client";

import Reveal from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/Revealers";
import { SectionRule } from "@/components/ui/Marker";
import { V2_PROOF } from "@/config/v2";

/**
 * §16 — proof.
 *
 * Only figures that can be substantiated, per the blueprint's own rule. The
 * numbers count up once on entry; the real value is always in the DOM for
 * assistive tech and for anyone whose frames never arrive, so the animation
 * changes what's painted, never what's read.
 */
export default function V2Proof() {
  return (
    <section
      id="proof"
      className="grain grain-dark blueprint-dark scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_PROOF.index} label={V2_PROOF.eyebrow} tone="dark" />

        <div className="mt-10 max-w-3xl">
          <h2 className="headline text-display-lg tracking-display text-op-white">
            {V2_PROOF.headline}
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-body-md text-op-white/75">
              {V2_PROOF.body}
            </p>
          </Reveal>
        </div>

        {/* the figures */}
        <div className="mt-14 grid gap-px border border-op-white/20 bg-op-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {V2_PROOF.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="h-full bg-op-charcoal p-7">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                  className="headline block text-display-md tracking-display text-op-crimson tabular"
                />
                <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-wide text-op-white/70">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* operating disciplines */}
        <Reveal delay={0.15}>
          <ul className="mt-12 flex flex-wrap gap-2.5">
            {V2_PROOF.disciplines.map((d) => (
              <li
                key={d}
                className="border border-op-white/20 px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wide text-op-white/80"
              >
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
