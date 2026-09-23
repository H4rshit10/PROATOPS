import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Ticker from "@/components/sections/Ticker";
import Dispatches from "@/components/sections/Dispatches";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Model from "@/components/sections/Model";
import Protocol from "@/components/sections/Protocol";
import Sectors from "@/components/sections/Sectors";
import Philosophy from "@/components/sections/Philosophy";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

/**
 * Section rhythm is deliberate: parchment is the canvas, and charcoal blocks
 * (Model, Sectors, Final CTA + Footer) are full-bleed interruptions rather
 * than a repeating stripe. Dispatches stays on parchment and carries its
 * contrast in the cards themselves, so the proof lands early without spending
 * the first dark interruption before the pitch has been made.
 */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Partners />
      <Ticker />
      <Dispatches />
      <WhatWeDo />
      <Model />
      <Protocol />
      <Sectors />
      <Philosophy />
      <FinalCTA />
      <Footer />
    </main>
  );
}
