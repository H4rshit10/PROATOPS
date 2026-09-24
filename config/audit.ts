/**
 * The full PROATOPS Business Audit — copy and structure only.
 *
 * This is the same rule as config/proatops.ts: no UI component hardcodes a
 * question, option list, or section title. The wizard (components/audit/)
 * reads this file and renders generically off `type` — it has no idea what
 * question 37 says, only how to draw a `scale10` or a `checkboxes` field.
 * That's what keeps a 63-question, 13-section, 4-industry-branch form to a
 * handful of small components instead of sixty hand-built blocks.
 *
 * Field ids match the source document's question numbers (q1..q63) so the
 * spec and the code can be cross-referenced directly. Industry-conditional
 * fields are prefixed by vertical (ind_retail_*, ind_fitness_*, etc.).
 */

/**
 * The page's canvas — parchment or charcoal — and every dark/light-toned
 * class in AuditForm.tsx / AuditField.tsx / app/audit/page.tsx reads this
 * one value. It's been flipped twice already; the point of routing
 * everything through a single constant is that the third time is a
 * one-line edit here, not another sweep through every file that renders
 * the form.
 */
export const AUDIT_THEME: "light" | "dark" = "light";

export type AuditFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "pills"
  | "scale10"
  | "scale5"
  | "checkboxes";

export type AuditField = {
  id: string;
  label: string;
  type: AuditFieldType;
  required?: boolean;
  options?: string[];
  /** checkboxes only — "Select up to N" */
  max?: number;
  helper?: string;
  placeholder?: string;
  /** scale5 only — the five point labels, low to high */
  scaleLabels?: string[];
  /** Renders only when true — the one branch in the base 13 sections (Q63's
      "what are they helping you with?" follow-up only applies if Q63 is
      "Yes"). Industry branching is handled separately, at the section
      level, via INDUSTRY_SECTIONS below. */
  showIf?: (values: Record<string, string | string[] | undefined>) => boolean;
};

export type AuditSection = {
  id: string;
  index: string;
  title: string;
  intro?: string;
  fields: AuditField[];
};

export const AUDIT_INTRO = {
  eyebrow: "BUSINESS AUDIT",
  title: "LET'S UNDERSTAND YOUR BUSINESS.",
  lede: "Before we recommend anything, we want to understand how your business operates today.",
  body: "This assessment helps the Proatops team understand your business model, people, operations, revenue engine, challenges and growth ambitions so we can identify where opportunities or operational gaps may exist.",
  time: "Estimated completion time: 8–12 minutes",
  confidentiality:
    "Confidentiality: information shared through this assessment is treated as confidential and used only for business evaluation and discussion.",
  start: "BEGIN THE ASSESSMENT",
};

