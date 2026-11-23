import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// the header's order, with the three services under Services; the booking button closes the panel
const LINKS: [string, string][] = [
  ["Services", "/services"],
  ["Software", "/services/software"],
  ["Data", "/services/data"],
  ["AI & governance", "/services/ai-governance"],
  ["Work", "/work"],
  ["Approach", "/approach"],
  ["About", "/about"],
  ["Book discovery", "/discovery"],
];
const SERVICES = LINKS.slice(1, 4).map(([, href]) => href);

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
    for (const [label] of LINKS.slice(0, 7)) {
      await expect(
        menu.getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
    // in the header's order
    expect(await menu.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href")))).toEqual(
      LINKS.slice(0, 7).map(([, href]) => href),
    );
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

  test("a page left by Back with its menu open does not come back with the menu open", async ({ page }) => {
    await page.goto("/about");
    const toggle = page.getByRole("button", { name: "Menu" });
    const panel = page.locator("#mobile-menu");
    const closed = async () => {
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();
      // the page behind is in use again
      await expect(page.locator("#content")).not.toHaveAttribute("inert", /.*/);
    };
    await toggle.click();
    await panel.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/);
    await closed();
    // the menu is opened on /work, and the phone's Back gesture is used with it open
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.goBack();
    await expect(page).toHaveURL(/\/about$/);
    await closed();
    // returning by Forward
    await page.goForward();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator("h1")).toHaveText("Work");
    await closed();
    // the same again, returning by a link
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.goBack();
    await expect(page).toHaveURL(/\/about$/);
    await page.locator('.site-foot a[href="/work"]').first().click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator("h1")).toHaveText("Work");
    await closed();
    // and the menu still opens and closes there
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    await toggle.click();
    await closed();
  });

  test("the three services sit under Services, indented, each a full touch target", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("navigation", { name: "Menu" });
    // a list inside the Services item, so the grouping is in the markup as well as on screen
    expect(
      await menu.locator('li:has(> a[href="/services"]) > ul a').evaluateAll((els) => els.map((a) => a.getAttribute("href"))),
    ).toEqual(SERVICES);
    const textLeft = (href: string) =>
      menu.locator(`a[href="${href}"]`).evaluate((a) => a.getBoundingClientRect().left + parseFloat(getComputedStyle(a).paddingLeft));
    const parent = await textLeft("/services");
    expect(await textLeft("/work")).toBe(parent);
    for (const href of SERVICES) {
      expect(await textLeft(href), href).toBeGreaterThanOrEqual(parent + 16);
      const box = await menu.locator(`a[href="${href}"]`).boundingBox();
      expect(box!.height, href).toBeGreaterThanOrEqual(44);
    }
  });

  test("the open menu marks the current page, and its button spans the panel", async ({ page }) => {
    // the services overview is a row of its own, and is marked on its own page
    await page.goto("/services");
    await page.getByRole("button", { name: "Menu" }).click();
    const overview = page.getByRole("navigation", { name: "Menu" });
    await expect(overview.getByRole("link", { name: "Services", exact: true })).toHaveAttribute("aria-current", "page");
    await expect(overview.locator("a[aria-current]")).toHaveCount(1);
    // on a service page the mark is on that service's row alone
    await page.goto("/services/data");
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("navigation", { name: "Menu" });
    await expect(menu.getByRole("link", { name: "Data", exact: true })).toHaveAttribute("aria-current", "page");
    await expect(menu.locator("a[aria-current]")).toHaveCount(1);
    // the visible mark: a dot at the end of the row, drawn with a border
    const dot = await menu
      .getByRole("link", { name: "Data", exact: true })
      .evaluate((a) => {
        const s = getComputedStyle(a, "::after");
        return { content: s.content, width: s.borderTopWidth, style: s.borderTopStyle, colour: s.borderTopColor };
      });
    expect(dot).toEqual({ content: '""', width: "4px", style: "solid", colour: "rgb(255, 122, 61)" });
    const cta = page.locator("#mobile-menu .menu-cta");
    await expect(cta).toBeVisible();
    await expect(cta).not.toHaveAttribute("aria-current", /./);
    const box = await cta.boundingBox();
    // full width inside the 16 px gutters, and a comfortable touch target
    expect(Math.round(box!.width)).toBe(page.viewportSize()!.width - 32);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    await page.goto("/discovery");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("#mobile-menu .menu-cta")).toHaveAttribute("aria-current", "page");
  });

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

  test("in a Windows contrast theme the Menu icon, the buttons and the current mark are still drawn", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/services");
    const toggle = page.getByRole("button", { name: "Menu" });
    // the two bars are borders (a contrast theme repaints backgrounds), in a colour unlike the header behind them
    const bars = await toggle.locator(".menu-icon i").evaluateAll((els) =>
      els.map((i) => {
        const bar = getComputedStyle(i);
        return {
          width: bar.borderTopWidth,
          style: bar.borderTopStyle,
          lost: bar.borderTopColor === getComputedStyle(i.closest(".site-head")!).backgroundColor,
        };
      }),
    );
    expect(bars).toEqual([
      { width: "2px", style: "solid", lost: false },
      { width: "2px", style: "solid", lost: false },
    ]);
    // the theme drops the booking button's fill; an outline keeps its edge
    await expect(page.locator(".site-head .wrap > .btn")).toHaveCSS("outline-style", "solid");
    await toggle.click();
    await expect(page.locator("#mobile-menu .menu-cta")).toHaveCSS("outline-style", "solid");
    // the current page's dot is a border too
    const dot = await page.locator('#mobile-menu a[aria-current="page"]').evaluate((a) => {
      const mark = getComputedStyle(a, "::after");
      return {
        width: mark.borderTopWidth,
        style: mark.borderTopStyle,
        lost: mark.borderTopColor === getComputedStyle(a.closest("#mobile-menu")!).backgroundColor,
      };
    });
    expect(dot).toEqual({ width: "4px", style: "solid", lost: false });
  });

  // a larger text size in the browser's settings scales every rem; setting the root size does the same here
  for (const percent of [125, 150, 200]) {
    test(`with text at ${percent}% the header keeps Book discovery and the Menu button on screen`, async ({ page }) => {
      await page.goto("/privacy");
      await page.addStyleTag({ content: `html { font-size: ${percent}% !important; }` });
      const width = page.viewportSize()!.width;
      for (const control of [page.locator(".site-head .wrap > .btn"), page.getByRole("button", { name: "Menu" })]) {
        await expect(control).toBeVisible();
        const box = (await control.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
      await expect(page.locator(".site-head .wrap > .btn")).toHaveText("Book discovery");
      // nothing on the page pushes it sideways, and no word in the title is cut
      const m = await page.evaluate(() => {
        const h1 = document.querySelector("h1")!;
        return { page: document.documentElement.scrollWidth, title: h1.scrollWidth - h1.clientWidth };
      });
      expect(m.page).toBeLessThanOrEqual(width);
      expect(m.title).toBeLessThanOrEqual(0);
    });
  }

  test("with text at 200% the home page's header and headline stay inside the screen", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const width = page.viewportSize()!.width;
    const right = (selector: string) => page.locator(selector).evaluate((el) => el.getBoundingClientRect().right);
    expect(await right(".menu-toggle")).toBeLessThanOrEqual(width);
    expect(await right(".site-head .wrap > .btn")).toBeLessThanOrEqual(width);
    // "competitors" is wider than the screen at this size: it breaks instead of being cut off
    expect(await page.locator("h1").evaluate((h1) => h1.scrollWidth - h1.clientWidth)).toBeLessThanOrEqual(0);
  });
});

test("the menu button is not shown on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.goto("/about");
  await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});

test("on a 1280 px desktop with text at 200% the links give way to the Menu button, and nothing is cut off", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop viewport only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/about");
  const toggle = page.getByRole("button", { name: "Menu" });
  const links = page.getByRole("navigation", { name: "Primary" });
  // at the default text size this width has the desktop row
  await expect(links).toBeVisible();
  await expect(toggle).toBeHidden();
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  await expect(toggle).toBeVisible();
  await expect(links).toBeHidden();
  for (const control of [page.locator(".site-head .wrap > .btn"), toggle]) {
    const box = (await control.boundingBox())!;
    expect(box.x + box.width).toBeLessThanOrEqual(1280);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
  // the menu works at this size, and gives way again when the room comes back
  await toggle.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.setViewportSize({ width: 1600, height: 800 });
  await expect(links).toBeVisible();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});
