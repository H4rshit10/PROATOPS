"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { LAYER_GLYPHS } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { V2_LAYERS, V2_LAYERS_META } from "@/config/v2";

/**
 * §7 — the operating layers.
 *
 * Seven layers, each with a long list of what's inside it. Shown as an
 * accordion rather than seven open columns: the blueprint's warning about
 * huge paragraphs applies just as much to huge lists, and an owner scanning
 * this wants the seven names first and the detail on demand.
 */
export default function V2Layers({ expandAll = false }: { expandAll?: boolean }) {
  const [open, setOpen] = useState<string | null>(expandAll ? null : V2_LAYERS[0].key);
  const reduced = useReducedMotionSafe();

  return (
    <section
      id="what-we-do"
      className="grain grain-dark blueprint-dark scroll-mt-20 bg-op-charcoal py-section-gap"
    >
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_LAYERS_META.index} label={V2_LAYERS_META.eyebrow} tone="dark" />

        <h2 className="headline mt-10 max-w-3xl text-display-lg tracking-display text-op-white">
          {V2_LAYERS_META.headline}
        </h2>

        <div className="mt-14 border-t border-op-white/20">
          {V2_LAYERS.map((layer, i) => {
            const Glyph = LAYER_GLYPHS[layer.key];
            const isOpen = expandAll || open === layer.key;
            return (
              <Reveal key={layer.key} delay={i * 0.05}>
                <div className="border-b border-op-white/20">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen && !expandAll ? null : layer.key)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                  >
                    <span className="font-mono text-mono-sm tabular text-op-crimson">
                      {layer.index}
                    </span>
                    {Glyph && (
                      <Glyph className="h-8 w-8 shrink-0 text-op-white/70 transition-colors duration-op-micro ease-op-micro group-hover:text-op-crimson" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="headline block text-display-sm tracking-display text-op-white transition-colors duration-op-micro ease-op-micro group-hover:text-op-crimson">
                        {layer.title}
                      </span>
                      <span className="mt-1 block text-body-sm text-op-white/60">
                        {layer.summary}
                      </span>
                    </span>
                    {!expandAll && (
                      <span
                        aria-hidden="true"
                        className={`shrink-0 font-mono text-mono-sm text-op-white/50 transition-transform duration-op-slow ease-op-micro ${
                          isOpen ? "rotate-45" : ""
                        }`}
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
                        <ul className="flex flex-wrap gap-2 pb-8 sm:pl-[4.5rem]">
                          {layer.items.map((item) => (
                            <li
                              key={item}
                              className="border border-op-white/20 px-4 py-2 font-mono text-[0.75rem] uppercase tracking-wide text-op-white/75"
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
