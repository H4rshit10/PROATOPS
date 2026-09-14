"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { Coordinates, SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { protocol, meta } = PROATOPS;

/**
 * One stage on the deployment spine.
 *
 * A travelling marker runs down the spine and each stage is scrubbed by its
 * own scroll progress: the square node fills crimson as the marker arrives,
 * and the number flips to a completion mark once the marker has passed.
 */
function Stage({ stage }: { stage: (typeof protocol.steps)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start 0.78", "start 0.34"],
  });

  /* Node fill — parchment to crimson as the marker arrives. */
  const nodeBg = useTransform(p, [0.15, 0.5], ["#E8E6E0", "#E11D2E"]);
  const nodeBorder = useTransform(
    p,
    [0.15, 0.5],
    ["rgba(11,11,11,0.32)", "#E11D2E"]
  );

  /* Index digits give way to a completion mark once the stage is passed. */
  const numOpacity = useTransform(p, [0.5, 0.75], [1, 0]);
  const markOpacity = useTransform(p, [0.5, 0.75], [0, 1]);

  /* Stub rule out from the spine to the copy. */
  const stubScale = useTransform(p, [0.2, 0.6], [0, 1]);

  /* Copy settles toward the spine. */
  const contentX = useTransform(p, [0, 0.55], [26, 0]);
  const contentOpacity = useTransform(p, [0.02, 0.5], [0, 1]);

  const staticStyle = reduced ? {} : undefined;

  return (
    <li ref={ref} className="relative pl-14 sm:pl-20">
      {/* Node */}
      <motion.span
        style={
          reduced
            ? { backgroundColor: "#E8E6E0", borderColor: "rgba(11,11,11,0.32)" }
            : { backgroundColor: nodeBg, borderColor: nodeBorder }
        }
        className="absolute left-0 top-1 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-none border sm:h-10 sm:w-10"
      >
        <motion.span
          style={reduced ? { opacity: 1 } : { opacity: numOpacity }}
          className="col-start-1 row-start-1 font-mono text-mono-xs tabular text-op-charcoal"
        >
          {stage.step}
        </motion.span>
        <motion.svg
          style={reduced ? { opacity: 0 } : { opacity: markOpacity }}
          className="col-start-1 row-start-1"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 6.8l3 3L11 3"
            stroke="#FAFAFA"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </motion.svg>
      </motion.span>

      {/* Stub rule from spine to copy */}
      <motion.span
        aria-hidden="true"
        style={reduced ? { scaleX: 1 } : { scaleX: stubScale }}
        className="absolute left-5 top-[1.35rem] hidden h-px w-9 origin-left bg-op-crimson sm:block"
      />

      <motion.div
        style={
          reduced ? staticStyle : { x: contentX, opacity: contentOpacity }
        }
        className="pb-14 sm:pb-20"
      >
        <h3 className="headline text-[2rem] leading-none tracking-display text-op-charcoal sm:text-[2.75rem]">
          {stage.name}
        </h3>
        <p className="mt-3 max-w-md text-pretty text-body-sm text-op-charcoal/70 sm:text-body-md">
          {stage.desc}
        </p>
      </motion.div>
    </li>
  );
}

export default function Protocol() {
  const spineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 0.78", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const markerTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="protocol"
      className="grain relative scroll-mt-20 overflow-x-clip bg-op-parchment py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="04" label={protocol.eyebrow} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Sticky thesis column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="headline text-balance text-display-lg text-op-charcoal">
                {protocol.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex items-center gap-3 border-t border-op-rule pt-5">
                <span className="h-1.5 w-1.5 bg-op-crimson" aria-hidden="true" />
                <Coordinates>{meta.coordinates}</Coordinates>
              </div>
            </Reveal>
          </div>

          {/* The spine */}
          <div ref={spineRef} className="relative pt-2">
            {/* Track */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px bg-op-rule-strong"
            />
            {/* Filled trail */}
            <motion.span
              aria-hidden="true"
              style={reduced ? { scaleY: 1 } : { scaleY: progress }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-op-crimson"
            />
            {/* Travelling marker — a hard square, no glow */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                style={{ top: markerTop }}
                className="absolute left-0 z-20 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-op-crimson"
              />
            )}

            <ol className="relative">
              {protocol.steps.map((stage) => (
                <Stage key={stage.step} stage={stage} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
