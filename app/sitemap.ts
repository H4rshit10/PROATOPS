import type { MetadataRoute } from "next";
import { PROATOPS } from "@/config/proatops";
import { V2_INDUSTRIES } from "@/config/v2";

/**
 * The V2 route map. /insights is left out deliberately — it has nothing
 * published yet and is marked noindex, so listing it would only invite
 * crawling of an empty page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = PROATOPS.meta.domain;

  const core = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/what-we-do", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/industries", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/how-we-work", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/why-proatops", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/audit", priority: 0.9, changeFrequency: "monthly" as const },
    /* Indexable, so they belong here — low priority, they're reference pages. */
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return [
    ...core.map((c) => ({
      url: `${base}${c.path}`,
      lastModified,
      changeFrequency: c.changeFrequency,
      priority: c.priority,
    })),
    ...V2_INDUSTRIES.map((i) => ({
      url: `${base}${i.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
