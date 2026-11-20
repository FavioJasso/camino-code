import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seo";

// One rule for every crawler, AI crawlers included, and nothing disallowed.
// The sitemap line uses the canonical host (www), the same one every page's canonical tag uses.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
