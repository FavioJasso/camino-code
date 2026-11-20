import { expect, test } from "@playwright/test";
import { EMAIL, EMAIL_HREF, LINKEDIN, PAGES, PHONE, PHONE_HREF, ROUTES } from "./routes";

/* Things that hold across the site: the services index, navigation and its current state,
   contact links, the footer, the founder-led wording, the FAQ, and a crawl of every link and image. */

const flat = (text: string | null) => (text ?? "").replace(/\s+/g, " ");

// ---- services ----

test("/services introduces the three services and shows only the proof their own pages carry", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator("h1")).toHaveText("Services");
  const main = page.locator("main");
  for (const href of [
    "/services/software",
    "/services/data",
    "/services/ai-governance",
    "/work/daniel-avila-64",
    "/work/transparent-energy",
    "/work",
    "/approach",
  ]) {
    await expect(main.locator(`a[href="${href}"]`).first(), href).toBeVisible();
  }
  await expect(main.locator(".in-svc h3")).toHaveText(["Software", "Data", "AI & governance"]);
  // case studies: Software and Data only; AI & governance makes no proof claim
  const proofs = main.locator(".in-svc-proof");
  await expect(proofs).toHaveCount(2);
  await expect(proofs.locator("h3")).toHaveText(["DANIEL AVILA 64", "Transparent Energy"]);
  expect(flat(await proofs.nth(0).innerText()).toLowerCase()).not.toContain("governance");
  expect(flat(await proofs.nth(1).innerText()).toLowerCase()).not.toContain("governance");
  const text = flat(await main.innerText());
  expect(text).toContain("$65,000+ a year saved in analyst time");
  expect(text).toContain("158 kB first-load JavaScript");
  expect(text.toLowerCase()).toContain("camino code's founder led the build");
  expect(text).not.toContain("100%");
});

test("service pages carry a breadcrumb back to /services and links to the other services", async ({ page }) => {
  const names: Record<string, string> = { software: "Software", data: "Data", "ai-governance": "AI & governance" };
  for (const slug of Object.keys(names)) {
    await page.goto(`/services/${slug}`);
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    expect(await crumbs.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href"))), slug).toEqual([
      "/",
      "/services",
    ]);
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText(names[slug]);
    const others = page.getByRole("navigation", { name: "Other services" });
    expect(await others.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href"))), slug).toEqual([
      ...Object.keys(names)
        .filter((s) => s !== slug)
        .map((s) => `/services/${s}`),
      "/services",
    ]);
  }
});

test("an unknown service is a 404, not a blank service page", async ({ request }) => {
  expect((await request.get("/services/nope")).status()).toBe(404);
});

// ---- navigation ----

test("the header links to the services page, and nothing links to the old #services anchor", async ({ page }) => {
  for (const route of ["/", "/about"]) {
    await page.goto(route);
    await expect(page.locator('header nav[aria-label="Primary"] a[href="/services"]')).toHaveCount(1);
    await expect(page.locator('a[href="/#services"]')).toHaveCount(0);
  }
});

test("the header shows the mark beside the wordmark", async ({ page }, testInfo) => {
  await page.goto("/about");
  const mark = page.locator(".site-head .brand svg");
  await expect(mark).toHaveAttribute("aria-hidden", "true");
  await expect(mark).toHaveAttribute("viewBox", "0 0 26 30");
  const box = await mark.boundingBox();
  expect(Math.round(box!.width)).toBe(26);
  expect(Math.round(box!.height)).toBe(30);
  // sun, mountain, trail
  await expect(mark.locator("circle")).toHaveCount(1);
  await expect(mark.locator("path")).toHaveCount(2);
  if (testInfo.project.name === "desktop") await expect(page.locator(".site-head .brand span")).toHaveText("Camino Code");
});

// aria-current is "page" on the link to the page itself and "true" on the link to the section it sits in
const CURRENT: Array<[route: string, header: Record<string, string>, menu: Record<string, string>]> = [
  ["/", {}, {}],
  ["/services", { "/services": "page" }, {}],
  ["/services/data", { "/services": "true" }, { "/services/data": "page" }],
  ["/work", { "/work": "page" }, { "/work": "page" }],
  ["/work/victorias-painting", { "/work": "true" }, { "/work": "true" }],
  ["/approach", { "/approach": "page" }, { "/approach": "page" }],
  ["/about", { "/about": "page" }, { "/about": "page" }],
  ["/discovery", { "/discovery": "page" }, { "/discovery": "page" }],
  ["/privacy", {}, {}],
];

