import { expect, test, type Locator, type Page } from "@playwright/test";
import { STUDIES, absolute } from "./routes";

/* The four case studies, the /work index and the proof blocks on the service pages. The two website
   projects carry facts and the client's own words only: no figures block, and none of the old pages'
   filler statistics. Every study brings its outcome up under "At a glance". Only Transparent Energy
   shows large figures: the DANIEL AVILA 64 measurements are one small "Under the hood" line.
   Wayfinding: /work opens with an "On this page" list of its four projects, and each study carries
   the trail Home / Work / its name, as the service pages do. */

const flat = (text: string | null) => (text ?? "").replace(/\s+/g, " ");

const HOOD = [
  "158 kB first-load JavaScript",
  "0 model, texture or audio files",
  "4 control schemes, all live",
  "100% touch and plain-HTML ready",
];

/** The section of <main> that holds the element with this id. */
const sectionOf = (page: Page, id: string) => page.locator("main > section").filter({ has: page.locator(`#${id}`) });

/** Waits until the page has stopped scrolling (in-page jumps and scroll-into-view travel smoothly). */
async function settled(page: Page) {
  let last = -1;
  await expect
    .poll(async () => {
      const y = await page.evaluate(() => window.scrollY);
      const still = y === last;
      last = y;
      return still;
    })
    .toBe(true);
}

/**
 * Waits until the page's scripts have taken over: Next's router writes its state onto the history
 * entry when it does. A press on a link before that moment is the browser's alone, as with scripts off.
 */
async function routerReady(page: Page) {
  await expect.poll(() => page.evaluate(() => window.history.state !== null)).toBe(true);
}

/** The "Under the hood" line: its label, the four measurements, and type no larger than body text. */
async function expectHoodLine(hood: Locator) {
  await expect(hood).toHaveCount(1);
  await expect(hood.locator(".in-mono")).toHaveText("Under the hood");
  await expect(hood.locator("li")).toHaveText(HOOD);
  const sizes = await hood.locator("li, li b").evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
  expect(Math.max(...sizes)).toBeLessThanOrEqual(18);
}

