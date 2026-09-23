"use client";

import Reveal from "@/components/motion/Reveal";
import { INDUSTRY_GLYPHS } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { V2_INDUSTRIES, V2_INDUSTRIES_META } from "@/config/v2";

/**
 * §8 — industries.
 *
 * The section that stops the site reading as "gym consultants". Every card
 * leads with the operating problem rather than the sector, because the
 * blueprint's whole argument is that the business model changes and the
 * operating discipline doesn't.
 */
export default function V2Industries({ linked = true }: { linked?: boolean }) {
  return (
    <section id="industries" className="grain blueprint scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_INDUSTRIES_META.index} label={V2_INDUSTRIES_META.eyebrow} tone="light" />

        <h2 className="headline mt-10 max-w-4xl text-display-lg tracking-display text-op-charcoal">
          {V2_INDUSTRIES_META.headline}
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-body-md text-op-charcoal/80">
            {V2_INDUSTRIES_META.subhead}
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-body-lg font-medium text-op-charcoal">
            {V2_INDUSTRIES_META.question}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px border border-op-rule-strong bg-op-rule-strong md:grid-cols-2 lg:grid-cols-3">
          {V2_INDUSTRIES.map((ind, i) => {
            const Glyph = INDUSTRY_GLYPHS[ind.key];
            const Card = linked ? "a" : "div";
            return (
              <Reveal key={ind.key} delay={i * 0.06}>
                <Card
                  {...(linked ? { href: ind.slug } : {})}
                  className="group flex h-full flex-col bg-op-parchment p-7 transition-colors duration-op-slow ease-op-micro hover:bg-op-charcoal"
                >
                  {Glyph && <Glyph className="h-9 w-9 text-op-crimson" />}
                  <h3 className="headline mt-6 text-display-sm tracking-display text-op-charcoal transition-colors duration-op-slow ease-op-micro group-hover:text-op-white">
                    {ind.title}
                  </h3>
                  <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-wide text-op-muted transition-colors duration-op-slow ease-op-micro group-hover:text-op-white/55">
                    {ind.segments}
                  </p>
                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-wide text-op-crimson">
                    {ind.focusLabel}
                  </p>
                  <p className="mt-2 flex-1 text-body-sm text-op-charcoal/75 transition-colors duration-op-slow ease-op-micro group-hover:text-op-white/70">
                    {ind.focus}
                  </p>
                  {linked && (
                    <span
                      aria-hidden="true"
                      className="mt-6 font-mono text-mono-sm text-op-charcoal transition-all duration-op-slow ease-op-micro group-hover:translate-x-1 group-hover:text-op-crimson"
                    >
                      &rarr;
                    </span>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* deliberately broad catch-all */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-5 border border-op-rule-strong p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="headline text-display-sm tracking-display text-op-charcoal">
                {V2_INDUSTRIES_META.fallbackTitle}
              </h3>
              <p className="mt-2 max-w-xl text-body-sm text-op-charcoal/80">
                {V2_INDUSTRIES_META.fallbackBody}
              </p>
            </div>
            <a
              href="/audit"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-sm bg-op-charcoal px-7 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson"
            >
              {V2_INDUSTRIES_META.fallbackCta}
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
    </section>
  );
}
