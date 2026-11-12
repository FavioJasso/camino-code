import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const LINKS: [string, string][] = [
  ["Software", "/services/software"],
  ["Data", "/services/data"],
  ["AI & governance", "/services/ai-governance"],
  ["Work", "/work"],
  ["Approach", "/approach"],
  ["About", "/about"],
  ["Book discovery", "/discovery"],
];

test.describe("phone menu", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "phone", "phone viewport only");
  });

  test("opens with every page listed", async ({ page }) => {
    await page.goto("/about");
    const toggle = page.getByRole("button", { name: "Menu" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("navigation", { name: "Menu" });
    for (const [label] of LINKS.slice(0, 6)) {
      await expect(
        menu.getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
    await expect(
      page
        .locator("#mobile-menu")
        .getByRole("link", { name: "Book discovery" }),
    ).toBeVisible();
    const box = await menu
      .getByRole("link", { name: "Work", exact: true })
      .boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });

  for (const [label, href] of LINKS) {
    test(`"${label}" navigates to ${href} and closes the menu`, async ({
      page,
    }) => {
      await page.goto("/about");
      const toggle = page.getByRole("button", { name: "Menu" });
      await toggle.click();
      await page
        .locator("#mobile-menu")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#mobile-menu")).toBeHidden();
    });
  }

  test("Escape closes and returns focus to the button", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("the button closes it too, and the page behind is inert and does not scroll", async ({
    page,
  }) => {
    await page.goto("/approach");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(page.locator("footer")).toHaveAttribute("inert", "");
    await page.mouse.move(200, 500);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    ).toBe("hidden");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    await expect(page.locator("footer")).not.toHaveAttribute("inert", "");
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    ).not.toBe("hidden");
  });

  test("sits above the home page's fixed Motion control and has no axe violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const top = await page.evaluate(() => {
      const el = document.elementFromPoint(
        window.innerWidth - 60,
        window.innerHeight - 40,
      );
      return !!el?.closest("#mobile-menu");
    });
    expect(top).toBe(true);
    // let the fade finish so axe measures real colours
    await expect
      .poll(() =>
        page
          .locator("#mobile-menu")
          .evaluate((el) => getComputedStyle(el).opacity),
      )
      .toBe("1");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});

test("the menu button is not shown on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.goto("/about");
  await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});
