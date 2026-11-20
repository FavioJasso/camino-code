/**
 * The route lists the specs share. Kept by hand, apart from the app's own list
 * (PAGE_PATHS in src/content/seo.ts), so the sitemap test compares two independent lists.
 * Add a new public page here and to PAGE_PATHS.
 */

/** Every public page, in the order the sitemap lists them. */
export const PAGES = [
  "/",
  "/services",
  "/services/software",
  "/services/data",
  "/services/ai-governance",
  "/work",
  "/work/transparent-energy",
  "/work/daniel-avila-64",
  "/work/victorias-painting",
  "/work/daniel-avila",
  "/approach",
  "/about",
  "/discovery",
  "/privacy",
  "/terms",
];

/**
 * Inner pages that get the full set of page checks in pages.spec.ts. The home page has
 * its own spec, and /discovery cannot carry a booking link to itself.
 */
export const ROUTES = PAGES.filter((p) => p !== "/" && p !== "/discovery");

/** The four case studies, in the order /work lists them. */
export const STUDIES = [
  "/work/transparent-energy",
  "/work/daniel-avila-64",
  "/work/victorias-painting",
  "/work/daniel-avila",
];

export const ORIGIN = "https://www.caminocode.com";

/** The address a page's canonical tag, og:url and sitemap entry carry. */
export const absolute = (path: string) => `${ORIGIN}${path === "/" ? "" : path}`;

export const EMAIL = "contact@caminocode.com";
export const EMAIL_HREF = "mailto:contact@caminocode.com";
export const PHONE = "+1 973-234-2073";
export const PHONE_HREF = "tel:+19732342073";
export const LINKEDIN = "https://www.linkedin.com/company/caminocode";
