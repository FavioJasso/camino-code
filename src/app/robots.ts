import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seo";

// AI crawlers are welcome (design section 8): one rule for everyone, nothing disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
