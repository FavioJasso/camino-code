import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES, ROUTES } from "./routes";

const titles = new Map<string, string>();

for (const route of ROUTES) {
  test(`${route} returns 200, has one h1, a unique title, a booking link, and no axe violations`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(titles.get(title), `title "${title}" also used by ${titles.get(title)}`).toBeUndefined();
    titles.set(title, route);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);

    await expect(page.locator('main a[href="/discovery"]').first()).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("unknown path shows the designed 404 with status 404", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("trail");
  await expect(page.locator('main a[href="/"]').first()).toBeVisible();
  // other places to start
  for (const href of ["/services", "/work", "/discovery"]) {
    await expect(page.locator(`main a[href="${href}"]`)).toBeVisible();
  }
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Software and Data both prove themselves with Transparent Energy, each with its own figure and summary", async ({
  page,
}) => {
  const proofOn = async (slug: string) => {
    await page.goto(`/services/${slug}`);
    const section = page.locator('section[aria-labelledby="proof-title"]');
    await expect(section.locator("h2")).toHaveText("Transparent Energy");
    await expect(section.locator(".in-fig")).toHaveCount(1);
    await expect(section.getByRole("link", { name: "Read the Transparent Energy case study" })).toHaveAttribute(
      "href",
      "/work/transparent-energy",
    );
    return ((await section.innerText()) ?? "").replace(/\s+/g, " ");
  };
  const software = await proofOn("software");
  expect(software).toContain("85% less manual reconciliation work");
  expect(software).toContain(
    "A system built into Transparent Energy's own operations platform now does the daily reconciliation their analysts used to do by hand. It runs on a schedule, flags anything that doesn't match, and gives the team dashboards and exports to work from.",
  );
  expect(software.toLowerCase()).toContain("camino code's founder led the build");
  const data = await proofOn("data");
  expect(data).toContain("$65,000+ a year saved in analyst time");
  expect(data).toContain("Analysts were reconciling Excel, PDF and vendor files by hand. An automated system now does it every day.");
  expect(data.toLowerCase()).toContain("camino code's founder led the build");
  await page.goto("/services/ai-governance");
  expect(await page.locator("main").innerText()).not.toContain("Transparent Energy");
});

test("Software leads with automation and keeps a website as one part of the work", async ({ page }) => {
  await page.goto("/services/software");
  const gets = await page.locator("main .cols > div").nth(1).locator(".ticks li").allInnerTexts();
  expect(gets[0]).toMatch(/^Automation for the jobs your team repeats/);
  expect(gets.at(-1)).toBe("A website, when you need one, built to fit with the rest.");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Automation, internal tools and integrations built around how your business already runs, and a website when you need one. Start with a free conversation.",
  );
  expect(await page.locator("main").innerText()).not.toContain("DANIEL AVILA 64");
});

test("each service page asks two questions; the band answers cost and reply time", async ({ page }) => {
  for (const slug of ["software", "data", "ai-governance"]) {
    await page.goto(`/services/${slug}`);
    const questions = await page.locator("main dl.faq dt").allInnerTexts();
    expect(questions, slug).toHaveLength(2);
    for (const q of questions) expect(q, slug).not.toMatch(/cost|hear back/i);
    const steps = await page.locator('section[aria-labelledby="engaged-title"] .steps li').allInnerTexts();
    expect(steps, slug).toEqual([
      "It starts with a conversation about your business: the tools you use, where your numbers live and where the hours go.",
      "You get a one-page summary of what we found and what we would do first.",
      "If you go ahead, we build in stages you can see working, one at a time.",
      "When the project is finished, you get documentation your team can work from.",
    ]);
    // no bare "discovery" left in the copy: only the booking button names the session
    const text = (await page.locator("main").innerText()).replace(/Book a discovery session/g, "");
    expect(text, slug).not.toMatch(/discovery/i);
  }
});

test("DANIEL AVILA 64 case study shows its four figures, gallery and visit link", async ({ page }) => {
  await page.goto("/work/daniel-avila-64");
  const main = ((await page.locator("main").innerText()) ?? "").replace(/\s+/g, " ");
  for (const f of [
    "158 kB first-load JavaScript",
    "0 model, texture or audio files",
    "4 control schemes, all live",
    "100% touch and plain-HTML ready",
  ])
    expect(main).toContain(f);
  expect(main).not.toContain("TODO");
  await expect(page.locator(".gallery img")).toHaveCount(4);
  for (const img of await page.locator(".gallery img").all()) {
    await expect(img).toHaveAttribute("alt", /\S{3}/);
    await expect(img).toHaveAttribute("width", /\d+/);
    await expect(img).toHaveAttribute("height", /\d+/);
  }
  await expect(page.getByRole("link", { name: "Visit danielavila.tech" })).toHaveAttribute(
    "href",
    "https://www.danielavila.tech",
  );
});

