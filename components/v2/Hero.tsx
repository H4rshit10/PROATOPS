"use client";

import Enter from "@/components/motion/Enter";
import WordReveal from "@/components/motion/WordReveal";
import { OperatingLayerDiagram } from "@/components/svg/Diagrams";
import { Crosshair } from "@/components/ui/Marker";
import { V2_HERO } from "@/config/v2";

/**
 * §2 — the hero.
 *
 * The headline still runs through WordReveal, unchanged: same masked rise,
 * same stagger, same easing. The blueprint changed what surrounds it, not
 * that animation.
 *
 * The visual is the operating-layer schematic rather than a photograph —
 * the blueprint is explicit that the hero has to show Proatops sitting
 * between the owner and the business, which no stock image does.
 */
export default function V2Hero() {
  return (
    <section
      id="top"
      className="grain grain-dark relative overflow-hidden bg-op-charcoal pt-[72px]"
    >
      <div className="shell-x mx-auto max-w-shell py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---- copy ---- */}
          <div>
            <Enter delay={0.05}>
              <div className="flex items-center gap-3">
                <Crosshair />
                <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                  {V2_HERO.eyebrow}
                </span>
              </div>
            </Enter>

            <h1 className="mt-7">
              <WordReveal
                as="span"
                text={V2_HERO.headlineA}
                delay={0.18}
                className="headline block text-display-xl tracking-display text-op-white"
              />
              <WordReveal
                as="span"
                text={V2_HERO.headlineB}
                delay={0.42}
                className="headline block text-display-xl tracking-display text-op-crimson"
              />
            </h1>

            <Enter delay={0.72}>
              <p className="mt-7 max-w-xl text-pretty text-body-lg text-op-white/80">
                {V2_HERO.subhead}
              </p>
            </Enter>

            <Enter delay={0.84}>
              <p className="mt-4 max-w-xl text-pretty text-body-sm text-op-white/55">
                {V2_HERO.support}
              </p>
            </Enter>

            <Enter delay={0.96}>
              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="/audit"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-sm bg-op-white px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white"
                >
                  {V2_HERO.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="/how-we-work"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-sm border border-op-white/25 px-8 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-micro ease-op-micro hover:border-op-crimson hover:text-op-crimson"
                >
                  {V2_HERO.secondaryCta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </Enter>
          </div>

          {/* ---- the operating layer, drawn ---- */}
          <Enter delay={0.5} className="relative">
            <OperatingLayerDiagram className="h-auto w-full text-op-white/70" />
          </Enter>
        </div>
      </div>
    </section>
  );
}
