/**
 * PROATOPS V2 — the complete site copy, transcribed from the V2 blueprint.
 *
 * Same rule as config/proatops.ts: no component hardcodes a display string.
 * Sections are keyed to the blueprint's own numbering so the document and
 * the code stay cross-referenceable.
 *
 * Deliberately not included, per instruction:
 *  - the traditional-consultant vs Proatops comparison tables (blueprint §6
 *    and §18) — the headlines they sat under are kept, the tables are not
 *  - §17 Case Studies
 *  - §20 Long-term vision ladder (§21, the Operating System, is kept)
 */

export const V2_NAV = {
  brand: "PROATOPS",
  descriptor: "Business Operations & Intelligence Platform",
  links: [
    { label: "What We Do", href: "/what-we-do" },
    { label: "Industries", href: "/industries" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Why Proatops", href: "/why-proatops" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],
  cta: "BOOK A BUSINESS AUDIT",
};

/* §2 — HERO */
export const V2_HERO = {
  eyebrow: "BUSINESS OPERATIONS & MANAGEMENT",
  headlineA: "YOU OWN THE BUSINESS.",
  headlineB: "WE RUN THE OPERATION.",
  subhead:
    "Proatops is the operating partner for businesses that want stronger execution, better performance and scalable growth.",
  support:
    "We build the people, processes, systems and performance discipline behind your business — and, where required, take responsibility for running agreed functions.",
  cta: "BOOK A BUSINESS AUDIT",
  secondaryCta: "SEE HOW WE OPERATE",
  /* The hero diagram's own labels — Proatops as the operating layer. */
  diagram: {
    top: "PROATOPS",
    middle: ["PEOPLE", "PROCESS", "PERFORMANCE"],
    lower: "BUSINESS",
    base: "SCALE",
  },
};

/* §3 — THE FIRST PSYCHOLOGICAL HOOK */
export const V2_PROBLEM = {
  index: "01",
  eyebrow: "THE PROBLEM",
  headlineA: "YOUR BUSINESS MAY NOT HAVE A GROWTH PROBLEM.",
  headlineB: "IT MAY HAVE AN OPERATING PROBLEM.",
  lead: ["The customers may be there.", "The team may be there.", "The product may be strong.", "The opportunity may be real."],
  body: "But when people, processes, sales, customer experience and accountability don't work as one system, growth becomes harder than it should be.",
  prompt: "Sound familiar?",
  cards: [
    "Everything still comes to me.",
    "I can't see what's happening until something goes wrong.",
    "My team works, but performance isn't consistent.",
    "Sales depend too heavily on a few people.",
    "We have processes, but nobody follows them consistently.",
    "I want to expand, but I'm not confident the current operation can handle it.",
    "The business performs differently when I'm not there.",
  ],
};

/* §4 — THE CONSEQUENCE */
export const V2_CONSEQUENCE = {
  index: "02",
  eyebrow: "THE COST",
  headline: "WHEN THE BUSINESS DEPENDS ON THE OWNER, GROWTH HAS A CEILING.",
  lines: [
    "Every decision coming back to the founder.",
    "Every problem becoming an escalation.",
    "Every location operating differently.",
    "Every employee interpreting the process differently.",
  ],
  turn: "Eventually, the owner isn't building the business.",
  emphasis: "The owner is becoming the business.",
  statement: "THAT'S THE PROBLEM PROATOPS SOLVES.",
};

/* §5 — INTRODUCE PROATOPS */
export const V2_SOLUTION = {
  index: "03",
  eyebrow: "THE SOLUTION",
  headline: "WE BUILD THE OPERATING SYSTEM BEHIND THE BUSINESS.",
  body: "Proatops works with business owners to design, implement and manage the operating structure required to run a business consistently and scale it intelligently.",
  blocks: [
    { key: "people", title: "PEOPLE", body: "Right people. Clear roles. Accountability." },
    { key: "process", title: "PROCESS", body: "Standardized workflows. SOPs. Decision systems." },
    { key: "performance", title: "PERFORMANCE", body: "KPIs. Reporting. Reviews. Continuous improvement." },
    { key: "scale", title: "SCALE", body: "Systems designed to work beyond one person, one location or one stage of growth." },
  ],
};

/* §6 — DIFFERENTIATOR (headline kept, comparison table removed) */
export const V2_DIFFERENTIATOR = {
  index: "04",
  eyebrow: "THE DIFFERENCE",
  headlineA: "WE DON'T JUST TELL YOU WHAT TO DO.",
  headlineB: "WE HELP MAKE SURE IT GETS DONE.",
  flow: ["Diagnose", "Design", "Deploy", "Operate", "Measure", "Improve", "Scale"],
  statement: "A strategy sitting in a presentation does not improve a business. Execution does.",
};

/* §7 — THE OPERATING LAYERS WE BUILD */
export type OperatingLayer = {
  index: string;
  key: string;
  title: string;
  summary: string;
  items: string[];
};

export const V2_LAYERS: OperatingLayer[] = [
  {
    index: "01",
    key: "operations",
    title: "OPERATIONS",
    summary: "Build structure around the day-to-day business.",
    items: ["Daily operations", "Management structure", "Workflows", "Opening/closing processes", "Vendor coordination", "Issue escalation", "Operational controls"],
  },
  {
    index: "02",
    key: "people",
    title: "PEOPLE",
    summary: "Build teams that know what they own.",
    items: ["Organization structure", "Hiring", "Role clarity", "Onboarding", "Training", "Performance management", "Incentives", "Leadership development"],
  },
  {
    index: "03",
    key: "sales",
    title: "SALES & REVENUE",
    summary: "Turn demand into predictable commercial performance.",
    items: ["Lead management", "Sales process", "Conversion", "Follow-up", "Renewals", "Upselling", "Cross-selling", "Revenue tracking", "Sales performance"],
  },
  {
    index: "04",
    key: "systems",
    title: "SYSTEMS & SOPs",
    summary: "Replace individual dependency with repeatable systems.",
    items: ["SOPs", "Checklists", "Workflows", "Reporting", "Escalation systems", "Compliance", "Management cadence"],
  },
  {
    index: "05",
    key: "cx",
    title: "CUSTOMER EXPERIENCE",
    summary: "Make the customer experience consistent, measurable and repeatable.",
    items: ["Customer journey", "Service standards", "Feedback", "Complaint resolution", "Retention", "Loyalty", "Reviews"],
  },
  {
    index: "06",
    key: "performance",
    title: "PERFORMANCE & INTELLIGENCE",
    summary: "Know what is happening before it becomes a problem.",
    items: ["KPI dashboards", "Performance reviews", "Business reporting", "Revenue analysis", "Productivity", "Benchmarking", "Management insights"],
  },
  {
    index: "07",
    key: "growth",
    title: "GROWTH & EXPANSION",
    summary: "Build the operating capability required for the next stage.",
    items: ["Expansion planning", "New-location setup", "Replication systems", "Multi-location management", "Launch processes", "Operating standards"],
  },
];

export const V2_LAYERS_META = {
  index: "05",
  eyebrow: "WHAT WE OPERATE",
  headline: "THE OPERATING LAYERS WE BUILD",
};

/* §8 — INDUSTRIES */
export type Industry = {
  key: string;
  slug: string;
  title: string;
  segments: string;
  focusLabel: string;
  focus: string;
};

export const V2_INDUSTRIES: Industry[] = [
  {
    key: "fitness",
    slug: "/industries/fitness",
    title: "FITNESS & WELLNESS",
    segments: "Gyms · Pilates · Studios · Recovery · Wellness",
    focusLabel: "Operating experience",
    focus: "Sales, PT, membership, people, customer experience, location operations.",
  },
  {
    key: "retail",
    slug: "/industries/retail-luxury",
    title: "RETAIL & LUXURY",
    segments: "Fashion · Luxury Retail · Beauty · Lifestyle · Consumer Brands",
    focusLabel: "Operating focus",
    focus: "Store operations, sales teams, customer experience, inventory coordination, performance, SOPs.",
  },
  {
    key: "hospitality",
    slug: "/industries/hospitality",
    title: "HOSPITALITY",
    segments: "Hotels · Restaurants · Cafés · Experience Businesses",
    focusLabel: "Operating focus",
    focus: "Service standards, people, customer experience, daily operations, revenue and consistency.",
  },
  {
    key: "healthcare",
    slug: "/industries/healthcare",
    title: "HEALTHCARE & WELLNESS",
    segments: "Clinics · Centres · Healthcare Networks",
    focusLabel: "Operating focus",
    focus: "Process discipline, customer/patient experience, people, reporting and operational controls.",
  },
  {
    key: "consumer",
    slug: "/industries/consumer",
    title: "CONSUMER BUSINESSES",
    segments: "D2C · Physical Retail · Service Businesses · Emerging Brands",
    focusLabel: "Operating focus",
    focus: "Demand, fulfilment, service, people and the systems that keep them consistent.",
  },
  {
    key: "multi-location",
    slug: "/industries/multi-location",
    title: "MULTI-LOCATION BUSINESSES",
    segments: "One business. Multiple locations. One operating standard.",
    focusLabel: "Operating focus",
    focus: "Replication, standards, management structure, reporting and cross-location consistency.",
  },
];

export const V2_INDUSTRIES_META = {
  index: "06",
  eyebrow: "INDUSTRIES",
  headline: "ONE OPERATING DISCIPLINE. MANY BUSINESS MODELS.",
  subhead:
    "Different industries have different customers, products and economics. But every growing business eventually faces the same challenge:",
  question: "How do you make the business run consistently without everything depending on the owner?",
  fallbackTitle: "DON'T SEE YOUR INDUSTRY?",
  fallbackBody:
    "If your business has people, customers, processes and performance to manage, we should be able to understand the operating problem.",
  fallbackCta: "TALK TO PROATOPS",
};

/* §9 — OWNER PSYCHOLOGY */
export const V2_OWNER = {
  index: "07",
  eyebrow: "THE OWNER",
  headline: "YOU DIDN'T BUILD YOUR BUSINESS TO SPEND YOUR LIFE MANAGING EVERY PROBLEM.",
  opening: "You built it to create something valuable.",
  turn: "But somewhere along the way, growth creates complexity.",
  complexity: ["More employees.", "More customers.", "More decisions.", "More locations.", "More systems.", "More problems."],
  close: "And suddenly, the business that was supposed to create freedom starts demanding more of you.",
  statement: "PROATOPS BUILDS THE OPERATING LAYER BETWEEN YOUR VISION AND DAILY EXECUTION.",
};

/* §10 — OWNERSHIP VS OPERATIONS */
export const V2_OWNERSHIP = {
  index: "08",
  eyebrow: "THE MODEL",
  headlineA: "YOU KEEP OWNERSHIP.",
  headlineB: "WE TAKE OPERATING RESPONSIBILITY.",
  you: { title: "YOU", items: ["Vision", "Ownership", "Brand", "Capital Decisions", "Strategic Direction"] },
  us: { title: "PROATOPS", items: ["Operations", "People", "Systems", "Performance", "Reporting", "Execution"] },
  statement: "You don't need to give up control to stop carrying every operational problem.",
};

/* §11 — THE BUSINESS AUDIT */
export const V2_AUDIT = {
  index: "09",
  eyebrow: "THE FIRST STEP",
  headline: "START WITH THE BUSINESS AUDIT.",
  subhead: "Before we recommend anything, we understand how your business actually operates.",
  reviewLabel: "WE REVIEW",
  review: ["Operations", "People", "Sales", "Revenue", "Customer Experience", "Systems", "Performance", "Growth Readiness"],
  getLabel: "WHAT YOU GET",
  deliverables: [
    { key: "gap", title: "Operational Gap Map", body: "Where performance is being lost." },
    { key: "matrix", title: "Priority Matrix", body: "What needs attention first." },
    { key: "plan", title: "90-Day Action Plan", body: "What should change and in what sequence." },
    { key: "view", title: "Management View", body: "What the owner should monitor." },
  ],
  cta: "BOOK MY BUSINESS AUDIT",
};

/* §12 — THE AUDIT PROCESS */
export const V2_PROCESS = {
  index: "10",
  eyebrow: "THE PROCESS",
  headlineA: "YOUR FIRST STEP IS NOT TO HIRE US.",
  headlineB: "IT'S TO UNDERSTAND YOUR BUSINESS.",
  steps: [
    { index: "01", title: "DISCOVER", body: "Understand the business." },
    { index: "02", title: "DIAGNOSE", body: "Identify operational gaps." },
    { index: "03", title: "PRIORITIZE", body: "Separate critical problems from noise." },
    { index: "04", title: "DESIGN", body: "Build the improvement roadmap." },
    { index: "05", title: "PRESENT", body: "Show the owner what should change." },
    { index: "06", title: "OPERATE", body: "If there's a fit, Proatops can take responsibility for implementation and ongoing operations." },
  ],
};

/* §13 — THE PROATOPS OPERATING METHOD */
export const V2_METHOD = {
  index: "11",
  eyebrow: "THE METHOD",
  headline: "THE PROATOPS OPERATING METHOD",
  trademark: "™",
  steps: [
    { index: "01", title: "AUDIT", body: "See the business as it actually operates." },
    { index: "02", title: "DESIGN", body: "Create the operating blueprint." },
    { index: "03", title: "DEPLOY", body: "Install people, processes and systems." },
    { index: "04", title: "OPERATE", body: "Take responsibility for agreed functions." },
    { index: "05", title: "OPTIMIZE", body: "Measure, identify constraints and improve." },
    { index: "06", title: "SCALE", body: "Replicate what works." },
  ],
};

/* §14 — THE TRANSFORMATION */
export const V2_TRANSFORMATION = {
  index: "12",
  eyebrow: "THE SHIFT",
  headline: "FROM OWNER-DEPENDENT TO SYSTEM-DRIVEN.",
  before: { title: "BEFORE PROATOPS", items: ["Owner-dependent", "Fragmented processes", "Unclear accountability", "Inconsistent performance", "Limited visibility", "Difficult expansion"] },
  after: { title: "WITH PROATOPS", items: ["Clear ownership", "Standardized systems", "Accountable teams", "Measured performance", "Management visibility", "Scalable operation"] },
};

/* §15 — HONEST OUTCOMES */
export const V2_OUTCOMES = {
  statement:
    "We identify the operational constraints that may be limiting performance and build the systems required to address them.",
  disclaimer:
    "Actual outcomes depend on the business, market, implementation and decisions made during the engagement.",
};

/* §16 — PROOF / CREDIBILITY */
export const V2_PROOF = {
  index: "13",
  eyebrow: "CREDIBILITY",
  headline: "BUILT BY OPERATORS.",
  body: "Our operating experience comes from working inside real businesses — not simply studying them from the outside.",
  stats: [
    { value: 12, suffix: "+", label: "Years Operating Experience" },
    { value: 43, suffix: "+", label: "Locations Managed" },
    { value: 387, prefix: "₹", suffix: "+ Cr", label: "Revenue Managed" },
    { value: 516, suffix: "+", label: "Team Members Led" },
  ],
  disciplines: [
    "FITNESS OPERATIONS",
    "SALES MANAGEMENT",
    "PEOPLE MANAGEMENT",
    "MULTI-LOCATION OPERATIONS",
    "REVENUE MANAGEMENT",
    "CUSTOMER EXPERIENCE",
  ],
};

/* §18 — WHY PROATOPS (comparison table removed) */
export const V2_WHY = {
  index: "14",
  eyebrow: "WHY PROATOPS",
  headline: "NOT A CONSULTANT. NOT A STAFFING AGENCY. NOT JUST ANOTHER SOFTWARE PLATFORM.",
  statement: "WE OPERATE BETWEEN STRATEGY AND EXECUTION.",
  /* §19 — adapting rather than one playbook */
  adaptHeadlineA: "WE UNDERSTAND OPERATIONS.",
  adaptHeadlineB: "WE ADAPT THE OPERATING MODEL TO THE BUSINESS.",
  adaptBody: [
    "We don't force every business into the same playbook.",
    "We identify the operating principles that matter, then build the systems around the economics, people, customers and complexity of that business.",
  ],
};

/* §21 — THE PROATOPS OPERATING SYSTEM */
export const V2_OS = {
  index: "15",
  eyebrow: "THE FUTURE OF PROATOPS",
  headline: "INTRODUCING THE PROATOPS OPERATING SYSTEM",
  subhead: "One operating layer connecting people, processes, performance, data and technology.",
  note: "This is the direction Proatops is building toward, not a product available today.",
  pillars: ["PEOPLE", "SALES", "OPERATIONS", "CX", "FINANCE"],
  stack: ["DATA", "INTELLIGENCE", "AI", "SCALE"],
};

/* §22 — ENGAGEMENT LEVELS
   Five levels of involvement rather than four unordered "partner" types —
   the same business, choosing how deep Proatops goes. Sourced from the
   admin team's internal clarity deck (the ladder + deliverables), rewritten
   for a visitor rather than a staff member: the deck's audit-team framing
   ("Admin rule: explain the outcome first") stays a writing principle here,
   not literal on-page text. */
export const V2_ENGAGEMENTS = {
  index: "16",
  eyebrow: "ENGAGEMENT LEVELS",
  headline: "WHAT YOU ACTUALLY GET AT EACH STAGE.",
  subhead: "Same business. Five different levels of Proatops involvement — you choose where to start.",
  levels: [
    {
      index: "01",
      key: "audit",
      title: "BUSINESS AUDIT",
      outcome: "CLARITY",
      body: "What's wrong, why it's happening, and what should be fixed first.",
      deliverables: ["Business diagnosis", "Gap & root-cause analysis", "Priority roadmap"],
    },
    {
      index: "02",
      key: "build",
      title: "BUILD & IMPLEMENT",
      outcome: "STRUCTURE",
      body: "A business that runs through systems, not memory and individuals.",
      deliverables: ["SOPs and workflows", "KRAs, KPIs and reporting", "Sales, management and tech systems"],
    },
    {
      index: "03",
      key: "performance",
      title: "PERFORMANCE PARTNERSHIP",
      outcome: "VISIBILITY + ACCOUNTABILITY",
      body: "Who's performing, where revenue leaks, and what management should do next.",
      deliverables: ["Dashboards and KPIs", "Weekly and monthly reviews", "Accountability and optimization"],
    },
    {
      index: "04",
      key: "management",
      title: "MANAGEMENT PARTNERSHIP",
      outcome: "CONTROL",
      body: "Active management of managers, operations, sales, CX and reviews.",
      deliverables: ["Manage managers directly", "Track operations, sales and CX", "Resolve issues and run reviews"],
    },
    {
      index: "05",
      key: "operating",
      title: "OPERATING PARTNERSHIP",
      outcome: "FREEDOM TO SCALE",
      body: "The owner focuses on vision, capital, strategy and expansion — Proatops operates the agreed functions.",
      deliverables: ["Agreed operating responsibility", "People, operations and revenue", "Technology and intelligence"],
    },
  ],
};

/* §23 — IS PROATOPS RIGHT FOR ME */
export const V2_FIT = {
  index: "17",
  eyebrow: "FIT",
  headline: "PROATOPS MAY BE RIGHT FOR YOU IF…",
  checks: [
    "Your business has grown more complex.",
    "Too many decisions still come back to you.",
    "Your team works hard but performance isn't consistent.",
    "You don't have enough visibility into daily performance.",
    "Different locations operate differently.",
    "Your processes depend on individuals.",
    "You're planning expansion.",
    "You want the business to operate without your constant involvement.",
  ],
  close: "IF YOU RECOGNIZED YOUR BUSINESS IN TWO OR MORE OF THESE, LET'S TALK.",
  cta: "BOOK A BUSINESS AUDIT",
};

/* §24 — FAQ */
export const V2_FAQ = {
  index: "18",
  eyebrow: "QUESTIONS",
  headline: "WHAT OWNERS USUALLY ASK",
  items: [
    {
      q: "Do you only work with fitness businesses?",
      a: "No. Proatops is a Business Operations & Intelligence Platform. Our operating experience began strongly in fitness and wellness, but our operating framework is designed for businesses across industries.",
    },
    {
      q: "Do you replace our existing team?",
      a: "Not necessarily. Depending on the engagement, we can work with your existing team, strengthen the structure around them, build accountability or provide additional management capability.",
    },
    {
      q: "Do we have to give up control of our business?",
      a: "No. Ownership remains with you. Proatops takes responsibility only for the functions and decision rights agreed within the engagement.",
    },
    {
      q: "Do you provide consulting or management?",
      a: "Both can be part of an engagement. Our difference is that we focus on implementation and operational accountability rather than stopping at recommendations.",
    },
    {
      q: "How do we start?",
      a: "We start with a Business Audit to understand your current operating environment and identify the highest-priority opportunities.",
    },
    {
      q: "Do you work with small businesses?",
      a: "We work best with established businesses that have an existing operation, a team and a clear ambition to improve or scale.",
    },
  ],
};

/* §31/§17 — FINAL CTA */
export const V2_FINAL = {
  index: "19",
  eyebrow: "NEXT STEP",
  headline: "YOUR BUSINESS DESERVES AN OPERATION THAT CAN KEEP UP WITH YOUR AMBITION.",
  cta: "BOOK A BUSINESS AUDIT",
  /* §33 — the single psychological core of the site */
  coreA: "YOU OWN THE BUSINESS.",
  coreB: "WE BUILD THE MACHINE BEHIND IT.",
  coreStatement:
    "You don't have to sell your business, replace your team, or give up control to stop carrying the entire operation yourself.",
};

/* §25 — CONTACT */
export const V2_CONTACT = {
  eyebrow: "LET'S TALK",
  headline: "LET'S LOOK AT YOUR BUSINESS.",
  subhead:
    "Tell us where your business is today. We'll start by understanding where the operation is getting in the way of where you want to go.",
  cta: "REQUEST A BUSINESS AUDIT",
  challenges: [
    "Owner dependency",
    "Sales performance",
    "Team performance",
    "Operations",
    "Customer experience",
    "Revenue",
    "Systems/SOPs",
    "Multi-location management",
    "Expansion",
    "Other",
  ],
};

/* §26 — FORM CONFIRMATION */
export const V2_CONFIRMATION = {
  headline: "YOUR BUSINESS AUDIT REQUEST IS IN.",
  body: [
    "We've received your details.",
    "Our team will review the information before the conversation so we can make the discussion relevant to your business — not give you a generic sales pitch.",
  ],
  nextLabel: "WHAT HAPPENS NEXT",
  steps: [
    { index: "01", body: "We review your business." },
    { index: "02", body: "We identify the likely operating questions." },
    { index: "03", body: "We speak with you." },
    { index: "04", body: "If there's a genuine fit, we define the next step." },
  ],
};

/* §27 — FOOTER */
export const V2_FOOTER = {
  brand: "PROATOPS",
  descriptor: "Business Operations & Intelligence Platform",
  line: "Where Businesses Become Scalable.",
  columns: [
    {
      heading: "COMPANY",
      links: [
        { label: "What We Do", href: "/what-we-do" },
        { label: "Industries", href: "/industries" },
        { label: "How We Work", href: "/how-we-work" },
        { label: "Why Proatops", href: "/why-proatops" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/insights" },
      ],
    },
    {
      heading: "START",
      links: [
        { label: "Book a Business Audit", href: "/audit" },
        { label: "Let's Look at Your Business", href: "/audit" },
      ],
    },
  ],
  legalHeading: "LEGAL",
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  socialHeading: "SOCIAL",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/proatops/" },
    { label: "Instagram", href: "https://www.instagram.com/proatops" },
  ],
};

/**
 * §36 — the per-industry pages.
 *
 * Same argument as the homepage, said in the reader's own vocabulary: the
 * problems named the way that vertical names them, and only the operating
 * layers that matter most to it. `layers` keys into V2_LAYERS.
 */
export type IndustryPage = {
  headline: string;
  lede: string;
  problems: string[];
  layers: string[];
  statement: string;
};

export const INDUSTRY_PAGES: Record<string, IndustryPage> = {
  fitness: {
    headline: "YOUR MEMBERS FEEL THE OPERATION BEFORE THEY FEEL THE TRAINING.",
    lede: "Fitness businesses live on retention, and retention is an operating outcome — consistent service, a team that knows what it owns, and sales that don't depend on one person.",
    problems: [
      "Sales depend on one or two strong closers.",
      "Retention moves without anyone knowing why.",
      "PT revenue is inconsistent across trainers.",
      "The floor runs differently depending on who opened.",
      "Lead follow-up happens when someone remembers.",
      "Performance is visible only after the month closes.",
    ],
    layers: ["operations", "people", "sales", "cx"],
    statement: "Members don't renew because of equipment. They renew because the experience was the same every time they walked in.",
  },
  retail: {
    headline: "YOUR BRAND DESERVES AN OPERATION AS REFINED AS YOUR PRODUCT.",
    lede: "Luxury and retail businesses don't compete only on product. They compete on consistency, service, people, experience and execution.",
    problems: [
      "Inconsistent store execution.",
      "Sales team dependency.",
      "Uneven customer experience.",
      "Weak performance visibility.",
      "Founder dependency.",
      "Scaling challenges across locations.",
    ],
    layers: ["operations", "people", "sales", "cx"],
    statement: "Your brand should be defined by the customer — not by operational inconsistency.",
  },
  hospitality: {
    headline: "SERVICE IS A STANDARD, NOT A MOOD.",
    lede: "Hospitality is judged on the worst experience a guest has, not the average one. That consistency is built in the operation, long before the guest arrives.",
    problems: [
      "Service standards vary by shift.",
      "Guest experience depends on who is on the floor.",
      "Reviews move before management does.",
      "Staff productivity is hard to see.",
      "Covers and revenue fluctuate without explanation.",
      "New sites don't replicate the original.",
    ],
    layers: ["operations", "people", "cx", "performance"],
    statement: "A guest remembers whether it was handled well. They never see the system that made sure it was.",
  },
  healthcare: {
    headline: "PROCESS DISCIPLINE IS PATIENT EXPERIENCE.",
    lede: "Clinics and healthcare networks carry an operating burden most businesses don't: the process has to hold every single time.",
    problems: [
      "Process compliance varies between sites.",
      "Patient experience depends on individuals.",
      "Reporting arrives too late to act on.",
      "Staff roles and accountability blur.",
      "Escalation paths are informal.",
      "Expansion strains the existing structure.",
    ],
    layers: ["operations", "systems", "cx", "performance"],
    statement: "In healthcare, an inconsistent process isn't an operating inconvenience. It's a risk.",
  },
  consumer: {
    headline: "DEMAND IS NOT THE PROBLEM. FULFILLING IT CONSISTENTLY IS.",
    lede: "Consumer businesses can generate demand faster than they can build the operation to serve it — and the gap shows up as churn.",
    problems: [
      "Acquisition outpaces fulfilment capacity.",
      "Repeat purchase depends on the last experience.",
      "Support quality varies with volume.",
      "Margins move without a clear cause.",
      "Channel performance is hard to compare.",
      "Growth plans outrun the operating structure.",
    ],
    layers: ["operations", "sales", "cx", "growth"],
    statement: "Growth that the operation can't carry isn't growth. It's an expensive way to find your ceiling.",
  },
  "multi-location": {
    headline: "ONE BUSINESS. MULTIPLE LOCATIONS. ONE OPERATING STANDARD.",
    lede: "The second location is where a business finds out how much of its operation lived in one person's head.",
    problems: [
      "Every location operates slightly differently.",
      "The original site outperforms the rest.",
      "Managers interpret the standard their own way.",
      "Reporting isn't comparable across sites.",
      "The owner is the only common thread.",
      "Each new opening starts from scratch.",
    ],
    layers: ["operations", "systems", "performance", "growth"],
    statement: "Replication isn't opening another location. It's being able to open the same one again.",
  },
};

/* Page-level intros for the standalone routes.
   These deliberately do not repeat the headline of the first section on each
   page — a page header that restates the H2 immediately below it reads as a
   mistake, not as emphasis. */
export const V2_PAGES = {
  whatWeDo: {
    eyebrow: "WHAT WE OPERATE",
    headline: "SEVEN LAYERS. ONE OPERATING SYSTEM.",
    subhead:
      "Seven layers that turn a business run on individual effort into one run on structure. We build them, and where agreed, we operate them.",
  },
  industries: {
    eyebrow: "INDUSTRIES",
    headline: "EVERY BUSINESS BREAKS IN THE SAME PLACES.",
    subhead:
      "The business model changes. The operating discipline remains. That is where Proatops works.",
    closing: "WE BUILD THE OPERATING CAPABILITY THAT BUSINESSES NEED TO GROW.",
    closingBody: [
      "A gym has people, customers, sales, operations, revenue and systems.",
      "A luxury brand has people, customers, sales, operations, revenue and systems.",
      "A hotel has the same. A clinic has the same.",
    ],
  },
  howWeWork: {
    eyebrow: "HOW WE WORK",
    headline: "AUDIT. DESIGN. DEPLOY. OPERATE. OPTIMIZE. SCALE.",
    subhead:
      "A defined operating method, not a proposal. Every engagement starts by seeing the business as it actually operates.",
  },
  whyProatops: {
    eyebrow: "WHY PROATOPS",
    headline: "WE OPERATE BETWEEN STRATEGY AND EXECUTION.",
    subhead:
      "Advice ends at the recommendation. An operating partner stays for the part that actually changes the business.",
  },
  about: {
    eyebrow: "WHO'S BEHIND PROATOPS",
    headline: "WE'VE RUN THE OPERATION, NOT JUST ADVISED ON IT.",
    subhead:
      "Our operating experience comes from working inside real businesses — not simply studying them from the outside.",
  },
  insights: {
    eyebrow: "INSIGHTS",
    headline: "NOTES FROM THE OPERATION.",
    subhead:
      "Operating notes on the problems that repeat across businesses — owner dependency, inconsistent execution, and the systems that resolve them.",
    empty: "The first operating notes are being written. Check back shortly.",
  },
};