export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: "profile",
    index: "01",
    title: "BUSINESS PROFILE",
    fields: [
      { id: "q1", label: "Business / Brand Name", type: "text", required: true },
      { id: "q2", label: "Website / Instagram / LinkedIn", type: "text" },
      { id: "q3", label: "Your Name", type: "text", required: true },
      {
        id: "q4",
        label: "Designation / Role",
        type: "select",
        required: true,
        options: [
          "Founder",
          "Co-Founder",
          "Owner",
          "CEO / MD",
          "Director",
          "Business Head",
          "Operations Head",
          "Other",
        ],
      },
      { id: "q5", label: "Business Email", type: "email", required: true },
      { id: "q6", label: "Phone / WhatsApp", type: "tel", required: true },
      { id: "q7", label: "City / Country", type: "text", required: true },
      {
        id: "q8",
        label: "What industry does your business operate in?",
        type: "select",
        required: true,
        options: [
          "Fitness & Wellness",
          "Retail",
          "Luxury / Fashion",
          "Beauty & Lifestyle",
          "Hospitality",
          "Healthcare",
          "Food & Beverage",
          "Education",
          "Professional Services",
          "Consumer Brand",
          "E-commerce / D2C",
          "Manufacturing",
          "Technology",
          "Other",
        ],
      },
      {
        id: "q9",
        label: "Briefly describe your business.",
        helper: "What do you sell/provide, who are your customers and what makes your business different?",
        type: "textarea",
      },
    ],
  },
  {
    id: "scale",
    index: "02",
    title: "BUSINESS SCALE",
    fields: [
      {
        id: "q10",
        label: "How long has the business been operating?",
        type: "pills",
        required: true,
        options: ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"],
      },
      {
        id: "q11",
        label: "How many locations do you currently operate?",
        type: "pills",
        required: true,
        options: ["1", "2–5", "6–10", "11–25", "25+"],
      },
      {
        id: "q12",
        label: "What is your approximate team size?",
        type: "pills",
        required: true,
        options: ["1–5", "6–15", "16–30", "31–50", "51–100", "100+"],
      },
      {
        id: "q13",
        label: "Which stage best describes your business?",
        type: "pills",
        required: true,
        options: [
          "Early-stage",
          "Established",
          "Growing rapidly",
          "Mature",
          "Expanding to multiple locations",
          "Preparing for expansion",
          "Restructuring / turnaround",
        ],
      },
      {
        id: "q14",
        label: "What is your approximate annual revenue range?",
        helper: "This gives our team an understanding of business scale without forcing disclosure.",
        type: "select",
        options: [
          "Prefer not to disclose",
          "Below ₹50L",
          "₹50L–₹1Cr",
          "₹1–5Cr",
          "₹5–10Cr",
          "₹10–25Cr",
          "₹25–50Cr",
          "₹50Cr+",
          "Other",
        ],
      },
    ],
  },
  {
    id: "dependency",
    index: "03",
    title: "OWNER & MANAGEMENT DEPENDENCY",
    intro: "This is one of the most important sections for Proatops.",
    fields: [
      {
        id: "q15",
        label: "How involved are you in day-to-day operations?",
        type: "scale5",
        required: true,
        scaleLabels: [
          "Not involved",
          "Occasionally involved",
          "Moderately involved",
          "Highly involved",
          "Almost everything comes through me",
        ],
      },
      {
        id: "q16",
        label: "Approximately how many hours per week do you personally spend managing the business?",
        type: "pills",
        options: ["Less than 10", "10–20", "20–40", "40–60", "60+"],
      },
      {
        id: "q17",
        label: "What decisions still require your direct involvement?",
        helper:
          "Examples: hiring, discounts, customer complaints, purchasing, staff issues, sales decisions, vendor decisions, approvals.",
        type: "textarea",
      },
      {
        id: "q18",
        label: "If you were completely unavailable for 30 days, what would be most difficult for the business to manage?",
        type: "textarea",
      },
      {
        id: "q19",
        label: "How confidently could your business operate without your daily involvement?",
        type: "scale10",
      },
    ],
  },
  {
    id: "operations",
    index: "04",
    title: "OPERATIONS",
    fields: [
      { id: "q20", label: "How clearly defined are your daily operating processes?", type: "scale10" },
      {
        id: "q21",
        label: "Do you currently have documented SOPs?",
        type: "pills",
        options: ["Yes — comprehensive", "Yes — partially", "A few basic SOPs", "No", "Not sure"],
      },
      { id: "q22", label: "How consistently are SOPs followed?", type: "scale10" },
      {
        id: "q23",
        label: "How do you currently monitor daily operations?",
        type: "checkboxes",
        options: [
          "Daily reports",
          "Manager reports",
          "Dashboard",
          "CRM/software",
          "WhatsApp",
          "Meetings",
          "Manual tracking",
          "Owner observation",
          "We don't have a formal system",
          "Other",
        ],
      },
      {
        id: "q24",
        label: "What are the biggest operational challenges currently affecting the business?",
        type: "checkboxes",
        max: 5,
        options: [
          "Staff accountability",
          "Process inconsistency",
          "Owner dependency",
          "Poor reporting",
          "Communication",
          "Vendor management",
          "Quality control",
          "Facility/store operations",
          "Lack of SOPs",
          "Multi-location consistency",
          "Decision-making",
          "Other",
        ],
      },
      { id: "q25", label: "What is the single biggest operational problem you want solved?", type: "textarea" },
    ],
  },
  {
    id: "people",
    index: "05",
    title: "PEOPLE & TEAM",
    fields: [
      { id: "q26", label: "How would you rate your current team's overall performance?", type: "scale10" },
      { id: "q27", label: "How would you rate accountability within your team?", type: "scale10" },
      { id: "q28", label: "How effective is your current management structure?", type: "scale10" },
      {
        id: "q29",
        label: "What are your biggest people challenges?",
        type: "checkboxes",
        options: [
          "Hiring",
          "Retention",
          "Training",
          "Leadership",
          "Accountability",
          "Productivity",
          "Attendance",
          "Communication",
          "Performance management",
          "Incentives",
          "Culture",
          "Other",
        ],
      },
      {
        id: "q30",
        label: "Do employees have clearly defined KPIs?",
        type: "pills",
        options: ["Yes", "Partially", "No", "Not sure"],
      },
      {
        id: "q31",
        label: "How frequently do you formally review team performance?",
        type: "pills",
        options: ["Daily", "Weekly", "Monthly", "Quarterly", "Irregularly", "Never"],
      },
      { id: "q32", label: "What is the biggest team-related issue you would like to change?", type: "textarea" },
    ],
  },
  {
    id: "sales",
    index: "06",
    title: "SALES & REVENUE",
    fields: [
      { id: "q33", label: "How would you rate your current sales performance?", type: "scale10" },
      {
        id: "q34",
        label: "Do you have a defined sales process?",
        type: "pills",
        options: ["Yes", "Partially", "No"],
      },
      {
        id: "q35",
        label: "How do you currently track leads/customers?",
        type: "checkboxes",
        options: ["CRM", "Spreadsheet", "POS", "WhatsApp", "Manual records", "Other"],
      },
      {
        id: "q36",
        label: "Which areas are currently challenging?",
        type: "checkboxes",
        options: [
          "Lead generation",
          "Conversion",
          "Follow-up",
          "Sales team performance",
          "Repeat purchases",
          "Upselling",
          "Cross-selling",
          "Renewals",
          "Customer retention",
          "Pricing",
          "Revenue visibility",
          "Other",
        ],
      },
      {
        id: "q37",
        label: "Do you currently track conversion rates?",
        type: "pills",
        options: ["Yes", "Partially", "No"],
      },
      {
        id: "q38",
        label: "What are your approximate monthly sales/revenue trends?",
        type: "pills",
        options: ["Growing", "Stable", "Declining", "Highly inconsistent", "Prefer not to disclose"],
      },
      { id: "q39", label: "Where do you believe revenue is currently being lost?", type: "textarea" },
    ],
  },
  {
    id: "customer",
    index: "07",
    title: "CUSTOMER EXPERIENCE",
    fields: [
      { id: "q40", label: "How would you rate your overall customer experience?", type: "scale10" },
      {
        id: "q41",
        label: "How do you currently collect customer feedback?",
        type: "checkboxes",
        options: [
          "Reviews",
          "Surveys",
          "WhatsApp",
          "Calls",
          "CRM",
          "In-person feedback",
          "We don't formally collect feedback",
        ],
      },
      { id: "q42", label: "How are customer complaints handled?", type: "textarea" },
      { id: "q43", label: "What is your biggest customer-experience challenge?", type: "textarea" },
      {
        id: "q44",
        label: "Do you track customer retention/repeat business?",
        type: "pills",
        options: ["Yes", "Partially", "No", "Not applicable"],
      },
    ],
  },
  {
    id: "finance",
    index: "08",
    title: "FINANCE & BUSINESS CONTROL",
    intro: "This isn't an accounting audit — the goal is management visibility.",
    fields: [
      { id: "q45", label: "How clearly can you see your business performance on a weekly basis?", type: "scale10" },
      {
        id: "q46",
        label: "Which numbers do you regularly track?",
        type: "checkboxes",
        options: [
          "Revenue",
          "Gross margin",
          "Net profit",
          "Sales conversion",
          "Customer acquisition cost",
          "Customer retention",
          "Employee productivity",
          "Inventory",
          "Location performance",
          "Cash flow",
          "Other",
        ],
      },
      {
        id: "q47",
        label: "How frequently do you review business performance?",
        type: "pills",
        options: ["Daily", "Weekly", "Monthly", "Quarterly", "Irregularly"],
      },
      { id: "q48", label: "What financial/business metric concerns you most right now?", type: "textarea" },
    ],
  },
  {
    id: "systems",
    index: "09",
    title: "SYSTEMS & TECHNOLOGY",
    fields: [
      {
        id: "q49",
        label: "What systems/software do you currently use?",
        helper: "e.g. CRM, ERP, POS, HRMS, accounting software, inventory management, booking software.",
        type: "textarea",
      },
      { id: "q50", label: "How integrated are your current systems?", type: "scale10" },
      { id: "q51", label: "Where are you still dependent on manual work?", type: "textarea" },
      { id: "q52", label: "What would you most like to automate?", type: "textarea" },
    ],
  },
  {
    id: "growth",
    index: "10",
    title: "GROWTH & EXPANSION",
    fields: [
      {
        id: "q53",
        label: "What is your primary business objective for the next 12 months?",
        type: "checkboxes",
        max: 3,
        options: [
          "Increase revenue",
          "Improve profitability",
          "Improve operations",
          "Build a stronger team",
          "Reduce owner dependency",
          "Improve customer retention",
          "Open new locations",
          "Expand into new markets",
          "Launch new products/services",
          "Build systems",
          "Prepare for investment",
          "Other",
        ],
      },
      {
        id: "q54",
        label: "Are you planning to open new locations?",
        type: "pills",
        options: ["Yes — within 6 months", "Yes — within 12 months", "Yes — within 2–3 years", "Maybe", "No"],
      },
      { id: "q55", label: "What is currently preventing you from scaling faster?", type: "textarea" },
      {
        id: "q56",
        label: "If your business operated exactly the way you wanted, what would it look like 3 years from now?",
        type: "textarea",
      },
    ],
  },
  {
    id: "real-problem",
    index: "11",
    title: "THE OWNER'S REAL PROBLEM",
    fields: [
      { id: "q57", label: "If you could fix one thing in your business tomorrow, what would it be?", type: "textarea", required: true },
      { id: "q58", label: "What have you already tried to solve it?", type: "textarea" },
      { id: "q59", label: "What do you believe is the biggest thing holding the business back?", type: "textarea" },
      {
        id: "q60",
        label: "What do you think Proatops could potentially help you with?",
        type: "checkboxes",
        options: [
          "Operations",
          "Sales & Revenue",
          "Team & People",
          "SOPs & Systems",
          "Customer Experience",
          "Performance Management",
          "Technology / Automation",
          "Expansion",
          "Full Business Management",
          "Not sure — I want your assessment",
        ],
      },
    ],
  },
  {
    id: "readiness",
    index: "12",
    title: "READINESS",
    fields: [
      { id: "q61", label: "How urgent is the need to improve your operations?", type: "scale10", required: true },
      {
        id: "q62",
        label: "When would you ideally like to begin making changes?",
        type: "pills",
        required: true,
        options: ["Immediately", "Within 30 days", "Within 3 months", "Within 6 months", "Exploring for now"],
      },
      {
        id: "q63",
        label: "Are you currently working with any consultant, agency, management company or external operator?",
        type: "pills",
        options: ["Yes", "No"],
      },
      {
        id: "q63_followup",
        label: "What are they currently helping you with?",
        type: "textarea",
        showIf: (v) => v.q63 === "Yes",
      },
    ],
  },
  {
    id: "final",
    index: "13",
    title: "THE FINAL QUESTION",
    fields: [
      {
        id: "q64",
        label: "If nothing changes in your business over the next 12 months, what concerns you most?",
        type: "textarea",
        required: true,
      },
    ],
  },
];

