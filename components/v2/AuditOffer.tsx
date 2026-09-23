"use client";

import Reveal from "@/components/motion/Reveal";
import { DELIVERABLE_GLYPHS } from "@/components/svg/Glyphs";
import { ProcessFlow } from "@/components/svg/Diagrams";
import { SectionRule, type Tone } from "@/components/ui/Marker";
import { Btn } from "@/components/ui/Btn";
import { V2_AUDIT, V2_PROCESS } from "@/config/v2";

/**
 * §11 — the business audit, and §12 — the process behind it.
 *
 * This is the conversion mechanism, so the ask is deliberately small: the
 * first step is an audit, not an engagement. The process flow is shown for
 * the same reason — an owner who can see all six steps knows exactly how
 * far "yes" commits them.
 *
 * Tone-aware: on /how-we-work this sits directly above the charcoal final
 * CTA, and two dark sections in a row lose the boundary between them.
 */
export default function V2AuditOffer({ tone = "dark" }: { tone?: Tone } = {}) {
  const dark = tone === "dark";
  const surface = dark
    ? "grain grain-dark blueprint-dark bg-op-charcoal"
    : "grain blueprint bg-op-parchment";
  const ink = dark ? "text-op-white" : "text-op-charcoal";
  const inkBody = dark ? "text-op-white/75" : "text-op-charcoal/75";
  const inkSoft = dark ? "text-op-white/85" : "text-op-charcoal/85";
  const inkFaint = dark ? "text-op-white/70" : "text-op-charcoal/70";
  const rule = dark ? "border-op-white/20" : "border-op-rule-strong";
  const gridRule = dark ? "bg-op-white/20" : "bg-op-rule-strong";
  const cell = dark ? "bg-op-charcoal" : "bg-op-parchment";
  const tick = dark ? "text-op-white/45" : "text-op-muted";

  return (
    <section id="audit" className={`${surface} scroll-mt-20 py-section-gap`}>
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_AUDIT.index} label={V2_AUDIT.eyebrow} tone={tone} />

        <div className="mt-10 max-w-4xl">
          <h2 className={`headline text-display-lg tracking-display ${ink}`}>{V2_AUDIT.headline}</h2>
          <Reveal delay={0.1}>
            <p className={`mt-6 max-w-2xl text-pretty text-body-lg ${inkBody}`}>
              {V2_AUDIT.subhead}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* what we review */}
          <div>
            <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
              {V2_AUDIT.reviewLabel}
            </p>
            <ul className={`mt-5 border-t ${rule}`}>
              {V2_AUDIT.review.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <li className={`flex items-baseline gap-4 border-b ${rule} py-3.5`}>
                    <span className={`font-mono text-mono-xs tabular ${tick}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-body-md ${inkSoft}`}>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* what you get */}
          <div>
            <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
              {V2_AUDIT.getLabel}
            </p>
            <div className={`mt-5 grid gap-px border ${rule} ${gridRule} sm:grid-cols-2`}>
              {V2_AUDIT.deliverables.map((d, i) => {
                const Glyph = DELIVERABLE_GLYPHS[d.key];
                return (
                  <Reveal key={d.key} delay={i * 0.07}>
                    <div className={`beam-card h-full ${cell} p-6`}>
                      {Glyph && <Glyph className="h-8 w-8 text-op-crimson" />}
                      <h3 className={`mt-5 text-body-lg font-medium ${ink}`}>{d.title}</h3>
                      <p className={`mt-2 text-body-md ${inkFaint}`}>{d.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <Btn href="/audit" tone={tone} variant="primary" className="mt-8">
                {V2_AUDIT.cta}
              </Btn>
            </Reveal>
          </div>
        </div>

        {/* ---- §12 the process ---- */}
        <div className={`mt-24 border-t ${rule} pt-14`}>
          <div className="max-w-3xl">
            <h3 className={`headline text-display-md tracking-display ${ink}`}>
              {V2_PROCESS.headlineA}
            </h3>
            <h3 className="headline mt-1 text-display-md tracking-display text-op-crimson">
              {V2_PROCESS.headlineB}
            </h3>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <Reveal>
              <ProcessFlow
                steps={V2_PROCESS.steps}
                className={`hidden h-auto w-full max-w-[300px] lg:block ${inkFaint}`}
              />
            </Reveal>

            <ol className={`grid gap-px border ${rule} ${gridRule} sm:grid-cols-2 lg:grid-cols-3`}>
              {V2_PROCESS.steps.map((s, i) => (
                <Reveal key={s.index} delay={i * 0.06}>
                  <li className={`beam-card h-full ${cell} p-6`}>
                    <span className="font-mono text-mono-sm tabular text-op-crimson">{s.index}</span>
                    <h4 className={`headline mt-3 text-display-sm tracking-display ${ink}`}>
                      {s.title}
                    </h4>
                    <p className={`mt-2 text-body-md ${inkFaint}`}>{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
