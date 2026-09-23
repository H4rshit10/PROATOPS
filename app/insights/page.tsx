import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2FinalCta from "@/components/v2/FinalCta";
import { Crosshair } from "@/components/ui/Marker";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.insights;

export const metadata: Metadata = {
  title: `Insights — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/insights` },
  /* Nothing published yet — no reason to invite indexing of an empty list. */
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <main>
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />

      <section className="grain bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <div className="flex max-w-2xl items-start gap-4 border border-op-rule-strong p-8">
            <Crosshair />
            <p className="text-body-md text-op-charcoal/80">{page.empty}</p>
          </div>
        </div>
      </section>

      <V2FinalCta />
      <Footer />
    </main>
  );
}
