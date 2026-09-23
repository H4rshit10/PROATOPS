import type { ReactNode } from "react";

/**
 * The button suite — primary, ghost, and a quiet inline variant.
 *
 * Adapted from the extracted Jingi component: same structure (label + arrow
 * that advances on hover, lift on hover, one easing), retuned to this
 * system — crimson rather than gold, 2px radius rather than 4, and the
 * site's mono tracking rather than a sans label. Replaces the inline button
 * markup that was repeated across every V2 section.
 */

type Tone = "light" | "dark";
type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-sm font-mono uppercase tracking-tracker transition-all duration-300 ease-op-editorial hover:-translate-y-[2px]";

const sizes = {
  md: "h-12 px-6 text-mono-sm",
  lg: "h-14 px-8 text-mono-sm",
  xl: "h-16 px-10 text-[0.8125rem]",
};

const styles: Record<Variant, Record<Tone, string>> = {
  primary: {
    /* On parchment the primary is charcoal; on charcoal it inverts to white.
       Both resolve to crimson on hover, which is the one accent this system
       allows itself. */
    light: "bg-op-charcoal text-op-white hover:bg-op-crimson",
    dark: "bg-op-white text-op-charcoal hover:bg-op-crimson hover:text-op-white",
  },
  ghost: {
    light:
      "border border-op-rule-strong text-op-charcoal hover:border-op-crimson hover:text-op-crimson",
    dark: "border border-op-white/25 text-op-white hover:border-op-crimson hover:text-op-crimson",
  },
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-op-editorial group-hover:translate-x-1"
    >
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function Btn({
  children,
  href,
  onClick,
  variant = "primary",
  tone = "light",
  size = "lg",
  arrow = true,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  tone?: Tone;
  size?: "md" | "lg" | "xl";
  arrow?: boolean;
  className?: string;
}) {
  const cls = `${base} ${sizes[size]} ${styles[variant][tone]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/** A text-only link that still gets the advancing arrow. */
export function BtnInline({
  children,
  href,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  href: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 font-mono text-mono-sm uppercase tracking-tracker transition-colors duration-op-micro ease-op-micro ${
        tone === "dark"
          ? "text-op-white hover:text-op-crimson"
          : "text-op-charcoal hover:text-op-crimson"
      } ${className}`}
    >
      {children}
      <Arrow />
    </a>
  );
}
