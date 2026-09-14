import type { ReactNode } from "react";

export type Tone = "light" | "dark";

/**
 * Technical micro-details shared across every section.
 *
 * These are the pieces that make the page read as an operating document rather
 * than a marketing site: bracket tags, crimson crosshairs at section bounds,
 * hairline rules, and coordinate trackers. They carry no copy of their own —
 * everything they render is passed in from `config/proatops`.
 */

const toneText: Record<Tone, string> = {
  light: "text-op-charcoal",
  dark: "text-op-white",
};

const toneMuted: Record<Tone, string> = {
  light: "text-op-muted",
  dark: "text-op-muted",
};

const toneRule: Record<Tone, string> = {
  light: "bg-op-rule",
  dark: "bg-op-border",
};

/** A crimson `+` — pinned at section bounds and grid intersections. */
export function Crosshair({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`crosshair ${className}`} />;
}

/**
 * Registration marks at the four corners of a block.
 *
 * The crosshair itself is `position: relative` (its arms are absolutely
 * positioned against it), so it is wrapped rather than positioned directly —
 * putting an `absolute` utility on the crosshair would collide with that.
 */
export function CornerMarks({ className = "" }: { className?: string }) {
  const corners = [
    "-left-[5px] -top-[5px]",
    "-right-[5px] -top-[5px]",
    "-bottom-[5px] -left-[5px]",
    "-bottom-[5px] -right-[5px]",
  ];

  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute z-[3] ${pos} ${className}`}
        >
          <Crosshair />
        </span>
      ))}
    </>
  );
}

/** `[ 01 ]` — a technical index tag. */
export function BracketTag({
  children,
  tone = "light",
  accent = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-mono-xs uppercase tracking-micro tabular ${
        accent ? "text-op-crimson" : toneMuted[tone]
      } ${className}`}
    >
      <span aria-hidden="true">[&nbsp;</span>
      {children}
      <span aria-hidden="true">&nbsp;]</span>
    </span>
  );
}

/**
 * The rule that opens every section: a crosshair, a bracketed index, the
 * section eyebrow, then a hairline running to a closing crosshair.
 */
export function SectionRule({
  index,
  label,
  tone = "light",
  className = "",
}: {
  index: string;
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <Crosshair />
      <BracketTag tone={tone} accent>
        {index}
      </BracketTag>
      <span
        className={`font-mono text-mono-xs uppercase tracking-micro ${toneText[tone]}`}
      >
        {label}
      </span>
      <span aria-hidden="true" className={`h-px flex-1 ${toneRule[tone]}`} />
      <Crosshair />
    </div>
  );
}

/** Coordinate / establishment tracker. */
export function Coordinates({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-mono-xs uppercase tracking-micro tabular ${toneMuted[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
