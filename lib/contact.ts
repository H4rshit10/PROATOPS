/** Business inbox that receives every enquiry submitted on the site. */
export const CONTACT_EMAIL = "admin@proatops.in";

/**
 * Plain mailto link, so it opens whatever mail app the visitor uses. The old
 * Gmail compose URL sent anyone not signed in to Gmail to a Google login page.
 */
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "PROATOPS enquiry"
)}`;
