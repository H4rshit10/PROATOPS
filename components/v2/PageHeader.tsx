import WordReveal from "@/components/motion/WordReveal";
import Enter from "@/components/motion/Enter";
import { Crosshair } from "@/components/ui/Marker";

/**
 * The opening block every standalone page shares — eyebrow, headline, one
 * line of orientation. Keeps the six routes reading as one site rather than
 * six pages that happen to share a nav.
 */
export default function V2PageHeader({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
}) {
  return (
    <section className="grain grain-dark bg-op-charcoal pt-[72px]">
      <div className="shell-x mx-auto max-w-shell py-20 lg:py-28">
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
          <p className="mt-8 max-w-2xl text-pretty text-body-lg text-op-white/75">{subhead}</p>
        </Enter>
      </div>
    </section>
  );
}