test("Victoria's Painting case study: facts only, the client's quote, gallery and visit link", async ({ page }) => {
  await page.goto("/work/victorias-painting");
  await expect(page.locator("h1")).toHaveText("Victoria's Painting: a first website for a painting company");
  const main = flat(await page.locator("main").innerText());
  // no figures block, and none of the old template stats, the client's own numbers, or unconfirmed durations
  await expect(page.locator(".in-fig")).toHaveCount(0);
  for (const banned of ["100%", "3x", "24/7", "SEO", "390", "40 years", "members", "4 months", "3 weeks"]) {
    expect(main, banned).not.toContain(banned);
  }
  expect(main).toMatch(/Built by Camino Code for Victoria's Painting/i);
  for (const fact of ["Painting company, New Jersey", "Website design and build", "Figma", "React", "EmailJS", "Google Maps"]) {
    expect(main.toLowerCase(), fact).toContain(fact.toLowerCase());
  }
  // six numbered sections, as on the other studies
  await expect(page.locator("main .in-label")).toHaveCount(6);
  // the outcome first: under "At a glance", the one sentence About shows, attributed as About does, linked to the full text
  const line = sectionOf(page, "at-a-glance").locator(".in-outcome");
  await expect(line.locator("blockquote")).toHaveText(
    "“His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.”",
  );
  await expect(line.locator("figcaption")).toHaveText("Juan Porras, Founder, Victoria's Painting");
  await expect(line.getByRole("link", { name: "In the client’s words" })).toHaveAttribute("href", "#client-words");
  await expect(sectionOf(page, "result-title").locator("#client-words")).toHaveText("In the client’s words");
  // the testimonial is the client's whole text, attributed as the original page gave it
  const quote = page.locator("figure.in-quote");
  await expect(quote.locator("blockquote p")).toHaveCount(4);
  await expect(quote.locator("blockquote p").first()).toHaveText(
    "I would like to express my sincere appreciation to Favio Jasso from Camino Code for the outstanding work he did in developing the website for my company, Victoria's Painting.",
  );
  await expect(quote).toContainText(
    "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
  );
  await expect(quote.locator("blockquote p").last()).toHaveText(
    "I highly recommend Favio Jasso and the Camino Code team for their dedication, talent, and excellence in every detail of the project.",
  );
  await expect(quote.locator("figcaption")).toHaveText("Juan Porras, Founder of Victoria's Painting");
  await expect(page.locator(".gallery img")).toHaveCount(4);
  for (const img of await page.locator(".gallery img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
    await expect(img).toHaveAttribute("srcset", /-960\.webp 960w, \S+\.webp 1920w/);
  }
  await expect(page.getByRole("link", { name: "Visit victoriaspainting.com" })).toHaveAttribute(
    "href",
    "https://www.victoriaspainting.com",
  );
});

test("Daniel Avila's first site: facts only, his quote, three safe images, and the way on to DANIEL AVILA 64", async ({
  page,
  request,
}) => {
  await page.goto("/work/daniel-avila");
  await expect(page.locator("h1")).toHaveText("Daniel Avila: a first portfolio site");
  const main = flat(await page.locator("main").innerText());
  await expect(page.locator(".in-fig")).toHaveCount(0);
  for (const banned of ["100%", "3x", "SEO", "members", "1 month", "1 week"]) expect(main, banned).not.toContain(banned);
  expect(main).toMatch(/Built by Camino Code for Daniel Avila/i);
  for (const fact of ["Personal portfolio", "Website design and build", "Figma", "Next.js", "Monda", "Quicksand"]) {
    expect(main.toLowerCase(), fact).toContain(fact.toLowerCase());
  }
  await expect(page.locator("main .in-label")).toHaveCount(6);
  // the outcome first: his one sentence from About under "At a glance", linked to the full text
  const line = sectionOf(page, "at-a-glance").locator(".in-outcome");
  await expect(line.locator("blockquote")).toHaveText(
    "“Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.”",
  );
  await expect(line.locator("figcaption")).toHaveText("Daniel Avila, IT Support Professional, danielavila.tech");
  await expect(line.getByRole("link", { name: "In the client’s words" })).toHaveAttribute("href", "#client-words");
  await expect(sectionOf(page, "result-title").locator("#client-words")).toHaveText("In the client’s words");
  const quote = page.locator("figure.in-quote");
  await expect(quote.locator("blockquote p")).toHaveCount(3);
  await expect(quote.locator("blockquote p").first()).toHaveText(
    /^Collaborating with Camino Code in creating my professional website, danielavila\.tech, was a phenomenal experience\./,
  );
  await expect(quote).toContainText(
    "Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.",
  );
  await expect(quote.locator("figcaption")).toHaveText("Daniel Avila, IT Support Professional");
  // three gallery images; the old contact screenshot (a personal phone number and email) must never ship
  await expect(page.locator(".gallery img")).toHaveCount(3);
  for (const img of await page.locator(".gallery img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
  }
  expect(await page.locator("main").innerHTML()).not.toContain("gallery-04");
  expect((await request.get("/work/daniel-avila/gallery-04.webp")).status()).toBe(404);
  expect((await request.get("/work/daniel-avila/gallery-04-960.webp")).status()).toBe(404);
  // the first site is offline: no outbound visit link, a forward link instead
  await expect(page.locator('main a[href*="danielavila.tech"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Read the DANIEL AVILA 64 case study" })).toHaveAttribute(
    "href",
    "/work/daniel-avila-64",
  );
});

test("the two Daniel Avila studies point at each other, and every study lists the others", async ({ page }) => {
  await page.goto("/work/daniel-avila-64");
  await expect(page.getByRole("link", { name: "Read the case study of his first site" })).toHaveAttribute(
    "href",
    "/work/daniel-avila",
  );
  await page.goto("/work/daniel-avila");
  await expect(page.locator(`main section:not(.in-more) a[href="/work/daniel-avila-64"]`)).toHaveCount(1);
  for (const route of STUDIES) {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "More work" });
    const hrefs = await nav.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    expect(hrefs, route).toEqual([...STUDIES.filter((r) => r !== route), "/work"]);
  }
});

test("/work lists all four studies, each with a credit and its own link", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator("main h2")).toHaveText([
    "Transparent Energy",
    "DANIEL AVILA 64",
    "Victoria's Painting",
    "Daniel Avila",
    "Start with discovery",
  ]);
  const links = page.locator("main a.in-link");
  expect(await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")))).toEqual(STUDIES);
  // four links with the same visible words carry four different names
  expect(await links.evaluateAll((els) => els.map((a) => a.textContent))).toEqual([
    "Read the case study: Transparent Energy",
    "Read the case study: DANIEL AVILA 64",
    "Read the case study: Victoria's Painting",
    "Read the case study: Daniel Avila",
  ]);
  const main = flat(await page.locator("main").innerText());
  for (const credit of [
    "Camino Code's founder led the build",
    "Built by Camino Code for Daniel Avila",
    "Built by Camino Code for Victoria's Painting",
  ]) {
    expect(main.toLowerCase(), credit).toContain(credit.toLowerCase());
  }
  // one link per project for screen readers and the keyboard, directly under the summary and its credit
  const cards = page.locator("main > section").filter({ has: page.locator(".in-card") });
  await expect(cards).toHaveCount(4);
  for (const card of await cards.all()) {
    await expect(card.locator("a")).toHaveCount(1);
    const text = (await card.locator(".in-proof-body > div").boundingBox())!;
    const link = (await card.locator("a.in-link").boundingBox())!;
    expect(Math.abs(link.x - text.x)).toBeLessThan(2);
    const gap = link.y - (text.y + text.height);
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThan(24);
    expect(link.height).toBeGreaterThanOrEqual(44);
  }
  // only Transparent Energy shows large figures: they are business results
  const withFigures = page.locator("main > section").filter({ has: page.locator(".in-fig") });
  await expect(withFigures).toHaveCount(1);
  await expect(withFigures.locator(".in-fig b")).toHaveText(["$65,000+", "85%", "3.5 months"]);
  // DANIEL AVILA 64 leads with its screenshot and summary; its developer measurements are one small line
  const da = sectionOf(page, "da-title");
  await expect(da).toContainText(
    "A playable 3D portfolio: an N64-era castle you can explore, with every section one click away for recruiters.",
  );
  await expectHoodLine(da.locator(".in-hood"));
  await expect(page.locator(".in-hood")).toHaveCount(1);
  // the card that used to describe the wrong image
  await expect(page.locator('img[src*="/work/daniel-avila-64/card"]')).toHaveAttribute("alt", /title screen/);
  await expect(page.locator(".work-card img")).toHaveCount(3);
  for (const img of await page.locator(".work-card img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
  }
});

test("on /work a project's title and image lead to its case study too", async ({ page }) => {
  // the card's one link stretches over the title and the image, so a click or tap on either follows it
  const targets = [
    ["#te-title", STUDIES[0]],
    ["#da-title", STUDIES[1]],
    ['section[aria-labelledby="da-title"] img', STUDIES[1]],
    ["#vp-title", STUDIES[2]],
    ['section[aria-labelledby="vp-title"] img', STUDIES[2]],
    ["#da-first-title", STUDIES[3]],
    ['section[aria-labelledby="da-first-title"] img', STUDIES[3]],
  ];
  for (const [selector, route] of targets) {
    await page.goto("/work");
    const target = page.locator(`main ${selector}`);
    await target.scrollIntoViewIfNeeded();
    await settled(page);
    const box = (await target.boundingBox())!;
    await page.mouse.click(box.x + Math.min(40, box.width / 2), box.y + box.height / 2);
    await page.waitForURL(`**${route}`);
    await expect(page.locator("h1"), selector).not.toHaveText("Work");
  }
  // the summary is plain text above the stretched link: the pointer meets the paragraph there, not the link
  await page.goto("/work");
  const summary = page.locator('main section[aria-labelledby="vp-title"] .in-proof-body p').first();
  await summary.scrollIntoViewIfNeeded();
  await settled(page);
  const box = (await summary.boundingBox())!;
  const hit = await page.evaluate(
    ([x, y]) => document.elementFromPoint(x, y)?.closest("a, p")?.tagName,
    [box.x + 20, box.y + box.height / 2],
  );
  expect(hit).toBe("P");
});

test("/work opens with its four projects as jumps, each landing clear of the sticky header", async ({ page }) => {
  await page.goto("/work");
  const nav = page.getByRole("navigation", { name: "On this page" });
  await expect(nav).toHaveCount(1);
  const links = nav.locator("a");
  // the names and short labels the cards below carry, and nothing else: a comma joins them for screen readers
  await expect(links).toHaveText([
    "Transparent Energy, Reconciliation system",
    "DANIEL AVILA 64, Playable portfolio",
    "Victoria's Painting, Business website",
    "Daniel Avila, First portfolio site",
  ]);
  const ids = STUDIES.map((route) => route.slice(route.lastIndexOf("/") + 1));
  expect(await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")))).toEqual(ids.map((id) => `#${id}`));
  // the list is not a heading and adds no card: the page's outline is the four projects, as before
  await expect(nav.locator("h2, h3, .in-label, .in-link")).toHaveCount(0);
  // it sits between the band and the first project, and stays short: that project still starts on the first screen
  await expect(page.locator("main > section").nth(1).getByRole("navigation", { name: "On this page" })).toHaveCount(1);
  const strip = (await page.locator("main > section").nth(1).boundingBox())!;
  expect(strip.height).toBeLessThan(page.viewportSize()!.width < 900 ? 260 : 160);
  await expect(page.locator("#te-title")).toBeInViewport();

  for (const [i, id] of ids.entries()) {
    await page.goto("/work");
    const link = nav.locator("a").nth(i);
    expect((await link.boundingBox())!.height, id).toBeGreaterThanOrEqual(44);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/work#${id}$`));
    const block = page.locator(`main > section#${id}`);
    await expect(block.locator("h2")).toBeInViewport();
    await settled(page);
    const at = await block.evaluate((el) => ({
      block: el.getBoundingClientRect().top,
      label: el.querySelector(".in-label")!.getBoundingClientRect().top,
      heading: el.querySelector("h2")!.getBoundingClientRect().top,
      header: document.querySelector(".site-head")!.getBoundingClientRect().bottom,
    }));
    // the block's top edge meets the header; its label and heading follow below, in view
    expect(at.block, id).toBeGreaterThanOrEqual(at.header - 1);
    expect(at.block, id).toBeLessThan(at.header + 40);
    expect(at.label, id).toBeGreaterThan(at.header);
    expect(at.heading, id).toBeGreaterThan(at.label);
    // the keyboard follows the jump: the next Tab stop is that project's own link, not the next entry in the list
    await page.keyboard.press("Tab");
    await expect(block.locator("a.in-link"), id).toBeFocused();
  }

  // with motion reduced the jump is instant and lands in the same place
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work");
  await nav.locator("a").nth(2).click();
  await expect(page.locator(`main > section#${ids[2]} h2`)).toBeInViewport();
  const landed = await page.locator(`main > section#${ids[2]}`).evaluate((el) => ({
    heading: el.querySelector("h2")!.getBoundingClientRect().top,
    header: document.querySelector(".site-head")!.getBoundingClientRect().bottom,
    height: window.innerHeight,
  }));
  expect(landed.heading).toBeGreaterThan(landed.header);
  expect(landed.heading).toBeLessThan(landed.height);

  // jump links do nothing on paper: the list is left out of a print
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("main > section.in-toc")).toBeHidden();
});

test("after a jump on /work, Back from the next page returns to the list at that project", async ({ page }) => {
  const id = "daniel-avila-64";
  const nav = page.getByRole("navigation", { name: "On this page" });
  const block = page.locator(`main > section#${id}`);
  const jump = async () => {
    await nav.locator(`a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/work#${id}$`));
    await expect(block.locator("h2")).toBeInViewport();
    await settled(page);
  };
  /** The case study is showing, and has come to rest: a Back pressed mid-scroll is a different test. */
  const expectTheStudy = async () => {
    await expect(page).toHaveURL(/\/work\/daniel-avila-64$/);
    await expect(page.locator("h1")).toHaveText("DANIEL AVILA 64: a playable 3D portfolio");
    await settled(page);
  };
  /** Follows the project's own link to its case study. */
  const openTheStudy = async () => {
    await block.locator("a.in-link").click();
    await expectTheStudy();
  };
  /** Back must bring /work itself back, not only its address. */
  const backToTheList = async () => {
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/work#${id}$`));
    await expect(page.locator("h1")).toHaveText("Work");
    await expect(page).toHaveTitle("Work: the case studies | Camino Code");
    await settled(page);
  };
  /** Once the page has come to rest, the project the visitor left is on screen, under the header. */
  const expectTheProject = async () => {
    const at = await block.evaluate((el) => ({
      top: el.getBoundingClientRect().top,
      bottom: el.getBoundingClientRect().bottom,
      header: document.querySelector(".site-head")!.getBoundingClientRect().bottom,
      height: window.innerHeight,
    }));
    expect(at.top).toBeLessThan(at.height);
    expect(at.bottom).toBeGreaterThan(at.header);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  };

  await page.goto("/work");
  await routerReady(page);
  await jump();
  // on to the case study from that block, and back
  await openTheStudy();
  await backToTheList();
  await expectTheProject();
  // Forward is the case study again, and Back works a second time
  await page.goForward();
  await expectTheStudy();
  await backToTheList();
  await expectTheProject();

  // the same entry pressed again after scrolling away still jumps, and Back still works after it
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await jump();
  await openTheStudy();
  await backToTheList();
  await expectTheProject();

  // any other link on the site can follow a jump: the header's button, then Back
  await page.locator(".site-head .wrap > .btn").click();
  await expect(page).toHaveURL(/\/discovery$/);
  await expect(page.locator("h1")).toHaveText("Book a discovery session");
  await settled(page);
  await backToTheList();
  // one more Back is the list as it was opened, at the top
  await page.goBack();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText("Work");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("with the text size raised, the entries of \"On this page\" wrap inside their columns", async ({ page }, testInfo) => {
  // width, height, text size in percent: the four-column row on a desktop, the two-by-two block on phones
  const cases =
    testInfo.project.name === "desktop"
      ? [
          [1024, 800, 200],
          [1440, 900, 200],
        ]
      : [
          [320, 568, 130],
          [390, 844, 150],
          [390, 844, 200],
        ];
  for (const [width, height, percent] of cases) {
    const at = `${width} px wide, text at ${percent}%`;
    await page.setViewportSize({ width, height });
    await page.goto("/work");
    await page.addStyleTag({ content: `html { font-size: ${percent}% !important; }` });
    const list = await page.locator("main > section.in-toc").evaluate((strip) => {
      /** Where the words themselves are drawn: a long word can run past the box of the link that holds it. */
      const words = (el: Element) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return [...range.getClientRects()];
      };
      const touch = (a: DOMRect, b: DOMRect) =>
        a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5;
      const links = [...strip.querySelectorAll("a")];
      const drawn = links.map((a) => [...a.querySelectorAll("span:not(.in-visually-hidden)")].flatMap(words));
      const clashes: string[] = [];
      for (let i = 0; i < links.length; i++) {
        for (let j = i + 1; j < links.length; j++) {
          if (drawn[i].some((a) => drawn[j].some((b) => touch(a, b)))) clashes.push(`${links[i].textContent} / ${links[j].textContent}`);
        }
      }
      const wrap = strip.querySelector(".wrap")!;
      const edge = wrap.getBoundingClientRect().right - parseFloat(getComputedStyle(wrap).paddingRight);
      return {
        clashes,
        past: Math.max(...drawn.flat().map((rect) => rect.right)) - edge,
        shortest: Math.min(...links.map((a) => a.getBoundingClientRect().height)),
      };
    });
    // no entry is printed over its neighbour, none runs past the column of text, and each is still a full touch target
    expect(list.clashes, at).toEqual([]);
    expect(list.past, at).toBeLessThanOrEqual(1);
    expect(list.shortest, at).toBeGreaterThanOrEqual(44);
  }
});

test("every case study carries the trail Home / Work / its name, and its breadcrumb data says the same", async ({ page }) => {
  const names: Record<string, string> = {
    "/work/transparent-energy": "Transparent Energy",
    "/work/daniel-avila-64": "DANIEL AVILA 64",
    "/work/victorias-painting": "Victoria's Painting",
    "/work/daniel-avila": "Daniel Avila's first portfolio site",
  };
  for (const route of STUDIES) {
    await page.goto(route);
    // the same pattern as the service pages: a nav named Breadcrumb, links for the levels above, the page itself as text
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(crumbs, route).toHaveCount(1);
    expect(await crumbs.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href"))), route).toEqual(["/", "/work"]);
    await expect(crumbs.locator("li"), route).toHaveText(["Home", "Work", names[route]]);
    const current = crumbs.locator('[aria-current="page"]');
    await expect(current, route).toHaveText(names[route]);
    await expect(current.locator("a"), route).toHaveCount(0);
    for (const link of await crumbs.locator("a").all()) {
      expect((await link.boundingBox())!.height, route).toBeGreaterThanOrEqual(44);
    }
    // under the band and above "At a glance", so a phone shows the way back on the first screen
    const first = page.locator("main > section").nth(1);
    await expect(first.locator(".in-crumbs"), route).toHaveCount(1);
    const trailTop = (await crumbs.boundingBox())!.y;
    expect(trailTop, route).toBeLessThan((await first.locator("#at-a-glance").boundingBox())!.y);
    expect(trailTop, route).toBeLessThan(page.viewportSize()!.height);
    // one BreadcrumbList, naming the same three levels
    const lists = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)).filter((block) => block["@type"] === "BreadcrumbList"));
    expect(lists, route).toHaveLength(1);
    const items = lists[0].itemListElement as Array<{ name: string; item: string }>;
    expect(items.map((item) => item.name), route).toEqual(["Home", "Work", names[route]]);
    expect(items.map((item) => item.item), route).toEqual([absolute("/"), absolute("/work"), absolute(route)]);
  }
  // and it is a way back: Work leads to the index
  await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText("Work");
});

