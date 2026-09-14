"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "@/components/providers/ContactProvider";
import { Crosshair } from "@/components/ui/Marker";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { PROATOPS } from "@/config/proatops";

const { nav, meta } = PROATOPS;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openForm } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The menu is a full-bleed charcoal panel; locking the body keeps the
     parchment page behind it from scrolling under the overlay on iOS. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* At rest the bar floats over the black hero; once scrolled it lands on the
     parchment body. `onDark` drives every ink colour so the two states stay in
     step — the background alone switching would leave charcoal text on black. */
  const onDark = !scrolled && !open;

  return (
    <header
      className={`safe-t fixed inset-x-0 top-0 z-50 border-b transition-colors duration-op-slow ease-op-micro ${
        onDark
          ? "border-pa-hair bg-transparent"
          : "border-op-rule-strong bg-op-parchment"
      }`}
    >
      <div className="shell-x mx-auto flex h-[72px] max-w-shell items-center justify-between gap-6">
        {/* Wordmark — the crimson crosshair is the mark. */}
        <a
          href="#top"
          className="group relative z-10 flex items-baseline gap-3"
          aria-label={`${nav.brand} home`}
        >
          <span className="flex items-center gap-2.5">
            <Crosshair className="translate-y-[-1px] transition-transform duration-500 ease-op-editorial group-hover:rotate-45" />
            <span
              className={`headline text-[1.65rem] leading-none tracking-display transition-colors duration-op-slow ease-op-micro ${
                onDark ? "text-pa-chalk" : "text-op-charcoal"
              }`}
            >
              {nav.brand}
            </span>
          </span>
          <span
            className={`hidden whitespace-nowrap font-mono text-mono-xs uppercase tracking-micro transition-colors duration-op-slow ease-op-micro xl:inline ${
              onDark ? "text-pa-chalk-3" : "text-op-muted"
            }`}
          >
            {nav.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative whitespace-nowrap py-1 font-mono text-mono-xs uppercase tracking-micro transition-colors duration-op-slow ease-op-micro ${
                onDark
                  ? "text-pa-chalk-3 hover:text-pa-chalk"
                  : "text-op-muted hover:text-op-crimson"
              }`}
            >
              {link.label}
              {/* Grows left-to-right on hover — 1px, accent only, no glow. */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-op-editorial group-hover:w-full ${
                  onDark ? "bg-pa-red" : "bg-op-crimson"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Over the hero the CTA is a red-edged glass chip so it reads as part
            of the film; on parchment it reverts to the site's shiny button. */}
        {onDark ? (
          <button
            type="button"
            onClick={openForm}
            className="group hidden h-11 items-center gap-3 rounded-[999px] border border-pa-red/45 bg-white/[0.04] px-6 font-mono text-mono-sm uppercase tracking-tracker text-pa-chalk transition-all duration-300 ease-op-editorial hover:border-pa-red hover:bg-pa-red/10 md:inline-flex"
            style={{ boxShadow: "0 0 22px -8px rgba(255,31,45,0.75)" }}
          >
            {nav.cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-op-editorial group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </button>
        ) : (
          <ShinyButton onClick={openForm} className="hidden md:inline-flex">
            {nav.cta}
          </ShinyButton>
        )}

        {/* Mobile toggle */}
        <button
          type="button"
          className={`relative z-10 grid h-11 w-11 place-items-center rounded-sm border transition-colors duration-op-slow ease-op-micro xl:hidden ${
            onDark ? "border-pa-hair-2" : "border-op-rule-strong"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full transition-all duration-op-micro ease-op-micro ${
                onDark ? "bg-pa-chalk" : "bg-op-charcoal"
              } ${open ? "top-1/2 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full transition-all duration-op-micro ease-op-micro ${
                onDark ? "bg-pa-chalk" : "bg-op-charcoal"
              } ${open ? "bottom-1/2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            className="grain grain-dark absolute inset-x-0 top-full h-[calc(100svh-72px)] overflow-y-auto border-t border-op-border bg-op-charcoal xl:hidden"
            aria-label="Mobile"
          >
            <div className="shell-x relative z-[2] py-6">
              {nav.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-op-border py-5 transition-colors duration-op-micro ease-op-micro hover:text-op-crimson"
                >
                  <span className="font-mono text-mono-xs tabular text-op-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="headline text-display-sm text-op-white">
                    {link.label}
                  </span>
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openForm();
                }}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-op-white font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal"
              >
                {nav.cta}
                <span aria-hidden="true">&rarr;</span>
              </button>
              <p className="mt-8 font-mono text-mono-xs uppercase tracking-micro text-op-muted">
                {meta.coordinates}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
