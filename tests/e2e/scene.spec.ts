import { expect, test, type Page } from "@playwright/test";

// Runs in the "scene" project only (Chromium with SwiftShader WebGL), see playwright.config.ts.

declare global {
  var __caminoScene: boolean | undefined;
}

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  // Vercel Analytics and Speed Insights scripts are served by Vercel's edge; a local server 404s them
  void page.route("**/_vercel/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: "" }),
  );
  page.on("console", (msg) => {
    // Next prefetches header links (?_rsc=) to pages later tasks build; those 404s are not scene errors
    if (msg.type() === "error" && !msg.location().url.includes("?_rsc=")) errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

// the control's label says what the next press does: "Pause animation" while the scene runs, "Play animation" while it is paused
const motionButton = (page: Page) => page.getByRole("button", { name: /^(Pause|Play) animation$/ });

/** Collects Content-Security-Policy violations: the browser's own event, and its console report. */
async function collectCspViolations(page: Page): Promise<() => Promise<string[]>> {
  const logged: string[] = [];
  page.on("console", (msg) => {
    if (/Content[- ]Security[- ]Policy/i.test(msg.text())) logged.push(msg.text());
  });
  await page.addInitScript(() => {
    const w = window as unknown as { __csp?: string[] };
    w.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      w.__csp!.push(`${e.effectiveDirective}: ${e.blockedURI || "inline"}`);
    });
  });
  return async () => [...logged, ...(await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []))];
}

