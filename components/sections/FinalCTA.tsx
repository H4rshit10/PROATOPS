"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import Reveal from "@/components/motion/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import ArrowRevealButton from "@/components/ui/ArrowRevealButton";
import { Coordinates } from "@/components/ui/Marker";
import { useContact } from "@/components/providers/ContactProvider";
import { PROATOPS } from "@/config/proatops";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const { finalCta, meta } = PROATOPS;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Glints scattered along the frame. `at` is a percentage along that edge;
 * delays are staggered so the frame never lights in one flash.
 */
const GLINTS = [
  { edge: "top", at: 12, delay: 0, size: 20 },
  { edge: "top", at: 45, delay: 1.3, size: 14 },
  { edge: "top", at: 80, delay: 2.4, size: 18 },
  { edge: "right", at: 30, delay: 0.7, size: 16 },
  { edge: "right", at: 72, delay: 2.9, size: 21 },
  { edge: "bottom", at: 88, delay: 1.8, size: 17 },
  { edge: "bottom", at: 55, delay: 0.4, size: 14 },
  { edge: "bottom", at: 20, delay: 2.6, size: 19 },
  { edge: "left", at: 66, delay: 1.1, size: 15 },
  { edge: "left", at: 26, delay: 3.3, size: 14 },
] as const;

function glintStyle(g: (typeof GLINTS)[number]): CSSProperties {
  const along = `${g.at}%`;
  const pos =
    g.edge === "top"
      ? { left: along, top: "0%" }
      : g.edge === "bottom"
        ? { left: along, top: "100%" }
        : g.edge === "left"
          ? { left: "0%", top: along }
          : { left: "100%", top: along };
  return {
    ...pos,
    width: g.size,
    height: g.size,
    animationDelay: `${g.delay}s`,
  };
}

/**
 * The closing call to action, set as a white card in a glittering frame.
 *
 * It used to be a charcoal block on a charcoal section, which read as a hole
 * at the end of the page and blended straight into the footer. Now the section
 * is parchment, the card is white, and the only ornament is the frame: a
 * brushed-metal ring with drifting flakes, a travelling red highlight and a few
 * twinkling glints (`.glitter-frame` / `.glint` in globals.css). The parchment
 * edge also gives the footer reveal below a visible seam to lift away from.
 */
export default function FinalCTA() {
  const { openForm } = useContact();
  const reduced = useReducedMotionSafe();

  return (
    <section
      id="contact"
      className="grain blueprint relative scroll-mt-20 overflow-hidden bg-op-parchment py-section-gap"
    >
      <div className="shell-x relative z-[2] mx-auto max-w-shell">
        <div className="glitter-frame">
          {GLINTS.map((g, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="glint"
              style={glintStyle(g)}
            />
          ))}

          <div className="relative overflow-hidden bg-op-white px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            {/* A breath of warmth rising from the card floor — kept faint so
                the white stays white. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
              style={{
                background:
                  "radial-gradient(110% 90% at 50% 125%, rgba(225,29,46,0.10) 0%, rgba(225,29,46,0.03) 42%, transparent 70%)",
              }}
            />

            <div className="relative z-[2] flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-op-crimson sm:w-16"
              />
              <Coordinates tone="light">{meta.coordinates}</Coordinates>
            </div>

            <WordReveal
              as="h2"
              text={finalCta.headline}
              className="headline relative z-[2] mt-8 max-w-[16ch] text-balance text-display-xl text-op-charcoal"
            />

            {/* The crimson rule draws across as the card enters. */}
            <motion.span
              aria-hidden="true"
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="relative z-[2] mt-10 block h-px w-full origin-left bg-op-crimson"
            />

            <div className="relative z-[2] mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <Reveal delay={0.15}>
                <p className="max-w-xl text-pretty text-body-md text-op-charcoal/70 sm:text-body-lg">
                  {finalCta.subhead}
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <ArrowRevealButton
                    onClick={openForm}
                    label={finalCta.cta}
                    tone="light"
                  />
                  <a
                    href={CONTACT_MAILTO}
                    className="inline-flex h-[54px] max-w-full items-center truncate rounded-[10px] border border-op-rule-strong px-6 font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal transition-colors duration-300 ease-op-editorial hover:border-op-crimson hover:text-op-crimson"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
