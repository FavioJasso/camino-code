import { expect, test } from "@playwright/test";
import { ORIGIN, PAGES, absolute } from "./routes";

// mirrors redirects() in next.config.ts
const REDIRECTS: Array<[string, string]> = [
  ["/case-studies", "/work"],
  ["/case-study/transparent-energy", "/work/transparent-energy"],
  ["/case-study/victorias-painting", "/work/victorias-painting"],
  ["/case-study/daniel-avila", "/work/daniel-avila"],
  ["/case-study/daniel-avila-64", "/work/daniel-avila-64"],
  // the catch-all after the specific rows: retired template pages, typos and the bare path
  ["/case-study/healthtrack", "/work"],
  ["/case-study/finserve", "/work"],
  ["/case-study", "/work"],
  ["/contact", "/discovery"],
  ["/manifest.json", "/manifest.webmanifest"],
  ["/og-images/og-image.png", "/og.png"],
  ["/assets/icon.png", "/icon-512.png"],
];

// the structured data each page adds after the organization, in document order
const PAGE_DATA: Record<string, string[]> = {
  "/": [],
  "/services": ["BreadcrumbList"],
  "/services/software": ["BreadcrumbList", "Service", "FAQPage"],
  "/services/data": ["BreadcrumbList", "Service", "FAQPage"],
  "/services/ai-governance": ["BreadcrumbList", "Service", "FAQPage"],
  "/work": ["BreadcrumbList"],
  "/work/transparent-energy": ["Article", "BreadcrumbList"],
  "/work/daniel-avila-64": ["Article", "BreadcrumbList"],
  "/work/victorias-painting": ["Article", "BreadcrumbList"],
  "/work/daniel-avila": ["Article", "BreadcrumbList"],
  "/approach": ["BreadcrumbList"],
  "/about": ["BreadcrumbList", "Person", "FAQPage"],
  "/discovery": ["BreadcrumbList"],
  "/privacy": ["BreadcrumbList"],
  "/terms": ["BreadcrumbList"],
};

const decode = (s: string) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

function structuredData(html: string): Array<Record<string, unknown>> {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
}

test("old URLs redirect permanently", async ({ request }) => {
  for (const [from, to] of REDIRECTS) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toBe(to);
  }
});

test("every redirect lands on a page that exists", async ({ request }) => {
  for (const [from, to] of REDIRECTS) {
    expect((await request.get(to)).status(), `${from} -> ${to}`).toBe(200);
  }
});

test("/services is a page now, not a redirect, and the retired feed is gone", async ({ request }) => {
  expect((await request.get("/services", { maxRedirects: 0 })).status()).toBe(200);
  // the old site's feed has no successor: a 404 is the right answer for it
  expect((await request.get("/rss.xml", { maxRedirects: 0 })).status()).toBe(404);
});

test("sitemap lists every page on www.caminocode.com", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect([...locs].sort()).toEqual(PAGES.map(absolute).sort());
});

test("robots allows all crawlers and points to the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const txt = await res.text();
  expect(txt).toMatch(/User-Agent: \*\s+Allow: \//i);
  expect(txt).not.toMatch(/Disallow:\s*\S/i);
  expect(txt).toContain("Sitemap: https://www.caminocode.com/sitemap.xml");
});

test("home has Organization JSON-LD in server HTML with the published email and Newark", async ({
  request,
}) => {
  const html = await (await request.get("/")).text();
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(m).not.toBeNull();
  const data = JSON.parse(m![1]);
  expect(data["@type"]).toBe("ProfessionalService");
  expect(data.email).toBe("contact@caminocode.com");
  expect(data.telephone).toBe("+1 973-234-2073");
  expect(data.address.addressLocality).toBe("Newark");
  expect(data.url).toBe("https://www.caminocode.com");
  expect(data.founder).toEqual({ "@type": "Person", name: "Favio Jasso" });
  expect(data.sameAs).toEqual(["https://www.linkedin.com/company/caminocode"]);
});

