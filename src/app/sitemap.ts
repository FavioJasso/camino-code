import type { MetadataRoute } from "next";
import { PAGE_PATHS, SITE_URL } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.map((path) => ({ url: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));
}
