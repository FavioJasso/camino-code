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

const motionButton = (page: Page) => page.getByRole("button", { name: "Pause animation" });

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

test("Motion button toggles aria-pressed", async ({ page }) => {
  await page.goto("/");
  const button = motionButton(page);
  await expect(button).toBeVisible({ timeout: 10_000 });
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(button).toHaveAccessibleName("Pause animation");
  // the choice persists for the session
  await page.reload();
  await expect(motionButton(page)).toHaveAttribute("aria-pressed", "true", { timeout: 10_000 });
  await motionButton(page).click();
  await expect(motionButton(page)).toHaveAttribute("aria-pressed", "false");
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
