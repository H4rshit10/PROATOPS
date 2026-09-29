# PROATOPS — Master Audit

**Phase 01 — Discovery.** Audit only; nothing in this document has been redesigned.
**Date:** 2026-09-30 · **Scope:** `operon-core` (proatops.in) · **Status of live site:** unchanged by this phase.

Evidence behind each finding is from the codebase, device emulation, or a Lighthouse run — not impression. Where something is a judgment call, it says so.

---

## 1. Current architecture

| Area | What it is |
|---|---|
| Framework | **Next.js 15.5** (App Router), **React 19.2**, TypeScript 5.9 |
| Styling | **Tailwind CSS 3.4** + one `app/globals.css` (tokens as CSS variables, plus hand-written component CSS: form fields, marquee, beam-card, hero atmosphere) |
| Motion | **Framer Motion 12** (scroll-scrubbed timelines, reveals) + **Lenis** smooth scroll. No GSAP, no Three.js. |
| Fonts | `next/font/google`: **Bebas Neue** (display), **Montserrat** 400/500/700 (body), **Allura** (script accent), **JetBrains Mono** 400/500 (labels) — 4 families, 7 weights |
| Content | All copy in config: `config/proatops.ts` (homepage), `config/v2.ts` (sub-pages), `config/audit.ts` (63-question form) |
| Routes | `/`, `/what-we-do`, `/industries`, `/industries/[slug]` (6), `/how-we-work`, `/why-proatops`, `/about`, `/insights`, `/audit`, `/privacy`, `/terms`, `POST /api/audit` |
| Components | 48 `.tsx` files, ~7,200 lines. Largest: `svg/Diagrams.tsx` (597), `audit/AuditForm.tsx` (472), `svg/Glyphs.tsx` (426) |
| Lead capture | `/api/audit` → Google Sheet (Apps Script webhook) + email. Email runs through a browser-side FormSubmit relay because Resend isn't verified yet |
| Hosting | Vercel (CLI deploys; **not** connected to the GitHub repo) |

**Dependencies are lean** — 6 runtime packages, nothing redundant. `puppeteer-core` is dev-only (QA scripts).

---

## 2. Current visual system

A disciplined, editorial system — this is the site's strongest asset and should be preserved.

- **Palette:** parchment `#E8E6E0` canvas, charcoal `#0B0B0B`, one accent — crimson `#E11D2E`. Two charcoal interruptions on the homepage (Outcomes, footer).
- **Type:** condensed caps display (Bebas) for authority · a single script word per headline (Allura) as the signature device ("BECOME *Scalable.*", "BETTER-OPERATED *Business.*") · mono tracked caps for technical labels · Montserrat for reading.
- **Structure:** fine 1px rules instead of shadows; square corners (2px max); blueprint grid texture and film grain; numbered section rules `[ 01 ]`.
- **Signature motion:** word-by-word headline rise, scroll-scrubbed stage spine with an animated operating layer, connectors that draw.

This already reads as "consultancy-grade", not SaaS template. The problems below are mostly *execution* and *density*, not direction.

---

## 3. Current problems (by severity)

### High
1. **Email deliverability.** Leads arrive via FormSubmit (a shared relay) → inconsistent spam placement. Root fix is Resend domain verification (DNS). Blocked on the owner. *Not a code problem.*
2. **LCP is gated by an animation.** Lighthouse mobile: LCP **3.1s** (good < 2.5s). The LCP element is the hero sub-paragraph, which `Enter` holds back for **1.15s** before fading in. The page is ready; the animation makes it look slow to Google and to users.
3. **Main-thread load.** Total Blocking Time **380ms** (good < 200ms), main-thread work 8.5s, "forced reflow" flagged. Likely contributors: many independent `useScroll`/`useTransform` subscriptions, the hero's animated architectural form, per-element reveals. Needs profiling before changing.

