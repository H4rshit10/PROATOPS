import type { MetadataRoute } from "next";
import { PROATOPS } from "@/config/proatops";

/**
 * One page, one entry. The nav's #anchors (dispatches, what-we-do, model...)
 * are fragments of this same document, not separate crawlable URLs, so they
 * don't get their own sitemap rows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PROATOPS.meta.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
