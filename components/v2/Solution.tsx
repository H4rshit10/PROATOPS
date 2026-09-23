"use client";

import Reveal from "@/components/motion/Reveal";
import { RuleDraw } from "@/components/motion/Revealers";
import { SOLUTION_GLYPHS } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { V2_SOLUTION, V2_DIFFERENTIATOR } from "@/config/v2";

/**
 * §5 — the solution, and §6 — the differentiator, run together.
 *
 * They're one movement: here is what we build, and here is the thing that
 * separates building it from recommending it. The blueprint's comparison
 * table is deliberately absent — the flow and the closing statement carry
 * the point without naming competitors.
 */
export default function V2Solution() {
  return (
    <section id="solution" className="grain scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_SOLUTION.index} label={V2_SOLUTION.eyebrow} tone="light" />

        <div className="mt-10 max-w-4xl">
          <h2 className="headline text-display-lg tracking-display text-op-charcoal">
            {V2_SOLUTION.headline}
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-body-md text-op-charcoal/80">
              {V2_SOLUTION.body}
            </p>
          </Reveal>
        </div>

        {/* four operating blocks */}
        <div className="mt-14 grid gap-px border border-op-rule-strong bg-op-rule-strong sm:grid-cols-2 lg:grid-cols-4">
          {V2_SOLUTION.blocks.map((b, i) => {
            const Glyph = SOLUTION_GLYPHS[b.key];
            return (
              <Reveal key={b.key} delay={i * 0.08}>
                <div className="group h-full bg-op-parchment p-7 transition-colors duration-op-slow ease-op-micro hover:bg-op-charcoal">
                  {Glyph && (
                    <Glyph className="h-9 w-9 text-op-crimson transition-colors duration-op-slow ease-op-micro" />
                  )}
                  <h3 className="headline mt-6 text-display-sm tracking-display text-op-charcoal transition-colors duration-op-slow ease-op-micro group-hover:text-op-white">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-op-charcoal/75 transition-colors duration-op-slow ease-op-micro group-hover:text-op-white/70">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ---- §6 differentiator ---- */}
        <div className="mt-24">
          <RuleDraw />
          <div className="mt-14 max-w-4xl">
            <h2 className="headline text-display-lg tracking-display text-op-charcoal">
              {V2_DIFFERENTIATOR.headlineA}
            </h2>
            <h2 className="headline mt-1 text-display-lg tracking-display text-op-crimson">
              {V2_DIFFERENTIATOR.headlineB}
            </h2>
          </div>

          {/* the full execution chain, which is the actual differentiator */}
          <Reveal delay={0.1}>
            <ol className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4">
              {V2_DIFFERENTIATOR.flow.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="border border-op-rule-strong px-4 py-2 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal">
                    {step}
                  </span>
                  {i < V2_DIFFERENTIATOR.flow.length - 1 && (
                    <span aria-hidden="true" className="font-mono text-op-crimson">
                      &rarr;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-pretty text-body-lg font-medium text-op-charcoal">
              {V2_DIFFERENTIATOR.statement}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
