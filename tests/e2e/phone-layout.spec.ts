import { expect, test } from "@playwright/test";

test.describe("phone layout", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "phone", "phone viewport only");
  });

  for (const path of ["/", "/privacy", "/services/data"]) {
    for (const state of ["closed", "open"] as const) {
      test(`${path} fits 390 px with the menu ${state}`, async ({ page }) => {
        await page.goto(path);
        if (state === "open") {
          const toggle = page.getByRole("button", { name: "Menu" });
          await toggle.click();
          await expect(toggle).toHaveAttribute("aria-expanded", "true");
        }
        const m = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }));
        // innerWidth grows past 390 whenever something overflows, so it is part of the assertion
        expect(m.innerWidth).toBe(390);
        expect(m.scrollWidth).toBeLessThanOrEqual(m.innerWidth);
      });
    }
  }
});
