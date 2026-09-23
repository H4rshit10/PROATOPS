"use client";

import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { Crosshair } from "@/components/ui/Marker";
import { V2_FINAL } from "@/config/v2";

/**
 * §17 close — the final CTA, carrying §33's single psychological core.
 *
 * The blueprint reduces the whole site to one idea: you don't have to sell
 * the business, replace the team or give up control to stop carrying the
 * operation yourself. That sentence earns the last word before the ask.
 */
export default function V2FinalCta() {
  return (
    <section
      id="contact"
      className="grain grain-dark relative overflow-hidden scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <div className="flex items-center gap-3">
          <Crosshair />
          <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
            {V2_FINAL.eyebrow}
          </span>
        </div>

        <h2 className="mt-8 max-w-5xl">
          <WordReveal
            as="span"
            text={V2_FINAL.headline}
            className="headline block text-display-lg tracking-display text-op-white"
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-pretty text-body-lg text-op-white/75">
            {V2_FINAL.coreStatement}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 border-t border-op-white/20 pt-12">
            <p className="headline text-display-md tracking-display text-op-white">
              {V2_FINAL.coreA}
            </p>
            <p className="headline text-display-md tracking-display text-op-crimson">
              {V2_FINAL.coreB}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href="/audit"
            className="group mt-12 inline-flex h-16 items-center justify-center gap-4 rounded-sm bg-op-white px-10 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-op-micro ease-op-micro hover:bg-op-crimson hover:text-op-white"
          >
            {V2_FINAL.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-op-micro ease-op-micro group-hover:translate-x-1.5"
            >
              &rarr;
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