test("navigation marks the current page: the header and the phone menu", async ({ page }) => {
  const marked = (selector: string) =>
    page
      .locator(selector)
      .evaluateAll((els) => Object.fromEntries(els.map((a) => [a.getAttribute("href"), a.getAttribute("aria-current")])));
  for (const [route, header, menu] of CURRENT) {
    await page.goto(route);
    expect(await marked(".site-head .wrap > nav a[aria-current], .site-head .wrap > a.btn[aria-current]"), `header on ${route}`).toEqual(header);
    expect(await marked("#mobile-menu a[aria-current]"), `menu on ${route}`).toEqual(menu);
  }
});

test("the current page is visibly marked in the header", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "the header nav is desktop only");
  await page.goto("/work");
  const nav = page.locator('header nav[aria-label="Primary"]');
  const colour = (href: string) => nav.locator(`a[href="${href}"]`).evaluate((a) => getComputedStyle(a).color);
  expect(await colour("/work")).not.toBe(await colour("/about"));
});

// ---- contact links and the footer ----

test("email and phone are links wherever an inner page shows them", async ({ page }) => {
  for (const route of [...ROUTES, "/discovery"]) {
    await page.goto(route);
    const email = page.locator(`main a[href="${EMAIL_HREF}"]`).first();
    await expect(email, route).toHaveText(EMAIL);
    const phone = page.locator(`main a[href="${PHONE_HREF}"]`).first();
    await expect(phone, route).toHaveText(PHONE);
    // no bare copy of either is left outside a link
    const loose = await page.locator("main").evaluate(
      (main, [e, p]) => {
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        const found: string[] = [];
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? "";
          if ((text.includes(e) || text.includes(p)) && !node.parentElement?.closest("a, script")) found.push(text.trim());
        }
        return found;
      },
      [EMAIL, PHONE],
    );
    expect(loose, route).toEqual([]);
  }
});

test("the home page closes with the email and phone as links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`#discovery a[href="${EMAIL_HREF}"]`)).toHaveText(EMAIL);
  await expect(page.locator(`#discovery a[href="${PHONE_HREF}"]`)).toHaveText(PHONE);
});

test("the footer is Day on every page, with contact links, LinkedIn and the services page", async ({ page }) => {
  for (const route of ["/", "/services", "/work/daniel-avila", "/privacy", "/no-such-page"]) {
    await page.goto(route);
    const footer = page.getByRole("contentinfo");
    await expect(footer, route).toHaveClass(/\bsite-foot\b/);
    await expect(footer, route).toHaveCSS("background-color", "rgb(250, 244, 232)");
    await expect(footer.locator(`a[href="${EMAIL_HREF}"]`), route).toHaveText(EMAIL);
    await expect(footer.locator(`a[href="${PHONE_HREF}"]`), route).toHaveText(PHONE);
    const linkedin = footer.locator(`a[href="${LINKEDIN}"]`);
    await expect(linkedin, route).toHaveText("LinkedIn");
    await expect(linkedin, route).toHaveAttribute("rel", /noopener/);
    await expect(linkedin, route).toHaveAttribute("rel", /noreferrer/);
    expect(
      await footer.getByRole("navigation", { name: "Site" }).locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href"))),
      route,
    ).toEqual(["/services", "/services/software", "/services/data", "/services/ai-governance", "/work", "/approach", "/about"]);
    expect(
      await footer.getByRole("navigation", { name: "Legal" }).locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href"))),
      route,
    ).toEqual(["/privacy", "/terms"]);
    await expect(footer.locator(".foot-brand svg"), route).toHaveAttribute("aria-hidden", "true");
    await expect(footer, route).toContainText("Newark, New Jersey");
  }
});

// ---- typography and scrolling ----

