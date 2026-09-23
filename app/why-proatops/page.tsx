import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Problem from "@/components/v2/Problem";
import V2Consequence from "@/components/v2/Consequence";
import V2WhyProatops from "@/components/v2/WhyProatops";
import V2Proof from "@/components/v2/Proof";
import V2OperatingSystem from "@/components/v2/OperatingSystem";
import V2Faq from "@/components/v2/Faq";
import V2FinalCta from "@/components/v2/FinalCta";
import Marquee from "@/components/ui/Marquee";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES, V2_PROOF } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.whyProatops;

export const metadata: Metadata = {
  title: `Why Proatops — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/why-proatops` },
};

export default function WhyProatopsPage() {
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
      {/* The argument in order: what's wrong (§3), what it costs (§4), that we
          can actually do it (§16), then why us (§18). The problem and
          consequence sections are the blueprint's, and this is where they
          belong — the case for Proatops is what this whole page is. */}
      <V2Problem />
      <V2Consequence />
      {/* Parchment: it follows the charcoal consequence section. */}
      <V2Proof tone="light" />

      {/* A charcoal band so two long parchment sections don't run together. */}
      <div className="bg-op-charcoal">
        <Marquee tone="dark" items={V2_PROOF.disciplines} />
      </div>

      <V2WhyProatops />
      <V2OperatingSystem />
      <V2Faq />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
