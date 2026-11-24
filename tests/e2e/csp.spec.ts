import { expect, test, type Page } from "@playwright/test";
import { PAGES } from "./routes";

/* The Content-Security-Policy in next.config.ts must never block anything the site loads.
   A violation is reported twice by the browser: as a securitypolicyviolation event and as a
   console error. Both are collected here, and any one fails the test. The live scene has
   the same check in scene.spec.ts, where WebGL is available. */

type Watch = { violations: () => Promise<string[]> };

async function watch(page: Page): Promise<Watch> {
  const logged: string[] = [];
  page.on("console", (msg) => {
    if (/Content[- ]Security[- ]Policy/i.test(msg.text())) logged.push(msg.text());
  });
  await page.addInitScript(() => {
    const w = window as unknown as { __csp?: string[] };
    w.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      w.__csp!.push(`${e.effectiveDirective}: ${e.blockedURI || "inline"} (${e.sourceFile ?? ""}:${e.lineNumber})`);
    });
  });
  return {
    violations: async () => [
      ...logged,
      ...(await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])),
    ],
  };
}

/** Lets the idle-time work run (the scene chunk, analytics), then walks the page to its foot. */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(300);
}

for (const route of [...PAGES, "/no-such-page"]) {
  test(`${route} loads without a Content-Security-Policy violation`, async ({ page }) => {
    const csp = await watch(page);
    const response = await page.goto(route);
    expect(response?.headers()["content-security-policy"]).toContain("default-src 'self'");
    await settle(page);
    expect(await csp.violations(), route).toEqual([]);
  });
}

test("moving between pages by link raises no violation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "uses the desktop header nav");
  const csp = await watch(page);
  await page.goto("/");
  const nav = page.locator('header nav[aria-label="Primary"]');
  for (const [name, heading] of [
    ["Services", "Services"],
    ["Work", "Work"],
    ["Approach", "How we work"],
    ["About", "About Camino Code"],
  ]) {
    await nav.getByRole("link", { name }).click();
    await expect(page.locator("h1")).toHaveText(heading);
    await page.waitForTimeout(800);
  }
  await page.locator("header").getByRole("link", { name: "Camino Code home" }).click();
  await expect(page.locator("#scene")).toBeAttached();
  await page.waitForTimeout(1500);
  expect(await csp.violations()).toEqual([]);
});

test("the phone menu opens without a violation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "phone viewport only");
  const csp = await watch(page);
  await page.goto("/about");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.waitForTimeout(400);
  expect(await csp.violations()).toEqual([]);
});

test("the discovery form validates, sends and confirms without a violation", async ({ page }) => {
  const csp = await watch(page);
  await page.goto("/discovery");
  // an empty submit: the server action answers with the error summary
  await page.getByRole("button", { name: "Send request" }).click();
  // the form waits until its signed timestamp is old enough before any send, an empty one too
  await expect(page.getByRole("group", { name: "Please fix the following" })).toBeFocused({ timeout: 15_000 });
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await page.getByLabel(/Business name/).fill("__test_sent__");
  await page.waitForTimeout(3500); // the form's signed timestamp must be at least 3 seconds old
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Your request is in");
  expect(await csp.violations()).toEqual([]);
});

test("the policy does block what it should: an injected third-party script never runs", async ({ page }) => {
  await page.goto("/privacy");
  const blocked = await page.evaluate(
    () =>
      new Promise<string>((resolve) => {
        document.addEventListener("securitypolicyviolation", (e) => resolve(`${e.effectiveDirective} ${e.blockedURI}`), {
          once: true,
        });
        const script = document.createElement("script");
        script.src = "https://example.com/not-ours.js";
        document.head.append(script);
        setTimeout(() => resolve("not blocked"), 3000);
      }),
  );
  expect(blocked).toMatch(/^script-src(-elem)? https:\/\/example\.com/);
});
