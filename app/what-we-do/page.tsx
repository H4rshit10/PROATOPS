import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Layers from "@/components/v2/Layers";
import V2Solution from "@/components/v2/Solution";
import V2FinalCta from "@/components/v2/FinalCta";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.whatWeDo;

export const metadata: Metadata = {
  title: `What We Operate — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/what-we-do` },
};

export default function WhatWeDoPage() {
  return (
    <main>
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />
      {/* Every layer open — this is the page someone came to read in full. */}
      <V2Layers expandAll />
      <V2Solution />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
