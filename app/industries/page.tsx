import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Industries from "@/components/v2/Industries";
import V2FinalCta from "@/components/v2/FinalCta";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

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
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />
      <V2Industries linked={false} />

      {/* §37 — the category argument: the model changes, the discipline doesn't */}
      <section className="grain grain-dark bg-op-charcoal py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <h2 className="headline max-w-4xl text-display-lg tracking-display text-op-white">
            {page.closing}
          </h2>
          <div className="mt-10 max-w-2xl space-y-3">
            {page.closingBody.map((line, i) => (
              <Reveal key={line} delay={i * 0.08}>
                <p className="text-body-md text-op-white/75">{line}</p>
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
