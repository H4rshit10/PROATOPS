"use client";

import Reveal from "@/components/motion/Reveal";
import ScrollFillText from "@/components/motion/ScrollFillText";
import { Crosshair, SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { philosophy } = PROATOPS;

/**
 * The philosophy statement, set as an editorial spread: the claim in condensed
 * caps, then the argument reading in word by word as the block scrolls — the
 * "reading light" effect, in parchment on charcoal.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="grain grain-dark blueprint-dark relative scroll-mt-20 overflow-hidden bg-op-charcoal py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="05" label={philosophy.eyebrow} tone="dark" />

        <div className="mt-10 sm:mt-14">
          <Reveal>
            <h2 className="headline max-w-[18ch] text-balance text-display-xl text-op-white">
              {philosophy.headline}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 border-t border-op-white/20 pt-10 sm:mt-20 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="flex items-start gap-3 lg:flex-col lg:gap-4">
            <Crosshair />
            <span className="font-mono text-mono-xs uppercase tracking-micro text-op-white/55 lg:[writing-mode:vertical-rl]">
              STATEMENT
            </span>
          </div>

          <ScrollFillText
            text={philosophy.body}
            className="max-w-4xl text-pretty text-[1.15rem] leading-[1.7] sm:text-[1.5rem] sm:leading-[1.6]"
            dimClass="text-op-white/25"
            brightClass="text-op-white"
          />
        </div>
      </div>
    </section>
  );
}
