import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2AuditOffer from "@/components/v2/AuditOffer";
import V2Method from "@/components/v2/Method";
import V2FinalCta from "@/components/v2/FinalCta";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

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
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />
      {/* The method first — this page is about the operating model, not the offer. */}
      <V2Method />
      <V2AuditOffer />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
