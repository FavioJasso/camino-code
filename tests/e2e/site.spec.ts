import { expect, test } from "@playwright/test";
import { EMAIL, EMAIL_HREF, LINKEDIN, PAGES, PHONE, PHONE_HREF, ROUTES } from "./routes";

/* Things that hold across the site: the services index, navigation and its current state,
   contact links, the footer, the About page and its questions, the word list, and a crawl of
   every link and image. */

const flat = (text: string | null) => (text ?? "").replace(/\s+/g, " ");

// ---- services ----

test("/services introduces the three services and shows one project that spans two of them", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator("h1")).toHaveText("Services");
  const main = page.locator("main");
  await expect(main).toContainText(
    "Software, data and AI for small and mid-sized businesses. Every service starts with the same first conversation.",
  );
  for (const href of ["/services/software", "/services/data", "/services/ai-governance", "/work/transparent-energy", "/work", "/approach"]) {
    await expect(main.locator(`a[href="${href}"]`).first(), href).toBeVisible();
  }
  await expect(main.locator(".in-svc h3")).toHaveText(["Software", "Data", "AI & governance"]);
  // one case-study card: the Transparent Energy system, which is both Software and Data work
  await expect(main.getByRole("heading", { level: 2, name: "One system, two services" })).toBeVisible();
  const card = main.locator(".in-svc-proof");
  await expect(card).toHaveCount(1);
  await expect(card.locator("h3")).toHaveText("Transparent Energy");
  const text = flat(await card.innerText());
  expect(text).toMatch(/^Software and Data /i);
  expect(text).toContain("$65,000+ a year saved in analyst time");
  expect(text).toContain("The software runs it every day, built into the client's own operations platform, with dashboards and exports.");
  expect(text.toLowerCase()).toContain("camino code's founder led the build");
  await expect(card.getByRole("link", { name: "Read the Transparent Energy case study" })).toHaveAttribute("href", "/work/transparent-energy");
  const all = flat(await main.innerText());
  expect(all).not.toContain("DANIEL AVILA 64");
  expect(all).not.toContain("158 kB");
  expect(all).not.toContain("100%");
  expect(all).not.toMatch(/after discovery|discovery starts/i);
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

test("nothing links to the old /about#who anchor, and the About page no longer has it", async ({ page }) => {
  for (const route of PAGES) {
    await page.goto(route);
    await expect(page.locator('a[href*="#who"]'), route).toHaveCount(0);
  }
  await page.goto("/about");
  await expect(page.locator("#who")).toHaveCount(0);
});

// ---- About: the founder note, client words, questions ----

test("/about is three sections in Favio's own voice, then the booking band", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 2 })).toHaveText([
    "Favio Jasso, founder",
    "In their words",
    "Questions",
    "See where the hours go",
  ]);
  expect(await main.locator(".in-label").allTextContents()).toEqual(["01 Founder", "02 Clients", "03 Questions"]);
  const note = flat(await main.locator('section[aria-labelledby="founder-title"]').innerText());
  expect(note).toContain("I started Camino Code in Newark, New Jersey, to replace those workarounds with software, cleaner data and, where it pays, AI.");
  // the cleared figures, said once, in a sentence
  expect(note).toContain(
    "It went from start to running system in 3.5 months, and it saves more than $65,000 a year in analyst time.",
  );
  expect(note).toContain("If we work together, you deal with me, from the first conversation to the finished system.");
  await expect(main.locator('a[href="/work/victorias-painting"]')).toBeVisible();
  await expect(main.locator('a[href="/work/daniel-avila"]')).toBeVisible();
  await expect(main.locator('a[href="/work/transparent-energy"]')).toBeVisible();
  await expect(main.getByRole("link", { name: "See all work" })).toHaveAttribute("href", "/work");
  const text = flat(await main.innerText());
  // the old block, its table, the "we" definition and the website framing are gone
  for (const gone of ["Who you work with", "founder-led", "When this site says", "Run by Favio", "Led by Favio", "Your contact", "Kind words", "website projects", "Both were"]) {
    expect(text, gone).not.toContain(gone);
  }
  const lower = text.toLowerCase();
  // "your team" (the client's) is allowed, so these are whole phrases, not the word "team"
  for (const banned of [/one-man/, /\bsolo\b/, /\bour team\b/, /\bour staff\b/, /founder & ceo/, /award/, /years of experience/, /10\+/]) {
    expect(lower).not.toMatch(banned);
  }
  // the only Transparent Energy figures here are the permitted ones, the $65,000 in words
  expect(text).not.toContain("$65,000+");
  expect(text).not.toContain("100%");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Favio Jasso started Camino Code in Newark, NJ to help small and mid-sized businesses with software, data and AI. Book a free first conversation.",
  );
});