test("pages carry canonical and Open Graph tags", async ({ request }) => {
  for (const p of PAGES) {
    const html = await (await request.get(p)).text();
    expect(html, p).toContain('property="og:image"');
    expect(html, p).toContain("https://www.caminocode.com/og.png");
    // the canonical and og:url are this page's own address, exactly
    expect(html.match(/rel="canonical" href="([^"]*)"/)?.[1], p).toBe(absolute(p));
    expect(html.match(/property="og:url" content="([^"]*)"/)?.[1], p).toBe(absolute(p));
    expect(html, p).toContain('property="og:site_name" content="Camino Code"');
    expect(html, p).toMatch(/name="twitter:card" content="summary_large_image"/);
  }
});

test("every page has its own title and description, and the share tags repeat them", async ({ request }) => {
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();
  for (const p of PAGES) {
    const html = await (await request.get(p)).text();
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = decode(html.match(/name="description" content="([^"]*)"/)?.[1] ?? "");
    expect(title, p).toMatch(/Camino Code/);
    expect(description.length, p).toBeGreaterThan(50);
    expect(titles.get(title), `title "${title}" on ${p}`).toBeUndefined();
    expect(descriptions.get(description), `description of ${p}`).toBeUndefined();
    titles.set(title, p);
    descriptions.set(description, p);
    expect(decode(html.match(/property="og:title" content="([^"]*)"/)?.[1] ?? ""), p).toBe(title);
    expect(decode(html.match(/property="og:description" content="([^"]*)"/)?.[1] ?? ""), p).toBe(description);
  }
});

test("structured data on every page is valid JSON: the organization first, then the page's own", async ({
  request,
}) => {
  for (const p of PAGES) {
    const html = await (await request.get(p)).text();
    const blocks = structuredData(html); // throws on invalid JSON
    expect(blocks.map((b) => b["@type"]), p).toEqual(["ProfessionalService", ...PAGE_DATA[p]]);
    for (const block of blocks) expect(block["@context"], p).toBe("https://schema.org");
    expect(blocks[0]["@id"], p).toBe(`${ORIGIN}/#organization`);

    const crumbs = blocks.find((b) => b["@type"] === "BreadcrumbList") as
      | { itemListElement: Array<{ position: number; name: string; item: string }> }
      | undefined;
    if (crumbs) {
      const items = crumbs.itemListElement;
      expect(items.map((i) => i.position), p).toEqual(items.map((_, i) => i + 1));
      expect(items[0].item, p).toBe(ORIGIN);
      // the trail ends on the page itself, and every level is a real page
      expect(items.at(-1)!.item, p).toBe(absolute(p));
      for (const item of items) expect(PAGES.map(absolute), `${p}: ${item.item}`).toContain(item.item);
    }

    const article = blocks.find((b) => b["@type"] === "Article") as
      | { headline: string; url: string; image?: string; publisher: { "@id": string } }
      | undefined;
    if (article) {
      // the headline is the page's h1
      const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "").replace(/<[^>]+>/g, ""));
      expect(article.headline, p).toBe(h1);
      expect(article.url, p).toBe(absolute(p));
      expect(article.publisher["@id"], p).toBe(`${ORIGIN}/#organization`);
      if (article.image) {
        expect(article.image.startsWith(`${ORIGIN}/work/`), p).toBe(true);
        expect((await request.get(article.image.slice(ORIGIN.length))).status(), article.image).toBe(200);
      }
    }
    // no ratings, prices or review counts anywhere in the data
    expect(JSON.stringify(blocks), p).not.toMatch(/aggregateRating|reviewCount|ratingValue|"price"|"offers"/);
  }
});

test("service pages: the FAQ data repeats the questions shown, word for word", async ({ page }) => {
  for (const slug of ["software", "data", "ai-governance"]) {
    await page.goto(`/services/${slug}`);
    const shown = await page.locator("main dl.faq > div").evaluateAll((els) =>
      els.map((el) => ({ question: el.querySelector("dt")!.textContent, answer: el.querySelector("dd")!.textContent })),
    );
    // two questions each: the booking band on the same page answers cost and reply time
    expect(shown.length, slug).toBe(2);
    const blocks = structuredData(await page.content());
    const faq = blocks.find((b) => b["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(
      faq.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text })),
      slug,
    ).toEqual(shown);
    const service = blocks.find((b) => b["@type"] === "Service") as { name: string; url: string };
    expect(service.name, slug).toBe(await page.locator("h1").innerText());
    expect(service.url, slug).toBe(absolute(`/services/${slug}`));
  }
});