test("no built page contains TODO", async ({ request }) => {
  for (const route of [...ROUTES, "/", "/discovery", "/no-such-page"]) {
    expect(await (await request.get(route)).text(), route).not.toContain("TODO");
  }
});

test("DANIEL AVILA 64's developer figures appear only on its own case study", async ({ page }) => {
  for (const route of PAGES) {
    await page.goto(route);
    const text = await page.locator("main").innerText();
    if (route === "/work/daniel-avila-64") expect(text).toContain("158 kB");
    else expect(text, route).not.toContain("158 kB");
  }
});

test("case study and about carry no banned claims", async ({ page }) => {
  await page.goto("/work/transparent-energy");
  const study = await page.locator("main").innerText();
  expect(study).not.toContain("100%");
  expect(study).toContain("3.5 months");
  await page.goto("/about");
  // textContent: the captions are set in uppercase mono, and the names are checked as written
  const about = (await page.locator("main").textContent()) ?? "";
  expect(about).toContain("Juan Porras");
  expect(about).toContain("Victoria's Painting");
  expect(about).toContain("Daniel Avila");
});

test("on a phone the footer reaches services, work, approach and about", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".nav")).toBeHidden();
  const footer = page.locator("footer");
  for (const href of ["/services/software", "/work", "/approach", "/about"]) {
    await expect(footer.locator(`a[href="${href}"]`)).toBeVisible();
  }
});

test("/about shows the sized founder portrait and no FJ placeholder", async ({ page }) => {
  await page.goto("/about");
  const img = page.getByRole("img", { name: "Favio Jasso, founder of Camino Code" });
  await expect(img).toHaveCount(1);
  await expect(img).toHaveAttribute("width", "400");
  await expect(img).toHaveAttribute("height", "501");
  const srcset = (await img.getAttribute("srcset")) ?? "";
  expect(srcset).toMatch(/favio-jasso-400\.webp 400w/);
  expect(srcset).toMatch(/favio-jasso-800\.webp 800w/);
  await expect(img).toHaveAttribute("loading", "eager");
  await expect(page.locator("main")).toContainText("Favio Jasso · Founder · Newark, NJ");
  await expect(page.locator("main")).not.toContainText(/\bFJ\b/);
  await img.scrollIntoViewIfNeeded();
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
});

/* Task 4: night-to-day flow, trail stages, reveal-once motion */

const FLOW_ROUTES = [...ROUTES, "/discovery"];
const TONE: Record<string, number> = {
  "rgb(14, 19, 32)": 0, // Midnight
  "rgb(28, 37, 64)": 0, // Dusk
  "rgb(242, 230, 208)": 1, // Morning
  "rgb(250, 244, 232)": 2, // Day
};

for (const route of FLOW_ROUTES) {
  test(`${route} runs night to day: dark band, Morning, then Day, closing on the booking band`, async ({ page }) => {
    await page.goto(route);
    const backgrounds = await page.$$eval("main > section", (els) =>
      els.map((el) => getComputedStyle(el).backgroundColor),
    );
    const tones = backgrounds.map((bg) => TONE[bg]);
    expect(tones, `unexpected background in ${backgrounds.join(", ")}`).not.toContain(undefined);
    expect(tones[0]).toBe(0);
    expect(tones).toContain(1);
    expect(tones.at(-1)).toBe(2);
    expect([...tones].sort((a, b) => a - b), backgrounds.join(", ")).toEqual(tones);
    await expect(page.locator("main > section").last()).toHaveClass(/\bin-book\b/);
  });
}

const STAGE_NAMES = ["Scout", "Route", "Build", "Hand over"];

for (const [route, scope] of [
  ["/approach", "main"],
  ["/", "#discovery"],
] as const) {
  test(`${route} draws the four stages as a trail: an SVG with four waypoints and the text as HTML`, async ({
    page,
  }, testInfo) => {
    await page.goto(route);
    const trail = page.locator(`${scope} .trail`);
    await expect(trail).toHaveCount(1);
    const svg = trail.locator("svg.trail-map");
    await expect(svg).toHaveAttribute("aria-hidden", "true");
    await expect(svg.locator("[data-stage]")).toHaveCount(4);
    expect(await svg.locator("[data-stage]").evaluateAll((els) => els.map((e) => e.getAttribute("data-stage")))).toEqual(
      STAGE_NAMES,
    );
    // stage names and text live in the page's HTML, not inside the drawing
    expect(await svg.locator("text").count()).toBe(0);
    const items = trail.locator("ol.trail-list > li");
    await expect(items).toHaveCount(4);
    expect(await items.locator("h3").allInnerTexts()).toEqual(STAGE_NAMES);
    for (const item of await items.all()) await expect(item.locator("p")).toHaveText(/\w{3,}/);
    if (testInfo.project.name === "desktop") {
      await expect(svg).toBeVisible();
      // waypoints climb: each is higher on screen than the one before
      const ys = await svg.locator("[data-stage]").evaluateAll((els) => els.map((e) => e.getBoundingClientRect().top));
      expect([...ys].sort((a, b) => b - a)).toEqual(ys);
    } else {
      // on phones the trail runs down the page beside the list
      const box = await items.first().boundingBox();
      const last = await items.last().boundingBox();
      expect(last!.y).toBeGreaterThan(box!.y + box!.height - 1);
      expect(Math.abs(last!.x - box!.x)).toBeLessThan(2);
    }
  });
}

