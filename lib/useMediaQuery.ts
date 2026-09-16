"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe matchMedia. Always returns `false` on the server and on the first
 * client render so hydration can never mismatch — the real answer arrives in
 * the effect, one frame later.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * The gate for our pinned/scroll-scrubbed set pieces (services ring, morph
 * stage, snake wires).
 *
 * These are server-rendered and `hidden lg:block` in CSS, so desktop paints
 * them on the very first frame — no lazy chunk, no empty 3000px section while
 * one loads, no document-height jump when it arrives. What CSS can't do is stop
 * React mounting them and framer-motion running their useScroll/useSpring/
 * useTransform every frame on a phone, for something nobody can see.
 *
 * So: render them for everyone, then let this hook tell us once we *know* the
 * viewport is below lg, and unmount them there. Returns false on the server and
 * on the first client render, which keeps hydration matching.
 */
export function useShedDesktopOnly() {
  const [shed, setShed] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShed(!mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return shed;
}

/** True on touch-primary devices — every iPhone. */
export function useIsTouch() {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

/**
 * SSR-safe replacement for framer-motion's own `useReducedMotion`.
 *
 * Framer's hook reads `window.matchMedia` synchronously during render (via a
 * lazy `useState` initialiser), not in an effect. That's fine on the server —
 * there is no `window`, so it falls back — but on a client whose OS actually
 * has Reduced Motion on, the browser's very first render (hydration) reads
 * the real value immediately, while the server rendered assuming `false`.
 * Two different trees on the same pass is exactly a React #418 hydration
 * error, and it only fires for the accessibility-conscious users these
 * animations exist to protect in the first place.
 *
 * `useMediaQuery` above already has the right shape for this: `false` on the
 * server and on the first client render, the real answer arriving one effect
 * tick later, after hydration has committed.
 */
export function useReducedMotionSafe() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
