"use client";

import Reveal from "@/components/motion/Reveal";
import { DELIVERABLE_GLYPHS } from "@/components/svg/Glyphs";
import { ProcessFlow } from "@/components/svg/Diagrams";
import { SectionRule } from "@/components/ui/Marker";
import { V2_AUDIT, V2_PROCESS } from "@/config/v2";

/**
 * §11 — the business audit, and §12 — the process behind it.
 *
 * This is the conversion mechanism, so the ask is deliberately small: the
 * first step is an audit, not an engagement. The process flow is shown for
 * the same reason — an owner who can see all six steps knows exactly how
 * far "yes" commits them.
 */
export default function V2AuditOffer() {
  return (
    <section
      id="audit"
      className="grain grain-dark blueprint-dark scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_AUDIT.index} label={V2_AUDIT.eyebrow} tone="dark" />

        <div className="mt-10 max-w-4xl">
          <h2 className="headline text-display-lg tracking-display text-op-white">
            {V2_AUDIT.headline}
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-body-md text-op-white/75">
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
            <ul className="mt-5 border-t border-op-white/20">
              {V2_AUDIT.review.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <li className="flex items-baseline gap-4 border-b border-op-white/20 py-3.5">
                    <span className="font-mono text-mono-xs tabular text-op-white/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-md text-op-white/85">{item}</span>
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
            <div className="mt-5 grid gap-px border border-op-white/20 bg-op-white/20 sm:grid-cols-2">
              {V2_AUDIT.deliverables.map((d, i) => {
                const Glyph = DELIVERABLE_GLYPHS[d.key];
                return (
                  <Reveal key={d.key} delay={i * 0.07}>
                    <div className="h-full bg-op-charcoal p-6">
                      {Glyph && <Glyph className="h-8 w-8 text-op-crimson" />}
                      <h3 className="mt-5 text-body-lg font-medium text-op-white">{d.title}</h3>
                      <p className="mt-2 text-body-sm text-op-white/70">{d.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <a
                href="/audit"
                className="group mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-op-white px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white"
              >
                {V2_AUDIT.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* ---- §12 the process ---- */}
        <div className="mt-24 border-t border-op-white/20 pt-14">
          <div className="max-w-3xl">
            <h3 className="headline text-display-md tracking-display text-op-white">
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
                className="hidden h-auto w-full max-w-[300px] text-op-white/70 lg:block"
              />
            </Reveal>

            <ol className="grid gap-px border border-op-white/20 bg-op-white/20 sm:grid-cols-2 lg:grid-cols-3">
              {V2_PROCESS.steps.map((s, i) => (
                <Reveal key={s.index} delay={i * 0.06}>
                  <li className="h-full bg-op-charcoal p-6">
                    <span className="font-mono text-mono-sm tabular text-op-crimson">{s.index}</span>
                    <h4 className="headline mt-3 text-display-sm tracking-display text-op-white">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-body-sm text-op-white/70">{s.body}</p>
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
