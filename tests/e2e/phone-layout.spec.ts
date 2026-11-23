import { expect, test } from "@playwright/test";

test.describe("phone layout", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== "phone", "phone viewport only");
  });

  for (const width of [320, 360, 380, 390, 393, 412, 420, 430]) {
    test(`header keeps its 16 px gutter at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/privacy");
      const toggle = page.getByRole("button", { name: "Menu" });
      const right = await toggle.evaluate((el) => el.getBoundingClientRect().right);
      const m = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(m.innerWidth).toBe(width);
      expect(m.scrollWidth).toBeLessThanOrEqual(width);
      expect(right).toBeLessThanOrEqual(width - 16);
      const wordmark = page.locator(".site-head .brand span");
      if (width >= 360) await expect(wordmark).toBeVisible();
      else await expect(wordmark).toBeHidden();
      const box = await toggle.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  }

  // Safari 15 has neither container queries (which drop the wordmark where it does not fit) nor
  // overflow: clip. The same state is made here: the header's container is switched off and every
  // @supports block that asks for overflow: clip is taken out of the page's stylesheets.
  for (const width of [320, 375, 414]) {
    test(`without container queries or overflow: clip, the wrapped wordmark is cut off at ${width} px, not hung under the header`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/privacy");
      const brand = page.locator(".site-head .brand");
      // as shipped, only the second line is clipped
      await expect(brand).toHaveCSS("overflow-x", "visible");
      await expect(brand).toHaveCSS("overflow-y", "clip");

      const removed = await page.evaluate(() => {
        let count = 0;
        const walk = (owner: CSSStyleSheet | CSSGroupingRule) => {
          for (let i = owner.cssRules.length - 1; i >= 0; i--) {
            const rule = owner.cssRules[i];
            if (rule instanceof CSSSupportsRule && /overflow:\s*(visible\s+)?clip/.test(rule.conditionText)) {
              owner.deleteRule(i);
              count++;
            } else if ("cssRules" in rule) walk(rule as CSSGroupingRule);
          }
        };
        for (const sheet of document.styleSheets) walk(sheet);
        return count;
      });
      expect(removed).toBeGreaterThanOrEqual(1);
      await page.addStyleTag({ content: ".site-head { container-type: normal !important; }" });

      // the rule outside @supports still cuts the brand to its one line
      await expect(brand).toHaveCSS("overflow-x", "hidden");
      await expect(brand).toHaveCSS("overflow-y", "hidden");
      const m = await page.evaluate(() => {
        const head = document.querySelector(".site-head")!.getBoundingClientRect();
        const link = document.querySelector(".site-head .brand")!.getBoundingClientRect();
        const word = document.querySelector(".site-head .brand span")!.getBoundingClientRect();
        const under = document.elementFromPoint(word.left + word.width / 2, word.top + word.height / 2);
        return {
          wrapped: word.top >= link.bottom - 1, // the wordmark is on a second line, below the link's box
          linkInsideHeader: link.bottom <= head.bottom,
          underIsBrand: !!under?.closest(".brand"),
        };
      });
      expect(m).toEqual({ wrapped: true, linkInsideHeader: true, underIsBrand: false });
    });
  }

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

  // a larger text size in the browser's settings scales every rem; setting the root size does the same here
  for (const percent of [125, 150, 200]) {
    for (const path of ["/", "/work/transparent-energy", "/services/data"]) {
      test(`${path} does not scroll sideways at 390 px with text at ${percent}%`, async ({ page }) => {
        await page.goto(path);
        await page.addStyleTag({ content: `html { font-size: ${percent}% !important; }` });
        const m = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          // what sticks out, so a failure names it
          wide: [...document.querySelectorAll("main *, footer *")]
            .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(el).position !== "fixed")
            .slice(0, 5)
            .map((el) => `${el.tagName.toLowerCase()}.${el.className}`),
        }));
        // innerWidth grows past 390 whenever something overflows, so it is part of the assertion
        expect(m.innerWidth, `sticking out: ${m.wide.join(", ")}`).toBe(390);
        expect(m.scrollWidth, `sticking out: ${m.wide.join(", ")}`).toBeLessThanOrEqual(m.innerWidth);
      });
    }
  }
});

test("the home page does not scroll sideways on a 1280 px desktop with text at 200%", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
});
