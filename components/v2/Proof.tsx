"use client";

import Reveal from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/Revealers";
import { SectionRule, type Tone } from "@/components/ui/Marker";
import { V2_PROOF } from "@/config/v2";

/**
 * §16 — proof.
 *
 * Only figures that can be substantiated, per the blueprint's own rule. The
 * numbers count up once on entry; the real value is always in the DOM for
 * assistive tech and for anyone whose frames never arrive, so the animation
 * changes what's painted, never what's read.
 *
 * Tone-aware because this section follows the charcoal page header on both
 * /about and /why-proatops — left dark it welds into it and the two read as
 * one unbroken black wall.
 */
export default function V2Proof({ tone = "dark" }: { tone?: Tone } = {}) {
  const dark = tone === "dark";
  const surface = dark
    ? "grain grain-dark blueprint-dark bg-op-charcoal"
    : "grain blueprint bg-op-parchment";
  const ink = dark ? "text-op-white" : "text-op-charcoal";
  const inkBody = dark ? "text-op-white/75" : "text-op-charcoal/75";
  const rule = dark ? "border-op-white/20" : "border-op-rule-strong";
  const gridRule = dark ? "bg-op-white/20" : "bg-op-rule-strong";
  const cell = dark ? "bg-op-charcoal" : "bg-op-parchment";
  const chipInk = dark ? "text-op-white/80" : "text-op-charcoal/80";
  const labelInk = dark ? "text-op-white/70" : "text-op-muted";

  return (
    <section id="proof" className={`${surface} scroll-mt-20 py-section-gap`}>
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_PROOF.index} label={V2_PROOF.eyebrow} tone={tone} />

        <div className="mt-10 max-w-3xl">
          <h2 className={`headline text-display-lg tracking-display ${ink}`}>
            {V2_PROOF.headline}
          </h2>
          <Reveal delay={0.1}>
            <p className={`mt-6 max-w-2xl text-pretty text-body-lg ${inkBody}`}>{V2_PROOF.body}</p>
          </Reveal>
        </div>

        {/* the figures */}
        <div className={`mt-14 grid gap-px border ${rule} ${gridRule} sm:grid-cols-2 lg:grid-cols-4`}>
          {V2_PROOF.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className={`beam-card h-full ${cell} p-7`}>
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                  className="headline block text-display-lg tracking-display text-op-crimson tabular"
                />
                <p
                  className={`mt-3 font-mono text-[0.8rem] uppercase tracking-wide ${labelInk}`}
                >
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
                className={`border ${rule} px-5 py-2.5 font-mono text-[0.8rem] uppercase tracking-wide ${chipInk}`}
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
