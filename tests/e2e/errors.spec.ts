import { expect, test } from "@playwright/test";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "./routes";

/* The two error pages. No route throws on purpose, so each test breaks a browser API that a
   component asks for: the one the band's scene asks when a page appears, for the page-level
   boundary (src/app/error.tsx), and the same one under the phone menu, which lives in the root
   layout, for the last-resort page (src/app/global-error.tsx). */

declare global {
  interface Window {
    __matchMedia?: typeof window.matchMedia;
  }
}

test("a failure on a page shows the error page inside the site shell, at the top with its heading focused, and Try again recovers", async ({
  page,
}) => {
  // read some way down /work, leave by a footer link, then come back with Back:
  // the browser puts the old scroll position back as the page returns
  await page.goto("/work");
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
  await page.getByRole("contentinfo").getByRole("link", { name: "Privacy" }).click();
  await expect(page.locator("h1")).toHaveText("Privacy");
  // from here on the call the band makes as its page appears fails (/privacy has no live band)
  await page.evaluate(() => {
    window.__matchMedia = window.matchMedia;
    window.matchMedia = () => {
      throw new Error("test: a browser API failed under a page");
    };
  });
  await page.goBack();

  await expect(page.locator("h1")).toHaveText("Something went wrong on this page");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page).toHaveURL(/\/work$/);
  const main = page.locator("main");
  // the short error page starts at the top, whatever the scroll position was: the heading is on
  // screen and has focus, and the button is clear of the sticky header
  await expect(page.locator("h1")).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator("h1")).toBeInViewport({ ratio: 1 });
  const retry = main.getByRole("button", { name: "Try again" });
  await expect(retry).toBeInViewport({ ratio: 1 });
  const { buttonTop, headerBottom } = await page.evaluate(() => ({
    buttonTop: [...document.querySelectorAll("main button")]
      .find((b) => b.textContent === "Try again")!
      .getBoundingClientRect().top,
    headerBottom: document.querySelector(".site-head")!.getBoundingClientRect().bottom,
  }));
  expect(buttonTop).toBeGreaterThan(headerBottom);
  await expect(main).toContainText("This page did not load as it should.");
  await expect(main.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
  await expect(main.locator(`a[href="${EMAIL_HREF}"]`)).toHaveText(EMAIL);
  await expect(main.locator(`a[href="${PHONE_HREF}"]`)).toHaveText(PHONE);
  // the header and footer are still there
  await expect(page.getByRole("banner").getByRole("link", { name: "Camino Code home" })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  await page.evaluate(() => {
    window.matchMedia = window.__matchMedia!;
  });
  await retry.click();
  await expect(page.locator("h1")).toHaveText("Work");
  await expect(main.locator('a[href="/work/transparent-energy"]').first()).toBeVisible();
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
  await expect(page.locator("h1")).toBeFocused();
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
