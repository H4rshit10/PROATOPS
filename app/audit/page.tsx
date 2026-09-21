import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AuditForm from "@/components/audit/AuditForm";
import { PROATOPS } from "@/config/proatops";
import { AUDIT_THEME } from "@/config/audit";

const { meta } = PROATOPS;
const isDark = AUDIT_THEME === "dark";

export const metadata: Metadata = {
  title: `Business Audit — ${meta.title}`,
  description:
    "A 13-section operational assessment: business scale, owner dependency, systems, people, sales and growth. Ten minutes that replace a first sales call.",
  alternates: { canonical: `${meta.domain}/audit` },
  robots: { index: true, follow: true },
};

/**
 * The audit lives on its own page rather than the header's modal it used to
 * be — a 63-question assessment is a destination, not a dialog you can
 * dismiss by clicking outside it. Nav and Footer stay so it's still visibly
 * part of the same site, not a disconnected typeform.
 *
 * Canvas and header both follow AUDIT_THEME (config/audit.ts) — see that
 * file for why this is one constant rather than a background class
 * hardcoded here.
 */
export default function AuditPage() {
  return (
    <main>
      <Nav headerTheme={isDark ? "dark" : "light"} />
      <section
        className={`grain min-h-[90svh] pt-[72px] ${
          isDark ? "grain-dark bg-op-charcoal" : "bg-op-parchment"
        }`}
      >
        <div className="shell-x mx-auto max-w-3xl py-16 sm:py-24">
          <AuditForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
