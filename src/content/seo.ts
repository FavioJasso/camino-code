import type { Metadata } from "next";

export const SITE_URL = "https://www.caminocode.com";

/** The one share image every page uses (rendered by scripts/render-stills.ts). */
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Camino Code" } as const;

/** Every public page, in the order the sitemap lists them. */
export const PAGE_PATHS = [
  "/",
  "/services",
  "/services/software",
  "/services/data",
  "/services/ai-governance",
  "/work",
  "/work/transparent-energy",
  "/work/victorias-painting",
  "/work/daniel-avila-64",
  "/work/daniel-avila",
  "/approach",
  "/about",
  "/discovery",
  "/privacy",
  "/terms",
] as const;

/**
 * Metadata for one page: the full title (written with its " | Camino Code" suffix),
 * a factual description, the canonical path, and share tags.
 *
 * A page-level `openGraph` replaces the layout's, so the shared image and site name
 * are restated here. Use this instead of writing `openGraph` by hand on a page.
 */
export function pageMetadata(page: { title: string; description: string; path: string }): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      siteName: "Camino Code",
      locale: "en_US",
      url: page.path,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}
