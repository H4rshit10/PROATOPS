"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsDesktop, useReducedMotionSafe } from "@/lib/useMediaQuery";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { SectionRule } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { protocol } = PROATOPS;

/**
 * One stage on the spine.
 *
 * Each stage is scrubbed by its own scroll progress: the square node fills
 * crimson as the travelling marker arrives, and the number gives way to a
 * completion mark once the marker has passed.
 */
function Stage({ stage }: { stage: (typeof protocol.steps)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start 0.78", "start 0.34"],
  });

  const nodeBg = useTransform(p, [0.15, 0.5], ["#E8E6E0", "#E11D2E"]);
  const nodeBorder = useTransform(p, [0.15, 0.5], ["rgba(11,11,11,0.32)", "#E11D2E"]);
  const numOpacity = useTransform(p, [0.5, 0.75], [1, 0]);
  const markOpacity = useTransform(p, [0.5, 0.75], [0, 1]);
  const stubScale = useTransform(p, [0.2, 0.6], [0, 1]);
  const contentX = useTransform(p, [0, 0.55], [26, 0]);
  const contentOpacity = useTransform(p, [0.02, 0.5], [0, 1]);

  return (
    <li ref={ref} className="relative pl-14 sm:pl-20">
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
          <path d="M2 6.8l3 3L11 3" stroke="#FAFAFA" strokeWidth="1.6" strokeLinecap="square" />
        </motion.svg>
      </motion.span>

      <motion.span
        aria-hidden="true"
        style={reduced ? { scaleX: 1 } : { scaleX: stubScale }}
        className="absolute left-5 top-[1.35rem] hidden h-px w-9 origin-left bg-op-crimson sm:block"
      />

      <motion.div
        style={reduced ? undefined : { x: contentX, opacity: contentOpacity }}
        className="pb-14 sm:pb-16"
      >
        {/* The deck's verb for this stage — what Proatops is doing here. */}
        <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
          {stage.verb}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="headline text-[1.9rem] leading-none tracking-display text-op-charcoal sm:text-[2.5rem]">
            {stage.name}
          </h3>
          <span className="border border-op-crimson/50 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-op-crimson">
            {stage.outcome}
          </span>
        </div>
        <p className="mt-3 max-w-lg text-pretty text-body-md text-op-charcoal/75">
          {stage.desc}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stage.delivers.map((d) => (
            <li
              key={d}
              className="border border-op-rule-strong px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-op-charcoal/70"
            >
              {d}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

/**
 * One layer of the operating layer. Lights up as the spine's progress passes
 * its share of the scroll, so the stack switches on in order — people and
 * process first, data, technology and AI last — as the stages deepen.
 */
function Layer({
  name,
  index,
  total,
  progress,
  wide = false,
}: {
  name: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  wide?: boolean;
}) {
  const reduced = useReducedMotionSafe();
  const start = index / total;
  const end = Math.min(1, start + 0.6 / total);
  const on = useTransform(progress, [start, end], [0, 1]);
  const bg = useTransform(on, [0, 1], ["rgba(11,11,11,0)", "rgba(11,11,11,1)"]);
  const color = useTransform(on, [0, 1], ["rgba(11,11,11,0.45)", "#FAFAFA"]);
  const border = useTransform(on, [0, 1], ["rgba(11,11,11,0.18)", "rgba(11,11,11,1)"]);
  const dot = useTransform(on, [0, 1], [0.15, 1]);

  return (
    <motion.li
      style={
        reduced
          ? { backgroundColor: "#0B0B0B", color: "#FAFAFA", borderColor: "#0B0B0B" }
          : { backgroundColor: bg, color, borderColor: border }
      }
      className={`flex items-center justify-between border px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-wide ${
        wide ? "col-span-2" : ""
      }`}
    >
      {name}
      <motion.span
        aria-hidden="true"
        style={{ opacity: reduced ? 1 : dot }}
        className="h-1.5 w-1.5 bg-op-crimson"
      />
    </motion.li>
  );
}

export default function Protocol() {
  const spineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 0.78", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const markerTop = useTransform(progress, (v) => `${v * 100}%`);

  /* What lights the operating layer depends on the layout.
     Desktop: the panel is sticky beside the spine, so it follows the spine's
     scroll — the layers switch on as the stages pass.
     Mobile: the panel sits above the spine and is off-screen by the time the
     stages scroll, so tying it to the spine meant a phone visitor only ever
     saw it dark. There, it lights in sequence when the panel itself comes
     into view.
     One stable MotionValue drives both, so the Layer children never have to
     re-subscribe when the breakpoint resolves after mount. */
  const isDesktop = useIsDesktop();
  const panelRef = useRef<HTMLDivElement>(null);
  const panelSeen = useInView(panelRef, { once: true, margin: "-80px" });
  const layerProgress = useMotionValue(0);
  useEffect(() => {
    if (isDesktop) {
      layerProgress.set(progress.get());
      return progress.on("change", (v) => layerProgress.set(v));
    }
    if (panelSeen) {
      const run = animate(layerProgress, 1, { duration: 2.4, ease: "linear" });
      return () => run.stop();
    }
  }, [isDesktop, panelSeen, progress, layerProgress]);

  return (
    <section
      id="protocol"
      className="grain relative scroll-mt-20 overflow-x-clip bg-op-parchment py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <SectionRule index="04" label={protocol.eyebrow} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Sticky thesis column, with the operating layer underneath it */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <WordReveal
              as="h2"
              trigger="view"
              text={protocol.headline}
              className="headline text-balance text-display-lg text-op-charcoal"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-pretty text-body-md text-op-charcoal/75">
                {protocol.lede}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div ref={panelRef} className="mt-10 border-t border-op-rule-strong pt-5">
                <p className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                  {protocol.layerLabel}
                </p>
                <ol className="mt-4 grid grid-cols-2 gap-1.5 sm:max-w-md">
                  {protocol.layers.map((l, i) => (
                    <Layer
                      key={l}
                      name={l}
                      index={i}
                      total={protocol.layers.length}
                      progress={layerProgress}
                      wide={i === protocol.layers.length - 1}
                    />
                  ))}
                </ol>
                <p className="mt-5 max-w-md text-pretty text-body-sm text-op-charcoal/70">
                  {protocol.result}
                </p>
              </div>
            </Reveal>
          </div>

          {/* The spine */}
          <div ref={spineRef} className="relative pt-2">
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-op-rule-strong" />
            <motion.span
              aria-hidden="true"
              style={reduced ? { scaleY: 1 } : { scaleY: progress }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-op-crimson"
            />
            {/* Travelling marker, driven by scroll */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                style={{ top: markerTop }}
                className="absolute left-0 z-20 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-op-crimson"
              />
            )}
            {/* The automation between stages: a signal that keeps running down
                the spine on its own, independent of scroll — the operating
                layer carrying the business from one stage to the next. */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: ["0%", "100%"], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: 4.5, ease: "linear", repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
                className="absolute left-0 z-10 block h-10 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-op-crimson to-transparent"
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