test("/discovery has no axe violations before any interaction", async ({ page }) => {
  await page.goto("/discovery");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("no inner page scrolls sideways at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const route of [...FLOW_ROUTES, "/no-such-page"]) {
    await page.goto(route);
    const { scroll, client } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(scroll, route).toBeLessThanOrEqual(client);
  }
});

test("Work and the case studies show their proof figures large, in wide Archivo", async ({ page }) => {
  for (const route of ["/work", "/work/transparent-energy", "/work/daniel-avila-64"]) {
    await page.goto(route);
    const fig = page.locator(".in-fig b").first();
    await expect(fig).toBeVisible();
    const { size, stretch } = await fig.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { size: parseFloat(cs.fontSize), stretch: cs.fontStretch };
    });
    expect(size, route).toBeGreaterThanOrEqual(isPhone(page) ? 40 : 52);
    expect(parseFloat(stretch), route).toBeGreaterThanOrEqual(118);
    // no figure spills out of its cell, from tablet width up
    for (const width of isPhone(page) ? [page.viewportSize()!.width] : [900, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const spills = await page.locator(".in-fig b").evaluateAll((els) =>
        els.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
      );
      expect(spills, `${route} at ${width}px`).toEqual([]);
    }
  }
});

test("proof figures fit their cells at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  let checked = 0;
  for (const route of ["/work", "/work/transparent-energy", "/work/daniel-avila-64", "/services/software", "/services/data", "/services/ai-governance"]) {
    await page.goto(route);
    const spills = await page.locator(".in-fig b").evaluateAll((els) =>
      els
        .filter((el) => el.scrollWidth > el.parentElement!.clientWidth)
        .map((el) => `${el.textContent} ${el.scrollWidth}>${el.parentElement!.clientWidth}`),
    );
    expect(spills, route).toEqual([]);
    checked += await page.locator(".in-fig b").count();
  }
  expect(checked).toBeGreaterThan(0);
});

test("nothing on screen when a page loads is caught mid-fade by the reveal", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "the reveal runs on desktop pointers only");
  for (const route of [...FLOW_ROUTES, "/no-such-page"]) {
    await page.goto(route);
    // Content at the bottom edge of the window sits part-way through its fade until the visitor scrolls,
    // and reads as low contrast there. The fix is the class in-still on that section (see inner.css).
    const faded = await page.locator(".inner-sec .wrap > *, .inner-sec .wrap.cols > * > *").evaluateAll((els) =>
      els
        .filter((el) => {
          const box = el.getBoundingClientRect();
          return box.top < window.innerHeight && box.bottom > 0 && Number(getComputedStyle(el).opacity) < 0.9;
        })
        .map((el) => `${el.tagName.toLowerCase()}: ${(el.textContent ?? "").trim().slice(0, 40)}`),
    );
    expect(faded, `${route}: add in-still to the section that holds this`).toEqual([]);
  }
});

function isPhone(page: import("@playwright/test").Page) {
  return (page.viewportSize()?.width ?? 1440) < 900;
}

test("reveal motion is scroll-driven, desktop only, and off under reduced motion", async ({ page }, testInfo) => {
  await page.goto("/approach");
  const heading = page.locator("main > section").nth(1).locator("h2");
  const animated = () => heading.evaluate((el) => getComputedStyle(el.closest(".wrap > *") ?? el).animationName);
  if (testInfo.project.name === "desktop") {
    expect(await animated()).toBe("in-reveal");
    const timeline = await heading.evaluate((el) => getComputedStyle(el.closest(".wrap > *") ?? el).getPropertyValue("animation-timeline"));
    expect(timeline).toMatch(/view\(/);
  } else {
    expect(await animated()).toBe("none");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await animated()).toBe("none");
  // with no motion, content is simply there
  await expect(heading).toHaveCSS("opacity", "1");
});
