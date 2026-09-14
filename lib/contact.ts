export const CONTACT_EMAIL = "deploy@proatops.com";

/**
 * Builds a Gmail web compose URL that opens a pre-filled message in a new tab.
 */
export function gmailComposeUrl({
  subject,
  body,
  to = CONTACT_EMAIL,
}: {
  subject: string;
  body: string;
  to?: string;
}): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Default deployment inquiry draft. */
export const HELLO_DRAFT = {
  subject: "PROATOPS Deployment Inquiry",
  body: `PROATOPS Systems,

Organization: [your organization]
Operational scope: [number of locations / nodes]

Deployment requirements:
-

Requested timeline and governance parameters.

[Your name]
[Title]`,
};

/** Convenience URL for email links. */
export const HELLO_GMAIL_URL = gmailComposeUrl(HELLO_DRAFT);