/**
 * Q8's answer gates a short block of vertical-specific metrics, appended as
 * its own step right after Section 01. Anything outside these four buckets
 * (Beauty & Lifestyle, Healthcare, Technology, "Other", ...) skips straight
 * to Section 02 — this is the "one master audit, form adapts to the
 * business" behaviour called for in the spec, without a 14th static section
 * that's irrelevant to 10 of the 14 industry options.
 */
export const INDUSTRY_SECTIONS: Record<string, AuditSection> = {
  Retail: {
    id: "ind-retail",
    index: "01B",
    title: "RETAIL METRICS",
    fields: [
      { id: "ind_retail_stores", label: "Number of stores", type: "text" },
      { id: "ind_retail_revenue", label: "Store-wise revenue (approximate)", type: "textarea" },
      { id: "ind_retail_atv", label: "Average transaction value", type: "text" },
      { id: "ind_retail_footfall", label: "Footfall", type: "text" },
      { id: "ind_retail_conversion", label: "Conversion", type: "text" },
      { id: "ind_retail_inventory", label: "Inventory systems", type: "text" },
      { id: "ind_retail_stock", label: "Stock visibility", type: "text" },
      { id: "ind_retail_productivity", label: "Sales associate productivity", type: "text" },
      { id: "ind_retail_repeat", label: "Repeat customers", type: "text" },
      { id: "ind_retail_manager", label: "Store manager performance", type: "text" },
    ],
  },
  "Fitness & Wellness": {
    id: "ind-fitness",
    index: "01B",
    title: "FITNESS & WELLNESS METRICS",
    fields: [
      { id: "ind_fit_members", label: "Membership base", type: "text" },
      { id: "ind_fit_joins", label: "New joins (monthly)", type: "text" },
      { id: "ind_fit_renewals", label: "Renewals", type: "text" },
      { id: "ind_fit_pt_revenue", label: "PT revenue", type: "text" },
      { id: "ind_fit_pt_conversion", label: "PT conversion", type: "text" },
      { id: "ind_fit_lead_conversion", label: "Lead conversion", type: "text" },
      { id: "ind_fit_attendance", label: "Attendance", type: "text" },
      { id: "ind_fit_trainer_productivity", label: "Trainer productivity", type: "text" },
      { id: "ind_fit_utilization", label: "Membership utilization", type: "text" },
    ],
  },
  Hospitality: {
    id: "ind-hospitality",
    index: "01B",
    title: "HOSPITALITY METRICS",
    fields: [
      { id: "ind_hosp_occupancy", label: "Occupancy / covers", type: "text" },
      { id: "ind_hosp_ticket", label: "Average ticket", type: "text" },
      { id: "ind_hosp_repeat", label: "Repeat customers", type: "text" },
      { id: "ind_hosp_productivity", label: "Staff productivity", type: "text" },
      { id: "ind_hosp_satisfaction", label: "Guest satisfaction", type: "text" },
      { id: "ind_hosp_reviews", label: "Reviews", type: "text" },
      { id: "ind_hosp_revpau", label: "Revenue per available unit/table (where relevant)", type: "text" },
    ],
  },
  "E-commerce / D2C": {
    id: "ind-d2c",
    index: "01B",
    title: "E-COMMERCE / D2C METRICS",
    fields: [
      { id: "ind_d2c_orders", label: "Monthly orders", type: "text" },
      { id: "ind_d2c_aov", label: "AOV (average order value)", type: "text" },
      { id: "ind_d2c_cac", label: "CAC (customer acquisition cost)", type: "text" },
      { id: "ind_d2c_repeat", label: "Repeat purchase rate", type: "text" },
      { id: "ind_d2c_conversion", label: "Conversion rate", type: "text" },
      { id: "ind_d2c_returns", label: "Return rate", type: "text" },
      { id: "ind_d2c_fulfilment", label: "Fulfilment", type: "text" },
      { id: "ind_d2c_support", label: "Customer support", type: "text" },
      { id: "ind_d2c_channels", label: "Marketing channels", type: "text" },
    ],
  },
};

