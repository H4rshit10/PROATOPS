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
      "Where Businesses Become Scalable. Founded by operators who ran the floor at Anytime Fitness, Cult.fit, Gold's Gym and Healthism — we embed dedicated management and assume operational responsibility for multi-unit fitness locations.",
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
      { label: "PHILOSOPHY", href: "/#philosophy" },
    ],
    cta: "BOOK AN AUDIT",
  },

  hero: {
    eyebrow: "BUSINESS OPERATIONS & INTELLIGENCE PLATFORM",
    headlineLine1: "WHERE BUSINESSES",
    headlineLine2: "BECOME",
    headlineScript: "Scalable.",
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

  /* ---- What customers actually buy ----
     From the "What customers buy" clarity deck. The six fitness-floor domains
     this replaced described tasks; the deck's point is that the tasks are not
     the product — the operating outcome is. */
  whatWeDo: {
    eyebrow: "WHAT YOU ACTUALLY BUY",
    /* Closes on a script word — the same device as the hero's "BECOME
       Scalable." — so the page keeps one voice. */
    headline: "NOT TOOLS. A BETTER-OPERATED",
    headlineScript: "Business.",
    lede: "The visible tools are not the product. The operating outcome is the product.",
    /* `icon` selects a glyph in components/ui/icons/CapabilityIcon.tsx.
       `tagline` renders in the Allura script — two or three words at most. */
    items: [
      {
        code: "01",
        title: "CONTROL",
        tagline: "command, not chasing",
        icon: "gear",
        desc: "The owner gains command over execution, managers, systems and priorities.",
      },
      {
        code: "02",
        title: "PERFORMANCE",
        tagline: "measured, not guessed",
        icon: "chart",
        desc: "The business improves sales, accountability, productivity, retention and decision-making.",
      },
      {
        code: "03",
        title: "SCALABILITY",
        tagline: "growth without chaos",
        icon: "growth",
        desc: "The business gains the structure and infrastructure required to grow without multiplying chaos.",
      },
    ],
    /* The value proposition, as a four-step shift. */
    shiftLabel: "THE SHIFT",
    shift: ["OWNER-DEPENDENT", "SYSTEM-DRIVEN", "MEASURABLE", "SCALABLE"],
  },

  /* ---- Problem → outcome ----
     The deck's rule for the admin team — "explain the outcome first; the
     tools come second" — is the structure of this section: every row names
     a problem an owner recognises, then the outcome it becomes. */
  outcomes: {
    eyebrow: "PROBLEM → OUTCOME",
    headline: "THE PROBLEMS WE SOLVE — AND WHAT THEY BECOME.",
    problemLabel: "WHAT THE OWNER SEES",
    outcomeLabel: "WHAT THE BUSINESS GETS",
    /* `glyph` keys into OUTCOME_GLYPHS in components/sections/Outcomes.tsx. */
    rows: [
      { glyph: "owner", problem: "Everything depends on the owner", outcome: "OWNER INDEPENDENCE", result: "Less daily owner chasing" },
      { glyph: "people", problem: "The team works, but accountability is weak", outcome: "MANAGEMENT CONTROL", result: "Clear ownership and review" },
      { glyph: "systems", problem: "Processes differ by person or location", outcome: "OPERATIONAL CONSISTENCY", result: "Repeatable execution" },
      { glyph: "sales", problem: "Leads exist, but revenue leaks", outcome: "REVENUE PERFORMANCE", result: "Stronger conversion and retention" },
      { glyph: "view", problem: "The owner can't clearly see what is happening", outcome: "BUSINESS VISIBILITY", result: "KPIs, dashboards and reviews" },
      { glyph: "automation", problem: "Too much manual follow-up and fragmented work", outcome: "AUTOMATION & EFFICIENCY", result: "Less repetitive chasing" },
      { glyph: "scale", problem: "Growth is planned, but systems are not ready", outcome: "SCALABLE INFRASTRUCTURE", result: "Growth without chaos" },
    ],
  },


  /* ---- Five stages ----
     From the clarity deck's "5 engagement levels" and "what we deliver at
     each stage": same business, a deeper level of Proatops involvement at
     each step. `verb` is the deck's own footer for each stage. */
  protocol: {
    eyebrow: "FIVE STAGES",
    headline: "FROM CLARITY TO FREEDOM TO SCALE.",
    lede: "Same business. A different level of Proatops involvement at each stage — most start with the audit.",
    steps: [
      {
        step: "01",
        name: "BUSINESS AUDIT",
        outcome: "CLARITY",
        verb: "DIAGNOSE",
        desc: "What is wrong, why it is happening, and what should be fixed first.",
      },
      {
        step: "02",
        name: "BUILD & IMPLEMENT",
        outcome: "STRUCTURE",
        verb: "DESIGN + DEPLOY",
        desc: "A business that runs through systems instead of memory and individuals.",
      },
      {
        step: "03",
        name: "PERFORMANCE PARTNERSHIP",
        outcome: "VISIBILITY + ACCOUNTABILITY",
        verb: "MEASURE + IMPROVE",
        desc: "Who is performing, where revenue leaks, and what management should do next.",
      },
      {
        step: "04",
        name: "MANAGEMENT PARTNERSHIP",
        outcome: "CONTROL",
        verb: "MANAGE + OPTIMIZE",
        desc: "Active management of managers, operations, sales, CX and reviews.",
      },
      {
        step: "05",
        name: "OPERATING PARTNERSHIP",
        outcome: "FREEDOM TO SCALE",
        verb: "OPERATE + SCALE",
        desc: "The owner focuses on vision, capital, strategy and expansion while Proatops operates agreed functions.",
      },
    ],
    /* The operating layer that runs underneath every stage — it switches on
       layer by layer as the stages scroll past, ending in data, technology
       and AI: the automation that carries the business between stages. */
    layerLabel: "PROATOPS OPERATING LAYER",
    layers: ["PEOPLE", "PROCESS", "MANAGEMENT", "PERFORMANCE", "DATA", "TECHNOLOGY", "AI"],
    result: "A business that can operate and scale without everything depending on the owner.",
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
    signoff: "WHERE BUSINESSES BECOME SCALABLE.",
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
