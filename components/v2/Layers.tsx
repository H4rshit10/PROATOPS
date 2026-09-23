"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { LAYER_GLYPHS } from "@/components/svg/Glyphs";
import { SectionRule, type Tone } from "@/components/ui/Marker";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { V2_LAYERS, V2_LAYERS_META } from "@/config/v2";

/**
 * §7 — the operating layers.
 *
 * Tone-aware so a page can alternate grounds rather than stacking two
 * charcoal sections back to back. Type is sized for reading: the layer name
 * is a real display heading and its summary is body copy, not the small
 * mono register this system uses for chrome.
 */
export default function V2Layers({
  expandAll = false,
  tone = "dark",
}: {
  expandAll?: boolean;
  tone?: Tone;
}) {
  const [open, setOpen] = useState<string | null>(expandAll ? null : V2_LAYERS[0].key);
  const reduced = useReducedMotionSafe();

  const dark = tone === "dark";
  const surface = dark ? "grain grain-dark blueprint-dark bg-op-charcoal" : "grain blueprint bg-op-parchment";
  const ink = dark ? "text-op-white" : "text-op-charcoal";
  const inkBody = dark ? "text-op-white/70" : "text-op-charcoal/75";
  const rule = dark ? "border-op-white/20" : "border-op-rule-strong";
  const chip = dark
    ? "border-op-white/20 text-op-white/80"
    : "border-op-rule-strong text-op-charcoal/80";

  return (
    <section id="what-we-do" className={`${surface} scroll-mt-20 py-section-gap`}>
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_LAYERS_META.index} label={V2_LAYERS_META.eyebrow} tone={tone} />

        <h2 className={`headline mt-10 max-w-3xl text-display-lg tracking-display ${ink}`}>
          {V2_LAYERS_META.headline}
        </h2>

        <div className={`mt-14 border-t ${rule}`}>
          {V2_LAYERS.map((layer, i) => {
            const Glyph = LAYER_GLYPHS[layer.key];
            const isOpen = expandAll || open === layer.key;
            return (
              <Reveal key={layer.key} delay={i * 0.05}>
                <div className={`beam-card border-b ${rule}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen && !expandAll ? null : layer.key)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-8 text-left sm:gap-8"
                  >
                    <span className="font-mono text-mono-sm tabular text-op-crimson">
                      {layer.index}
                    </span>
                    {Glyph && (
                      <Glyph
                        className={`h-10 w-10 shrink-0 transition-colors duration-op-micro ease-op-micro group-hover:text-op-crimson ${
                          dark ? "text-op-white/70" : "text-op-charcoal/70"
                        }`}
                      />
                    )}
                    <span className="min-w-0 flex-1">
                      <span
                        className={`headline block text-display-md tracking-display transition-colors duration-op-micro ease-op-micro group-hover:text-op-crimson ${ink}`}
                      >
                        {layer.title}
                      </span>
                      <span className={`mt-2 block text-body-md ${inkBody}`}>{layer.summary}</span>
                    </span>
                    {!expandAll && (
                      <span
                        aria-hidden="true"
                        className={`shrink-0 font-mono text-lg transition-transform duration-op-slow ease-op-micro ${
                          isOpen ? "rotate-45" : ""
                        } ${dark ? "text-op-white/50" : "text-op-charcoal/50"}`}
                      >
                        +
                      </span>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-wrap gap-2.5 pb-9 sm:pl-[5.5rem]">
                          {layer.items.map((item) => (
                            <li
                              key={item}
                              className={`border px-5 py-2.5 font-sans text-body-sm ${chip}`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