test("base text is 17 px, and in-page jumps scroll smoothly unless motion is reduced", async ({ page }, testInfo) => {
  await page.goto("/about");
  await expect(page.locator("body")).toHaveCSS("font-size", "17px");
  const html = page.locator("html");
  // tells Next to jump, not glide, on a route change
  await expect(html).toHaveAttribute("data-scroll-behavior", "smooth");
  await expect(html).toHaveCSS("scroll-behavior", "smooth");
  // an #anchor target lands just under the sticky header
  await expect(html).toHaveCSS("scroll-padding-top", testInfo.project.name === "desktop" ? "69px" : "61px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(html).toHaveCSS("scroll-behavior", "auto");
});

test("a route change starts the new page at the top, at once", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "uses the desktop header nav");
  await page.goto("/work");
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  await page.locator('header nav[aria-label="Primary"] a[href="/about"]').click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("h1")).toHaveText("About Camino Code");
  // no smooth glide from the old position: it is at the top as soon as the page has changed
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("/about#who lands with the heading clear of the sticky header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); // an instant jump, so the position can be read at once
  await page.goto("/approach");
  await page.locator('main a[href="/about#who"]').click();
  await expect(page).toHaveURL(/\/about#who$/);
  const heading = page.getByRole("heading", { level: 2, name: "Who you work with" });
  await expect(heading).toBeInViewport();
  const { top, headerBottom } = await page.evaluate(() => ({
    top: document.getElementById("who")!.getBoundingClientRect().top,
    headerBottom: document.querySelector(".site-head")!.getBoundingClientRect().bottom,
  }));
  expect(top).toBeGreaterThanOrEqual(headerBottom - 1);
  expect(top).toBeLessThan(headerBottom + 40);
});

// ---- founder-led wording, About, FAQ ----

test("/about says who you work with, links each testimonial to its case study, and makes no team claims", async ({
  page,
}) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 2, name: "Favio Jasso, founder" })).toBeVisible();
  await expect(main.getByRole("heading", { level: 2, name: "Who you work with" })).toBeVisible();
  await expect(main).toContainText("Camino Code is founder-led.");
  await expect(main).toContainText("I founded Camino Code in Newark, New Jersey.");
  await expect(main).toContainText("When this site says “we”, it means Favio and the people working on your project.");
  await expect(main.locator('a[href="/work/victorias-painting"]')).toBeVisible();
  await expect(main.locator('a[href="/work/daniel-avila"]')).toBeVisible();
  await expect(main.locator('a[href="/work/transparent-energy"]')).toBeVisible();
  const text = (await main.innerText()).toLowerCase();
  // "your team" (the client's) is allowed, so these are whole phrases, not the word "team"
  for (const banned of [/one-man/, /\bsolo\b/, /\bour team\b/, /\bour staff\b/, /founder & ceo/, /award/, /years of experience/, /10\+/]) {
    expect(text).not.toMatch(banned);
  }
  // the only Transparent Energy figures here are the permitted ones
  expect(text).toContain("3.5 months");
  expect(text).toContain("$65,000+");
  expect(text).not.toContain("100%");
});

test("/about FAQ has eight questions and its FAQPage data matches the visible text", async ({ page }) => {
  await page.goto("/about");
  const shown = await page.locator("main dl.faq > div").evaluateAll((els) =>
    els.map((el) => ({ question: el.querySelector("dt")!.textContent, answer: el.querySelector("dd")!.textContent })),
  );
  expect(shown).toHaveLength(8);
  expect(shown[0].question).toBe("Who will I work with?");
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)));
  const faq = blocks.find((b) => b["@type"] === "FAQPage");
  expect(
    faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => ({
      question: q.name,
      answer: q.acceptedAnswer.text,
    })),
  ).toEqual(shown);
  const person = blocks.find((b) => b["@type"] === "Person");
  expect(person).toMatchObject({ name: "Favio Jasso", jobTitle: "Founder", url: "https://www.caminocode.com/about" });
  expect(person.sameAs).toBeUndefined(); // only the company LinkedIn page is known
  expect(person.image).toBe("https://www.caminocode.com/people/favio-jasso-800.webp");
  // no prices, guarantees or ownership terms in the answers
  for (const { answer } of shown) expect(answer).not.toMatch(/\$|guarantee|refund|you own/i);
});

test("/approach names who runs discovery and links to who you work with", async ({ page }) => {
  await page.goto("/approach");
  await expect(page.locator("main")).toContainText(/Favio Jasso, Camino Code.s founder/);
  await expect(page.locator('main a[href="/about#who"]')).toBeVisible();
  await expect(page.locator('main a[href="/about#who"]')).toHaveText("Who you work with");
});

