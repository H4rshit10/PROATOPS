/**
 * PROATOPS — single source of truth for all site copy.
 *
 * No UI component may hardcode a display string. If it renders as words on the
 * page, it lives here. Section components read from this object and nothing
 * else, so copy changes never require touching layout or motion code.
 */

/**
 * Footer links are plain anchors — the audit used to be a JS-triggered
 * modal, which is why this type once carried an `action: "form"` escape
 * hatch, but the audit lives at its own route now like everything else.
 */
export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

/* Every in-page anchor is prefixed "/" (not bare "#section") — this site now
   has a second real page (/audit), and a bare hash href only resolves on
   whatever page you're already on. From /audit, "#dispatches" tries to find
   that id on /audit itself, finds nothing, and does nothing — which is
   exactly the "the buttons don't work, I'm stuck" bug. "/#dispatches"
   always resolves against the homepage regardless of where the click
   happened, and is identical to a bare hash when already on "/" (same
   pathname, so the browser scrolls in place rather than reloading). */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "SITE",
    links: [
      { label: "Field Dispatches", href: "/#dispatches" },
      { label: "What We Do", href: "/#what-we-do" },
      { label: "The Protocol", href: "/#protocol" },
      { label: "Sectors", href: "/#sectors" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      { label: "Book an Audit", href: "/audit" },
      { label: "Philosophy", href: "/#philosophy" },
    ],
  },
];

