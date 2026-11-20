import { expect, test } from "@playwright/test";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "./routes";

/* The two error pages. No route throws on purpose, so each test breaks something from the
   browser's side: a failed form request for the page-level boundary (src/app/error.tsx), and a
   failing browser API under the phone menu, which lives in the root layout, for the last-resort
   page (src/app/global-error.tsx). */

test("a failed request on a page shows the error page inside the site shell, and Try again recovers", async ({
  page,
}) => {
  await page.goto("/discovery");
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await page.getByLabel(/Business name/).fill("Ruiz Bakery, wholesale bread");
  await page.waitForTimeout(3500); // the form's signed timestamp must be at least 3 seconds old
  // from here on the server answers the form's requests with an error
  let failing = true;
  await page.route("**/discovery", (route) =>
    failing && route.request().method() === "POST"
      ? route.fulfill({ status: 500, contentType: "text/plain", body: "Internal Server Error" })
      : route.continue(),
  );
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.locator("h1")).toHaveText("Something went wrong on this page");
  await expect(page.locator("h1")).toHaveCount(1);
  const main = page.locator("main");
  await expect(main).toContainText("This page did not load as it should.");
  await expect(main.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
  await expect(main.locator(`a[href="${EMAIL_HREF}"]`)).toHaveText(EMAIL);
  await expect(main.locator(`a[href="${PHONE_HREF}"]`)).toHaveText(PHONE);
  // the header and footer are still there
  await expect(page.getByRole("banner").getByRole("link", { name: "Camino Code home" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  failing = false;
  await main.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("h1")).toHaveText("Book a discovery session");
  await expect(page.getByRole("button", { name: "Send request" })).toBeVisible();
});

test("a failure in the site shell itself shows the last-resort error page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "uses the phone menu, which is part of the root layout");
  await page.goto("/privacy");
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  // the menu asks the browser about the viewport when it opens; make that call fail
  await page.evaluate(() => {
    window.matchMedia = () => {
      throw new Error("test: a browser API failed under the root layout");
    };
  });
  await page.getByRole("button", { name: "Menu" }).click();

  await expect(page.locator("h1")).toHaveText("Something went wrong");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveTitle("Something went wrong | Camino Code");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const main = page.locator("main");
  await expect(main).toContainText("The site did not load as it should.");
  await expect(main.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
  await expect(main.locator(`a[href="${EMAIL_HREF}"]`)).toHaveText(EMAIL);
  await expect(main.locator(`a[href="${PHONE_HREF}"]`)).toHaveText(PHONE);
  // it brings its own styles and fonts: the band is Midnight and the title is set in Archivo
  await expect(page.locator("section.band")).toHaveCSS("background-color", "rgb(14, 19, 32)");
  expect(await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/archivo/i);
  // a plain link, so leaving is a full page load into a working site
  await main.getByRole("link", { name: "Back to the home page" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toHaveText("Be on the trail before your competitors wake up.");
});
