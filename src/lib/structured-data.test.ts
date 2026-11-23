import { describe, expect, it } from "vitest";
import { PAGE_PATHS, SITE_URL, pageMetadata } from "@/content/seo";
import {
  ORGANIZATION_ID,
  absoluteUrl,
  breadcrumbList,
  caseStudyLd,
  faqPage,
  personLd,
  serviceLd,
} from "./structured-data";

describe("absoluteUrl", () => {
  it("puts a site path on the canonical host, and the home page on the bare origin", () => {
    expect(absoluteUrl("/")).toBe("https://www.caminocode.com");
    expect(absoluteUrl("/work/daniel-avila")).toBe("https://www.caminocode.com/work/daniel-avila");
  });

  it("leaves a full address alone", () => {
    expect(absoluteUrl("https://example.com/a")).toBe("https://example.com/a");
  });
});

describe("structured data builders", () => {
  it("numbers a breadcrumb trail from 1, home first", () => {
    const data = breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: "Victoria's Painting", path: "/work/victorias-painting" },
    ]);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: "Victoria's Painting", item: `${SITE_URL}/work/victorias-painting` },
    ]);
  });

  it("repeats questions and answers word for word", () => {
    const data = faqPage([{ question: "What does discovery cost?", answer: "Nothing. It is a free 45-minute conversation." }]);
    expect(data.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "What does discovery cost?",
        acceptedAnswer: { "@type": "Answer", text: "Nothing. It is a free 45-minute conversation." },
      },
    ]);
  });

  it("points a service, a case study and a person back to the one organization", () => {
    const org = { "@id": ORGANIZATION_ID };
    expect(ORGANIZATION_ID).toBe("https://www.caminocode.com/#organization");
    expect(serviceLd({ name: "Data", description: "d", path: "/services/data" }).provider).toEqual(org);
    const study = caseStudyLd({ headline: "h", description: "d", path: "/work/x" });
    expect(study.author).toEqual(org);
    expect(study.publisher).toEqual(org);
    expect(personLd({ name: "Favio Jasso", jobTitle: "Founder", path: "/about" }).worksFor).toEqual({
      ...org,
      name: "Camino Code",
    });
  });

  it("leaves out what a page does not have: no image, no subject, no profiles", () => {
    const bare = caseStudyLd({ headline: "h", description: "d", path: "/work/x" });
    expect(bare).not.toHaveProperty("image");
    expect(bare).not.toHaveProperty("about");
    const full = caseStudyLd({ headline: "h", description: "d", path: "/work/x", image: "/work/x/card.webp", about: "X" });
    expect(full.image).toBe(`${SITE_URL}/work/x/card.webp`);
    expect(full.about).toEqual({ "@type": "Thing", name: "X" });
    expect(personLd({ name: "n", jobTitle: "t", path: "/about" })).not.toHaveProperty("sameAs");
    expect(personLd({ name: "n", jobTitle: "t", path: "/about", sameAs: [] })).not.toHaveProperty("sameAs");
    expect(personLd({ name: "n", jobTitle: "t", path: "/about", sameAs: ["https://example.com/n"] }).sameAs).toEqual([
      "https://example.com/n",
    ]);
  });

  it("makes no rating, price or review claims", () => {
    const all = JSON.stringify([
      breadcrumbList([{ name: "Home", path: "/" }]),
      faqPage([{ question: "q", answer: "a" }]),
      serviceLd({ name: "n", description: "d", path: "/services/data" }),
      caseStudyLd({ headline: "h", description: "d", path: "/work/x" }),
      personLd({ name: "n", jobTitle: "t", path: "/about" }),
    ]);
    expect(all).not.toMatch(/rating|review|price|offers/i);
  });
});

describe("pageMetadata", () => {
  it("gives a page its canonical path and repeats title, description and the shared image in the share tags", () => {
    const meta = pageMetadata({ title: "Work: the case studies | Camino Code", description: "Case studies.", path: "/work" });
    expect(meta.title).toBe("Work: the case studies | Camino Code");
    expect(meta.alternates).toEqual({ canonical: "/work" });
    expect(meta.openGraph).toMatchObject({
      url: "/work",
      title: "Work: the case studies | Camino Code",
      description: "Case studies.",
      siteName: "Camino Code",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: "Work: the case studies | Camino Code", images: ["/og.png"] });
  });
});

describe("PAGE_PATHS", () => {
  it("lists each public page once, home first", () => {
    expect(PAGE_PATHS[0]).toBe("/");
    expect(new Set(PAGE_PATHS).size).toBe(PAGE_PATHS.length);
    for (const path of PAGE_PATHS) expect(path).toMatch(/^\/[a-z0-9/-]*$/);
  });
});
