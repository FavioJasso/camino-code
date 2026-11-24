import { describe, expect, it } from "vitest";
import { discoveryFacts } from "./approach";
import { faq } from "./faq";
import { founder, moreThan } from "./founder";
import * as proof from "./proof";
import { PAGE_PATHS } from "./seo";
import { proofFigure, servicePages, servicesIndex } from "./service-pages";
import { services } from "./services";
import { site } from "./site";
import { captionFor, testimonialFor, testimonials } from "./testimonials";

/* Rules the copy has to keep, checked on the content files themselves so a slip fails before a page is built. */

const allCopy = { discoveryFacts, faq, founder, proof, servicePages, servicesIndex, services, site };

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

  it("show the two sentences chosen for About, with a caption that says what was built", () => {
    expect(testimonials.map((t) => t.quote)).toEqual([
      "From the very beginning, Favio demonstrated a high level of professionalism, commitment, and a genuine interest in understanding the essence of my business.",
      "What impressed me most was how collaborative the process was.",
    ]);
    expect(testimonials.map(captionFor)).toEqual([
      "Juan Porras · Founder, Victoria's Painting · Business website",
      "Daniel Avila · IT Support Professional · Portfolio website",
    ]);
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
    // the system first, then the three web builds with the business client first
    expect(proof.caseStudies.map((s) => [s.name, s.kind])).toEqual([
      ["Transparent Energy", "Automation and data system"],
      ["Victoria's Painting", "Business website"],
      ["DANIEL AVILA 64", "Playable 3D portfolio"],
      ["Daniel Avila", "Portfolio site"],
    ]);
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
      // the band on the same page answers cost and reply time, so each page keeps two questions
      expect(servicePages[s.slug].faq).toHaveLength(2);
      for (const { q } of servicePages[s.slug].faq) expect(q).not.toMatch(/cost|hear back/i);
    }
    expect(servicePages.software.faq.map((f) => f.q)).toEqual([
      "Do we have to replace what we already use?",
      "Do you build websites too?",
    ]);
  });

  it("show Transparent Energy on Software and Data, each from its own side and with its own figure", () => {
    const software = servicePages.software.proof!;
    const data = servicePages.data.proof!;
    expect(software.study).toBe("transparentEnergy");
    expect(data.study).toBe("transparentEnergy");
    expect(servicePages["ai-governance"].proof).toBeNull();
    expect(proofFigure(software)).toEqual({ value: "85%", label: "less manual reconciliation work" });
    expect(proofFigure(data).value).toBe("$65,000+");
    expect(proofFigure(servicesIndex.proof).value).toBe("$65,000+");
    // Data keeps the study's own summary; Software describes the software side
    expect(data.summary).toBe(proof.transparentEnergy.summary);
    expect(software.summary).not.toBe(data.summary);
    expect(software.summary).toMatch(/runs on a schedule/);
  });

  it("lead Software with automation and keep a website as one part of it", () => {
    expect(services[0].line).toMatch(/^Automation/);
    expect(services[0].line).not.toMatch(/website/i);
    expect(servicePages.software.gets[0]).toMatch(/^Automation/);
    expect(servicePages.software.gets.at(-1)).toMatch(/^A website, when you need one/);
  });

  it("only offer DANIEL AVILA 64's developer figures on its own case study", () => {
    expect(Object.keys(proof.proofBlocks)).toEqual(["transparentEnergy"]);
    const elsewhere = strings({ servicePages, servicesIndex, services, founder, faq, testimonials, caseStudies: proof.caseStudies });
    for (const line of elsewhere) expect(line).not.toMatch(/158 kB/);
  });
});

describe("About", () => {
  it("asks three questions the page does not already answer, with plain-text answers and no price, guarantee or ownership promise", () => {
    expect(faq.map((f) => f.question)).toEqual([
      "Our data is a mess. Is that a problem?",
      "Do we have to replace the software we already use?",
      "How does the work run once we agree on it?",
    ]);
    for (const item of faq) {
      expect(item.question).toMatch(/\?$/);
      expect(item.answer).not.toMatch(/<|\$|guarantee|refund|you own/i);
    }
  });

  it("says the cleared $65,000+ figure in words, derived from the figure itself", () => {
    const [saved] = proof.transparentEnergy.figures;
    expect(saved.value).toBe("$65,000+");
    expect(moreThan(saved.value)).toBe("more than $65,000");
    const note = founder.about.note.join(" ");
    expect(note).toContain(`saves ${moreThan(saved.value)} a year in analyst time`);
    expect(note).toContain(`in ${proof.transparentEnergy.figures[2].value},`);
    // the figure itself, with its plus, stays on the figure blocks
    expect(note).not.toContain("$65,000+");
  });

  it("is in the first person from top to bottom", () => {
    const note = founder.about.note.join(" ");
    expect(note).toMatch(/\bI started Camino Code\b/);
    expect(note).not.toMatch(/\bFavio\b|\bhe\b/);
    for (const item of faq) expect(`${item.question} ${item.answer}`).not.toMatch(/\bFavio\b|\bhe\b/);
  });
});

describe("contact details", () => {
  it("derive their link targets from the published email and phone", () => {
    expect(site.contact.emailHref).toBe(`mailto:${site.contact.email}`);
    expect(site.contact.phoneHref).toBe("tel:+19732342073");
    expect(site.contact.phone.replace(/[^+\d]/g, "")).toBe("+19732342073");
  });
});