test("security headers are set and the server does not advertise itself", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("the content security policy is enforced and names only this origin in a production build", async ({
  request,
}) => {
  for (const path of ["/", "/discovery", "/og.png", "/no-such-page"]) {
    const h = (await request.get(path)).headers();
    // enforced, not report-only
    expect(h["content-security-policy-report-only"], path).toBeUndefined();
    const policy = Object.fromEntries(
      (h["content-security-policy"] ?? "").split("; ").map((d) => {
        const [name, ...values] = d.split(" ");
        return [name, values.join(" ")];
      }),
    );
    expect(policy, path).toEqual({
      "default-src": "'self'",
      "script-src": "'self' 'unsafe-inline'",
      "style-src": "'self' 'unsafe-inline'",
      "img-src": "'self'",
      "font-src": "'self'",
      "connect-src": "'self'",
      "frame-src": "'none'",
      "worker-src": "'self'",
      "manifest-src": "'self'",
      "object-src": "'none'",
      "base-uri": "'self'",
      "form-action": "'self'",
      "frame-ancestors": "'none'",
    });
    const permissions = h["permissions-policy"] ?? "";
    for (const feature of ["camera", "microphone", "geolocation", "payment", "usb"]) {
      expect(permissions, path).toContain(`${feature}=()`);
    }
  }
});

test("web manifest names the site and its icons resolve", async ({ request }) => {
  const res = await request.get("/manifest.webmanifest");
  expect(res.status()).toBe(200);
  const m = await res.json();
  expect(m.name).toBe("Camino Code");
  expect(m.short_name).toBe("Camino Code");
  expect(m.start_url).toBe("/");
  expect(m.display).toBe("browser");
  expect(m.theme_color).toBe("#0e1320");
  expect(m.background_color).toBe("#0e1320");
  const srcs = [...new Set((m.icons as Array<{ src: string }>).map((i) => i.src))].sort();
  expect(srcs).toEqual(["/icon-192.png", "/icon-512.png"]);
  for (const src of srcs) {
    const icon = await request.get(src);
    expect(icon.status(), src).toBe(200);
    expect(icon.headers()["content-type"], src).toBe("image/png");
  }
});

test("icons: ico, svg and apple touch icon are linked and served, with the manifest and theme colour", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0e1320");
  const expected: Array<[string, RegExp]> = [
    ['link[rel="icon"][type="image/x-icon"]', /^image\/(x-icon|vnd\.microsoft\.icon)/],
    ['link[rel="icon"][type="image/svg+xml"]', /^image\/svg\+xml/],
    ['link[rel="apple-touch-icon"]', /^image\/png/],
  ];
  for (const [selector, type] of expected) {
    const href = await page.locator(selector).first().getAttribute("href");
    expect(href, selector).toBeTruthy();
    const res = await request.get(href!);
    expect(res.status(), selector).toBe(200);
    expect(res.headers()["content-type"], selector).toMatch(type);
  }
  // browsers ask for this path whether or not it is linked
  expect((await request.get("/favicon.ico")).status()).toBe(200);
});

test("the share image is a 1200 x 630 PNG", async ({ request }) => {
  const res = await request.get("/og.png");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
  const png = await res.body();
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
});

test("security.txt names the contact, its own address and a date that has not passed", async ({ request }) => {
  const res = await request.get("/.well-known/security.txt");
  expect(res.status()).toBe(200);
  const txt = await res.text();
  expect(txt).toContain("Contact: mailto:contact@caminocode.com");
  expect(txt).toContain("Canonical: https://www.caminocode.com/.well-known/security.txt");
  const expires = txt.match(/^Expires: (\S+)$/m)?.[1];
  expect(expires).toBeTruthy();
  // starts failing when the file needs renewing, which is the point
  expect(new Date(expires!).getTime()).toBeGreaterThan(Date.now());
});
