/**
 * The PROATOPS glyph set.
 *
 * One 24-unit grid, one stroke weight, square caps and joins — drawn as
 * technical marks rather than friendly icons, so they sit with the crosshairs
 * and bracket tags rather than against them. Everything is `currentColor`, so
 * a glyph takes the ink of whatever it sits inside and needs no tone prop.
 *
 * Grouped by where they're used: operating layers, industries, engagement
 * models, audit deliverables, then the structural marks.
 */

type GlyphProps = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...S}
    >
      {children}
    </svg>
  );
}

/* ---------------- Operating layers (7) ---------------- */

/** Operations — a floor plan: structure around the day-to-day. */
export function GlyphOperations({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M2.5 9.5h19M9.5 9.5v12M15.5 2.5v7" />
    </Frame>
  );
}

/** People — three nodes with defined reporting lines. */
export function GlyphPeople({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="9" y="2.5" width="6" height="5" />
      <rect x="2.5" y="16.5" width="6" height="5" />
      <rect x="15.5" y="16.5" width="6" height="5" />
      <path d="M12 7.5v5M5.5 16.5v-4h13v4" />
    </Frame>
  );
}

/** Sales & revenue — a rising step line through a measured field. */
export function GlyphSales({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 21.5h19M2.5 2.5v19" />
      <path d="M5.5 17l4-4 3.5 3.5L21 7" />
      <path d="M17 7h4v4" />
    </Frame>
  );
}

/** Systems & SOPs — a stack of repeatable, checked procedures. */
export function GlyphSystems({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="3.5" y="2.5" width="17" height="6" />
      <rect x="3.5" y="10.5" width="17" height="6" />
      <path d="M6.5 5.5l1.5 1.5 3-3M6.5 13.5l1.5 1.5 3-3M3.5 19.5h17" />
    </Frame>
  );
}

/** Customer experience — a journey line through consistent touchpoints. */
export function GlyphCx({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 12h19" />
      <rect x="2.5" y="9.5" width="5" height="5" />
      <rect x="16.5" y="9.5" width="5" height="5" />
      <path d="M12 8.5v7" />
      <circle cx="12" cy="12" r="2.25" />
    </Frame>
  );
}

/** Performance & intelligence — measured bars read against a baseline. */
export function GlyphPerformance({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 21.5h19" />
      <rect x="4.5" y="13.5" width="4" height="8" />
      <rect x="10" y="8.5" width="4" height="13" />
      <rect x="15.5" y="4.5" width="4" height="17" />
      <path d="M2.5 11h19" strokeDasharray="2 2" />
    </Frame>
  );
}

/** Growth & expansion — one proven unit replicated outward. */
export function GlyphGrowth({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="8" height="8" />
      <rect x="13.5" y="2.5" width="8" height="8" strokeDasharray="2 2" />
      <rect x="2.5" y="13.5" width="8" height="8" strokeDasharray="2 2" />
      <rect x="13.5" y="13.5" width="8" height="8" strokeDasharray="2 2" />
      <path d="M6.5 5.5v4M4.5 7.5h4" />
    </Frame>
  );
}

/* ---------------- Industries (6) ---------------- */

/** Fitness & wellness — a loaded bar. */
export function GlyphFitness({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 12h19" />
      <rect x="4.5" y="7.5" width="3" height="9" />
      <rect x="16.5" y="7.5" width="3" height="9" />
      <rect x="1.5" y="9.5" width="3" height="5" />
      <rect x="19.5" y="9.5" width="3" height="5" />
    </Frame>
  );
}

/** Retail & luxury — a storefront with a defined entrance. */
export function GlyphRetail({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 8.5h19v13h-19z" />
      <path d="M2.5 8.5l2-6h15l2 6" />
      <path d="M9.5 21.5v-7h5v7" />
    </Frame>
  );
}

/** Hospitality — service brought to a table. */
export function GlyphHospitality({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 16.5h19" />
      <path d="M5 16.5a7 7 0 0 1 14 0" />
      <path d="M12 9.5v-3" />
      <path d="M6.5 21.5h11" />
    </Frame>
  );
}

/** Healthcare — a clinical cross held inside a controlled boundary. */
export function GlyphHealthcare({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M12 7v10M7 12h10" />
    </Frame>
  );
}

/** Consumer businesses — a unit moving through fulfilment. */
export function GlyphConsumer({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 7.5l9.5-5 9.5 5v9l-9.5 5-9.5-5z" />
      <path d="M2.5 7.5l9.5 5 9.5-5M12 12.5v9" />
    </Frame>
  );
}

/** Multi-location — several sites held to one standard. */
export function GlyphMultiLocation({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="12.5" width="6" height="9" />
      <rect x="9.5" y="8.5" width="5" height="13" />
      <rect x="15.5" y="12.5" width="6" height="9" />
      <path d="M2.5 5.5h19" strokeDasharray="2 2" />
      <path d="M12 5.5v3" />
    </Frame>
  );
}

/* ---------------- Engagement models (4) ---------------- */

/** Operating partner — responsibility handed across a boundary. */
export function GlyphOperatingPartner({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="6.5" width="8" height="11" />
      <rect x="13.5" y="6.5" width="8" height="11" />
      <path d="M10.5 12h3" />
      <path d="M12 10.5l1.5 1.5-1.5 1.5" />
    </Frame>
  );
}

/** Performance partner — a target held under measurement. */
export function GlyphPerformancePartner({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
    </Frame>
  );
}

