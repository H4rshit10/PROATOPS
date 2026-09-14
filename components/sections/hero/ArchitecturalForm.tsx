"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";

/**
 * The hero's architectural form.
 *
 * There is no bitmap here and no 3D runtime — it is layered SVG geometry with
 * gradient fills, a handful of blurred rim lights, and two atmospheric glows.
 * That keeps it resolution-independent, themeable from the palette, and free
 * of any image payload, at the cost of being an abstraction of a lit metal
 * object rather than a render of one.
 *
 * Three planes carry the read:
 *  - `slab`   — the upright monolith, brightest along its leading edge
 *  - `sweep`  — the larger plane falling away to the lower left
 *  - `rims`   — the specular ridge and the red edge light that separate them
 */
export default function ArchitecturalForm() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Extremely slow parallax — the form settles a little as the hero leaves.
     Range is deliberately small; anything larger reads as a carousel. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full select-none overflow-hidden lg:w-[58%]"
    >
      {/* Atmospheric red bounce, well behind the geometry. */}
      <div
        className="absolute right-[6%] top-[4%] h-[46vw] w-[46vw] max-h-[620px] max-w-[620px] rounded-full opacity-[0.55] blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,31,45,0.30) 0%, rgba(185,15,24,0.12) 42%, transparent 70%)",
        }}
      />
      {/* Cold counter-light from the lower left keeps the blacks from going flat. */}
      <div
        className="absolute -left-[10%] bottom-[2%] h-[34vw] w-[34vw] max-h-[460px] max-w-[460px] rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(150,175,200,0.16) 0%, transparent 68%)",
        }}
      />

      {/* The fade is written to a custom property, not to `opacity`: Framer
          Motion hands scroll-linked opacity to an accelerated browser
          animation, and elsewhere on this page that animation ran on the wrong
          timeline. A custom property always stays on the JS-computed value. */}
      <motion.div
        style={
          reduced ? undefined : ({ y, "--af-fade": fade } as MotionStyle)
        }
        className={`absolute inset-0 [opacity:var(--af-fade,1)] ${reduced ? "" : "af-drift"}`}
      >
        <svg
          viewBox="0 0 900 1080"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="af-slab" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#5A646C" />
              <stop offset="26%" stopColor="#2B3338" />
              <stop offset="68%" stopColor="#12171A" />
              <stop offset="100%" stopColor="#06080A" />
            </linearGradient>

            <linearGradient id="af-sweep" x1="0.6" y1="0" x2="0.1" y2="1">
              <stop offset="0%" stopColor="#323A40" />
              <stop offset="45%" stopColor="#161B1F" />
              <stop offset="100%" stopColor="#050708" />
            </linearGradient>

            <linearGradient id="af-under" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D2429" />
              <stop offset="100%" stopColor="#050708" />
            </linearGradient>

            {/* Specular ridge — hot at the crown, gone by the base. */}
            <linearGradient id="af-ridge" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="46%" stopColor="#D8DADC" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#A8ADB2" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="af-rim-red" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor="#FF1F2D" stopOpacity="0" />
              <stop offset="30%" stopColor="#FF1F2D" stopOpacity="1" />
              <stop offset="72%" stopColor="#E50914" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#B90F18" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="af-spec" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <filter id="af-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="af-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
            <filter id="af-tight" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* ---- the plane falling away to the lower left ---- */}
          <path d="M300 205 L452 1080 L-40 1080 L20 520 Z" fill="url(#af-sweep)" />

          {/* ---- the upright monolith ---- */}
          <path
            d="M300 205 C348 92, 470 38, 604 58 L900 132 L900 940 L452 1080 Z"
            fill="url(#af-slab)"
          />

          {/* ---- a darker facet folded off the monolith's base ---- */}
          <path
            d="M452 1080 L900 940 L900 1080 Z"
            fill="url(#af-under)"
          />

          {/* ---- red edge light along the crown, glow then core ---- */}
          <path
            d="M300 205 C348 92, 470 38, 604 58 L900 132"
            stroke="url(#af-rim-red)"
            strokeWidth="22"
            fill="none"
            filter="url(#af-glow)"
            opacity="1"
          />
          <path
            d="M300 205 C348 92, 470 38, 604 58 L900 132"
            stroke="url(#af-rim-red)"
            strokeWidth="3.2"
            fill="none"
            filter="url(#af-tight)"
          />

          {/* ---- specular ridge down the leading edge ---- */}
          <path
            d="M300 205 L452 1080"
            stroke="url(#af-ridge)"
            strokeWidth="13"
            fill="none"
            filter="url(#af-soft)"
            opacity="1"
          />
          <path
            d="M300 205 L452 1080"
            stroke="url(#af-ridge)"
            strokeWidth="2"
            fill="none"
          />

          {/* ---- crown highlight where the two planes meet the light ---- */}
          <path
            d="M300 205 C348 92, 470 38, 604 58"
            stroke="url(#af-ridge)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />

          {/* ---- long specular streak across the sweep ---- */}
          <path
            d="M262 300 L96 1060"
            stroke="url(#af-spec)"
            strokeWidth="40"
            fill="none"
            filter="url(#af-soft)"
          />

          {/* ---- faint reflected red on the monolith face ---- */}
          <path
            d="M640 150 L880 212 L880 640 L640 520 Z"
            fill="#FF1F2D"
            opacity="0.08"
            filter="url(#af-soft)"
          />
        </svg>
      </motion.div>

      {/* Vignette — pulls the form back into the black at every edge. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 92% at 70% 34%, transparent 48%, rgba(5,7,8,0.34) 78%, rgba(5,7,8,0.92) 100%)",
        }}
      />
      {/* Below lg the form sits directly behind the copy rather than beside it,
          so it gets an extra scrim — the brief asks for a simplified
          background on small screens, and legibility outranks the geometry. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,7,8,0.30) 0%, rgba(5,7,8,0.72) 26%, rgba(5,7,8,0.86) 62%, rgba(5,7,8,0.72) 100%)",
        }}
      />

      {/* Left falloff so the form never competes with the headline. */}
      <div
        className="absolute inset-y-0 left-0 w-[42%]"
        style={{
          background:
            "linear-gradient(to right, #050708 2%, rgba(5,7,8,0.70) 42%, transparent 100%)",
        }}
      />
    </div>
  );
}
