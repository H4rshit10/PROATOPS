import type { Metadata } from "next";
import LegalPage from "@/components/v2/LegalPage";
import { PROATOPS } from "@/config/proatops";

const { meta } = PROATOPS;

export const metadata: Metadata = {
  title: `Terms of Use — ${meta.title}`,
  description: "The terms that apply to using the Proatops website.",
  alternates: { canonical: `${meta.domain}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      headline="TERMS OF USE"
      subhead="The terms that apply to this website. Terms for an actual engagement are set out separately in that engagement's own agreement."
      updated="September 2026"
      sections={[
        {
          heading: "WHAT THIS SITE IS",
          body: [
            "This website describes the operating services Proatops offers. It is informational.",
            "Nothing on this site is an offer, a quotation, or a commitment to provide services. Any engagement between Proatops and a business is governed solely by a separate written agreement signed by both parties.",
          ],
        },
        {
          heading: "NO GUARANTEED OUTCOMES",
          body: [
            "We describe the operating constraints we look for and the systems we build to address them. We do not promise specific revenue, profit, or performance results.",
            "Actual outcomes depend on the business, its market, how the work is implemented, and decisions made during the engagement — much of which sits outside our control.",
          ],
        },
        {
          heading: "THE BUSINESS AUDIT",
          body: [
            "Submitting the Business Audit form does not create a client relationship and does not oblige either side to proceed.",
            "Information you give us in the audit is treated as confidential and used for evaluation and discussion, as set out in our Privacy Policy.",
          ],
        },
        {
          heading: "ACCURACY",
          body: [
            "We keep the content on this site current, but we do not warrant that everything is complete or free of error at all times.",
            "Where figures describing our operating experience appear, they are cumulative across the businesses our team has operated.",
          ],
        },
        {
          heading: "INTELLECTUAL PROPERTY",
          body: [
            "The content, design, and framework names on this site belong to Proatops. You may read and share the pages; you may not reproduce the material as your own.",
          ],
        },
        {
          heading: "CHANGES",
          body: [
            "We may update these terms. The date at the top of this page shows when they last changed.",
          ],
        },
      ]}
    />
  );
}