test("/about asks three questions and its FAQPage data matches the visible text", async ({ page }) => {
  await page.goto("/about");
  const shown = await page.locator("main dl.faq > div").evaluateAll((els) =>
    els.map((el) => ({ question: el.querySelector("dt")!.textContent, answer: el.querySelector("dd")!.textContent })),
  );
  expect(shown.map((q) => q.question)).toEqual([
    "Our data is a mess. Is that a problem?",
    "Do we have to replace the software we already use?",
    "How does the work run once we agree on it?",
  ]);
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

test("/approach starts with a conversation, without naming the founder again or repeating the reply time", async ({ page }) => {
  await page.goto("/approach");
  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 2, name: "It starts with a conversation" })).toBeVisible();
  await expect(main).toContainText(
    "The first step is a free conversation about your business: the tools you use, where your numbers live, and the jobs that eat the week.",
  );
  await expect(main).toContainText(
    "You are not behind. Starting properly matters more than starting first, and the first conversation is where we work out where to start.",
  );
  expect(await main.locator('section[aria-labelledby="discovery-title"] .facts dt').allTextContents()).toEqual(["Cost", "Length", "Format", "You get"]);
  const text = flat(await main.innerText());
  expect(text).not.toContain("Favio");
  // the reply time is said once, in the band beside the button
  expect(text.match(/one business day/g)).toHaveLength(1);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "How a project runs: a conversation about your business, a one-page summary of what to fix first, then work in stages you can see running.",
  );
});

// ---- the closing band and the word list ----

test("every inner page closes on one band that carries each promise once", async ({ page }) => {
  const HEADINGS: Record<string, string> = {
    "/work": "Is something in your business still done by hand?",
    "/work/transparent-energy": "Have a process like this?",
    "/privacy": "Questions? Start with a conversation",
    "/terms": "Questions? Start with a conversation",
  };
  for (const route of ROUTES) {
    await page.goto(route);
    const band = page.locator("main > section.in-book");
    await expect(band.locator("h2"), route).toHaveText(HEADINGS[route] ?? "See where the hours go");
    const text = flat(await band.innerText());
    expect(text, route).toContain(
      "Free, 45 minutes, by video or in person. Within a week you get a one-page summary: what to fix first, and what to leave alone.",
    );
    expect(text, route).toMatch(/Or write to contact@caminocode\.com or call \+1 973-234-2073\. You.ll hear back within one business day\./);
    await expect(band.getByRole("link", { name: "Book a discovery session" }), route).toHaveAttribute("href", "/discovery");
  }
});

test("no page or meta description uses the old consultant words or the noun hand-over", async ({ page }) => {
  for (const route of [...PAGES, "/no-such-page"]) {
    await page.goto(route);
    const text = flat(await page.locator("body").innerText());
    const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    for (const words of [text, description]) {
      expect(words, route).not.toMatch(/founder-led|engagement|point of contact|hand-over|handover|more hands/i);
    }
  }
  // the stage name is a plain verb and stays
  await page.goto("/approach");
  await expect(page.locator(".trail-list h3").last()).toHaveText("Hand over");
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
