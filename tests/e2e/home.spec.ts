import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("first screen at 360×560 shows H1, lead and primary button", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 560 });
  await page.goto("/");
  const hero = page.locator(".hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeInViewport({ ratio: 1 });
  await expect(hero.locator(".lead")).toBeInViewport({ ratio: 1 });
  await expect(
    hero.getByRole("link", { name: "Book a discovery session" }),
  ).toBeInViewport({ ratio: 1 });
});

test("hero primary button keeps Midnight text on Ember", async ({ page }) => {
  await page.goto("/");
  const btn = page.locator(".hero").getByRole("link", { name: "Book a discovery session" });
  await expect(btn).toHaveCSS("color", "rgb(14, 19, 32)");
  await expect(btn).toHaveCSS("background-color", "rgb(255, 122, 61)");
});

test("every section is present in order", async ({ page }) => {
  await page.goto("/");
  const ids = await page.evaluate(() =>
    ["services", "dawn-window", "work", "founder", "discovery"].map((id) => {
      const el = document.getElementById(id);
      return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
    }),
  );
  expect(ids.every(Boolean)).toBe(true);
  const tops = ids.map((i) => i!.top);
  expect([...tops].sort((a, b) => a - b)).toEqual(tops);
  const order = await page.evaluate(() => {
    const ids = ["services", "dawn-window", "work", "founder", "discovery"];
    return ids.every((id, i) => {
      if (i === 0) return true;
      const a = document.getElementById(ids[i - 1])!;
      const b = document.getElementById(id)!;
      return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });
  expect(order).toBe(true);
});

test('the three permitted figures appear and "100%" does not', async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("main").innerText();
  for (const figure of ["$65,000+", "85%", "3.5 months"]) {
    expect(text).toContain(figure);
  }
  expect(text).not.toContain("100%");
});

test("scene contract: #scene holds the hero still and an empty #gl canvas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#scene[aria-hidden="true"] picture img')).toHaveCount(1);
  await expect(page.locator("#scene canvas#gl")).toHaveCount(1);
  await expect(page.locator("#dawn-window img")).toHaveCount(1);
});

test("axe finds no violations with WebGL disabled", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("no horizontal scroll at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const { scroll, client } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
});

test("founder section shows the sized portrait and no FJ placeholder", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#founder");
  const img = section.getByRole("img", { name: "Favio Jasso, founder of Camino Code" });
  await expect(img).toHaveCount(1);
  await expect(img).toHaveAttribute("width", "400");
  await expect(img).toHaveAttribute("height", "501");
  const srcset = (await img.getAttribute("srcset")) ?? "";
  expect(srcset).toMatch(/favio-jasso-400\.webp 400w/);
  expect(srcset).toMatch(/favio-jasso-800\.webp 800w/);
  await expect(img).toHaveAttribute("loading", "lazy");
  await expect(section).toContainText("Favio Jasso · Founder · Newark, NJ");
  await expect(section).not.toContainText(/\bFJ\b/);
  // the image actually loads
  await img.scrollIntoViewIfNeeded();
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
});

test("home has its own title and description, canonical and share address", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Camino Code | Software, data and AI consulting in Newark, NJ");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Camino Code is a software, data and AI consultancy in Newark, New Jersey, for small and mid-sized businesses. It starts with a free conversation.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.caminocode.com");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://www.caminocode.com");
});

test("section heads carry the scene clock's hour, in order through the morning", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#services .sec-head .t")).toHaveText("06:10 · Before dawn");
  await expect(page.locator("#dawn-window .dawn-caption")).toHaveText("06:24 · First light on the saddle");
  await expect(page.locator("#work .sec-head .t")).toHaveText("06:40 · Morning");
  await expect(page.locator("#discovery .sec-head .t")).toHaveText("07:30 · Daylight");
});

test("the hero proof line shows the first permitted figure, and steps aside on short phones", async ({ page }) => {
  const proof = page.locator(".hero .hero-proof");
  for (const size of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await expect(proof).toBeVisible();
    expect(((await proof.innerText()) ?? "").replace(/\s+/g, " ")).toBe(
      "$65,000+ a year saved in analyst time · Transparent Energy",
    );
  }
  // on a short phone it would lie under the Motion control, so it is not shown
  await page.setViewportSize({ width: 360, height: 560 });
  await page.goto("/");
  await expect(proof).toBeHidden();
});

test("founder block says who you work with, in the third person, and links to his note", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#founder");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("You work with the founder.");
  await expect(section.locator("p.lead")).toHaveText([
    "Favio Jasso started Camino Code in Newark, New Jersey. The person you talk to first is the person who answers for the work.",
  ]);
  await expect(section.getByRole("link", { name: "Read Favio's note" })).toHaveAttribute("href", "/about");
  // the list of websites is gone; the proof above already carries Transparent Energy
  for (const gone of ["DANIEL AVILA 64", "Victoria's Painting", "Transparent Energy"]) await expect(section).not.toContainText(gone);
  const text = (await section.innerText()).toLowerCase();
  for (const banned of [/one-man/, /\bsolo\b/, /\bour team\b/, /\bour staff\b/, /award/, /years of experience/]) {
    expect(text).not.toMatch(banned);
  }
});

test("the page is dark at the root on the home page and light elsewhere", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(14, 19, 32)");
  await page.goto("/about");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
});

test("the hero still is framed where the live camera puts the saddle", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); // the still stays; no scene code runs
  await page.goto("/");
  const still = page.locator("#scene picture img");
  await expect(still).toBeVisible();
  const desktop = testInfo.project.name === "desktop";
  await expect(still).toHaveCSS("object-fit", "cover");
  await expect(still).toHaveCSS("object-position", desktop ? "68% 40%" : "58% 24%");
  expect(await still.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(
    desktop ? "/stills/hero-desktop.svg" : "/stills/hero-phone.svg",
  );
  // the still fills the same box as the canvas
  const boxes = await page.evaluate(() => {
    const img = document.querySelector("#scene picture img")!.getBoundingClientRect();
    const gl = document.querySelector("#gl")!.getBoundingClientRect();
    return { img: [img.width, img.height], gl: [gl.width, gl.height] };
  });
  expect(boxes.img).toEqual(boxes.gl);
});

test("the hero names software, reports and AI, and ends on a free conversation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .lead")).toHaveText(
    "We build software that takes the re-typing out of your team’s day, make your reports agree, and put AI to work only where it pays for itself, with rules your staff can follow. It starts with a free conversation.",
  );
});

test("the approach section starts with a conversation and puts the reply time beside the button", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#discovery");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("It starts with a conversation.");
  await expect(section.locator(".sec-head .lead")).toHaveText(
    "A free 45-minute conversation, by video or in person, about the tools you use, where your numbers live and where the hours go. If you go ahead, this is how it runs.",
  );
  await expect(section.locator(".cta-contact")).toHaveText(
    "Or write to contact@caminocode.com or call +1 973-234-2073. You’ll hear back within one business day.",
  );
  // each promise once on the page: the summary is the Route stage's, the reply time the contact line's
  const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
  expect(text.match(/one business day/g)).toHaveLength(1);
  expect(text.match(/one-page summary/g)).toHaveLength(1);
  expect(text.match(/45-minute/g)).toHaveLength(1);
});