/* "Luxury / Fashion" reads on the same questions as "Retail" per the spec's
   "If Industry = Retail/Luxury" branch. */
INDUSTRY_SECTIONS["Luxury / Fashion"] = INDUSTRY_SECTIONS.Retail;

export const AUDIT_CTA = {
  submit: "REQUEST MY BUSINESS ASSESSMENT",
  submitting: "SUBMITTING",
  subCta: "No generic pitch. No obligation. We first understand the business.",
  back: "BACK",
  next: "CONTINUE",
  step: (n: number, total: number) => `SECTION ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
};

export const AUDIT_THANKS = {
  title: "WE'VE GOT IT.",
  body: [
    "Thank you for giving us a closer look into your business.",
    "Our team will review your responses and identify the areas that may require deeper discussion.",
    "If we see a potential fit, we'll come prepared to discuss your business — not sell you a generic package.",
  ],
  nextLabel: "NEXT",
  steps: [
    { index: "01", title: "Business Review", body: "Our team reviews your responses." },
    { index: "02", title: "Diagnostic Conversation", body: "We discuss the areas that require context." },
    { index: "03", title: "Operational Assessment", body: "We identify priorities and opportunities." },
    { index: "04", title: "Proatops Roadmap", body: "If there's a fit, we define what implementation could look like." },
  ],
  backHome: "BACK TO HOME",
  errorBody: "Something went wrong sending your assessment. Please email us directly and we'll pick it up from there.",
};

/**
 * The acknowledgement a visitor receives after submitting.
 *
 * Defined here, next to the copy it is built from, because two different
 * transports send it — the Resend route and the browser-side relay — and
 * they must not drift. It is built from AUDIT_THANKS so the email says
 * exactly what the thank-you screen says.
 */
export const VISITOR_AUTORESPONSE_TEXT = `${AUDIT_THANKS.title}

${AUDIT_THANKS.body.join("\n\n")}

${AUDIT_THANKS.nextLabel}
${AUDIT_THANKS.steps.map((s) => `${s.index} — ${s.title}: ${s.body}`).join("\n")}

PROATOPS — Business Operations & Management
admin@proatops.in`;

/**
 * A domain typed without a scheme ("instagram.com/x"), which no mail client
 * links reliably. Used to normalise the links answer before it is sent.
 *
 * Deliberately no lookbehind. A lookbehind would be the obvious way to skip
 * a domain that already carries "https://", but it is a *parse-time* syntax
 * error on iOS Safari before 16.4 — and this module is imported by the audit
 * form, so it would take the whole page down on those devices rather than
 * degrade. The leading boundary group does the same job: an already-prefixed
 * domain is preceded by "/", which is not a boundary character, so it never
 * matches. The replacement must therefore preserve $1.
 */
export const SCHEMELESS_LINK =
  /(^|[\s,;])((?:www\.)?[a-zA-Z0-9][\w-]*(?:\.[\w-]+)*\.(?:com|in|co|net|org|io|app|me|dev|shop|store|online|biz|info)(?:\/[^\s,]*)?)/g;