export const PROATOPS = {
  meta: {
    title: "PROATOPS — Professional Operations & Management",
    description:
      "You Own the Business. We Run the Operation. Founded by operators who ran the floor at Anytime Fitness, Cult.fit, Gold's Gym and Healthism — we embed dedicated management and assume operational responsibility for multi-unit fitness locations.",
    domain: "https://www.proatops.in",
    coordinates: "28.6139° N / 77.2090° E · EST. 2026",
  },

  nav: {
    brand: "PROATOPS",
    tagline: "PROFESSIONAL OPERATIONS",
    /* This bar is shared across every page (Nav.tsx) — see the FOOTER_COLUMNS
       comment above for why these are "/#section" and not bare "#section". */
    links: [
      { label: "DISPATCHES", href: "/#dispatches" },
      { label: "WHAT WE DO", href: "/#what-we-do" },
      { label: "THE PROTOCOL", href: "/#protocol" },
      { label: "SECTORS", href: "/#sectors" },
      { label: "PHILOSOPHY", href: "/#philosophy" },
    ],
    cta: "BOOK AN AUDIT",
  },

  hero: {
    eyebrow: "BUSINESS OPERATIONS & MANAGEMENT",
    headlineLine1: "YOU OWN THE BUSINESS.",
    headlineLine2: "WE RUN THE",
    headlineScript: "Operation.",
    subhead:
      "We help fitness businesses improve operations, build high-performing teams, increase revenue and create systems that scale.",
    primaryCta: "Talk to Us",
    secondaryCta: "Explore Our Services",
    /* Right-hand vertical microcopy + scroll cue. */
    aside: ["STRONGER", "OPERATIONS.", "BIGGER", "POSSIBILITIES."],
    scrollLabel: ["SCROLL", "TO EXPLORE"],
    /* Capability bar across the foot of the hero. `icon` selects a line glyph
       in components/ui/icons/CapabilityIcon.tsx — it is not free text. */
    capabilities: [
      { label: "OPERATIONS", icon: "gear", href: "#what-we-do" },
      { label: "PEOPLE", icon: "people", href: "#what-we-do" },
      { label: "SALES", icon: "chart", href: "#what-we-do" },
      { label: "SYSTEMS", icon: "layers", href: "#what-we-do" },
      { label: "GROWTH", icon: "growth", href: "#what-we-do" },
    ],
  },

  /* ---- Credibility strip beneath the hero ----
     These companies are NOT partners, clients or endorsers — they are where
     the founding team operated. The label has to say exactly that: naming
     them under "OUR PARTNERS" would assert a commercial relationship that
     does not exist.

     `logo` points at a file under /public/partners when one exists; until then
     each brand renders as a typographic wordmark. Never substitute an invented
     mark for a real company's logo. */
  partners: {
    label: "FOUNDING OPERATORS FROM",
    /* `display` is the rendered height in px, tuned per mark rather than shared.
       Uniform height is the usual mistake in a logo row: a circular badge set to
       the same height as a wide wordmark reads far smaller than it is, so the
       badge runs taller and the wordmarks shorter to land on equal optical
       weight. `w`/`h` are the file's intrinsic pixels, passed to next/image so
       the row reserves space and never shifts on load. */
    items: [
      {
        name: "ANYTIME FITNESS",
        sub: null,
        logo: { src: "/partners/anytime-fitness.png", w: 600, h: 248, display: 34 },
      },
      {
        name: "cult.fit",
        sub: null,
        logo: { src: "/partners/cult-fit.png", w: 312, h: 90, display: 28 },
      },
      {
        name: "GOLD'S GYM",
        sub: null,
        logo: { src: "/partners/golds-gym.png", w: 208, h: 208, display: 52 },
      },
      /* No mark supplied yet — renders as a typographic wordmark. Drop a file
         in /public/partners and give it a `logo` object to switch over. */
      { name: "HEALTHISM", sub: "THE GYM OF LUCKNOW", logo: null },
    ],
  },

  /* ---- Dark band closing the above-the-fold sequence ----
     The brand list lived here too and repeated the strip directly above it.
     Saying it once, in the strip, is stronger. */
  foundingBand: {
    label: "OPERATIONAL RESPONSIBILITY, NOT ADVICE.",
    statement: ["BUILT FOR FITNESS TODAY,", "DESIGNED TO MANAGE BUSINESSES TOMORROW."],
  },

  /* ---- Operational ticker ----
     Two counter-running rows. The upper carries the six domains, the lower the
     daily disciplines behind them, so the band reads as a live manifest rather
     than decoration. */
  ticker: {
    primary: [
      "OPERATIONS",
      "PEOPLE",
      "SALES",
      "SYSTEMS",
      "CUSTOMER EXPERIENCE",
      "GROWTH",
    ],
    secondary: [
      "SOP compliance",
      "shift discipline",
      "unit economics",
      "retention workflows",
      "payroll control",
      "floor execution",
      "conversion tracking",
    ],
  },

  /* ---- Verified field dispatches — external proof records ---- */
  dispatches: {
    eyebrow: "VERIFIED FIELD DISPATCHES",
    headline: "OPERATIONAL PROOF, NOT PROMISES.",
    intro:
      "Direct records from live deployments — multi-brand rollout history and on-site floor execution, unedited.",
    viewAll: "VIEW ALL DISPATCHES",
    viewAllHref: "https://www.instagram.com/proatops",
    items: [
      {
        code: "01",
        tag: "ARCHIVE 01",
        title: "Multi-Brand Rollout Archive",
        subtitle: "Gold's Gym · Cult.fit · Anytime Fitness · Healthism",
        desc: "Operational rollout record spanning four national fitness brands.",
        href: "https://www.instagram.com/p/DdG_kWrCRFu/?img_index=2",
        cta: "OPEN DISPATCH",
      },
      {
        code: "02",
        tag: "ARCHIVE 02",
        title: "On-Site Floor Execution",
        subtitle: "Live Deployment Reel",
        desc: "Direct floor-level execution footage from an active deployment.",
        href: "https://www.instagram.com/reel/DdJAHXVNCtp/",
        cta: "OPEN DISPATCH",
      },
    ],
  },

  whatWeDo: {
    eyebrow: "OPERATIONAL SCOPE",
    /* Headline closes on a script word, the same device as the hero's
       "WE RUN THE Operation." — one callback, so the page reads as one voice. */
    headline: "SIX DOMAINS. ONE ACCOUNTABLE",
    headlineScript: "Operator.",
    /* `icon` selects a line glyph in components/ui/icons/CapabilityIcon.tsx.
       `tagline` renders in the Allura script — keep it to two or three words;
       a flowing script loses legibility fast past that. */
    items: [
      {
        code: "01",
        title: "OPERATIONS",
        tagline: "the daily machine",
        icon: "gear",
        desc: "Full ownership of facility workflows, equipment uptime, opening/closing checklists, and floor cleanliness.",
      },
      {
        code: "02",
        title: "PEOPLE",
        tagline: "the right hands",
        icon: "people",
        desc: "End-to-end hiring, standardized onboarding, shift scheduling, and continuous staff performance management.",
      },
      {
        code: "03",
        title: "SALES",
        tagline: "every conversion",
        icon: "chart",
        desc: "Structured conversion scripts, front-desk closing playbooks, PT sales pipelines, and automated renewal triggers.",
      },
      {
        code: "04",
        title: "SYSTEMS",
        tagline: "rules that hold",
        icon: "layers",
        desc: "Non-negotiable SOPs, cash flow auditing, real-time KPI dashboards, and daily operational reporting.",
      },
      {
        code: "05",
        title: "CUSTOMER EXPERIENCE",
        tagline: "every single visit",
        icon: "heart",
        desc: "Standardized member journeys, onboarding check-ins, retention workflows, and hospitality standards.",
      },
      {
        code: "06",
        title: "GROWTH",
        tagline: "the next location",
        icon: "growth",
        desc: "Unit margin optimization, pricing elasticity, secondary revenue streams, and multi-location expansion blueprints.",
      },
    ],
  },


  protocol: {
    eyebrow: "DEPLOYMENT PROTOCOL",
    headline: "SIX STAGES FROM AUDIT TO SCALE.",
    steps: [
      {
        step: "01",
        name: "AUDIT",
        desc: "We evaluate your unit economics, staffing churn, and operational leaks.",
      },
      {
        step: "02",
        name: "STRATEGY",
        desc: "We map the exact staffing blueprint, SOP layer, and revenue targets.",
      },
      {
        step: "03",
        name: "DEPLOY",
        desc: "We place trained operational managers and install daily tracking systems.",
      },
      {
        step: "04",
        name: "MANAGE",
        desc: "We take full operational responsibility for daily floor execution.",
      },
      {
        step: "05",
        name: "OPTIMIZE",
        desc: "We track retention, conversion metrics, and payroll discipline.",
      },
      {
        step: "06",
        name: "SCALE",
        desc: "We expand your footprint to new locations without operational decay.",
      },
    ],
  },

  sectors: {
    eyebrow: "DEPLOYMENT SECTORS",
    headline:
      "BUILT FOR FITNESS TODAY. DESIGNED TO MANAGE BUSINESSES TOMORROW.",
    current: [
      "Commercial Gym Networks",
      "Boutique Fitness Studios",
      "Reformer & Mat Pilates Hubs",
      "Functional Training & Strength Facilities",
      "Wellness & Recovery Centers",
    ],
    note: "Starting with Fitness & Wellness. Expanding to multi-unit retail, hospitality, and healthcare franchise operations.",
  },

  philosophy: {
    eyebrow: "OUR CORE PHILOSOPHY",
    headline: "YOUR BUSINESS SHOULDN’T DEPEND ON YOU BEING THERE EVERY DAY.",
    body: "Most business owners end up trapped running daily errands instead of owning an asset. Proatops builds the people, processes, and accountability required to make your locations run predictably and profitably—even when the owner isn’t involved in daily decisions.",
  },

  finalCta: {
    headline: "IS YOUR BUSINESS READY TO OPERATE BETTER?",
    subhead:
      "Tell us where your business is today. We will show you where it can go.",
    cta: "Book a Business Audit",
  },

  /* ---- Business audit intake modal ---- */
  audit: {
    title: "BOOK A BUSINESS AUDIT",
    intro:
      "Four fields. We respond within two working days with an operational read on your locations.",
    fields: {
      name: "FULL NAME",
      email: "EMAIL",
      business: "BUSINESS NAME",
      locations: "NUMBER OF LOCATIONS",
      brief: "WHAT IS BREAKING RIGHT NOW?",
    },
    locationOptions: [
      "Single location",
      "2 – 4 locations",
      "5 – 10 locations",
      "10+ locations",
      "Pre-launch",
    ],
    emailPrompt: "Prefer email?",
    submit: "SUBMIT FOR AUDIT",
    sending: "TRANSMITTING",
    sentTitle: "AUDIT REQUEST RECEIVED",
    sentBody:
      "Your submission is logged. An operations lead will respond within two working days.",
    errorBody:
      "Transmission failed. Email us directly and we will pick it up from there.",
    close: "CLOSE",
  },

  footer: {
    statement:
      "Proatops assumes operational responsibility for multi-unit businesses. Owners retain ownership. We retain accountability.",
    columns: FOOTER_COLUMNS,
    backToTop: "BACK TO TOP",
    legal: "© 2026 PROATOPS. ALL RIGHTS RESERVED.",
    signoff: "YOU OWN THE BUSINESS. WE RUN THE OPERATION.",
    wordmark: "PROATOPS",
  },

  notFound: {
    code: "404",
    eyebrow: "OFF THE GRID",
    title: "THIS LOCATION ISN'T IN THE PROTOCOL.",
    body: "The page you're looking for has been decommissioned or never existed. Every other coordinate is still live.",
    cta: "RETURN TO BASE",
  },
} as const;

export type Proatops = typeof PROATOPS;