test("Transparent Energy shows its three figures once, under At a glance", async ({ page }) => {
  await page.goto("/work/transparent-energy");
  const glance = sectionOf(page, "at-a-glance");
  await expect(glance.locator(".in-fig b")).toHaveText(["$65,000+", "85%", "3.5 months"]);
  await expect(page.locator("main .in-fig")).toHaveCount(3);
  // the facts row leaves the time to the third figure, directly below it
  await expect(glance.locator(".facts dt")).toHaveText(["Client", "Industry", "Team"]);
  expect(flat(await glance.innerText()).split("3.5 months")).toHaveLength(2);
  // Result keeps its words, without the figures a second time
  const result = sectionOf(page, "result-title");
  await expect(result.locator(".in-fig")).toHaveCount(0);
  await expect(result).toContainText(
    "Analysts were reconciling Excel, PDF and vendor files by hand. An automated system now does it every day.",
  );
  await expect(page.locator("main .in-label")).toHaveCount(7);
});

test("DANIEL AVILA 64 leads with its title screen and a plain sentence; the measurements are one small line", async ({
  page,
}) => {
  await page.goto("/work/daniel-avila-64");
  const outcome = "Explorers roam the castle and collect stars; recruiters open the pause menu and download the PDF résumé in one click.";
  const glance = sectionOf(page, "at-a-glance");
  await expect(glance.locator(".in-outcome")).toHaveText(outcome);
  const shot = glance.locator("img");
  await expect(shot).toHaveAttribute("alt", /title screen/);
  await expect(shot).toHaveAttribute("src", "/work/daniel-avila-64/card-960.webp");
  await expect(shot).toHaveAttribute("width", "1920");
  await expect(shot).toHaveAttribute("height", "1280");
  // the sentence moved up from "What was built": it is said once
  expect(flat(await page.locator("main").innerText()).split(outcome)).toHaveLength(2);
  // no large figures: the four developer measurements close the Result section at body size
  await expect(page.locator("main .in-fig")).toHaveCount(0);
  const result = sectionOf(page, "result-title");
  await expect(result.locator(".ticks li")).toHaveCount(4);
  await expectHoodLine(result.locator(".in-hood"));
  await expect(page.locator("main .in-label")).toHaveCount(6);
});

