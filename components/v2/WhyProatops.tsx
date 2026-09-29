"use client";

import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { RuleDraw } from "@/components/motion/Revealers";
import { ENGAGEMENT_GLYPHS, GlyphCheck } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { V2_WHY, V2_ENGAGEMENTS, V2_FIT } from "@/config/v2";

/**
 * §18 — why Proatops, §19 — adapting rather than one playbook,
 * §22 — engagement models, §23 — the fit checklist.
 *
 * The blueprint's competitor comparison table is deliberately not here. The
 * position is stated directly instead; naming what everyone else does is a
 * weaker move than saying plainly what this is.
 */
export default function V2WhyProatops() {
  return (
    <section id="why" className="grain scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_WHY.index} label={V2_WHY.eyebrow} tone="light" />

        <h2 className="headline mt-10 max-w-4xl text-display-lg tracking-display text-op-charcoal">
          {V2_WHY.headline}
        </h2>

        <Reveal delay={0.1}>
          <p className="headline mt-8 text-display-md tracking-display text-op-crimson">
            {V2_WHY.statement}
          </p>
        </Reveal>

        {/* §19 — adapt the model to the business */}
        <div className="mt-20">
          <RuleDraw />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="headline text-display-md tracking-display text-op-charcoal">
                {V2_WHY.adaptHeadlineA}
              </h3>
              <h3 className="headline mt-1 text-display-md tracking-display text-op-charcoal/45">
                {V2_WHY.adaptHeadlineB}
              </h3>
            </div>
            <Reveal delay={0.1} className="lg:self-center">
              <div className="space-y-4">
                {V2_WHY.adaptBody.map((p) => (
                  <p key={p} className="text-pretty text-body-md text-op-charcoal/80">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* §22 — engagement levels: a ladder, not a set of unordered tiles.
            Same business, five depths of involvement — 01 stands alone
            (an audit commits to nothing beyond itself), 02-05 read as
            increasing depth, which is why the row carries its own index
            rather than just a glyph. */}
        <div className="mt-24">
          <RuleDraw />
          <div className="mt-12 max-w-3xl">
            <h3 className="mt-0">
              <WordReveal
                as="span"
                trigger="view"
                text={V2_ENGAGEMENTS.headline}
                className="headline block text-display-md tracking-display text-op-charcoal"
              />
            </h3>
            <Reveal delay={0.15}>
              <p className="mt-4 text-pretty text-body-md text-op-charcoal/75">
                {V2_ENGAGEMENTS.subhead}
              </p>
            </Reveal>
          </div>

          <ol className="mt-12 border-t border-op-rule-strong">
            {V2_ENGAGEMENTS.levels.map((lvl, i) => {
              const Glyph = ENGAGEMENT_GLYPHS[lvl.key];
              return (
                <Reveal key={lvl.key} delay={i * 0.06}>
                  <li className="beam-card grid grid-cols-[auto_1fr] items-start gap-5 border-b border-op-rule-strong py-8 sm:grid-cols-[auto_auto_1fr] sm:gap-8">
                    <span className="font-mono text-mono-sm tabular text-op-crimson">{lvl.index}</span>
                    {Glyph && (
                      <Glyph className="hidden h-9 w-9 text-op-charcoal/70 sm:block" />
                    )}
                    <div className="col-span-2 sm:col-span-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h4 className="headline text-display-sm tracking-display text-op-charcoal">
                          {lvl.title}
                        </h4>
                        <span className="font-mono text-[0.7rem] uppercase tracking-wide text-op-crimson">
                          {lvl.outcome}
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-body-md text-op-charcoal/80">{lvl.body}</p>
                      <ul className="mt-4 flex flex-wrap gap-2.5">
                        {lvl.deliverables.map((d) => (
                          <li
                            key={d}
                            className="border border-op-rule-strong px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wide text-op-charcoal/70"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-pretty text-body-md text-op-charcoal/70">
              Most engagements start at 01. Where they end depends on what the
              audit finds — not the other way around.
            </p>
          </Reveal>
        </div>

        {/* §23 — is this you? */}
        <div className="mt-24">
          <RuleDraw />
          <h3 className="headline mt-12 text-display-md tracking-display text-op-charcoal">
            {V2_FIT.headline}
          </h3>

          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {V2_FIT.checks.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <li className="flex items-start gap-4">
                  <GlyphCheck className="mt-0.5 h-5 w-5 shrink-0 text-op-crimson" />
                  <span className="text-body-md text-op-charcoal/85">{c}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-pretty text-body-lg font-medium text-op-charcoal">
                {V2_FIT.close}
              </p>
              <a
                href="/audit"
                className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-sm bg-op-charcoal px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson"
              >
                {V2_FIT.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
