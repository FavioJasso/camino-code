import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = [
  "/services/software",
  "/services/data",
  "/services/ai-governance",
  "/work",
  "/work/transparent-energy",
  "/work/daniel-avila-64",
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
  for (const route of [...ROUTES, "/"]) {
    expect(await (await request.get(route)).text(), route).not.toContain("TODO");
  }
});

test("Software page shows DANIEL AVILA 64 as its proof point; Data keeps Transparent Energy", async ({
  page,
}) => {
  await page.goto("/services/software");
  const software = ((await page.locator("main").innerText()) ?? "").replace(/\s+/g, " ");
  expect(software).toContain("DANIEL AVILA 64");
  expect(software).toContain("158 kB first-load JavaScript");
  await expect(page.locator('main a[href="/work/daniel-avila-64"]')).toBeVisible();
  await page.goto("/services/ai-governance");
  expect(await page.locator("main").innerText()).not.toContain("DANIEL AVILA 64");
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
