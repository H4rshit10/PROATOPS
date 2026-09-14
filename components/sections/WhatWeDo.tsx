"use client";

import Reveal from "@/components/motion/Reveal";
import { SectionRule } from "@/components/ui/Marker";
import ProximityGrid, {
  ProximityBorder,
} from "@/components/ui/ProximityGrid";
import CapabilityIcon, {
  type CapabilityIconName,
} from "@/components/ui/icons/CapabilityIcon";
import { PROATOPS } from "@/config/proatops";

const { whatWeDo } = PROATOPS;

/**
 * Six domains on a disciplined 3×2 grid.
 *
 * The previous asymmetric bento gave wide cells the same content as narrow
 * ones, so the wide cells were mostly empty and row heights jumped with copy
 * length. Asymmetry only earns its place when the larger cells carry more.
 * These carry the same anatomy, so they get the same width.
 *
 * Every cell has an identical skeleton, top to bottom:
 *   index · icon   →   title + script tagline   →   rule + description
 * The description block is pushed to the floor with `mt-auto`, so rules and
 * body copy align across a row no matter how many lines each description runs.
 *
 * Three hover layers, sequenced: the border lights on approach (ProximityGrid),
 * the cell inverts to charcoal on entry, and the outline index turns crimson.
 */
export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="grain relative scroll-mt-20 bg-op-parchment py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="02" label={whatWeDo.eyebrow} />

        <Reveal>
          <h2 className="headline mt-8 max-w-5xl text-display-lg text-op-charcoal lg:max-w-none">
            {whatWeDo.headline}{" "}
            <span className="script inline-block text-[1.18em] leading-[0.8] text-op-crimson">
              {whatWeDo.headlineScript}
            </span>
          </h2>
        </Reveal>

        <ProximityGrid className="mt-12 grid grid-cols-1 gap-px border border-op-rule-strong bg-op-rule-strong sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={(i % 3) * 0.07}
              y={20}
              blur={false}
              className="h-full bg-op-parchment"
            >
              <article
                data-prox-cell
                className="group relative flex h-full min-h-[21rem] flex-col overflow-hidden bg-op-parchment p-7 transition-colors duration-500 ease-op-editorial hover:bg-op-charcoal sm:p-8 lg:min-h-[23rem] lg:p-9"
              >
                <ProximityBorder />

                {/* Row 1 — outline index and icon. The index used to be a ghost
                    numeral in the corner, where it collided with the body copy.
                    Here it owns the header row, so it cannot overlap anything. */}
                <div className="relative z-[2] flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="font-display text-[3.4rem] leading-[0.8] tracking-display text-transparent transition-all duration-500 ease-op-editorial [--num-stroke:rgba(11,11,11,0.32)] group-hover:[--num-stroke:rgba(225,29,46,0.95)] sm:text-[3.75rem]"
                    style={{ WebkitTextStroke: "1px var(--num-stroke)" }}
                  >
                    {item.code}
                  </span>
                  <span className="grid h-10 w-10 place-items-center border border-op-rule-strong text-op-charcoal/70 transition-all duration-500 ease-op-editorial group-hover:border-op-crimson group-hover:text-op-white">
                    <CapabilityIcon
                      name={item.icon as CapabilityIconName}
                      className="transition-transform duration-500 ease-op-editorial group-hover:scale-110"
                    />
                  </span>
                </div>

                {/* Row 2 — title and script tagline */}
                <div className="relative z-[2] mt-8">
                  <h3 className="font-display text-[2rem] uppercase leading-[0.92] tracking-display text-op-charcoal transition-colors duration-500 ease-op-editorial group-hover:text-op-white sm:text-[2.25rem]">
                    {item.title}
                  </h3>
                  <p className="script mt-1.5 text-[1.85rem] leading-none text-op-crimson sm:text-[2rem]">
                    {item.tagline}
                  </p>
                </div>

                {/* Row 3 — pinned to the floor. The description reserves four
                    lines so the crimson rules line up across a row even where
                    one description wraps further than its neighbours. */}
                <div className="relative z-[2] mt-auto pt-8">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-op-crimson transition-all duration-500 ease-op-editorial group-hover:w-24"
                  />
                  <p className="mt-5 min-h-[calc(0.8125rem*1.7*4)] max-w-[36ch] text-pretty text-body-sm leading-[1.7] text-op-charcoal/70 transition-colors duration-500 ease-op-editorial group-hover:text-op-white/70">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ProximityGrid>
      </div>
    </section>
  );
}
