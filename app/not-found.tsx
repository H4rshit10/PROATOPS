import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ArrowRevealButton from "@/components/ui/ArrowRevealButton";
import { Crosshair, Coordinates } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";

const { notFound, meta } = PROATOPS;

export const metadata: Metadata = {
  title: `${notFound.code} — ${meta.title}`,
  robots: { index: false, follow: true },
};

/**
 * A dead link still lands inside the same operating document as the rest of
 * the site — full Nav and Footer, same markers and mono register — rather
 * than dropping the visitor onto an unbranded stock page.
 */
export default function NotFound() {
  return (
    <main>
      <Nav headerTheme="light" />
      <section className="grain relative flex min-h-[90svh] items-center bg-op-parchment pt-[72px]">
        <div className="shell-x mx-auto w-full max-w-shell py-24">
          <div className="flex items-center gap-3">
            <Crosshair />
            <span className="font-mono text-mono-xs uppercase tracking-micro text-op-crimson">
              {notFound.eyebrow}
            </span>
          </div>

          <p className="headline mt-6 text-[22vw] leading-[0.85] tracking-display text-op-rule-strong sm:text-[16vw] lg:text-[12rem]">
            {notFound.code}
          </p>

          <h1 className="headline -mt-4 max-w-3xl text-display-lg tracking-display text-op-charcoal sm:-mt-8">
            {notFound.title}
          </h1>

          <p className="mt-6 max-w-md text-body-md text-op-charcoal/70">
            {notFound.body}
          </p>

          <div className="mt-10">
            <ArrowRevealButton label={notFound.cta} href="/" tone="light" />
          </div>

          <div className="mt-16">
            <Coordinates>{meta.coordinates}</Coordinates>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
