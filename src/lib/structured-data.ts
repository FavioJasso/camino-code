import { SITE_URL } from "@/content/seo";
import { site } from "@/content/site";

/*
 * Builders for the structured data (JSON-LD) each page adds with <JsonLd data={...} />.
 * The layout already renders the organization once on every page, as the first
 * ld+json script; these objects point back to it by @id instead of repeating it.
 *
 * State only what the page itself shows. No ratings, prices or review counts.
 */

type Json = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Absolute URL for a site path ("/" becomes the bare origin). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

const organizationRef = { "@id": ORGANIZATION_ID } as const;

/** Breadcrumb trail, home first. Pass every level including the current page. */
export function breadcrumbList(trail: readonly { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Questions and answers exactly as they appear on the page (plain text answers). */
export function faqPage(items: readonly { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * One service the company offers, tied to its page. No areaServed: the site does not say
 * where Camino Code takes work, so the data does not either (see PLACEHOLDERS.md).
 */
export function serviceLd(input: { name: string; description: string; path: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: organizationRef,
  };
}

/** A case study page. `image` is a site path such as "/work/slug/card.webp". */
export function caseStudyLd(input: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  /** The client or project the study is about. */
  about?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.about ? { about: { "@type": "Thing", name: input.about } } : {}),
    author: organizationRef,
    publisher: organizationRef,
  };
}

/** A named person at the company, such as the founder. */
export function personLd(input: {
  name: string;
  jobTitle: string;
  path: string;
  image?: string;
  sameAs?: readonly string[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: [...input.sameAs] } : {}),
    worksFor: { ...organizationRef, name: site.name },
  };
}