### Medium
4. **Pill/chip overuse.** Bordered mono chips appear in the layers list, the /why-proatops engagement ladder, the audit offer, the proof disciplines, industry pages. The owner has now rejected them in one place (homepage stages). The master prompt also names "excessive pills" as an anti-pattern. They add noise and read as UI, not editorial.
5. **Duplicated content.** The five engagement stages now exist twice: homepage §04 and /why-proatops (engagement ladder, with the same deliverable chips). The before/after shift also appears in two forms (homepage "The Shift" strip and /how-we-work transformation).
6. **Hero copy is narrower than the brand.** Sub-headline still says "We help **fitness** businesses…" while every section below now positions for all industries.
7. **Audit form resumes silently.** A returning visitor lands mid-questionnaire with no intro and no "resume" choice — this is what made the owner think the intro had been deleted.

### Low
8. **Dead code/config:** `V2_HERO` (unused), `PROATOPS.nav.links` / `FOOTER_COLUMNS` / `footer.statement` (unused — live chrome reads `V2_NAV`/`V2_FOOTER`), `GlyphTransformation`, `GlyphGrowthPartner`.
9. **Unused public assets (~800 KB):** `public/dispatches/archive-01.png` (473 KB), `public/brand/image.png` (320 KB), `public/brand/logo.svg` — zero references.
10. **Vercel not linked to GitHub** — pushes don't deploy; deploys are manual CLI. Works, but easy to forget.

---

## 4. Responsive status

Fixed and verified 2026-09-29 (commit `…mobile`): emulated iPhone SE 1st gen (320), SE 2/3, 15 Pro Max, Galaxy (360), Pixel 7, and both in landscape, all 11 pages.

- ✅ No horizontal overflow, escaping elements or text spill on any device/page
- ✅ `viewport-fit=cover` + safe-area insets; `svh` not `vh`; `text-size-adjust`; tap highlight off
- ✅ Inputs ≥16px at every width (no iOS focus zoom); rating scale 56×57px targets on phones
- ✅ Hover effects gated to real pointers (Tailwind `hoverOnlyWhenSupported` + CSS guards)
- ✅ Landscape phones: height-based display type; hero CTA on first screen
- ⚠️ **Not yet tested:** iPad / Android tablets (768–1024 portrait & landscape), real Safari/WebKit engine (emulation uses Chromium), Firefox. These are the Phase 02 gaps.

---

## 5. UX problems

- **Visual density in sub-pages.** /why-proatops is the longest page (problem → consequence → proof → marquee → why → engagement ladder → fit list → OS diagram → FAQ → CTA). Strong material, but it asks a lot of a first-time visitor.
- **CTA hierarchy is repetitive.** "Book a Business Audit" appears in the nav, the page header, mid-page cards and the final CTA of every page. Consistent, but by the fourth instance it stops being a decision and becomes wallpaper. Judgment call — worth a deliberate pass.
- **Mobile is well-behaved but compressed.** Phones get the desktop composition stacked, rather than a phone-specific composition (e.g. the homepage stage spine and the layer panel sit far apart on mobile).
- **Two design generations coexist.** Homepage (original "V1" components: ShinyButton, ProximityGrid, glitter frame CTA) vs sub-pages (V2 components: `Btn`, `beam-card`, `Marquee`). Same palette, slightly different button language and card treatments.

---

## 6. Performance problems

Lighthouse, mobile, live homepage (2026-09-30):

| Metric | Value | Target |
|---|---|---|
| Performance score | **84** | 90+ |
| First Contentful Paint | 1.4 s | < 1.8 s ✅ |
| Largest Contentful Paint | **3.1 s** | < 2.5 s |
| Total Blocking Time | **380 ms** | < 200 ms |
| Cumulative Layout Shift | **0** | < 0.1 ✅ |
| Speed Index | 3.4 s | < 3.4 s |
| DOM size | 999 elements | < 800 advised |

Also flagged: ~21 KiB unused JS, ~11 KiB legacy JS polyfills, render-blocking requests, forced reflow.
Accessibility **100**, Best Practices **100**, SEO **100**.

---

## 7. Motion problems

