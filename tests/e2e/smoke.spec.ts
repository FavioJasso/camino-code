import { expect, test } from "@playwright/test";

test("home has one h1, a skip link, and the header button \"Book discovery\"", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Book discovery" })).toBeVisible();
});

test("home links an icon", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.locator('link[rel="icon"]').first().getAttribute("href");
  expect(href).toBeTruthy();
  const res = await request.get(new URL(href!, page.url()).toString());
  expect(res.status()).toBe(200);
});
