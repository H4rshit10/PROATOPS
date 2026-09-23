import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import V2PageHeader from "@/components/v2/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { BtnInline } from "@/components/ui/Btn";
import { CONTACT_EMAIL } from "@/lib/contact";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared shell for the three legal pages.
 *
 * Their content describes what this site actually does — the audit form
 * emails an inbox, a draft is kept in the visitor's own browser, no
 * analytics or advertising trackers are loaded — rather than reciting a
 * generic template that claims things the site doesn't do. That accuracy is
 * the point: a privacy policy that overstates data collection is as wrong
 * as one that understates it.
 */
export default function LegalPage({
  eyebrow,
  headline,
  subhead,
  updated,
  sections,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <Nav />
      <V2PageHeader eyebrow={eyebrow} headline={headline} subhead={subhead} />

      <section className="grain bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <p className="font-mono text-mono-xs uppercase tracking-micro text-op-muted">
            Last updated — {updated}
          </p>

          <div className="mt-12 max-w-3xl border-t border-op-rule-strong">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <section className="border-b border-op-rule-strong py-10">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-mono-xs tabular text-op-crimson">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="headline text-display-sm tracking-display text-op-charcoal">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4 sm:pl-10">
                    {s.body.map((p) => (
                      <p key={p} className="max-w-2xl text-pretty text-body-md text-op-charcoal/80">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 max-w-3xl border border-op-rule-strong p-8">
              <h3 className="headline text-display-sm tracking-display text-op-charcoal">
                QUESTIONS ABOUT THIS?
              </h3>
              <p className="mt-3 max-w-xl text-body-md text-op-charcoal/80">
                Write to us and we&rsquo;ll answer directly.
              </p>
              <BtnInline href={`mailto:${CONTACT_EMAIL}`} className="mt-6">
                {CONTACT_EMAIL}
              </BtnInline>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