- **Entrance delays on above-the-fold content** (the LCP issue above). Motion should never be what makes content late.
- **Many independent scroll subscriptions.** Each stage, layer chip and reveal wires its own `useScroll`/`useTransform`. Correct individually; collectively a main-thread cost. Worth consolidating where elements share a progress source.
- **Infinite loops** (hero atmosphere, marquee, spine signal pulse, glitter frame glints). All respect `prefers-reduced-motion`. Each is restrained, but together the homepage has several things moving at once — the master prompt's "infinite animations" caution applies.
- **Fixed already:** below-the-fold word reveals played on mount (finished unseen); now `trigger="view"`.

---

## 8. Premium-design opportunities (proposals — not approved)

Ranked by impact vs. risk. Each is a *proposal* for the owner to accept or reject.

1. **Remove pills site-wide, carry the content as typography.** Deliverables as a quiet comma-separated line or a hairline-ruled list. Directly answers the owner's feedback and the master prompt.
2. **Hero: let the content arrive, let the atmosphere move.** Headline and sub-paragraph present at first paint (LCP), with motion moved to secondary elements. Faster and more confident — expensive brands don't make you wait for text.
3. **One button language.** Unify ShinyButton / Btn / glitter-frame CTA into a single primary + ghost pair used everywhere.
4. **De-duplicate the stages.** Homepage keeps the short version; /why-proatops links to it or goes deeper with genuinely different content.
5. **Real imagery.** The site has almost no photography — just two partner logos and diagrams. One or two honest, high-quality images of real operations (real work, not stock) would do more for "does this look expensive?" than any effect. Needs assets from the owner.
6. **Phone-specific compositions** for the two most complex sections (Five Stages, Problem → Outcome) rather than stacked desktop.
7. **Reduce simultaneous loops** to one "hero" motion per screen.

Explicitly **not** recommended: 3D/WebGL, glassmorphism, custom cursor, particle effects — none would serve this brand, and all would cost performance on the phones this audience uses.

---

## 9. Dependency recommendations

- **Add nothing yet.** Current stack covers everything proposed above.
- **GSAP:** only if a later motion brief needs pinned timelines Framer can't do cleanly. Not currently justified.
- **Three.js / R3F / Spline:** not recommended (see §8).
- **shadcn/Radix:** not needed — no complex widgets (dialogs, comboboxes) on the site today. Revisit only if one is introduced.
- **Remove:** nothing from runtime. Clean dead config/assets (§3.8–3.9).

---

## 10. Risk areas

- **Header row at 1440px fits to the pixel** (1168px content + 2×24px gaps = 1216px box). Any change to nav labels, descriptor text or `text-mono-xs` at desktop will break it — measure after touching it.
- **Tailwind `screens` must stay plain min-width values.** A `raw` screen silently disables every arbitrary `min-[…]`/`max-[…]` variant (this hid the nav descriptor once).
- **Tailwind responsive variants are emitted at the end of the stylesheet.** A plain class in `globals.css` loses to `sm:*`; scope overrides (see `#top .hero-*`).
- **Tailwind config changes need a dev-server restart** — changes otherwise look like they did nothing.
- **Lead pipeline has three paths** (Resend → server FormSubmit → browser FormSubmit) plus the Sheet. Any change to `/api/audit` or `AuditForm` submit logic must be re-tested end to end (a fill-the-form robot exists for this).
- **Homepage edits** — the owner has asked more than once not to change the homepage beyond what they request.

---

## Proposed phase plan (for owner approval)

| Phase | Agent | Scope | Needs owner input? |
|---|---|---|---|
| 02 | Responsive engineer | Tablet (iPad/Android) + WebKit/Firefox engine testing; fix what breaks | No |
| 03 | Frontend engineer | Remove dead code/assets; consolidate scroll subscriptions; LCP fix (#2) | No |
| 04 | UI/UX designer | `UIUX-AUDIT.md`: pills, button language, duplication, CTA hierarchy, density | **Yes — approve list** |
| 05 | Art director | Visual direction; imagery plan | **Yes — photos/assets** |
| 06 | Motion designer | Motion brief after 04/05 settle; reduce concurrent loops | Review on localhost |
| 07 | QA | Full matrix 320→1920, Lighthouse, a11y | — |

All work runs on **localhost only**; nothing is pushed or deployed without the owner's go-ahead.
