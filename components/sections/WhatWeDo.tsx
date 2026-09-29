"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { SectionRule } from "@/components/ui/Marker";
import ProximityGrid, {
  ProximityBorder,
} from "@/components/ui/ProximityGrid";
import CapabilityIcon, {
  type CapabilityIconName,
} from "@/components/ui/icons/CapabilityIcon";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { PROATOPS } from "@/config/proatops";

const { whatWeDo } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What customers actually buy: control, performance, scalability.
 *
 * Three outcomes on one row, each cell with the same skeleton, top to bottom:
 *   index · icon   →   title + script tagline   →   rule + description
 * The description is pushed to the floor with `mt-auto`, so the rules and body
 * copy line up across the row however long each description runs.
 *
 * Hover is sequenced in three layers: the border lights on approach
 * (ProximityGrid), the cell inverts to charcoal on entry, the outline index
 * turns crimson.
 *
 * Below the cells, the value proposition as a four-step shift. Each step
 * lights in turn and the connector between two steps draws before the next
 * one lights, so the rail reads left to right as a progression rather than
 * arriving all at once.
 */
export default function WhatWeDo() {
  const reduced = useReducedMotionSafe();

  return (
    <section
      id="what-we-do"
      className="grain relative scroll-mt-20 bg-op-parchment py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="02" label={whatWeDo.eyebrow} />

        <h2 className="headline mt-8 max-w-5xl text-display-lg text-op-charcoal lg:max-w-none">
          <WordReveal as="span" trigger="view" text={whatWeDo.headline} />{" "}
          {/* A span, not <Reveal> — Reveal renders a div, which a heading
              cannot contain. The script word lands after the last word of the
              caps line has risen. */}
          <motion.span
            initial={reduced ? false : { opacity: 0, y: "0.25em" }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="script inline-block text-[1.18em] leading-[0.8] text-op-crimson"
          >
            {whatWeDo.headlineScript}
          </motion.span>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-pretty text-body-lg text-op-charcoal/75">
            {whatWeDo.lede}
          </p>
        </Reveal>

        <ProximityGrid className="mt-12 grid grid-cols-1 gap-px border border-op-rule-strong bg-op-rule-strong sm:mt-16 md:grid-cols-3">
          {whatWeDo.items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 0.08}
              y={20}
              blur={false}
              className="h-full bg-op-parchment"
            >
              <article
                data-prox-cell
                className="group relative flex h-full min-h-[21rem] flex-col overflow-hidden bg-op-parchment p-7 transition-colors duration-500 ease-op-editorial hover:bg-op-charcoal sm:p-8 lg:min-h-[23rem] lg:p-9"
              >
                <ProximityBorder />

                <div className="relative z-[2] flex items-start justify-between">
                  {/* A small spring overshoot on arrival — a stamp, not a fade
                      — so the index lands a beat ahead of the rest of the
                      card rather than everything appearing at once. */}
                  <motion.span
                    aria-hidden="true"
                    initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                    whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 260, damping: 16 }}
                    className="font-display text-[3.4rem] leading-[0.8] tracking-display text-transparent transition-[--num-stroke] duration-500 ease-op-editorial [--num-stroke:rgba(11,11,11,0.32)] group-hover:[--num-stroke:rgba(225,29,46,0.95)] sm:text-[3.75rem]"
                    style={{ WebkitTextStroke: "1px var(--num-stroke)" }}
                  >
                    {item.code}
                  </motion.span>
                  <motion.span
                    initial={reduced ? false : { opacity: 0, rotate: -10 }}
                    whileInView={reduced ? undefined : { opacity: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.1, ease: EASE }}
                    className="grid h-10 w-10 place-items-center border border-op-rule-strong text-op-charcoal/70 transition-all duration-500 ease-op-editorial group-hover:border-op-crimson group-hover:text-op-white"
                  >
                    <CapabilityIcon
                      name={item.icon as CapabilityIconName}
                      className="transition-transform duration-500 ease-op-editorial group-hover:scale-110"
                    />
                  </motion.span>
                </div>

                <div className="relative z-[2] mt-8">
                  <h3 className="font-display text-[2rem] uppercase leading-[0.92] tracking-display text-op-charcoal transition-colors duration-500 ease-op-editorial group-hover:text-op-white sm:text-[2.5rem]">
                    {item.title}
                  </h3>
                  <p className="script mt-1.5 text-[1.85rem] leading-none text-op-crimson sm:text-[2rem]">
                    {item.tagline}
                  </p>
                </div>

                <div className="relative z-[2] mt-auto pt-8">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-op-crimson transition-all duration-500 ease-op-editorial group-hover:w-24"
                  />
                  {/* Reserves three lines (3 × 1.65em) so the crimson rules
                      line up across the row even where one description is a
                      line shorter than its neighbours. */}
                  <p className="mt-5 min-h-[4.95em] max-w-[36ch] text-pretty text-body-md leading-[1.65] text-op-charcoal/75 transition-colors duration-500 ease-op-editorial group-hover:text-op-white/75">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ProximityGrid>

        {/* The shift — owner-dependent → system-driven → measurable → scalable */}
        <div className="mt-14 border border-op-charcoal bg-op-charcoal px-6 py-8 sm:mt-16 sm:px-10 sm:py-10">
          <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
            {whatWeDo.shiftLabel}
          </p>
          <ol className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
            {whatWeDo.shift.map((step, i) => {
              const last = i === whatWeDo.shift.length - 1;
              /* Step i lights at 0.35s intervals; its outgoing connector draws
                 in the gap before step i + 1 lights. */
              const at = i * 0.35;
              return (
                <Fragment key={step}>
                  <motion.li
                    initial={reduced ? false : { opacity: 0.28 }}
                    whileInView={reduced ? undefined : { opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: at, ease: EASE }}
                    className={`headline shrink-0 text-[1.5rem] leading-none tracking-display sm:text-[1.9rem] ${
                      last ? "text-op-crimson" : "text-op-white"
                    }`}
                  >
                    {step}
                  </motion.li>
                  {!last && (
                    <li aria-hidden="true" className="relative hidden items-center md:mx-4 md:flex md:flex-1">
                      <motion.span
                        initial={reduced ? false : { scaleX: 0 }}
                        whileInView={reduced ? undefined : { scaleX: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.3, delay: at + 0.15, ease: EASE }}
                        className="h-px flex-1 origin-left bg-op-white/35"
                      />
                      {/* The same hard-edged marker that travels the Five
                          Stages spine — one signature move, reused rather
                          than a second technique invented for this strip. */}
                      {!reduced && (
                        <motion.span
                          initial={{ left: "0%", opacity: 0 }}
                          whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.5, delay: at + 0.15, ease: "linear" }}
                          className="absolute top-1/2 z-10 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-op-crimson"
                        />
                      )}
                      <span className="ml-1 font-mono text-mono-sm text-op-crimson">&rarr;</span>
                    </li>
                  )}
                  {!last && (
                    <li aria-hidden="true" className="flex items-center md:hidden">
                      <span className="font-mono text-mono-sm text-op-crimson">&darr;</span>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
