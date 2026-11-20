import { describe, expect, it } from "vitest";
import { discoveryFacts } from "./approach";
import { faq } from "./faq";
import { founder, whoYouWorkWith } from "./founder";
import * as proof from "./proof";
import { PAGE_PATHS } from "./seo";
import { servicePages, servicesIndex } from "./service-pages";
import { services } from "./services";
import { site } from "./site";
import { testimonialFor, testimonials } from "./testimonials";

/* Rules the copy has to keep, checked on the content files themselves so a slip fails before a page is built. */

const allCopy = { discoveryFacts, faq, founder, whoYouWorkWith, proof, servicePages, servicesIndex, services, site };

/** Every string in a value, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("copy", () => {
  const copy = strings(allCopy);

  it("has no placeholder, unfilled slot or note to self", () => {
    expect(copy.length).toBeGreaterThan(150);
    for (const line of copy) {
      expect(line).not.toMatch(/TODO|TBD|lorem|\[[^\]]*\]|\{\{|XXX|\?\?\?/i);
      expect(line.trim()).not.toBe("");
    }
  });

  it("keeps the house style: no exclamation marks and no long dashes", () => {
    for (const line of copy) expect(line).not.toMatch(/[!–—]/);
  });

  it("never calls the company a one-person shop, or claims a staff", () => {
    // "your team" (the client's) is fine: these are whole phrases
    for (const line of copy) expect(line).not.toMatch(/one-man|\bsolo\b|\bour team\b|\bour staff\b|award|years of experience/i);
  });
});

describe("testimonials", () => {
  it("are the two clients' own words: the short quote is a sentence of the full text", () => {
    expect(testimonials.map((t) => t.name)).toEqual(["Juan Porras", "Daniel Avila"]);
    for (const t of testimonials) {
      const full = t.full.join(" ");
      expect(full).toContain(t.quote);
      // one whole sentence: it starts a sentence and ends with its full stop
      expect(t.quote).toMatch(/^[A-Z].*\.$/);
      const at = full.indexOf(t.quote);
      expect(at === 0 || /[.!?] $/.test(full.slice(0, at))).toBe(true);
    }
  });

  it("each belong to one case study", () => {
    const studies = proof.caseStudies.map((s) => s.href as string);
    for (const t of testimonials) {
      expect(studies).toContain(t.href);
      expect(testimonialFor(t.href)).toBe(t);
    }
    expect(new Set(testimonials.map((t) => t.href)).size).toBe(testimonials.length);
  });
});

describe("case studies", () => {
  it("are listed in the order /work and the sitemap show them, each at its own page", () => {
    const hrefs = proof.caseStudies.map((s) => s.href as string);
    expect(hrefs).toEqual(PAGE_PATHS.filter((p) => p.startsWith("/work/")));
    expect(new Set(proof.caseStudies.map((s) => s.name)).size).toBe(hrefs.length);
  });

  it("show figures only where an outcome was measured", () => {
    expect(proof.transparentEnergy.figures.map((f) => f.value)).toEqual(["$65,000+", "85%", "3.5 months"]);
    expect(proof.danielAvila64.figures).toHaveLength(4);
    expect(proof.victoriasPainting).not.toHaveProperty("figures");
    expect(proof.danielAvila).not.toHaveProperty("figures");
    // nothing measured on the two website projects, so no percentages, multiples or round-the-clock claims
    for (const line of strings([proof.victoriasPainting, proof.victoriasPaintingStudy, proof.danielAvila, proof.danielAvilaStudy])) {
      expect(line).not.toMatch(/\d\s?%|\b\dx\b|24\/7|SEO/);
    }
  });

  it("give every image a sentence of alt text and the 1920 px file name the pages expect", () => {
    const images = [
      proof.danielAvila64.cardImage,
      proof.victoriasPainting.cardImage,
      proof.danielAvila.cardImage,
      ...proof.danielAvila64Study.gallery,
      ...proof.victoriasPaintingStudy.gallery,
      ...proof.danielAvilaStudy.gallery,
    ];
    expect(images).toHaveLength(14);
    for (const image of images) {
      expect(image.src).toMatch(/^\/work\/[a-z0-9-]+\/(card|gallery-0\d)\.webp$/);
      expect(image.alt.split(" ").length).toBeGreaterThan(8);
      expect(image.alt).toMatch(/\.$/);
    }
    expect(new Set(images.map((i) => i.src)).size).toBe(images.length);
  });

  it("point the two Daniel Avila studies at each other", () => {
    expect(proof.danielAvila64Study.firstSiteHref).toBe(proof.danielAvila.href);
    expect(proof.danielAvilaStudy.nextHref).toBe(proof.danielAvila64.href);
  });
});

describe("services", () => {
  it("each have a page, and only Software and Data carry a case study", () => {
    expect(services.map((s) => s.slug)).toEqual(["software", "data", "ai-governance"]);
    for (const s of services) {
      expect(s.href).toBe(`/services/${s.slug}`);
      expect(PAGE_PATHS).toContain(s.href);
      expect(servicePages[s.slug].slug).toBe(s.slug);
      expect(servicePages[s.slug].faq).toHaveLength(3);
    }
    expect(servicePages.software.proof).toBe("danielAvila64");
    expect(servicePages.data.proof).toBe("transparentEnergy");
    expect(servicePages["ai-governance"].proof).toBeNull();
  });
});

describe("FAQ", () => {
  it("has eight plain-text answers with no price, guarantee or ownership promise", () => {
    expect(faq).toHaveLength(8);
    expect(new Set(faq.map((f) => f.question)).size).toBe(8);
    for (const item of faq) {
      expect(item.question).toMatch(/\?$/);
      expect(item.answer).not.toMatch(/<|\$|guarantee|refund|you own/i);
    }
  });
});

describe("contact details", () => {
  it("derive their link targets from the published email and phone", () => {
    expect(site.contact.emailHref).toBe(`mailto:${site.contact.email}`);
    expect(site.contact.phoneHref).toBe("tel:+19732342073");
    expect(site.contact.phone.replace(/[^+\d]/g, "")).toBe("+19732342073");
  });
});