// ---- legal drafts ----

test("privacy and terms are marked as drafts with a date, and say what the code does", async ({ page }) => {
  for (const route of ["/privacy", "/terms"]) {
    await page.goto(route);
    const main = page.locator("main");
    await expect(main.locator(".draft"), route).toHaveText("Draft, pending review");
    await expect(main, route).toContainText("Last updated: 20 November 2026");
  }
  await page.goto("/privacy");
  const privacy = flat(await page.locator("main").innerText());
  for (const statement of [
    "We use Resend, an email delivery service, to send that message.",
    "Vercel Web Analytics and Vercel Speed Insights",
    "Our own code on this site sets no cookies.",
    "session storage",
  ]) {
    expect(privacy, statement).toContain(statement);
  }
  await page.goto("/terms");
  // the figures on the site belong to these two projects only; the two website projects show none
  await expect(page.locator("main")).toContainText(
    "The figures on this site describe specific projects: the Transparent Energy reconciliation system and DANIEL AVILA 64.",
  );
});

test("the site's own code sets no cookies", async ({ page, context }) => {
  for (const route of ["/", "/work", "/discovery"]) {
    await page.goto(route);
    await page.waitForLoadState("load");
  }
  expect(await context.cookies()).toEqual([]);
});

// ---- the whole site: links, images, placeholders ----

test("every internal link resolves, and every #fragment has its target", async ({ page, request }) => {
  const links = new Map<string, string>(); // href -> a page it was found on
  for (const route of [...PAGES, "/no-such-page"]) {
    await page.goto(route);
    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((a) => a.getAttribute("href")!));
    for (const href of hrefs) {
      if (href.startsWith("#")) {
        // a jump within this page: its target is here
        await expect(page.locator(`[id="${href.slice(1)}"]`), `${href} on ${route}`).toHaveCount(1);
      } else if (href.startsWith("/")) {
        if (!links.has(href)) links.set(href, route);
      } else {
        // anything else is a deliberate outbound link
        expect(href, `on ${route}`).toMatch(/^(mailto:contact@caminocode\.com|tel:\+19732342073|https:\/\/)/);
      }
    }
  }
  // at least every page is linked from somewhere
  expect(links.size).toBeGreaterThanOrEqual(PAGES.length);
  const ids = new Map<string, string>(); // path -> its HTML
  for (const [href, foundOn] of links) {
    const [path, fragment] = href.split("#");
    if (!ids.has(path)) {
      const res = await request.get(path, { maxRedirects: 0 });
      // a link goes straight to a page: never through a redirect
      expect(res.status(), `${href} (linked from ${foundOn})`).toBe(200);
      ids.set(path, await res.text());
    }
    if (fragment) expect(ids.get(path), `${href} (linked from ${foundOn})`).toContain(`id="${fragment}"`);
  }
});

test("every image a page references is served", async ({ page, request }) => {
  const urls = new Map<string, string>();
  for (const route of [...PAGES, "/no-such-page"]) {
    await page.goto(route);
    const found = await page.locator("img, picture source").evaluateAll((els) =>
      els.flatMap((el) => [
        el.getAttribute("src"),
        ...(el.getAttribute("srcset") ?? "").split(",").map((candidate) => candidate.trim().split(/\s+/)[0]),
      ]),
    );
    for (const url of found) if (url && !urls.has(url)) urls.set(url, route);
    // every image has a text alternative, or is marked decorative with an empty one
    const missing = await page.locator("img:not([alt])").count();
    expect(missing, route).toBe(0);
  }
  expect(urls.size).toBeGreaterThan(30);
  for (const [url, foundOn] of urls) {
    const res = await request.get(url);
    expect(res.status(), `${url} (on ${foundOn})`).toBe(200);
    expect(res.headers()["content-type"], url).toMatch(/^image\//);
  }
});

test("no page shows placeholder text or an unfilled slot", async ({ page }) => {
  for (const route of [...PAGES, "/no-such-page"]) {
    await page.goto(route);
    const text = flat(await page.locator("body").innerText());
    expect(text, route).not.toMatch(/TODO|TBD|lorem ipsum|placeholder|coming soon|\[[^\]]*\]|\{\{|XXX/i);
  }
});
