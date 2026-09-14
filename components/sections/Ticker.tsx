import { PROATOPS } from "@/config/proatops";

const { ticker } = PROATOPS;

/**
 * Two counter-running rows of operational vocabulary.
 *
 * Structurally this is the reference's dual-row marquee; tonally it is not.
 * The reference runs bold display type on gold as a menu shout. Here both rows
 * are mono at tracker spacing on ink, separated by crosshairs — closer to a
 * status board than a banner, which is the register the rest of the page is in.
 *
 * Each row is duplicated once and translated -50%, so the loop is seamless.
 * The duplicate is aria-hidden; a screen reader hears the list a single time.
 */
function Row({
  items,
  reverse = false,
  className,
}: {
  items: readonly string[];
  reverse?: boolean;
  className: string;
}) {
  const sequence = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className={className}>{item}</span>
          <span aria-hidden="true" className="crosshair mx-7 sm:mx-9" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex w-max">
      <div
        className={`flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {sequence(false)}
        {sequence(true)}
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <section
      aria-label="Operational scope"
      className="grain grain-dark relative overflow-hidden border-y border-pa-hair bg-pa-ink py-7 sm:py-8"
    >
      {/* Both edges fade to ink so the loop never shows its seam at the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to right, #050708 0%, rgba(5,7,8,0.85) 6%, transparent 20%, transparent 80%, rgba(5,7,8,0.85) 94%, #050708 100%)",
        }}
      />

      <div className="relative z-[1] flex flex-col gap-3.5 sm:gap-4">
        <Row
          items={ticker.primary}
          className="font-display text-[1.5rem] uppercase leading-none tracking-[0.06em] text-pa-chalk-2 sm:text-[1.9rem]"
        />
        <Row
          items={ticker.secondary}
          reverse
          className="font-mono text-mono-xs uppercase tracking-micro text-pa-chalk-3/70"
        />
      </div>
    </section>
  );
}
