import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/motion/Reveal";
import V2PageHeader from "@/components/v2/PageHeader";
import V2FinalCta from "@/components/v2/FinalCta";
import { INDUSTRY_GLYPHS, LAYER_GLYPHS } from "@/components/svg/Glyphs";
import { SectionRule } from "@/components/ui/Marker";
import { Btn } from "@/components/ui/Btn";
import { RuleDraw } from "@/components/motion/Revealers";
import { PROATOPS } from "@/config/proatops";
import { V2_INDUSTRIES, V2_LAYERS, INDUSTRY_PAGES } from "@/config/v2";

const { meta } = PROATOPS;

/** §35 — one master site, then a page per industry for relevance. */
export function generateStaticParams() {
  return V2_INDUSTRIES.map((i) => ({ slug: i.slug.replace("/industries/", "") }));
}

function find(slug: string) {
  const industry = V2_INDUSTRIES.find((i) => i.slug === `/industries/${slug}`);
  const page = INDUSTRY_PAGES[industry?.key ?? ""];
  return industry && page ? { industry, page } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};
  return {
    title: `${found.industry.title} — ${meta.title}`,
    description: found.page.lede,
    alternates: { canonical: `${meta.domain}/industries/${slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  const { industry, page } = found;
  const Glyph = INDUSTRY_GLYPHS[industry.key];

  return (
    <main>
      <Nav />
      <V2PageHeader
        eyebrow={`PROATOPS FOR ${industry.title}`}
        headline={page.headline}
        subhead={page.lede}
        cta={{ label: "BOOK A BUSINESS AUDIT", href: "/audit" }}
        secondary={{ label: "ALL INDUSTRIES", href: "/industries" }}
      />

      {/* what's actually going wrong in this vertical */}
      <section className="grain blueprint bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <SectionRule index="01" label="WHERE IT BREAKS" tone="light" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              {Glyph && <Glyph className="h-12 w-12 text-op-crimson" />}
              <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-wide text-op-muted">
                {industry.segments}
              </p>
            </div>

            <ul className="grid gap-px border border-op-rule-strong bg-op-rule-strong sm:grid-cols-2">
              {page.problems.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <li className="beam-card h-full bg-op-parchment p-6">
                    <span className="font-mono text-mono-sm tabular text-op-crimson">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-body-lg text-op-charcoal">{p}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* what we operate for them */}
      <section className="grain grain-dark blueprint-dark bg-op-charcoal py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <SectionRule index="02" label="WHAT WE OPERATE" tone="dark" />

          <div className="mt-10 grid gap-px border border-op-white/20 bg-op-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {V2_LAYERS.filter((l) => page.layers.includes(l.key)).map((l, i) => {
              const LayerGlyph = LAYER_GLYPHS[l.key];
              return (
                <Reveal key={l.key} delay={i * 0.06}>
                  <div className="beam-card h-full bg-op-charcoal p-6">
                    {LayerGlyph && <LayerGlyph className="h-9 w-9 text-op-crimson" />}
                    <h3 className="headline mt-5 text-display-md tracking-display text-op-white">
                      {l.title}
                    </h3>
                    <p className="mt-2 text-body-md text-op-white/70">{l.summary}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* The statement gets its own parchment band rather than trailing the
          dark grid — otherwise this section and the charcoal CTA below it run
          together into one unbroken black stretch. */}
      <section className="grain blueprint bg-op-parchment py-section-gap">
        <div className="shell-x mx-auto max-w-shell">
          <RuleDraw />
          <Reveal delay={0.1}>
            <p className="headline mt-12 max-w-4xl text-pretty text-display-md tracking-display text-op-charcoal">
              {page.statement}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Btn href="/audit" tone="light" variant="primary">
                BOOK A BUSINESS AUDIT
              </Btn>
              <Btn href="/industries" tone="light" variant="ghost">
                ALL INDUSTRIES
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <V2FinalCta />
      <Footer />
    </main>
  );
}
