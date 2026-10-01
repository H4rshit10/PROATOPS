import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import V2FinalCta from "@/components/v2/FinalCta";
import Reveal from "@/components/motion/Reveal";
import { RuleDraw } from "@/components/motion/Revealers";
import { Crosshair } from "@/components/ui/Marker";
import { BtnInline } from "@/components/ui/Btn";
import { PROATOPS } from "@/config/proatops";
import { V2_PAGES } from "@/config/v2";

const { meta } = PROATOPS;
const page = V2_PAGES.insights;

const ELSEWHERE = [
  {
    href: "/what-we-do",
    label: "WHAT WE OPERATE",
    body: "The five layers we take ownership of, each one broken down to what it actually covers.",
  },
  {
    href: "/how-we-work",
    label: "HOW WE WORK",
    body: "The method, the six-step process, and exactly what a business audit puts in front of you.",
  },
  {
    href: "/industries",
    label: "INDUSTRIES",
    body: "Where this has been run before, and what breaks first in each of them.",
  },
];

export const metadata: Metadata = {
  title: `Insights — ${meta.title}`,
  description: page.subhead,
  alternates: { canonical: `${meta.domain}/insights` },
  /* Nothing published yet — no reason to invite indexing of an empty list. */
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <main>
      <Nav />
      <V2PageHeader
        art="ledger"
        eyebrow={page.eyebrow}
        headline={page.headline}
        subhead={page.subhead}
        cta={{ label: "BOOK A BUSINESS AUDIT", href: "/audit" }}
        secondary={{ label: "WHAT WE OPERATE", href: "/what-we-do" }}
      />

      <section className="grain blueprint bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <div className="beam-card flex max-w-2xl items-start gap-4 border border-op-rule-strong p-8">
            <Crosshair />
            <p className="text-body-lg text-op-charcoal/80">{page.empty}</p>
          </div>

          {/* Nothing to list yet, so point at the pages that do have substance
              rather than leaving a visitor on a dead end. */}
          <RuleDraw className="mt-16" />
          <ul className="mt-12 grid gap-px border border-op-rule-strong bg-op-rule-strong sm:grid-cols-3">
            {ELSEWHERE.map((e, i) => (
              <Reveal key={e.href} delay={i * 0.07}>
                <li className="beam-card h-full bg-op-parchment p-7">
                  <BtnInline href={e.href}>{e.label}</BtnInline>
                  <p className="mt-4 text-body-md text-op-charcoal/75">{e.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <V2FinalCta />
      <Footer />
    </main>
  );
}
