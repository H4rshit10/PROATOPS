"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import Reveal from "@/components/motion/Reveal";
import { BracketTag, Crosshair, SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { model } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A step in the left column. As the column scrolls through the viewport a
 * crimson rule is drawn across the text — the advice being struck out, one
 * line at a time, while the right column stays intact.
 */
function StruckStep({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.45"],
  });

  const strike = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dim = useTransform(scrollYProgress, [0, 1], [0.75, 0.38]);

  return (
    <li
      ref={ref}
      className="flex items-baseline gap-4 border-t border-op-border py-5"
    >
      <span className="font-mono text-mono-xs tabular text-op-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative">
        <motion.span
          style={reduced ? undefined : { opacity: dim }}
          className="text-body-md text-op-white"
        >
          {text}
        </motion.span>
        {/* 2px, centred on the text. A 1px rule sat below the optical centre
            (top:50% places the bar's top edge) and rasterised away entirely on
            rows whose y-offset landed mid-pixel. */}
        <motion.span
          aria-hidden="true"
          style={reduced ? { width: "100%" } : { width: strike }}
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-op-crimson"
        />
      </span>
    </li>
  );
}

/** A step in the right column — reveals with a crimson index that fills in. */
function ExecutedStep({ text, index }: { text: string; index: number }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      className="flex items-baseline gap-4 border-t border-op-white/25 py-5"
    >
      <span className="font-mono text-mono-xs tabular text-op-crimson">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-body-md font-medium text-op-white">{text}</span>
    </motion.li>
  );
}

function ColumnHead({
  title,
  tagline,
  accent,
}: {
  title: string;
  tagline: string;
  accent: boolean;
}) {
  return (
    <header className="pb-2">
      <div className="flex items-center gap-3">
        {accent && <Crosshair />}
        <h3
          className={`headline text-display-sm tracking-display ${
            accent ? "text-op-white" : "text-op-white/50"
          }`}
        >
          {title}
        </h3>
      </div>
      <p
        className={`mt-2 font-mono text-mono-xs uppercase tracking-micro ${
          accent ? "text-op-crimson" : "text-op-white/50"
        }`}
      >
        {tagline}
      </p>
    </header>
  );
}

export default function Model() {
  return (
    <section
      id="model"
      className="grain grain-dark blueprint-dark relative scroll-mt-20 overflow-x-clip bg-op-charcoal py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="03" label={model.eyebrow} tone="dark" />

        <Reveal>
          <h2 className="headline mt-8 max-w-5xl text-display-lg text-op-white">
            {model.headline}
            <br />
            <span className="script inline-block pt-3 text-op-crimson">
              {model.headlineScript}
            </span>
          </h2>
        </Reveal>

        {/* Two columns, split by a single crimson rule. The left is struck
            out on scroll; the right is built up. */}
        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-14 xl:pr-20">
            <ColumnHead
              title={model.traditional.title}
              tagline={model.traditional.tagline}
              accent={false}
            />
            <ul className="mt-4">
              {model.traditional.steps.map((step, i) => (
                <StruckStep key={step} text={step} index={i} />
              ))}
            </ul>
          </div>

          <div className="relative lg:pl-14 xl:pl-20">
            {/* The divide — crimson hairline, vertical on desktop. */}
            <span
              aria-hidden="true"
              className="absolute -top-10 left-0 hidden h-[calc(100%+2.5rem)] w-px bg-op-crimson lg:block"
            />
            <ColumnHead
              title={model.proatops.title}
              tagline={model.proatops.tagline}
              accent
            />
            <ul className="mt-4">
              {model.proatops.steps.map((step, i) => (
                <ExecutedStep key={step} text={step} index={i} />
              ))}
            </ul>
          </div>
        </div>

        {/* The differentiator — set as a pull quote, the loudest line in the
            section after the headline. */}
        <Reveal delay={0.1}>
          <figure className="mt-16 border-t border-op-border pt-10 sm:mt-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
              <BracketTag tone="dark" accent className="shrink-0 pt-3">
                KEY DISTINCTION
              </BracketTag>
              <blockquote className="headline max-w-4xl text-balance text-display-md text-op-white">
                {model.differentiator}
              </blockquote>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
