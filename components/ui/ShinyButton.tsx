"use client";

import type React from "react";
import Magnetic from "@/components/motion/Magnetic";

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /**
   * `light` — charcoal pill on parchment sections.
   * `dark`  — white pill on charcoal sections.
   */
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}

export function ShinyButton({
  children,
  href,
  onClick,
  tone = "light",
  size = "md",
  className = "",
}: ShinyButtonProps) {
  const sizeClass =
    size === "lg"
      ? "h-14 px-8 text-mono-sm sm:px-10"
      : "h-11 px-6 text-mono-sm";

  const handleClick = onClick
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
      }
    : undefined;

  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: var(--_btn-bg);
          --shiny-cta-bg-subtle: var(--_btn-bg-subtle);
          --shiny-cta-fg: var(--_btn-fg);
          --shiny-cta-highlight: var(--op-crimson);
          --shiny-cta-highlight-subtle: #ff4d5e;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 180ms cubic-bezier(0.4, 0, 0.2, 1);

          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid transparent;
          border-radius: 2px;
          color: var(--shiny-cta-fg);
          background: linear-gradient(
                var(--shiny-cta-bg),
                var(--shiny-cta-bg)
              )
              padding-box,
            conic-gradient(
                from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                transparent,
                var(--shiny-cta-highlight) var(--gradient-percent),
                var(--gradient-shine) calc(var(--gradient-percent) * 2),
                var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
                transparent calc(var(--gradient-percent) * 4)
              )
              border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent,
            --gradient-shine;
        }

        /* ---- Tone: light (parchment ground) ---- */
        .shiny-cta[data-tone="light"] {
          --_btn-bg: #0b0b0b;
          --_btn-bg-subtle: #1a1a1a;
          --_btn-fg: #fafafa;
        }

        /* ---- Tone: dark (charcoal ground) ---- */
        .shiny-cta[data-tone="dark"] {
          --_btn-bg: #fafafa;
          --_btn-bg-subtle: #e0e0e0;
          --_btn-fg: #0b0b0b;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            white calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(
            circle at bottom,
            transparent 40%,
            black
          );
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        /* Animate */
        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation: var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from,
          to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      <Magnetic strength={0.18} className="inline-block">
        <a
          href={href ?? "#contact"}
          onClick={handleClick}
          className={`shiny-cta inline-flex items-center justify-center gap-3 ${sizeClass} ${className}`}
          data-tone={tone}
        >
          <span>{children}</span>
        </a>
      </Magnetic>
    </>
  );
}
