"use client";

import Reveal from "@/components/motion/Reveal";
import { MethodFlow, TransformationDiagram } from "@/components/svg/Diagrams";
import { SectionRule } from "@/components/ui/Marker";
import { V2_METHOD, V2_TRANSFORMATION, V2_OUTCOMES } from "@/config/v2";

/**
 * §13 — the Proatops Operating Method, §14 — the transformation it produces,
 * and §15 — the honesty clause about what can and can't be promised.
 *
 * §15 sits here deliberately: the moment right after a before/after is
 * exactly where a reader starts wondering what's actually guaranteed, and
 * answering it plainly reads as confidence rather than hedging.
 */
export default function V2Method() {
  return (
    <section id="method" className="grain scroll-mt-20 bg-op-parchment py-section-gap">
      <div className="shell-x mx-auto max-w-shell">
        <SectionRule index={V2_METHOD.index} label={V2_METHOD.eyebrow} tone="light" />

        <h2 className="headline mt-10 text-display-lg tracking-display text-op-charcoal">
          {V2_METHOD.headline}
          <span className="align-super text-[0.4em] text-op-crimson">{V2_METHOD.trademark}</span>
        </h2>

        <Reveal delay={0.1}>
          <MethodFlow
            steps={V2_METHOD.steps}
            className="mt-12 hidden h-auto w-full text-op-charcoal md:block"
          />
        </Reveal>

        <ol className="mt-12 grid gap-px border border-op-rule-strong bg-op-rule-strong sm:grid-cols-2 lg:grid-cols-3">
          {V2_METHOD.steps.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.06}>
              <li className="h-full bg-op-parchment p-7">
                <span className="font-mono text-mono-sm tabular text-op-crimson">{s.index}</span>
                <h3 className="headline mt-3 text-display-sm tracking-display text-op-charcoal">
                  {s.title}
                </h3>
                <p className="mt-2 text-body-sm text-op-charcoal/75">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* ---- §14 before / after ---- */}
        <div className="mt-24 border-t border-op-rule-strong pt-14">
          <h2 className="headline max-w-3xl text-display-lg tracking-display text-op-charcoal">
            {V2_TRANSFORMATION.headline}
          </h2>

          <Reveal delay={0.1}>
            <TransformationDiagram
              before={V2_TRANSFORMATION.before.items}
              after={V2_TRANSFORMATION.after.items}
              className="mt-12 hidden h-auto w-full text-op-charcoal lg:block"
            />
          </Reveal>

          {/* the same content as two readable columns below lg */}
          <div className="mt-12 grid gap-px border border-op-rule-strong bg-op-rule-strong sm:grid-cols-2 lg:hidden">
            {[V2_TRANSFORMATION.before, V2_TRANSFORMATION.after].map((col, ci) => (
              <div key={col.title} className="bg-op-parchment p-7">
                <h3
                  className={`font-mono text-mono-sm uppercase tracking-tracker ${
                    ci === 1 ? "text-op-crimson" : "text-op-muted"
                  }`}
                >
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`text-body-md ${ci === 1 ? "text-op-charcoal" : "text-op-charcoal/60"}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---- §15 what we will and won't claim ---- */}
          <Reveal delay={0.15}>
            <div className="mt-14 max-w-3xl border-l border-op-crimson pl-6">
              <p className="text-pretty text-body-lg font-medium text-op-charcoal">
                {V2_OUTCOMES.statement}
              </p>
              <p className="mt-3 text-pretty text-body-sm text-op-charcoal/70">
                {V2_OUTCOMES.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
