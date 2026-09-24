"use client";

import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { BracketTag, SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { dispatches } = PROATOPS;

/**
 * Verified field dispatches — external proof records.
 *
 * Dark surface cards sitting on the parchment canvas, so the proof reads as
 * archival plate rather than page. Each card is a single anchor: the whole
 * block is the hit target, and the crimson border plus the north-east reticle
 * on hover signal that following it leaves the site.
 *
 * Text only — the cards carry the record and the link out to it, not a
 * photograph of it.
 */
export default function Dispatches() {
  return (
    <section
      id="dispatches"
      className="grain blueprint relative scroll-mt-20 bg-op-parchment py-section-gap"
    >
      {/* Section index as a watermark. Sits behind the type at 4% ink, which is
          enough to register as structure and not enough to compete with it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[3vw] top-6 select-none font-display text-[26vw] leading-[0.72] tracking-display text-op-charcoal/[0.045] sm:top-2 lg:text-[20rem]"
      >
        01
      </span>

      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="01" label={dispatches.eyebrow} />

        <Reveal>
          <h2 className="headline mt-8 max-w-4xl text-balance text-display-lg text-op-charcoal">
            {/* The closing full stop carries the accent — a period is the one
                piece of punctuation big enough to hold colour at this size. */}
            {dispatches.headline.replace(/\.$/, "")}
            <span className="text-op-crimson">.</span>
          </h2>
        </Reveal>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-pretty text-body-md text-op-charcoal/70">
              {dispatches.intro}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <a
              href={dispatches.viewAllHref}
              target="_blank"
              rel="noopener noreferrer"
              /* min-h on touch widths: as a bare inline link this was 14px
                 tall, under the 24px WCAG target minimum. */
              className="group inline-flex min-h-[44px] items-center gap-3 whitespace-nowrap border-b border-op-rule-strong pb-1.5 font-mono text-mono-xs uppercase tracking-micro text-op-charcoal/70 transition-colors duration-op-slow ease-op-micro hover:border-op-crimson hover:text-op-crimson sm:min-h-[24px]"
            >
              {dispatches.viewAll}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-op-editorial group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2">
          {dispatches.items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 0.08}
              y={20}
              blur={false}
              className="h-full"
            >
              <SpotlightCard className="h-full">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-[2] flex h-full flex-col rounded-none border border-op-border bg-op-surface p-7 transition-colors duration-op-slow ease-op-micro hover:border-op-crimson sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <BracketTag tone="dark" accent>
                    {item.tag}
                  </BracketTag>
                  <span
                    aria-hidden="true"
                    className="font-mono text-mono-sm text-op-white/50 transition-colors duration-op-slow ease-op-micro group-hover:text-op-crimson"
                  >
                    &#8599;
                  </span>
                </div>

                <h3 className="headline mt-7 text-[1.75rem] leading-none tracking-display text-op-white sm:text-[2rem]">
                  {item.title}
                </h3>

                <p className="mt-3 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                  {item.subtitle}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-5 h-px w-10 bg-op-crimson transition-all duration-op-slow ease-op-micro group-hover:w-20"
                />

                <p className="mt-5 text-pretty text-body-sm text-op-white/70">
                  {item.desc}
                </p>

                {/* Pushed to the card floor so both cards align regardless of
                    description length. */}
                <span className="mt-auto pt-8 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-slow ease-op-micro group-hover:text-op-crimson">
                  {item.cta}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-op-slow ease-op-micro group-hover:translate-x-0.5"
                  >
                    &#8599;
                  </span>
                </span>
              </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
