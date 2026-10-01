"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import Enter from "@/components/motion/Enter";
import WordReveal from "@/components/motion/WordReveal";
import ArchitecturalForm from "@/components/sections/hero/ArchitecturalForm";
import CapabilityIcon, {
  type CapabilityIconName,
} from "@/components/ui/icons/CapabilityIcon";
import ScrambleButton from "@/components/ui/ScrambleButton";
import { PROATOPS } from "@/config/proatops";

const { hero } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The signature script word. It wipes in left-to-right behind a clip path so
 * it reads as being written rather than faded up — the one piece of human
 * gesture in an otherwise mechanical page.
 *
 * Untouched by the cinematic redesign: same clip path, delay pulled in to 0.3s so it never trails the page, same
 * easing. Only the colour token moved from crimson to the hero red.
 */
function ScriptWord({ children }: { children: string }) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return <span className="script inline-block text-pa-red">{children}</span>;
  }

  return (
    <span className="relative inline-block align-baseline">
      <motion.span
        className="script inline-block text-pa-red"
        initial={{ clipPath: "inset(0 100% -30% 0)" }}
        animate={{ clipPath: "inset(0 -12% -30% 0)" }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------- Primary CTA ----------------
   Carries the only saturated red above the fold. Its partner is the
   ScrambleButton, a glass surface that only fills on hover, so the pair never
   compete. Radius is 10px — rounded enough to read premium, short of a pill. */

function PrimaryCta({ children }: { children: string }) {
  return (
    <a
      href="/audit"
      className="group relative inline-flex h-[54px] items-center justify-center gap-3 overflow-hidden rounded-[10px] px-8 text-left transition-transform duration-300 ease-op-editorial hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] sm:px-9"
      style={{
        background:
          "linear-gradient(105deg, #B90F18 0%, #E50914 46%, #FF1F2D 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,31,45,0.55), 0 10px 34px -12px rgba(229,9,20,0.75)",
      }}
    >
      {/* Hover bloom — the glow lifts rather than switching on. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-op-editorial group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(105deg, #E50914 0%, #FF1F2D 52%, #FF4D5E 100%)",
        }}
      />
      <span className="relative z-[1] font-sans text-[0.9375rem] font-medium text-pa-chalk">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="relative z-[1] text-pa-chalk transition-transform duration-300 ease-op-editorial group-hover:translate-x-[6px]"
      >
        &rarr;
      </span>
    </a>
  );
}

/* ---------------- Capability bar ---------------- */

function CapabilityBar() {
  return (
    <ul className="rail -mx-5 flex snap-x items-stretch overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:overflow-visible">
      {hero.capabilities.map((cap, i) => (
        <li
          key={cap.label}
          className={`flex shrink-0 snap-start items-center lg:flex-1 ${
            i > 0 ? "lg:border-l lg:border-pa-hair" : ""
          }`}
        >
          <a
            href={cap.href}
            className="group flex items-center gap-3.5 px-5 py-5 transition-colors duration-300 ease-op-editorial sm:gap-4 lg:px-7"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[999px] border border-pa-hair text-pa-chalk-2 transition-all duration-300 ease-op-editorial group-hover:border-pa-red/60 group-hover:bg-white/[0.04] group-hover:text-pa-chalk">
              <CapabilityIcon
                name={cap.icon as CapabilityIconName}
                className="transition-transform duration-300 ease-op-editorial group-hover:scale-110"
              />
            </span>
            <span className="whitespace-nowrap font-mono text-mono-xs uppercase tracking-micro text-pa-chalk-3 transition-colors duration-300 ease-op-editorial group-hover:text-pa-chalk">
              {cap.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Right rail ---------------- */

function RightRail() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[3] hidden w-[190px] flex-col justify-center pr-[max(1.25rem,env(safe-area-inset-right))] xl:flex 2xl:pr-8">
      <Enter delay={1.45}>
        <p className="font-mono text-mono-xs uppercase leading-[1.9] tracking-micro text-pa-chalk-3">
          {hero.aside.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Enter>

      <Enter delay={1.55}>
        <span
          aria-hidden="true"
          className="mt-8 block h-[110px] w-px bg-gradient-to-b from-pa-hair-2 to-transparent"
        />
      </Enter>

      <Enter delay={1.62}>
        <div className="mt-10 flex items-center gap-4">
          <p className="font-mono text-mono-xs uppercase leading-[1.7] tracking-micro text-pa-chalk-3/70">
            {hero.scrollLabel.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <span
            aria-hidden="true"
            className="flex flex-col items-center gap-1 text-pa-chalk-3"
          >
            <span className="af-scroll block text-[13px] leading-none">&darr;</span>
          </span>
        </div>
      </Enter>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="grain grain-dark relative isolate flex min-h-[94svh] flex-col overflow-hidden bg-pa-ink pt-[84px] sm:pt-[92px]"
    >
      <ArchitecturalForm />

      <RightRail />

      <div className="shell-x relative z-[2] mx-auto flex w-full max-w-shell flex-1 flex-col">
        {/* ---- headline block, vertically centred in the remaining space ---- */}
        <div className="flex flex-1 flex-col justify-center py-10 hero-body xl:pr-[190px]">
          {/* Eyebrow */}
          <Enter delay={0.15} y={0}>
            <div className="flex items-center gap-5">
              <span className="font-mono text-mono-xs uppercase tracking-micro text-pa-chalk-2">
                {hero.eyebrow}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-20 bg-gradient-to-r from-pa-hair-2 to-transparent sm:block"
              />
            </div>
          </Enter>

          {/* Headline — the existing word reveal, unchanged in timing or mechanism */}
          <div className="mt-6 sm:mt-8 hero-headline">
            <WordReveal
              as="h1"
              text={hero.headlineLine1}
              className="headline text-display-xl text-pa-chalk"
              delay={0}
            />
            {/* The script has to sit on the same line as "WE RUN THE", so this
                row is its own flex line rather than part of the WordReveal. */}
            <div className="mt-1 flex flex-wrap items-baseline gap-x-[0.3em] sm:mt-2">
              <WordReveal
                as="span"
                text={hero.headlineLine2}
                className="headline text-display-xl text-pa-chalk"
                delay={0.1}
              />
              <span className="hero-script text-[clamp(2.9rem,9vw,7.4rem)] leading-[0.9]">
                <ScriptWord>{hero.headlineScript}</ScriptWord>
              </span>
            </div>
          </div>

          {/* Subhead */}
          <p className="mt-8 max-w-[34rem] text-body-md leading-[1.75] text-pa-chalk-2/85 sm:mt-10 hero-sub">
            {hero.subhead}
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-3.5 sm:mt-10 sm:gap-4 hero-ctas">
            <PrimaryCta>{hero.primaryCta}</PrimaryCta>
            <ScrambleButton
              href="#what-we-do"
              label={hero.secondaryCta}
              tone="dark"
            />
          </div>
        </div>

        {/* ---- capability bar pinned to the foot of the hero ---- */}
        <Enter delay={0.5} className="border-t border-pa-hair">
          <CapabilityBar />
        </Enter>
      </div>
    </section>
  );
}
