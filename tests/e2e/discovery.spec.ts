import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("empty submit focuses the error summary listing three fields", async ({ page }) => {
  await page.goto("/discovery");
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "Please fix the following" });
  await expect(summary).toBeFocused();
  await expect(summary.getByRole("link")).toHaveCount(3);
  await summary.getByRole("link").first().click();
  await expect(page.getByLabel(/Your name/)).toBeFocused();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("with Resend unset, submit shows the email fallback and keeps typed values", async ({ page }) => {
  await page.goto("/discovery");
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await page.getByLabel(/Business name/).fill("Ruiz Bakery, wholesale bread");
  await page.getByLabel(/What would you like/).fill("Our invoices");
  await page.waitForTimeout(3500); // the form's signed timestamp must be at least 3 seconds old
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("group", { name: "We could not send your request" })).toContainText(
    "We couldn't send this. Email us at contact@caminocode.com and we'll reply within one business day.",
  );
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/^Email/)).toHaveValue("ana@example.com");
  await expect(page.getByLabel(/Business name/)).toHaveValue("Ruiz Bakery, wholesale bread");
  await expect(page.getByLabel(/What would you like/)).toHaveValue("Our invoices");
});

test("?ref=maria prefills the referrer field", async ({ page }) => {
  await page.goto("/discovery?ref=maria");
  await expect(page.getByLabel(/Who introduced you/)).toHaveValue("maria");
});

test("success is announced in a status region that existed before submit, and takes focus", async ({ page }) => {
  await page.goto("/discovery");
  const status = page.getByRole("status");
  await expect(status).toBeAttached();
  await expect(status).toBeEmpty();
  const handle = await status.elementHandle();
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await page.getByLabel(/Business name/).fill("__test_sent__");
  await page.waitForTimeout(3500);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(status).toContainText("Your request is in");
  expect(await handle!.evaluate((el) => el.isConnected)).toBe(true);
  await expect(page.getByRole("heading", { name: /Your request is in/ })).toBeFocused();
});
