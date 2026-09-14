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
