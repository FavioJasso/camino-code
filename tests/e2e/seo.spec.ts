import { expect, test } from "@playwright/test";

const REDIRECTS: Array<[string, string]> = [
  ["/case-studies", "/work"],
  ["/case-study/transparent-energy", "/work/transparent-energy"],
  ["/case-study/victorias-painting", "/work"],
  ["/case-study/daniel-avila", "/work"],
  ["/case-study/daniel-avila-64", "/work/daniel-avila-64"],
  ["/case-study/healthtrack", "/work"],
  ["/services", "/#services"],
  ["/contact", "/discovery"],
];

const PAGES = [
  "/",
  "/services/software",
  "/services/data",
  "/services/ai-governance",
  "/work",
  "/work/transparent-energy",
  "/work/daniel-avila-64",
  "/approach",
  "/about",
  "/discovery",
  "/privacy",
  "/terms",
];

test("old URLs redirect permanently", async ({ request }) => {
  for (const [from, to] of REDIRECTS) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toBe(to);
  }
});

test("sitemap lists every page on www.caminocode.com", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect([...locs].sort()).toEqual(
    PAGES.map((p) => `https://www.caminocode.com${p === "/" ? "" : p}`).sort(),
  );
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
});

test("pages carry canonical and Open Graph tags", async ({ request }) => {
  for (const p of PAGES) {
    const html = await (await request.get(p)).text();
    expect(html, p).toContain('property="og:image"');
    expect(html, p).toContain("https://www.caminocode.com/og.png");
    const path = p === "/" ? "" : p;
    expect(html, p).toContain(`rel="canonical" href="https://www.caminocode.com${path}`);
  }
});

test("security headers are set and the server does not advertise itself", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["x-powered-by"]).toBeUndefined();
});
