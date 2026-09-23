"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandMark } from "@/components/ui/BrandMark";
import { ShinyButton } from "@/components/ui/ShinyButton";
import { PROATOPS } from "@/config/proatops";
import { V2_NAV } from "@/config/v2";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const { meta } = PROATOPS;

/* V2 nav: real routes rather than homepage anchors, and the blueprint's own
   descriptor and CTA wording. */
const nav = {
  brand: V2_NAV.brand,
  tagline: V2_NAV.descriptor,
  links: V2_NAV.links.map((l) => ({ label: l.label.toUpperCase(), href: l.href })),
  cta: V2_NAV.cta,
};

export default function Nav({
  headerTheme = "auto",
}: {
  /**
   * What's actually behind the fixed header, since it can't be inferred from
   * scroll position alone:
   *  - "auto"  — the homepage: a dark hero at the top, parchment below.
   *              Floats transparent-and-white until scrolled past ~24px.
   *  - "dark"  — the page is charcoal throughout (the audit form). Stays in
   *              the "over dark" treatment regardless of scroll or the
   *              mobile menu being open.
   *  - "light" — the page is parchment throughout (/not-found). Never
   *              switches into the "over dark" treatment.
   * Getting this wrong is a contrast bug, not a cosmetic one — "auto"'s
   * near-white text is illegible on a light page, and vice versa.
   */
  headerTheme?: "auto" | "dark" | "light";
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeMenu]);

  /* At rest the bar floats over the black hero; once scrolled it lands on the
     parchment body. `onDark` drives every ink colour so the two states stay in
     step — the background alone switching would leave charcoal text on black. */
  const onDark =
    headerTheme === "dark" ? true : headerTheme === "light" ? false : !scrolled && !open;

  return (
    <header
      className={`safe-t fixed inset-x-0 top-0 z-50 border-b transition-colors duration-op-slow ease-op-micro ${
        onDark
          ? "border-pa-hair bg-transparent"
          : "border-op-rule-strong bg-op-parchment"
      }`}
    >
      <div className="shell-x mx-auto flex h-[72px] max-w-shell items-center justify-between gap-6">
        {/* Wordmark — the crimson crosshair is the mark. "/#top" (not bare
            "#top") so it actually goes home from any page, not just scrolls
            in place on whichever page is currently open. */}
        <a
          href="/"
          className="group relative z-10 flex items-baseline gap-3"
          aria-label={`${nav.brand} home`}
        >
          <span className="flex items-center gap-2.5">
            <BrandMark tone={onDark ? "dark" : "light"} className="h-7 w-auto shrink-0" />
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
          <a
            href="/audit"
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
          </a>
        ) : (
          <ShinyButton href="/audit" className="hidden md:inline-flex">
            {nav.cta}
          </ShinyButton>
        )}

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
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
              <a
                href="/audit"
                onClick={() => setOpen(false)}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-sm bg-op-white font-mono text-mono-sm uppercase tracking-tracker text-op-charcoal"
              >
                {nav.cta}
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href={CONTACT_MAILTO}
                className="mt-6 inline-block font-mono text-mono-xs uppercase tracking-micro text-op-white/70 underline decoration-op-border underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-4 font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
                {meta.coordinates}
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
