import WordReveal from "@/components/motion/WordReveal";
import Enter from "@/components/motion/Enter";
import { Crosshair } from "@/components/ui/Marker";
import { Btn } from "@/components/ui/Btn";
import HeaderArt, { type HeaderArtName } from "@/components/svg/HeaderArt";

/**
 * The opening block every standalone page shares.
 *
 * Sized as a real page-opening rather than a label: display-xl headline,
 * body-lg standfirst, and the same two-button pairing the hero uses, so a
 * visitor landing here from search has the same next step available as one
 * arriving from the homepage.
 */
export default function V2PageHeader({
  eyebrow,
  headline,
  subhead,
  cta,
  secondary,
  art,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  art?: HeaderArtName;
}) {
  return (
    <section className="grain grain-dark blueprint-dark overflow-hidden bg-op-charcoal pt-[72px]">
      <div className="shell-x relative mx-auto max-w-shell py-20 lg:py-28">
        <Enter delay={0.05}>
          <div className="flex items-center gap-3">
            <Crosshair />
            <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
              {eyebrow}
            </span>
          </div>
        </Enter>

        <h1 className="mt-7 max-w-5xl">
          <WordReveal
            as="span"
            text={headline}
            delay={0.15}
            className="headline block text-display-xl tracking-display text-op-white"
          />
        </h1>

        <Enter delay={0.5}>
          <p className="mt-8 max-w-2xl text-pretty text-body-lg text-op-white/80">{subhead}</p>
        </Enter>

        {(cta || secondary) && (
          <Enter delay={0.64}>
            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              {cta && (
                <Btn href={cta.href} tone="dark" variant="primary">
                  {cta.label}
                </Btn>
              )}
              {secondary && (
                <Btn href={secondary.href} tone="dark" variant="ghost">
                  {secondary.label}
                </Btn>
              )}
            </div>
          </Enter>
        )}

        {/* Line art for the page's subject. Below xl it sits under the
            buttons, left-aligned; from xl up it is set in the free corner to
            the right of the standfirst and buttons, which end well short of
            it, so it never meets the text. Purely decorative. */}
        {art && (
          <div
            aria-hidden="true"
            className="pointer-events-none mt-12 w-44 text-op-white/35 sm:w-52 xl:absolute xl:bottom-20 xl:right-16 xl:mt-0 xl:w-64"
          >
            <HeaderArt name={art} />
          </div>
        )}
      </div>
    </section>
  );
}
