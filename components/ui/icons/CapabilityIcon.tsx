export type CapabilityIconName =
  | "gear"
  | "people"
  | "chart"
  | "layers"
  | "growth"
  | "heart";

/**
 * Line glyphs for the hero capability bar. Single stroke weight, square caps,
 * no fills — they sit beside mono labels and must not out-weigh them.
 */
export default function CapabilityIcon({
  name,
  className = "",
}: {
  name: CapabilityIconName;
  className?: string;
}) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className,
  };

  switch (name) {
    case "gear":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="6.4" />
          <circle cx="10" cy="10" r="2.2" />
          <path d="M10 1.6v2M10 16.4v2M18.4 10h-2M3.6 10h-2" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="7.6" cy="7.4" r="2.6" />
          <path d="M2.6 16.4c0-2.6 2.2-4.4 5-4.4s5 1.8 5 4.4" />
          <path d="M13.4 5.2a2.4 2.4 0 0 1 0 4.6M14.6 12.4c1.8.5 3 1.9 3 4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 16V9.5M9.4 16V4.4M14.8 16v-8" />
          <path d="M2 18h16" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M10 2.4 2.6 6.2 10 10l7.4-3.8L10 2.4Z" />
          <path d="M2.6 10.6 10 14.4l7.4-3.8" />
          <path d="M2.6 14.6 10 18.4l7.4-3.8" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M10 16.6S3 12.4 3 7.6A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.6c0 4.8-7 9-7 9Z" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <path d="M5 15 15 5" />
          <path d="M7.4 5H15v7.6" />
        </svg>
      );
  }
}
