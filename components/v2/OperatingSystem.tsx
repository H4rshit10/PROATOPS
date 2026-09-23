"use client";

import Reveal from "@/components/motion/Reveal";
import { OperatingSystemDiagram } from "@/components/svg/Diagrams";
import { GlyphData, GlyphIntelligence, GlyphLayer, GlyphScale } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { V2_OS } from "@/config/v2";

const STACK_GLYPHS = [GlyphData, GlyphIntelligence, GlyphLayer, GlyphScale];

/**
 * §21 — the Proatops Operating System.
 *
 * Labelled as the direction, not the product. The blueprint is explicit
 * that this shouldn't be presented as software that exists today, so the
 * eyebrow reads "THE FUTURE OF PROATOPS" and the note says so in plain
 * words — a glimpse of the destination without the claim.
 */
export default function V2OperatingSystem() {
  return (
    <section
      id="operating-system"
      className="grain grain-dark blueprint-dark scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_OS.index} label={V2_OS.eyebrow} tone="dark" />

        <div className="mt-10 max-w-4xl">
          <h2 className="headline text-display-lg tracking-display text-op-white">
            {V2_OS.headline}
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-body-md text-op-white/75">
              {V2_OS.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl font-mono text-[0.75rem] uppercase tracking-wide text-op-crimson">
              {V2_OS.note}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal delay={0.1}>
            <OperatingSystemDiagram
              pillars={V2_OS.pillars}
              stack={V2_OS.stack}
              className="h-auto w-full text-op-white/70"
            />
          </Reveal>

          <div className="lg:self-center">
            <ul className="grid gap-px border border-op-white/20 bg-op-white/20">
              {V2_OS.stack.map((s, i) => {
                const Glyph = STACK_GLYPHS[i];
                const isLast = i === V2_OS.stack.length - 1;
                return (
                  <Reveal key={s} delay={i * 0.08}>
                    <li className="flex items-center gap-5 bg-op-charcoal p-6">
                      {Glyph && (
                        <Glyph
                          className={`h-8 w-8 shrink-0 ${isLast ? "text-op-crimson" : "text-op-white/70"}`}
                        />
                      )}
                      <span
                        className={`font-mono text-mono-sm uppercase tracking-tracker ${
                          isLast ? "text-op-crimson" : "text-op-white"
                        }`}
                      >
                        {s}
                      </span>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
