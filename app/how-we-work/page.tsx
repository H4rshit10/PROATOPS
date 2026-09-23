import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2AuditOffer from "@/components/v2/AuditOffer";
import V2Method from "@/components/v2/Method";
import V2FinalCta from "@/components/v2/FinalCta";
import Marquee from "@/components/ui/Marquee";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES, V2_PROCESS } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.howWeWork;

export const metadata: Metadata = {
  title: `How We Work — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/how-we-work` },
};

export default function HowWeWorkPage() {
  return (
    <main>
      <Nav />
      <V2PageHeader
        eyebrow={page.eyebrow}
        headline={page.headline}
        subhead={page.subhead}
        cta={{ label: "BOOK A BUSINESS AUDIT", href: "/audit" }}
        secondary={{ label: "WHY PROATOPS", href: "/why-proatops" }}
      />
      {/* The method first — this page is about the operating model, not the offer. */}
      <V2Method />

      {/* A charcoal band so two long parchment sections don't run together. */}
      <div className="bg-op-charcoal">
        <Marquee tone="dark" items={V2_PROCESS.steps.map((s) => s.title)} />
      </div>

      {/* Light so it reads as its own block against the charcoal CTA below it. */}
      <V2AuditOffer tone="light" />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
