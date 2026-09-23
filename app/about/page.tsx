import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2Proof from "@/components/v2/Proof";
import V2Ownership from "@/components/v2/Ownership";
import V2FinalCta from "@/components/v2/FinalCta";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.about;

export const metadata: Metadata = {
  title: `Who's Behind Proatops — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <Nav headerTheme="dark" />
      <V2PageHeader eyebrow={page.eyebrow} headline={page.headline} subhead={page.subhead} />
      <V2Proof />
      {/* The operating model is the clearest statement of what this company is. */}
      <V2Ownership />
      <V2FinalCta />
      <Footer />
    </main>
  );
}
