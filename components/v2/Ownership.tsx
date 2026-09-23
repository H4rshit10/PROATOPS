"use client";

import Reveal from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/Revealers";
import { OwnershipDiagram } from "@/components/svg/Diagrams";
import { SectionRule } from "@/components/ui/Marker";
import { V2_OWNER, V2_OWNERSHIP } from "@/config/v2";

/**
 * §9 — owner psychology, then §10 — ownership vs operations.
 *
 * Run together on purpose: the first earns the emotional point (you didn't
 * build this to manage every problem), the second answers the objection it
 * creates (so do I hand over my business? No).
 */
export default function V2Ownership() {
  return (
    <>
      {/* ---- §9 the owner ---- */}
      <section
        id="owner"
        className="grain grain-dark scroll-mt-20 bg-op-charcoal py-section-gap"
      >
        <div className="shell-x mx-auto max-w-shell">
          <SectionRule index={V2_OWNER.index} label={V2_OWNER.eyebrow} tone="dark" />

          <h2 className="headline mt-10 max-w-4xl text-display-lg tracking-display text-op-white">
            {V2_OWNER.headline}
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="text-body-lg text-op-white/85">{V2_OWNER.opening}</p>
                <p className="mt-4 text-body-md text-op-white/70">{V2_OWNER.turn}</p>
              </Reveal>
              <LineReveal
                lines={V2_OWNER.complexity}
                className="mt-8 space-y-1.5 border-l border-op-crimson pl-6"
                lineClassName="font-mono text-mono-sm uppercase tracking-tracker text-op-white/75"
              />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-md text-pretty text-body-md text-op-white/70">
                  {V2_OWNER.close}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:self-end">
              <p className="headline text-display-md tracking-display text-op-crimson">
                {V2_OWNER.statement}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- §10 ownership vs operations ---- */}
      <section
        id="ownership"
        className="grain blueprint scroll-mt-20 bg-op-parchment py-section-gap"
      >
        <div className="shell-x mx-auto max-w-shell">
          <SectionRule index={V2_OWNERSHIP.index} label={V2_OWNERSHIP.eyebrow} tone="light" />

          <div className="mt-10 max-w-4xl">
            <h2 className="headline text-display-lg tracking-display text-op-charcoal">
              {V2_OWNERSHIP.headlineA}
            </h2>
            <h2 className="headline mt-1 text-display-lg tracking-display text-op-crimson">
              {V2_OWNERSHIP.headlineB}
            </h2>
          </div>

          {/* the split, drawn */}
          <Reveal delay={0.1}>
            <OwnershipDiagram
              you={V2_OWNERSHIP.you.items}
              us={V2_OWNERSHIP.us.items}
              className="mt-14 hidden h-auto w-full text-op-charcoal md:block"
            />
          </Reveal>

          {/* on a phone the diagram becomes two plain columns */}
          <div className="mt-12 grid gap-px border border-op-rule-strong bg-op-rule-strong md:hidden">
            {[V2_OWNERSHIP.you, V2_OWNERSHIP.us].map((col, ci) => (
              <div key={col.title} className="bg-op-parchment p-7">
                <h3
                  className={`font-mono text-mono-sm uppercase tracking-tracker ${
                    ci === 1 ? "text-op-crimson" : "text-op-charcoal"
                  }`}
                >
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-body-md text-op-charcoal/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-pretty text-body-lg font-medium text-op-charcoal">
              {V2_OWNERSHIP.statement}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
