# PROATOPS — Professional Operations & Management

Single-page site for **PROATOPS**. Built with Next.js 15 (App Router), TypeScript,
Tailwind CSS, Framer Motion and Lenis smooth scrolling.

> You Own the Business. We Run the Operation.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Copy lives in one place

`config/proatops.ts` is the single source of truth for every string on the page —
navigation, headlines, section bodies, the audit modal, the footer, SEO
metadata. **No UI component hardcodes display text.** To change wording, edit
that file; layout and motion code should not need to be touched.

## Structure

```
app/
  layout.tsx          # fonts, SEO metadata, providers
  page.tsx            # section order
  globals.css         # tokens, grain, crosshairs, glitter, reduced-motion rules
  icon.svg
config/
  proatops.ts         # ALL site copy + types — change words here, nowhere else
components/
  layout/             # Nav, Footer (reveal + glitter wordmark)
  sections/           # one file per page section, in page order:
                      #   Hero · Partners · Ticker · Dispatches · WhatWeDo
                      #   Model · Protocol · Sectors · Philosophy · FinalCTA
    hero/             # ArchitecturalForm — the SVG monolith behind the hero
  providers/          # ContactProvider (audit modal), SmoothScroll (Lenis)
  motion/             # Reveal, Enter, WordReveal, ScrollFillText, Magnetic
  ui/                 # buttons, cards, grids, markers
    icons/            # CapabilityIcon line glyphs
lib/
  contact.ts          # contact address + Gmail compose helper
  useMediaQuery.ts    # touch detection
public/
  partners/           # brand marks (instructions inside)
  dispatches/         # archive card images (instructions inside)
```

Two rules keep this navigable: a section never imports another section, and
anything shared between sections lives in `ui/` or `motion/`.

## Signature effects

- **Footer reveal** — the page lifts away to uncover a footer that holds still.
  Layout-only (a clip-path window around a sticky pin); it switches itself off
  on screens too short to show the whole footer and under reduced motion.
- **Glitter** — the final CTA sits in a brushed-metal frame with drifting
  flakes, a travelling red highlight and twinkling glints; the footer wordmark
  uses the same surface with a glint sweeping across all eight letters. Pure
  CSS (`.glitter-frame`, `.glint`, `.glitter-letter` in `globals.css`), paused
  while off screen, static under reduced motion.

## Design system

| Token | Value | Role |
| --- | --- | --- |
| `op-parchment` | `#E8E6E0` | primary canvas |
| `op-charcoal` | `#0B0B0B` | full-bleed set-pieces, ink |
| `op-surface` | `#121215` | elevated dark surface |
| `op-border` | `#2D2D35` | structural rule (dark) |
| `op-rule` / `op-rule-strong` | `rgba(11,11,11,0.15 / 0.32)` | structural rule (light) |
| `op-muted` | `#6B6B6B` | trackers, secondary text |
| `op-crimson` | `#E11D2E` | the only accent — script, crosshairs, indices |
| `op-white` | `#FAFAFA` | inverted text |

Typography: **Bebas Neue** (condensed display caps, `.headline`), **Montserrat**
(body), **Allura** (`.script` — the crimson signature word), **JetBrains Mono**
(coordinates, `[ 01 ]` bracket tags, telemetry).

Structural rules, enforced in `tailwind.config.ts`:

- Containers are `rounded-none`; buttons and inputs cap at **2px**. Every
  `borderRadius` key including `full` maps to `≤2px`, so a stray `rounded-full`
  cannot reintroduce a pill.
- **No blurred ambient shadows at rest.** Elevation is a 1px rule plus a
  contrasting monochrome surface. Hover states invert colour; they do not glow.
- Section bounds carry crimson crosshair markers; sections open with a
  `SectionRule` (`+ [ 02 ] MANAGEMENT ARCHITECTURE ————— +`).

## Motion

The motion system is a small set of reusable pieces: a scroll-scrubbed timeline (the Protocol spine), a scroll-scrubbed footer wordmark, word-by-word headline reveals, the "reading light" fill on the Philosophy statement, and magnetic buttons.

Two rules the components rely on:

- **Reduced motion renders statically.** `Reveal`, `Enter`, `WordReveal` and
  `ScrollFillText` return plain elements when `prefers-reduced-motion` is set —
  they do not fade in from `opacity: 0`. Copy is never dependent on an
  animation frame arriving.
- **Entrance transforms are contained.** Sections whose content animates in on
  the x-axis (`Model`, `Protocol`) use `overflow-x-clip`, not `overflow-hidden`
  — `hidden` creates a scroll container and would break the `lg:sticky`
  columns in both sections.

## Contact

The audit modal posts to FormSubmit at the address in `lib/contact.ts`
(`deploy@proatops.com`), with a honeypot field and an autoresponse. Point
`CONTACT_EMAIL` at the real inbox before launch.
