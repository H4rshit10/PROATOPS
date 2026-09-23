import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Industries from "@/components/v2/Industries";
import V2FinalCta from "@/components/v2/FinalCta";
import Marquee from "@/components/ui/Marquee";
import { RuleDraw } from "@/components/motion/Revealers";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES, V2_INDUSTRIES } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.industries;

export const metadata: Metadata = {
  title: `Industries — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/industries` },
};

export default function IndustriesPage() {
  return (
    <main>
      <Nav />
      <V2PageHeader
        eyebrow={page.eyebrow}
        headline={page.headline}
        subhead={page.subhead}
        cta={{ label: "BOOK A BUSINESS AUDIT", href: "/audit" }}
        secondary={{ label: "WHAT WE OPERATE", href: "/what-we-do" }}
      />

      {/* A charcoal band between the header and the grid — a break, not a wall. */}
      <div className="bg-op-charcoal">
        <Marquee tone="dark" items={V2_INDUSTRIES.map((i) => i.title)} />
      </div>

      <V2Industries linked />

      {/* §37 — the category argument: the model changes, the discipline doesn't.
          Parchment, because the charcoal final CTA follows immediately. */}
      <section className="grain blueprint bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <RuleDraw />
          <h2 className="headline mt-12 max-w-4xl text-display-lg tracking-display text-op-charcoal">
            {page.closing}
          </h2>
          <div className="mt-10 max-w-2xl space-y-4">
            {page.closingBody.map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                <p className="text-pretty text-body-lg text-op-charcoal/80">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <V2FinalCta />
      <Footer />
    </main>
  );
}
