"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useMediaQuery";
import { BrandMark } from "@/components/ui/BrandMark";
import { Coordinates } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";
import { V2_FOOTER } from "@/config/v2";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";

const { meta } = PROATOPS;

/* V2 footer: the blueprint's own descriptor, positioning line and column
   structure (company / start / legal / social). */
const nav = { brand: V2_FOOTER.brand, tagline: V2_FOOTER.descriptor };
const footer = {
  statement: V2_FOOTER.line,
  columns: [
    ...V2_FOOTER.columns,
    { heading: V2_FOOTER.legalHeading, links: V2_FOOTER.legal },
    { heading: V2_FOOTER.socialHeading, links: V2_FOOTER.social },
  ],
  backToTop: PROATOPS.footer.backToTop,
  legal: PROATOPS.footer.legal,
  signoff: PROATOPS.footer.signoff,
  wordmark: PROATOPS.footer.wordmark,
};

/**
 * One letter of the closing wordmark. It rises out of the floor as the footer
 * is revealed, and is painted with the glitter surface (`.glitter-letter`).
 * Its fade is written to `--lo`, never to `opacity` directly — see the note on
 * `.glitter-letter` in globals.css for why.
 * `--i` tells the shared sweep which slice of the word this letter is, so the
 * travelling glint crosses all eight letters as one continuous band.
 */
function WordmarkLetter({
  letter,
  index,
  total,
  p,
  reduced,
}: {
  letter: string;
  index: number;
  total: number;
  p: MotionValue<number>;
  reduced: boolean | null;
}) {
  const start = (index / total) * 0.55;
  const y = useTransform(p, [start, start + 0.45], ["108%", "0%"]);
  const opacity = useTransform(p, [start, start + 0.2], [0, 1]);

  if (reduced) {
    return (
      <span
        className="glitter-letter inline-block"
        style={{ "--i": index } as CSSProperties}
      >
        {letter}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y, "--lo": opacity, "--i": index } as MotionStyle}
      className="glitter-letter inline-block origin-bottom will-change-transform"
    >
      {letter}
    </motion.span>
  );
}

function FooterWordmark({
  p,
  reduced,
  live,
}: {
  p: MotionValue<number>;
  reduced: boolean | null;
  live: boolean;
}) {
  const letters = footer.wordmark.split("");

  return (
    <div className="relative -mb-[1.5vw] overflow-hidden">
      <p
        aria-hidden="true"
        data-live={live ? "" : undefined}
        className="glitter-word headline flex select-none justify-between whitespace-nowrap px-[2vw] text-[19vw] leading-[0.8] tracking-display"
        style={{ "--n": letters.length } as CSSProperties}
      >
        {letters.map((l, i) => (
          <WordmarkLetter
            key={i}
            letter={l}
            index={i}
            total={letters.length}
            p={p}
            reduced={reduced}
          />
        ))}
      </p>
    </div>
  );
}

/**
 * The footer, revealed from beneath the page.
 *
 * Instead of scrolling in behind the final section, the footer holds still at
 * the bottom of the viewport and the page lifts away to uncover it. The
 * mechanism is layout-only — no scroll listeners move it:
 *
 *   wrapper   in normal flow, exactly the footer's height, clip-path window
 *   └ track   viewport + footer tall, pulled up by one viewport
 *     └ pin   position: sticky at (viewport − footer), so it never moves
 *
 * The clip-path is what makes it work: it clips like `overflow: hidden` but,
 * unlike overflow, does not create a scroll container, so `sticky` still pins
 * to the viewport.
 *
 * The reveal only runs when the whole footer fits inside the viewport — pinned
 * to the bottom of a short screen, a taller footer would hide its own top. On
 * those screens, and under reduced motion, it falls back to normal flow. The
 * wrapper is the same height either way, so switching modes never moves the
 * page.
 */
export default function Footer() {
  const reduced = useReducedMotionSafe();
  const wrapRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<{ h: number; vh: number } | null>(null);

  /* Glitter animates only while the footer is on screen. */
  const live = useInView(wrapRef, { margin: "0px 0px 200px 0px" });

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () =>
      setBox((prev) => {
        const h = el.offsetHeight;
        const vh = window.innerHeight;
        return prev && prev.h === h && prev.vh === vh ? prev : { h, vh };
      });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const reveal = !reduced && box !== null && box.h <= box.vh;

  /* Progress runs across the reveal itself: 0 as the page starts to lift,
     1 when the footer is fully uncovered. The wrapper is the target because
     it stays in normal flow — the pinned footer inside it never moves. */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end end"],
  });

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={
        reveal
          ? {
              height: box.h,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }
          : undefined
      }
    >
      <div
        style={
          reveal
            ? { position: "relative", height: box.vh + box.h, top: -box.vh }
            : undefined
        }
      >
        <div
          style={
            reveal
              ? { position: "sticky", top: box.vh - box.h, height: box.h }
              : undefined
          }
        >
          <footer
            ref={footerRef}
            className="grain grain-dark safe-b relative overflow-hidden border-t border-op-border bg-op-charcoal pt-16 sm:pt-20"
          >
            <div className="shell-x relative z-[2] mx-auto max-w-shell">
              <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,0.6fr)] lg:gap-10">
                <div>
                  <div className="flex items-baseline gap-3">
                    <BrandMark tone="dark" animate={false} className="h-7 w-auto shrink-0" />
                    <span className="headline text-[1.65rem] leading-none tracking-display text-op-white">
                      {nav.brand}
                    </span>
                    <span className="font-mono text-mono-xs uppercase tracking-micro text-op-white/50">
                      {nav.tagline}
                    </span>
                  </div>
                  <p className="mt-6 max-w-md text-pretty text-body-sm text-op-white/60">
                    {footer.statement}
                  </p>
                  <a
                    href={CONTACT_MAILTO}
                    className="mt-6 inline-block border-b border-op-border pb-0.5 font-mono text-mono-sm uppercase tracking-tracker text-op-white transition-colors duration-op-micro ease-op-micro hover:border-op-crimson hover:text-op-crimson"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                {footer.columns.map((col) => (
                  <nav key={col.heading} aria-label={col.heading}>
                    <h3 className="border-b border-op-border pb-3 font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
                      {col.heading}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="font-mono text-mono-sm uppercase tracking-tracker text-op-white/70 transition-colors duration-op-micro ease-op-micro hover:text-op-crimson"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-op-border py-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Anchor rather than scrollTo: #top already exists on the
                    hero, so this keeps working with Lenis and with JS off.
                    "/#top" (not bare "#top") — the footer renders on /audit
                    too, where a bare hash would try to scroll within that
                    page, find nothing, and do nothing. */}
                <a
                  href="/#top"
                  className="group flex items-center gap-2.5 font-mono text-mono-xs uppercase tracking-micro text-op-white/50 transition-colors duration-op-micro ease-op-micro hover:text-op-crimson"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-op-editorial group-hover:-translate-y-1"
                  >
                    &uarr;
                  </span>
                  {footer.backToTop}
                </a>
                <Coordinates tone="dark">{footer.legal}</Coordinates>
                <Coordinates tone="dark" className="hidden lg:inline">
                  {meta.coordinates}
                </Coordinates>
                <Coordinates tone="dark">{footer.signoff}</Coordinates>
              </div>
            </div>

            <FooterWordmark p={scrollYProgress} reduced={reduced} live={live} />
          </footer>
        </div>
      </div>
    </div>
  );
}
