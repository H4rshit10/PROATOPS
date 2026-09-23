import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2Hero from "@/components/v2/Hero";
import V2Problem from "@/components/v2/Problem";
import V2Consequence from "@/components/v2/Consequence";
import V2Solution from "@/components/v2/Solution";
import V2Layers from "@/components/v2/Layers";
import V2Industries from "@/components/v2/Industries";
import V2Ownership from "@/components/v2/Ownership";
import V2AuditOffer from "@/components/v2/AuditOffer";
import V2Method from "@/components/v2/Method";
import V2Proof from "@/components/v2/Proof";
import V2WhyProatops from "@/components/v2/WhyProatops";
import V2OperatingSystem from "@/components/v2/OperatingSystem";
import V2Faq from "@/components/v2/Faq";
import V2FinalCta from "@/components/v2/FinalCta";

/**
 * The homepage, in the blueprint's own order (§32).
 *
 * The sequence is the argument: problem → recognition → consequence →
 * possibility → solution → proof → trust → low-risk entry → conversion.
 * Sections alternate parchment and charcoal so the reader gets a change of
 * ground at each turn in that argument rather than one long scroll.
 */
export default function Home() {
  return (
    <main>
      {/* 01 */} <Nav />
      {/* 02 */} <V2Hero />
      {/* 03 */} <V2Problem />
      {/* 04 */} <V2Consequence />
      {/* 05 + 06 */} <V2Solution />
      {/* 07 */} <V2Layers />
      {/* 08 */} <V2Industries />
      {/* 09 + 10 */} <V2Ownership />
      {/* 11 + 12 */} <V2AuditOffer />
      {/* 13 + 14 + 15 */} <V2Method />
      {/* 16 */} <V2Proof />
      {/* 17 + 19 + 22 + 23 */} <V2WhyProatops />
      {/* 21 */} <V2OperatingSystem />
      {/* 24 */} <V2Faq />
      {/* close */} <V2FinalCta />
      <Footer />
    </main>
  );
}
