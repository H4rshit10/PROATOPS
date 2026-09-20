import type { MetadataRoute } from "next";
import { PROATOPS } from "@/config/proatops";

/**
 * Two real pages. The nav's #anchors (dispatches, what-we-do, model...) are
 * fragments of the home document, not separate crawlable URLs, so they don't
 * get their own sitemap rows — but /audit is its own route now, not a modal,
 * so it belongs here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: PROATOPS.meta.domain,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PROATOPS.meta.domain}/audit`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