test("the live scene runs under the Content-Security-Policy with no violation", async ({ page }) => {
  const violations = await collectCspViolations(page);
  const response = await page.goto("/");
  expect(response?.headers()["content-security-policy"]).toContain("script-src 'self' 'unsafe-inline'");
  await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  await expect(page.locator("#gl")).toHaveCSS("opacity", "1");
  // through the hero and the sunrise window, pause and resume, then down to the foot of the page
  await page.locator("#dawn-window").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await motionButton(page).click();
  await motionButton(page).click();
  expect(await violations()).toEqual([]);
  // then a live band on an inner page, reached by a client-side route change
  await page.locator("header").getByRole("link", { name: "Work" }).click();
  await expect(page.locator("section.band")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  await page.waitForTimeout(500);
  expect(await violations()).toEqual([]);
});

test("scene goes live with software WebGL and logs no errors", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  await expect(page.locator("#gl")).toHaveCSS("opacity", "1");
  // readouts are drawn into #scene-ui, which sits inside the aria-hidden scene
  await expect(page.locator("#scene #scene-ui")).toContainText("Stage 0");
  await expect(motionButton(page)).toBeVisible();
  // scroll through the hero and into the sunrise window: still no errors
  await page.mouse.wheel(0, 900);
  await page.locator("#dawn-window").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("scene goes live with software WebGL and logs no errors", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
    expect(errors).toEqual([]);
  });

  // The hero copy, with its note by the button, reaches the saddle on phones under 820 px tall:
  // the scene's "Saddle" label steps aside there instead of showing through behind the words.
  for (const [width, height, shown] of [
    [390, 844, true],
    [430, 739, false],
    [412, 784, false],
    [390, 664, false],
  ] as const) {
    test(`the Saddle label is ${shown ? "shown" : "hidden"} in the hero at ${width}x${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
      const label = page.locator("#scene-ui > div").filter({ hasText: /^Saddle$/ });
      await expect(label).toHaveCount(1);
      await expect(label).toHaveCSS("opacity", shown ? "1" : "0");
      // the note shows from 760 px tall (the longer hero lead needs the extra line); the scene hides the
      // label under 820 px tall either way (src/scene/scene.ts)
      const note = page.locator(".hero .hero-note");
      if (height >= 760) await expect(note).toBeVisible();
      else await expect(note).toBeHidden();
    });
  }
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("reduced motion never requests the scene chunk", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(2500); // well past the idle-callback fallback (1200 ms)
    // scene.ts flags itself at module top level, so this stays undefined unless the chunk ran
    expect(await page.evaluate(() => globalThis.__caminoScene)).toBeUndefined();
    await expect(page.locator("#scene")).not.toHaveClass(/\bis-live\b/);
    await expect(page.locator("#scene picture img")).toBeVisible();
    await expect(motionButton(page)).toHaveCount(0);
  });
});

test("WebGL unavailable leaves the still and hides the Motion button", async ({ page }) => {
  const errors = collectErrors(page);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error narrowing the overloads is not the point here
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      if (type === "webgl2" || type === "webgl") return null;
      return original.call(this, type, ...rest);
    };
  });
  await page.goto("/");
  // the scene code did load and run, then found no WebGL 2
  await expect.poll(() => page.evaluate(() => globalThis.__caminoScene), { timeout: 10_000 }).toBe(true);
  await page.waitForTimeout(500);
  await expect(page.locator("#scene")).not.toHaveClass(/\bis-live\b/);
  await expect(page.locator("#scene picture img")).toBeVisible();
  await expect(page.locator("#dawn-window .dawn-still")).toHaveCSS("opacity", "1");
  await expect(motionButton(page)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("the Motion button's label follows its state, and the choice lasts for the session", async ({ page }) => {
  await page.goto("/");
  const button = motionButton(page);
  await expect(button).toBeVisible({ timeout: 10_000 });
  await expect(button).toHaveText("Pause animation");
  // the name carries the state, so there is no pressed state to contradict it
  await expect(button).not.toHaveAttribute("aria-pressed", /.*/);
  await expect(button).toHaveCSS("font-size", "12px");
  expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await button.click();
  await expect(button).toHaveText("Play animation");
  await expect(button).toHaveAccessibleName("Play animation");
  await expect(button).not.toHaveAttribute("aria-pressed", /.*/);
  // the edge changes with the words
  await expect(button).toHaveCSS("border-top-color", "rgb(255, 122, 61)");
  expect(await page.evaluate(() => sessionStorage.getItem("camino:motion-paused"))).toBe("1");
  // the choice persists for the session
  await page.reload();
  await expect(motionButton(page)).toHaveText("Play animation", { timeout: 10_000 });
  await motionButton(page).click();
  await expect(motionButton(page)).toHaveText("Pause animation");
  expect(await page.evaluate(() => sessionStorage.getItem("camino:motion-paused"))).toBe("0");
  // and carries to an inner page's band
  await motionButton(page).click();
  await page.goto("/work");
  await expect(motionButton(page)).toHaveText("Play animation", { timeout: 10_000 });
});

test("context loss falls back to the still, restore fades the scene back in", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator("#scene");
  await expect(scene).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  await page.evaluate(() => {
    const gl = (document.getElementById("gl") as HTMLCanvasElement).getContext("webgl2")!;
    const ext = gl.getExtension("WEBGL_lose_context")!;
    (window as unknown as { __loseExt: WEBGL_lose_context }).__loseExt = ext;
    ext.loseContext();
  });
  await expect(scene).not.toHaveClass(/\bis-live\b/);
  await expect(motionButton(page)).toHaveCount(0);
  await page.evaluate(() => (window as unknown as { __loseExt: WEBGL_lose_context }).__loseExt.restoreContext());
  await expect(scene).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
});

test("leaving the home page by a header link tears the scene down and frees its WebGL context", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  // keep the scene's own context, then go client-side to /work
  await page.evaluate(() => {
    const canvas = document.getElementById("gl") as HTMLCanvasElement;
    (window as unknown as { __sceneGl: WebGL2RenderingContext }).__sceneGl = canvas.getContext("webgl2")!;
  });
  await page.locator("header").getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText(/Work/);
  // same document (client-side navigation), so the kept context is still reachable
  const state = await page.evaluate(() => {
    const w = window as unknown as { __sceneGl?: WebGL2RenderingContext };
    return { survived: !!w.__sceneGl, lost: w.__sceneGl?.isContextLost() };
  });
  expect(state).toEqual({ survived: true, lost: true });
  await expect(page.locator("#scene")).toHaveCount(0);
});

// ---- inner pages: a shorter live band of the same ridge in each page header ----

const band = (page: Page) => page.locator("section.band");

for (const path of ["/services", "/services/data", "/work", "/work/victorias-painting", "/approach", "/about"]) {
  test(`${path}: the header band goes live with no console errors`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(band(page)).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
    await expect(band(page).locator("canvas")).toHaveCSS("opacity", "1");
    // the canvas fills the band, not the viewport
    const sizes = await page.evaluate(() => {
      const b = document.querySelector("section.band")!.getBoundingClientRect();
      const c = document.querySelector("section.band canvas")!.getBoundingClientRect();
      return { bw: b.width, bh: b.height, cw: c.width, ch: c.height };
    });
    expect(sizes.cw).toBeCloseTo(sizes.bw, 0);
    expect(sizes.ch).toBeCloseTo(sizes.bh, 0);
    expect(sizes.ch).toBeLessThan(500);
    await expect(band(page).locator("h1")).toBeVisible();
    await expect(motionButton(page)).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("/privacy keeps the still and never runs scene code", async ({ page }) => {
  await page.goto("/privacy");
  await page.waitForLoadState("load");
  await page.waitForTimeout(2500); // past the idle-callback fallback
  expect(await page.evaluate(() => globalThis.__caminoScene)).toBeUndefined();
  await expect(band(page).locator(".band-still")).toBeVisible();
  await expect(band(page).locator("canvas")).toHaveCount(0);
  await expect(motionButton(page)).toHaveCount(0);
});

test.describe("inner pages with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("no inner page runs scene code and the band still shows", async ({ page }) => {
    for (const path of ["/services", "/services/data", "/work", "/work/daniel-avila", "/approach", "/about", "/discovery"]) {
      await page.goto(path);
      await page.waitForLoadState("load");
      await page.waitForTimeout(1500);
      expect(await page.evaluate(() => globalThis.__caminoScene), path).toBeUndefined();
      await expect(band(page).locator(".band-still"), path).toBeVisible();
      await expect(band(page), path).not.toHaveClass(/\bis-live\b/);
      await expect(motionButton(page), path).toHaveCount(0);
    }
  });
});

test("inner page with WebGL unavailable keeps the still and the title panel", async ({ page }) => {
  const errors = collectErrors(page);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error narrowing the overloads is not the point here
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      if (type === "webgl2" || type === "webgl") return null;
      return original.call(this, type, ...rest);
    };
  });
  await page.goto("/work");
  await expect.poll(() => page.evaluate(() => globalThis.__caminoScene), { timeout: 10_000 }).toBe(true);
  await page.waitForTimeout(500);
  await expect(band(page)).not.toHaveClass(/\bis-live\b/);
  await expect(band(page).locator(".band-still")).toBeVisible();
  await expect(band(page).locator(".band-panel h1")).toBeVisible();
  await expect(motionButton(page)).toHaveCount(0);
  // the still framed for this page's stage and hour, desktop version at this width
  expect(await band(page).locator(".band-still").evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(
    "/stills/band-s2-morning-desktop.svg",
  );
  expect(errors).toEqual([]);
});

test("band Motion control pauses and never covers the title", async ({ page }) => {
  await page.goto("/work/transparent-energy");
  const button = motionButton(page);
  await expect(button).toBeVisible({ timeout: 10_000 });
  await expect(button).toHaveText("Pause animation");
  await button.click();
  await expect(button).toHaveText("Play animation");
  const overlap = await page.evaluate(() => {
    const a = document.querySelector(".motion-toggle")!.getBoundingClientRect();
    const b = document.querySelector(".band-panel")!.getBoundingClientRect();
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  });
  expect(overlap).toBe(false);
});

// the longest title on the site
const LONGEST_TITLE = "/work/victorias-painting";

test("band Motion control stays clear of the longest title", async ({ page }) => {
  await page.goto(LONGEST_TITLE);
  await expect(motionButton(page)).toBeVisible({ timeout: 10_000 });
  const overlap = await page.evaluate(() => {
    const a = document.querySelector(".motion-toggle")!.getBoundingClientRect();
    const b = document.querySelector(".band-panel")!.getBoundingClientRect();
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
  });
  expect(overlap).toBe(false);
});

test.describe("band on a phone", () => {
  test.use({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });

  test("the Motion control never covers the title panel, even with a long title", async ({ page }) => {
    await page.goto("/work/transparent-energy");
    await expect(motionButton(page)).toBeVisible({ timeout: 10_000 });
    const overlap = await page.evaluate(() => {
      const a = document.querySelector(".motion-toggle")!.getBoundingClientRect();
      const b = document.querySelector(".band-panel")!.getBoundingClientRect();
      return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    });
    expect(overlap).toBe(false);
    // no horizontal scroll at 320 px
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    expect(await band(page).locator(".band-still").evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(
      "/stills/band-s2-morning-phone.svg",
    );
  });

  test("the Motion control never covers the longest title on the site, and the page does not scroll sideways", async ({
    page,
  }) => {
    await page.goto(LONGEST_TITLE);
    await expect(motionButton(page)).toBeVisible({ timeout: 10_000 });
    const overlap = await page.evaluate(() => {
      const a = document.querySelector(".motion-toggle")!.getBoundingClientRect();
      const b = document.querySelector(".band-panel")!.getBoundingClientRect();
      return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    });
    expect(overlap).toBe(false);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  });
});

test.describe("band on a 390 px phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("the band draws about 25,000 terrain points, not the desktop 84,000", async ({ page }) => {
    await page.goto("/services/data");
    await expect(band(page)).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
    const points = Number(await band(page).locator("canvas").getAttribute("data-points"));
    expect(points).toBeGreaterThan(20_000);
    expect(points).toBeLessThanOrEqual(25_000);
  });
});

test("home -> /work -> /approach -> / leaves exactly one live WebGL context", async ({ page }) => {
  // record every WebGL context the page creates, so a leaked one cannot hide on a removed canvas
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const made: WebGL2RenderingContext[] = [];
    (window as unknown as { __glMade: WebGL2RenderingContext[] }).__glMade = made;
    // @ts-expect-error narrowing the overloads is not the point here
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      const ctx = original.call(this, type, ...rest);
      if ((type === "webgl2" || type === "webgl") && ctx && !made.includes(ctx as WebGL2RenderingContext)) {
        made.push(ctx as WebGL2RenderingContext);
      }
      return ctx;
    };
  });
  const liveContexts = () =>
    page.evaluate(() =>
      (window as unknown as { __glMade: WebGL2RenderingContext[] }).__glMade.filter((c) => !c.isContextLost()).length,
    );
  await page.goto("/");
  await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  const nav = page.locator("header nav[aria-label='Primary']");
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(band(page)).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  // straight on, without waiting for the approach band to start
  await nav.getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/\/approach$/);
  await page.locator("header").getByRole("link", { name: "Camino Code home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#scene")).toHaveClass(/\bis-live\b/, { timeout: 10_000 });
  await page.waitForTimeout(1500); // any start-up still in flight from a page already left would land here
  expect(await liveContexts()).toBe(1);
  expect(await page.evaluate(() => document.querySelectorAll("canvas").length)).toBe(1);
});
