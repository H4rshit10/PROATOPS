import type { Metadata } from "next";
import LegalPage from "@/components/v2/LegalPage";
import { PROATOPS } from "@/config/proatops";
import { CONTACT_EMAIL } from "@/lib/contact";

const { meta } = PROATOPS;

export const metadata: Metadata = {
  title: `Privacy Policy — ${meta.title}`,
  description: "What Proatops collects when you use this site, why, and how long it is kept.",
  alternates: { canonical: `${meta.domain}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      headline="PRIVACY POLICY"
      subhead="What this site collects, why it collects it, and how long it is kept. Written to describe what actually happens rather than to cover every eventuality."
      updated="September 2026"
      sections={[
        {
          heading: "WHAT WE COLLECT",
          body: [
            "The only information this site collects is what you type into the Business Audit form and choose to submit. That includes your name, business name, role, email address, phone number, location, and your answers to the assessment questions.",
            "We do not run advertising trackers, behavioural profiling, or third-party analytics that identify you personally.",
          ],
        },
        {
          heading: "WHY WE COLLECT IT",
          body: [
            "We use your submission to understand your business before speaking with you, so the conversation is about your operation rather than a generic pitch.",
            "We use your email address and phone number to reply to you. We do not add you to a marketing list without your agreement.",
          ],
        },
        {
          heading: "HOW IT REACHES US",
          body: [
            `Submissions are delivered by email to ${CONTACT_EMAIL}. Delivery is handled by a third-party email service acting on our behalf; your answers pass through that service in order to reach our inbox.`,
            "The site is hosted on Vercel, which processes standard server request information such as IP address as part of serving the page.",
          ],
        },
        {
          heading: "WHAT STAYS ON YOUR DEVICE",
          body: [
            "If you begin the Business Audit and do not finish it, your partial answers are saved in your own browser's local storage so you can pick up where you left off. That draft never leaves your device unless you submit the form.",
            "Clearing your browser data removes it. Submitting the form also clears it.",
          ],
        },
        {
          heading: "HOW LONG WE KEEP IT",
          body: [
            "Submitted enquiries are retained in our business inbox for as long as needed to evaluate and respond to the enquiry, and to keep a record of our correspondence with you.",
            "You can ask us to delete your enquiry and we will do so, unless we are required to retain it.",
          ],
        },
        {
          heading: "YOUR CHOICES",
          body: [
            "You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to us and we will action it.",
            "You are never required to complete the Business Audit to contact us — emailing us directly is always an option.",
          ],
        },
      ]}
    />
  );
}