/** Transformation partner — a structure redrawn. */
export function GlyphTransformation({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="8" height="8" />
      <rect x="13.5" y="13.5" width="8" height="8" strokeDasharray="2 2" />
      <path d="M10.5 6.5h7v7" />
      <path d="M15.5 11.5l2 2 2-2" />
    </Frame>
  );
}

/** Growth partner — the next stage prepared before it arrives. */
export function GlyphGrowthPartner({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 21.5h19" />
      <rect x="3.5" y="15.5" width="5" height="6" />
      <rect x="9.5" y="10.5" width="5" height="11" />
      <rect x="15.5" y="4.5" width="5" height="17" strokeDasharray="2 2" />
    </Frame>
  );
}

/* ---------------- Audit deliverables (4) ---------------- */

/** Operational gap map — where performance leaks. */
export function GlyphGapMap({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M2.5 9h19M2.5 15.5h19M9 2.5v19M15.5 2.5v19" />
      <path d="M9 9h6.5v6.5H9z" fill="currentColor" stroke="none" opacity="0.85" />
    </Frame>
  );
}

/** Priority matrix — what gets attention first. */
export function GlyphPriorityMatrix({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M3.5 21.5V2.5M3.5 21.5h18" />
      <rect x="6" y="5" width="6" height="6" />
      <rect x="13.5" y="5" width="6" height="6" fill="currentColor" stroke="none" opacity="0.85" />
      <rect x="6" y="13" width="6" height="6" />
      <rect x="13.5" y="13" width="6" height="6" />
    </Frame>
  );
}

/** 90-day action plan — sequenced, not simultaneous. */
export function GlyphActionPlan({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="4.5" width="19" height="17" />
      <path d="M2.5 9.5h19M7.5 2.5v4M16.5 2.5v4" />
      <path d="M6 13h4M6 17h8" />
    </Frame>
  );
}

/** Management view — what the owner should watch. */
export function GlyphManagementView({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M1.5 12s4-6.5 10.5-6.5S22.5 12 22.5 12s-4 6.5-10.5 6.5S1.5 12 1.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </Frame>
  );
}

/* ---------------- Structural marks ---------------- */

/** A checked condition — used in the "is this you?" list. */
export function GlyphCheck({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M7 12.5l3.5 3.5L17.5 9" />
    </Frame>
  );
}

/** A flow step marker. */
export function GlyphNode({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="6.5" y="6.5" width="11" height="11" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4" />
    </Frame>
  );
}

/** Downward flow arrow, for vertical sequences. */
export function GlyphFlowDown({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M12 3v18M7 16l5 5 5-5" />
    </Frame>
  );
}

/** Rightward flow arrow, for horizontal sequences. */
export function GlyphFlowRight({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M3 12h18M16 7l5 5-5 5" />
    </Frame>
  );
}

/** A constraint / ceiling — growth meeting a hard limit. */
export function GlyphCeiling({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 5.5h19" strokeWidth={2} />
      <path d="M12 21.5V9M7 14l5-5 5 5" />
    </Frame>
  );
}

/** The operating layer itself — a band between two planes. */
export function GlyphLayer({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <path d="M2.5 5.5h19M2.5 18.5h19" />
      <rect x="2.5" y="9.5" width="19" height="5" fill="currentColor" stroke="none" opacity="0.85" />
    </Frame>
  );
}

/** Data — records accumulating into something readable. */
export function GlyphData({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <ellipse cx="12" cy="5.5" rx="8.5" ry="3" />
      <path d="M3.5 5.5v13c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3v-13" />
      <path d="M3.5 12c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3" />
    </Frame>
  );
}

/** Intelligence — signal resolved out of the data. */
export function GlyphIntelligence({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M6 16l3.5-4.5 3 3L18 7.5" />
      <circle cx="9.5" cy="11.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="14.5" r="1.25" fill="currentColor" stroke="none" />
    </Frame>
  );
}

/** Scale — the same standard, repeated. */
export function GlyphScale({ className }: GlyphProps) {
  return (
    <Frame className={className}>
      <rect x="2.5" y="2.5" width="7" height="7" />
      <rect x="14.5" y="2.5" width="7" height="7" />
      <rect x="2.5" y="14.5" width="7" height="7" />
      <rect x="14.5" y="14.5" width="7" height="7" />
    </Frame>
  );
}

/* Lookup tables so sections can map data -> glyph without a switch. */
export const LAYER_GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  operations: GlyphOperations,
  people: GlyphPeople,
  sales: GlyphSales,
  systems: GlyphSystems,
  cx: GlyphCx,
  performance: GlyphPerformance,
  growth: GlyphGrowth,
};

export const INDUSTRY_GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  fitness: GlyphFitness,
  retail: GlyphRetail,
  hospitality: GlyphHospitality,
  healthcare: GlyphHealthcare,
  consumer: GlyphConsumer,
  "multi-location": GlyphMultiLocation,
};

export const ENGAGEMENT_GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  operating: GlyphOperatingPartner,
  performance: GlyphPerformancePartner,
  transformation: GlyphTransformation,
  growth: GlyphGrowthPartner,
};

export const DELIVERABLE_GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  gap: GlyphGapMap,
  matrix: GlyphPriorityMatrix,
  plan: GlyphActionPlan,
  view: GlyphManagementView,
};

export const SOLUTION_GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  people: GlyphPeople,
  process: GlyphSystems,
  performance: GlyphPerformance,
  scale: GlyphScale,
};
