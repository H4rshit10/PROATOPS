import type { MetadataRoute } from "next";
import { PROATOPS } from "@/config/proatops";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PROATOPS.meta.domain}/sitemap.xml`,
  };
}
