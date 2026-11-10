import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/services/software",
  "/services/data",
  "/services/ai-governance",
  "/work",
  "/work/transparent-energy",
  "/approach",
  "/about",
  "/privacy",
  "/terms",
];

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
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("only the Data page carries the Transparent Energy proof, with the permitted figures", async ({
  page,
}) => {
  await page.goto("/services/data");
  const data = (await page.locator("main").textContent()) ?? "";
  for (const figure of ["$65,000+", "85%", "3.5 months"]) expect(data).toContain(figure);
  expect(data).toContain("Camino Code's founder led the build");
  for (const slug of ["software", "ai-governance"]) {
    await page.goto(`/services/${slug}`);
    expect(await page.locator("main").innerText()).not.toContain("Transparent Energy");
  }
});

test("case study and about carry no banned claims", async ({ page }) => {
  await page.goto("/work/transparent-energy");
  const study = await page.locator("main").innerText();
  expect(study).not.toContain("100%");
  expect(study).toContain("3.5 months");
  await page.goto("/about");
  const about = await page.locator("main").innerText();
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