test("the client's line under At a glance jumps to the full testimonial, clear of the sticky header", async ({ page }) => {
  for (const route of ["/work/victorias-painting", "/work/daniel-avila"]) {
    await page.goto(route);
    const link = page.locator(".in-outcome").getByRole("link", { name: "In the client’s words" });
    expect((await link.boundingBox())!.height, route).toBeGreaterThanOrEqual(44);
    await link.click();
    const heading = page.locator("#client-words");
    await expect(heading).toBeInViewport();
    await settled(page);
    const top = await heading.evaluate((el) => el.getBoundingClientRect().top);
    const header = await page.locator(".site-head").evaluate((el) => el.getBoundingClientRect().bottom);
    expect(top, route).toBeGreaterThanOrEqual(header);
    await expect(page.locator("figure.in-quote")).toBeInViewport();
  }
});

test("service pages: Software leads with the screenshot and summary, Data keeps its large figures", async ({ page }) => {
  await page.goto("/services/software");
  const proof = sectionOf(page, "proof-title");
  await expect(proof.locator("h2")).toHaveText("DANIEL AVILA 64");
  await expect(proof.locator(".in-fig")).toHaveCount(0);
  await expect(proof.locator("img")).toHaveAttribute("alt", /title screen/);
  await expect(proof).toContainText(
    "A playable 3D portfolio: an N64-era castle you can explore, with every section one click away for recruiters.",
  );
  await expectHoodLine(proof.locator(".in-hood"));
  await expect(proof.locator('a[href="/work/daniel-avila-64"]')).toHaveCount(1);

  await page.goto("/services/data");
  await expect(page.locator("main .in-fig b")).toHaveText(["$65,000+", "85%", "3.5 months"]);
  await expect(page.locator(".in-hood")).toHaveCount(0);

  // the index: a business result leads in the accent, a developer measurement is a small labelled line
  await page.goto("/services");
  const proofs = page.locator(".in-svc-proof");
  await expect(proofs.nth(0).locator(".in-svc-fig")).toHaveCount(0);
  await expect(proofs.nth(0).locator(".in-svc-hood")).toHaveText("Under the hood 158 kB first-load JavaScript");
  const size = await proofs.nth(0).locator(".in-svc-hood").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(size).toBeLessThanOrEqual(18);
  await expect(proofs.nth(1).locator(".in-svc-fig")).toHaveText("$65,000+ a year saved in analyst time");
  await expect(proofs.nth(1).locator(".in-svc-hood")).toHaveCount(0);
});

test("About quotes each client in their own words and links to the case study", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main).toContainText("Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.");
  await expect(main).not.toContainText("They didn't just build me a website");
  await expect(main).toContainText(
    "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
  );
  await expect(page.getByRole("link", { name: "Read the Victoria's Painting case study" })).toHaveAttribute(
    "href",
    "/work/victorias-painting",
  );
  await expect(page.getByRole("link", { name: "Read the Daniel Avila portfolio case study" })).toHaveAttribute(
    "href",
    "/work/daniel-avila",
  );
});

test("the short quote on About is a sentence from the full testimonial on the case study", async ({ page }) => {
  await page.goto("/about");
  const short = await page.locator("main .quotes blockquote p").allInnerTexts();
  expect(short).toHaveLength(2);
  for (const [i, route] of ["/work/victorias-painting", "/work/daniel-avila"].entries()) {
    await page.goto(route);
    const full = flat(await page.locator("figure.in-quote blockquote").innerText());
    // About wraps the sentence in curly quotation marks
    expect(full, route).toContain(short[i].replace(/^“|”$/g, ""));
  }
});
