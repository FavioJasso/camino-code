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
