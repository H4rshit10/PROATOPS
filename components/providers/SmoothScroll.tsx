"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* A page load that arrives with a #hash (someone clicking a nav link on
       /audit to "/#what-we-do", a bookmark, an external link) needs to land
       on that section — but Lenis takes over the scroll container on mount,
       which cancels the browser's own automatic jump-to-anchor before it has
       a chance to matter. This runs regardless of which branch below
       actually constructs Lenis, since every one of them still owns the
       page's initial scroll position. `scrollIntoView` (not scrollTo(0))
       respects the target's own scroll-margin-top, the same rule that
       already clears the fixed header for a same-page anchor click. */
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        });
      }
    }

    if (prefersReduced) return;

    /* Lenis here only smooths the *wheel*, which a phone doesn't have — so on
       iOS all it did was hold a requestAnimationFrame loop open for the life of
       the page, competing with scrolling and stopping Safari from idling.
       Native iOS momentum scrolling is better than anything we'd emulate. */
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)")
      .matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
