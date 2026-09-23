import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2WhyProatops from "@/components/v2/WhyProatops";
import V2Proof from "@/components/v2/Proof";
import V2OperatingSystem from "@/components/v2/OperatingSystem";
import V2Faq from "@/components/v2/Faq";
import V2FinalCta from "@/components/v2/FinalCta";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

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
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />
      <V2Proof />
      <V2WhyProatops />
      <V2OperatingSystem />
      <V2Faq />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
