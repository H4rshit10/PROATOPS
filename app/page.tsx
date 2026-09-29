import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Ticker from "@/components/sections/Ticker";
import Dispatches from "@/components/sections/Dispatches";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Outcomes from "@/components/sections/Outcomes";
import Protocol from "@/components/sections/Protocol";
import Philosophy from "@/components/sections/Philosophy";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

/**
 * Section rhythm is deliberate: parchment is the canvas, with two charcoal
 * interruptions — Outcomes mid-page, the footer at the close — rather than a
 * repeating stripe. Dispatches stays on parchment and carries its contrast in
 * the cards themselves, so the proof lands early without spending a dark
 * interruption before the pitch has been made.
 *
 * The middle of the page follows the clarity deck's order: what the customer
 * buys (WhatWeDo), the problems that become those outcomes (Outcomes), then
 * the five stages that deliver them (Protocol).
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
      <Outcomes />
      <Protocol />
      <Philosophy />
      <FinalCTA />
      <Footer />
    </main>
  );
}
