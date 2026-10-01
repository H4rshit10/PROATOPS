import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Layers from "@/components/v2/Layers";
import V2Solution from "@/components/v2/Solution";
import V2FinalCta from "@/components/v2/FinalCta";
import Marquee from "@/components/ui/Marquee";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES, V2_LAYERS } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.whatWeDo;

export const metadata: Metadata = {
  title: `What We Operate — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/what-we-do` },
};

/**
 * Ground alternates on the way down — charcoal header, parchment layers, a
 * charcoal ticker as the break, parchment again, charcoal close. Stacking
 * two dark sections back to back read as one undifferentiated black wall.
 */
export default function WhatWeDoPage() {
  return (
    <main>
      <Nav />
      <V2PageHeader
        art="layers"
        eyebrow={page.eyebrow}
        headline={page.headline}
        subhead={page.subhead}
        cta={{ label: "BOOK A BUSINESS AUDIT", href: "/audit" }}
        secondary={{ label: "HOW WE WORK", href: "/how-we-work" }}
      />

      {/* every layer open — this is the page someone came to read in full */}
      <V2Layers expandAll tone="light" />

      <div className="bg-op-charcoal">
        <Marquee tone="dark" items={V2_LAYERS.map((l) => l.title)} />
      </div>

      <V2Solution />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
