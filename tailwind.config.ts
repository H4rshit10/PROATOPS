import type { Config } from "tailwindcss";

/**
 * PROATOPS — editorial / brutalist operational identity.
 *
 * Rules encoded here, not left to discipline:
 *  - Radii stop at 2px. There is no pill in this system.
 *  - There are no ambient blurred shadows. Elevation is a 1px rule and a
 *    contrasting monochrome surface, nothing else.
 *  - Bebas Neue is condensed and uppercase-only, so display sizes run far
 *    larger than a normal sans would tolerate.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        op: {
          parchment: "#E8E6E0",
          charcoal: "#0B0B0B",
          surface: "#121215",
          border: "#2D2D35",
          muted: "#6B6B6B",
          crimson: "#E11D2E",
          white: "#FAFAFA",
          /* Structural border on the parchment canvas. */
          rule: "rgba(11, 11, 11, 0.15)",
          /* Same rule, heavier — used for section-defining divisions. */
          "rule-strong": "rgba(11, 11, 11, 0.32)",
        },

        /* ---- Cinematic hero palette ----
           Scoped to the above-the-fold film. The body of the site stays on the
           parchment system above; these only apply inside the hero, the partner
           strip and the founding-operators band. */
        pa: {
          ink: "#050708",
          "ink-2": "#0A0D0F",
          "ink-3": "#111416",
          chalk: "#F5F5F2",
          "chalk-2": "#D8DADC",
          "chalk-3": "#A8ADB2",
          red: "#FF1F2D",
          "red-deep": "#E50914",
          "red-dark": "#B90F18",
          hair: "rgba(255, 255, 255, 0.12)",
          "hair-2": "rgba(255, 255, 255, 0.18)",
          paper: "#F1F0EC",
        },
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        "3xl": "2px",
        full: "2px",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        /* Display — Bebas Neue. Condensed caps, so it goes big and tight. */
        "display-2xl": [
          "clamp(3.25rem, 12vw, 10rem)",
          { lineHeight: "0.86", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "display-xl": [
          "clamp(2.75rem, 8.5vw, 7rem)",
          { lineHeight: "0.88", letterSpacing: "-0.005em", fontWeight: "400" },
        ],
        "display-lg": [
          "clamp(2.25rem, 6vw, 4.75rem)",
          { lineHeight: "0.92", letterSpacing: "0em", fontWeight: "400" },
        ],
        "display-md": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "0.96", letterSpacing: "0em", fontWeight: "400" },
        ],
        "display-sm": [
          "clamp(1.375rem, 2.4vw, 1.875rem)",
          { lineHeight: "1", letterSpacing: "0.005em", fontWeight: "400" },
        ],
        /* Body — Montserrat. */
        "body-lg": ["1.0625rem", { lineHeight: "1.62", letterSpacing: "0em" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6", letterSpacing: "0em" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.55", letterSpacing: "0em" }],
        /* Technical trackers — JetBrains Mono. */
        "mono-sm": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],
        "mono-xs": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        micro: "0.16em",
        tracker: "0.12em",
        display: "-0.01em",
      },
      maxWidth: {
        shell: "84rem",
        measure: "38ch",
      },
      spacing: {
        "section-gap": "clamp(5rem, 12vw, 10rem)",
        gutter: "24px",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-reverse": "marqueeReverse 52s linear infinite",
        "cursor-blink": "cursorBlink 1.1s steps(1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "op-micro": "cubic-bezier(0.4, 0, 0.2, 1)",
        "op-editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "op-micro": "180ms",
        "op-slow": "420ms",
      },
    },
  },
  plugins: [],
};

export default config;
