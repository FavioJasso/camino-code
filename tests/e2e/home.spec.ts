import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("first screen at 360×560 shows H1, lead and primary button", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 560 });
  await page.goto("/");
  const hero = page.locator(".hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeInViewport({ ratio: 1 });
  await expect(hero.locator(".lead")).toBeInViewport({ ratio: 1 });
  await expect(
    hero.getByRole("link", { name: "Book a discovery session" }),
  ).toBeInViewport({ ratio: 1 });
});

test("hero primary button keeps Midnight text on Ember", async ({ page }) => {
  await page.goto("/");
  const btn = page.locator(".hero").getByRole("link", { name: "Book a discovery session" });
  await expect(btn).toHaveCSS("color", "rgb(14, 19, 32)");
  await expect(btn).toHaveCSS("background-color", "rgb(255, 122, 61)");
});

test("every section is present in order", async ({ page }) => {
  await page.goto("/");
  const ids = await page.evaluate(() =>
    ["services", "dawn-window", "work", "founder", "discovery"].map((id) => {
      const el = document.getElementById(id);
      return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
    }),
  );
  expect(ids.every(Boolean)).toBe(true);
  const tops = ids.map((i) => i!.top);
  expect([...tops].sort((a, b) => a - b)).toEqual(tops);
  const order = await page.evaluate(() => {
    const ids = ["services", "dawn-window", "work", "founder", "discovery"];
    return ids.every((id, i) => {
      if (i === 0) return true;
      const a = document.getElementById(ids[i - 1])!;
      const b = document.getElementById(id)!;
      return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });
  expect(order).toBe(true);
});

test('the three permitted figures appear and "100%" does not', async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("main").innerText();
  for (const figure of ["$65,000+", "85%", "3.5 months"]) {
    expect(text).toContain(figure);
  }
  expect(text).not.toContain("100%");
});

test("scene contract: #scene holds the hero still and an empty #gl canvas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#scene[aria-hidden="true"] picture img')).toHaveCount(1);
  await expect(page.locator("#scene canvas#gl")).toHaveCount(1);
  await expect(page.locator("#dawn-window img")).toHaveCount(1);
});

test("axe finds no violations with WebGL disabled", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("no horizontal scroll at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const { scroll, client } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
});

test("founder section shows the sized portrait and no FJ placeholder", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#founder");
  const img = section.getByRole("img", { name: "Favio Jasso, founder of Camino Code" });
  await expect(img).toHaveCount(1);
  await expect(img).toHaveAttribute("width", "400");
  await expect(img).toHaveAttribute("height", "501");
  const srcset = (await img.getAttribute("srcset")) ?? "";
  expect(srcset).toMatch(/favio-jasso-400\.webp 400w/);
  expect(srcset).toMatch(/favio-jasso-800\.webp 800w/);
  await expect(img).toHaveAttribute("loading", "lazy");
  // no caption under the portrait: the paragraph beside it already names him and Newark
  await expect(section.locator("figcaption")).toHaveCount(0);
  await expect(section).not.toContainText("Founder · Newark, NJ");
  await expect(section).not.toContainText(/\bFJ\b/);
  // the image actually loads
  await img.scrollIntoViewIfNeeded();
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0);
});

test("home has its own title and description, canonical and share address", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Camino Code | Software, data and AI consulting in Newark, NJ");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Camino Code is a software, data and AI consultancy in Newark, New Jersey, for small and mid-sized businesses. It starts with a free conversation.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.caminocode.com");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://www.caminocode.com");
});

test("section heads carry the scene clock's hour, in order through the morning", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#services .sec-head .t")).toHaveText("06:10 · Before dawn");
  await expect(page.locator("#dawn-window .dawn-caption")).toHaveText("06:24 · First light on the saddle");
  await expect(page.locator("#work .sec-head .t")).toHaveText("06:40 · Morning");
  await expect(page.locator("#discovery .sec-head .t")).toHaveText("07:30 · Daylight");
});

test("the clock stamps are shown but not read out before each heading", async ({ page }) => {
  await page.goto("/");
  for (const [id, label] of [
    ["services", "01 Services"],
    ["work", "02 Proof"],
    ["discovery", "04 Approach"],
  ]) {
    const stamp = page.locator(`#${id} .sec-head .t`);
    await expect(stamp).toBeVisible();
    await expect(stamp).toHaveAttribute("aria-hidden", "true");
    // what is left for a screen reader: the section's number and name
    const read = await page.locator(`#${id} .sec-head .mono`).evaluate((el) => {
      const copy = el.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove());
      return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
    });
    expect(read).toBe(label);
  }
  // the sunrise caption sits in a section that is hidden from screen readers as a whole
  await expect(page.locator('#dawn-window[aria-hidden="true"] .dawn-caption')).toHaveCount(1);
});

const SERVICE_ROWS = [
  ["Software", "/services/software"],
  ["Data", "/services/data"],
  ["AI & governance", "/services/ai-governance"],
] as const;

/** The middle of a row's description, with the row scrolled to the middle of the window (clear of the sticky header). */
async function descriptionPoint(row: import("@playwright/test").Locator) {
  return row.locator("p").evaluate((p) => {
    p.scrollIntoView({ block: "center", behavior: "instant" });
    const box = p.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  });
}

test('each "What we do" row is one link, worded as on /services, and looks like one', async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#services .lane");
  await expect(rows).toHaveCount(SERVICE_ROWS.length);
  for (const [i, [name, href]] of SERVICE_ROWS.entries()) {
    const row = rows.nth(i);
    await expect(row.getByRole("heading", { level: 3 })).toHaveText(name);
    // one link in the row, for screen readers and for the Tab key
    await expect(row.locator("a, button, [tabindex]")).toHaveCount(1);
    const link = row.getByRole("link", { name: `Read about ${name}`, exact: true });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveCSS("text-decoration-line", "underline");
    const linkBox = (await link.boundingBox())!;
    expect(linkBox.height, name).toBeGreaterThanOrEqual(44);
    // the link's hit area is the whole row, so the tap target is the row
    const hit = await link.evaluate((a) => {
      const area = getComputedStyle(a, "::after");
      const row = a.closest(".lane")!.getBoundingClientRect();
      return { position: area.position, width: parseFloat(area.width), height: parseFloat(area.height), row: [row.width, row.height] };
    });
    expect(hit.position, name).toBe("absolute");
    expect(hit.width, name).toBeGreaterThanOrEqual(hit.row[0]);
    expect(hit.height, name).toBeGreaterThanOrEqual(48);
    expect(hit.height, name).toBeGreaterThanOrEqual(hit.row[1] - 2);
    // and the description really is covered by it
    const point = await descriptionPoint(row);
    const onTop = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.getAttribute("href"), point);
    expect(onTop, name).toBe(href);
  }
});

test('tapping a "What we do" description opens that service page', async ({ page }, testInfo) => {
  for (const [i, [name, href]] of SERVICE_ROWS.entries()) {
    await page.goto("/");
    // by coordinates: the description is under the stretched link, so a locator click would wait for ever
    const { x, y } = await descriptionPoint(page.locator("#services .lane").nth(i));
    if (testInfo.project.name === "phone") await page.touchscreen.tap(x, y);
    else await page.mouse.click(x, y);
    await expect(page, name).toHaveURL(new RegExp(`${href}$`));
  }
});

const CLEAR = "rgba(0, 0, 0, 0)";

test('a "What we do" row answers the keyboard, one stop per row, and keeps its focus ring', async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#services .lane");
  await expect(rows.nth(1)).toHaveCSS("background-color", CLEAR);
  // Tab from the first row's link lands on the second row's link: one stop per row
  await rows.nth(0).getByRole("link").focus();
  await page.keyboard.press("Tab");
  const second = rows.nth(1).getByRole("link");
  await expect(second).toBeFocused();
  await expect(second).toHaveCSS("outline-style", "solid");
  await expect(second).toHaveCSS("outline-width", "2px");
  await expect(second).toHaveCSS("outline-color", "rgb(247, 201, 72)"); // Moon, on the dark panel
  await expect(rows.nth(1)).not.toHaveCSS("background-color", CLEAR);
  await expect(rows.nth(0)).toHaveCSS("background-color", CLEAR);
  await page.keyboard.press("Tab");
  await expect(rows.nth(2).getByRole("link")).toBeFocused();
});

test('a "What we do" row answers the pointer anywhere on it', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "hover is a desktop pointer state");
  await page.goto("/");
  const row = page.locator("#services .lane").first();
  await expect(row).toHaveCSS("background-color", CLEAR);
  await expect(row.getByRole("link")).toHaveCSS("text-decoration-thickness", "1px");
  const { x, y } = await descriptionPoint(row);
  await page.mouse.move(x, y);
  await expect(row).not.toHaveCSS("background-color", CLEAR);
  await expect(row.getByRole("link")).toHaveCSS("color", "rgb(247, 201, 72)");
  await expect(row.getByRole("link")).toHaveCSS("text-decoration-thickness", "2px");
});

test("the Proof section links to this case study and to all of them, side by side", async ({ page }) => {
  await page.goto("/");
  const proof = page.locator("#work");
  const study = proof.getByRole("link", { name: "Read the case study", exact: true });
  const all = proof.getByRole("link", { name: "See all work", exact: true });
  await expect(study).toHaveAttribute("href", "/work/transparent-energy");
  await expect(all).toHaveAttribute("href", "/work");
  // both boxes in one reading, so a scroll in progress cannot come between them
  const [a, b] = await proof.locator(".proof-links a").evaluateAll((links) =>
    links.map((link) => {
      const box = link.getBoundingClientRect();
      return { left: box.left, right: box.right, top: box.top, height: box.height };
    }),
  );
  expect(Math.abs(a.top - b.top)).toBeLessThan(2);
  expect(b.left).toBeGreaterThan(a.right);
  for (const box of [a, b]) expect(box.height).toBeGreaterThanOrEqual(44);
});

test("the Approach section links to the approach page, between the stages and the booking button", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#discovery");
  const link = section.getByRole("link", { name: "See how we work", exact: true });
  await expect(link).toHaveAttribute("href", "/approach");
  expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  const order = await section.evaluate((el) => {
    const stages = el.querySelector(".trail")!;
    const more = el.querySelector('a[href="/approach"]')!;
    const book = el.querySelector('a[href="/discovery"]')!;
    const after = (a: Element, b: Element) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    return after(stages, more) && after(more, book);
  });
  expect(order).toBe(true);
});

test("the hero text link changes colour under the pointer", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "hover is a desktop pointer state");
  await page.goto("/");
  const link = page.locator(".hero").getByRole("link", { name: "See what it did for Transparent Energy" });
  await expect(link).toHaveCSS("color", "rgb(244, 235, 220)");
  await link.hover();
  await expect(link).toHaveCSS("color", "rgb(247, 201, 72)");
});

const DISCOVERY_NOTE = "A first look at how your business runs today.";

test("the hero says what the first conversation is, next to the button, where the first screen has room", async ({ page }) => {
  const hero = page.locator(".hero");
  const note = hero.locator(".hero-note");
  const button = hero.getByRole("link", { name: "Book a discovery session" });
  const firstScreen = async () => {
    await expect(hero.getByRole("heading", { level: 1 })).toBeInViewport({ ratio: 1 });
    await expect(hero.locator(".lead")).toBeInViewport({ ratio: 1 });
    await expect(button).toBeInViewport({ ratio: 1 });
  };
  const box = async (locator: import("@playwright/test").Locator) => (await locator.boundingBox())!;

  // desktop: under the row of actions, above the proof line
  for (const size of [
    { width: 1440, height: 900 },
    { width: 1280, height: 720 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await firstScreen();
    await expect(note).toHaveText(DISCOVERY_NOTE);
    await expect(note).toBeInViewport({ ratio: 1 });
    const n = await box(note);
    const b = await box(button);
    expect(n.y).toBeGreaterThanOrEqual(b.y + b.height);
    expect(n.y + n.height).toBeLessThanOrEqual((await box(hero.locator(".hero-proof"))).y);
    expect(Math.round(n.x)).toBe(Math.round(b.x));
  }

  // a short desktop window (a 1366x768 or 1280x720 laptop with the browser's bars) has no room for both
  // lines: the note steps aside and the proof line stays whole on the first screen, as it was without the note
  for (const size of [
    { width: 1366, height: 657 },
    { width: 1280, height: 640 },
    { width: 1536, height: 690 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await firstScreen();
    await expect(note).toBeHidden();
    await expect(hero.locator(".hero-proof")).toBeInViewport({ ratio: 1 });
  }
  // from 700px tall both fit again
  await page.setViewportSize({ width: 1366, height: 700 });
  await page.goto("/");
  await firstScreen();
  await expect(note).toBeInViewport({ ratio: 1 });
  await expect(hero.locator(".hero-proof")).toBeInViewport({ ratio: 1 });

  // phones with room: straight under the button, above the text link and the proof line
  for (const size of [
    { width: 390, height: 844 },
    { width: 390, height: 760 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await firstScreen();
    await expect(note).toBeInViewport({ ratio: 1 });
    const n = await box(note);
    const b = await box(button);
    const link = await box(hero.locator(".link"));
    const proof = await box(hero.locator(".hero-proof"));
    expect(n.y).toBeGreaterThanOrEqual(b.y + b.height);
    expect(n.y + n.height).toBeLessThanOrEqual(link.y);
    expect(link.y + link.height).toBeLessThanOrEqual(proof.y);
    // the copy starts below the scene's readout strip (it ends 98 px down) and ends above
    // the Motion control (44 px tall, 12 px off the bottom edge)
    expect((await box(hero.locator(".wrap"))).y).toBeGreaterThanOrEqual(98);
    expect(proof.y + proof.height).toBeLessThanOrEqual(size.height - 56);
  }

  // shorter phones have no room for it: the first screen keeps the heading, the lead and the button,
  // and the proof line where it already fitted
  for (const size of [
    { width: 390, height: 720, proof: true },
    { width: 390, height: 664, proof: true },
    { width: 360, height: 640, proof: true },
    { width: 320, height: 568, proof: false },
  ]) {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("/");
    await firstScreen();
    await expect(note).toBeHidden();
    const proof = hero.locator(".hero-proof");
    if (size.proof) await expect(proof).toBeVisible();
    else await expect(proof).toBeHidden();
  }
});

test("the hero note says what the first conversation is, without repeating the lead or a promise", async ({
  page,
}) => {
  // the promises are published on /approach; the note claims none of them
  await page.goto("/approach");
  const facts = (await page.locator("main").innerText()).toLowerCase();
  for (const fact of ["45 minutes", "video or in person", "a one-page written summary within a week", "what to fix first"]) {
    expect(facts).toContain(fact);
  }
  // the home page says each promise once, beside the lower button and in the Route stage (and "free" in the lead): the note names none of them
  expect(DISCOVERY_NOTE).not.toMatch(/free|founder|45|video|in person|one-page|summary|business day|discovery|what to fix/i);
  await page.goto("/");
  expect((await page.locator("main").innerText()).toLowerCase().match(/what to fix first/g)).toHaveLength(1);
  const lead = (await page.locator(".hero .lead").innerText()).replace(/\s+/g, " ");
  await expect(page.locator(".hero .hero-note")).toHaveText(DISCOVERY_NOTE);
  // the lead says what the firm does; the note says what the first conversation is: no sentence is shared
  for (const sentence of DISCOVERY_NOTE.split(/(?<=\.) /)) expect(lead).not.toContain(sentence);
});

test("the hero proof line shows the first permitted figure, and steps aside on short phones", async ({ page }) => {
  const proof = page.locator(".hero .hero-proof");
  for (const size of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await expect(proof).toBeVisible();
    expect(((await proof.innerText()) ?? "").replace(/\s+/g, " ")).toBe(
      "$65,000+ a year saved in analyst time · Transparent Energy",
    );
  }
  // on a short phone it would lie under the Motion control, so it is not shown
  await page.setViewportSize({ width: 360, height: 560 });
  await page.goto("/");
  await expect(proof).toBeHidden();
});

test("founder block says who you work with, in the third person, and links to his note", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#founder");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("You work with the founder.");
  await expect(section.locator("p.lead")).toHaveText([
    "Favio Jasso started Camino Code in Newark, New Jersey. The person you talk to first is the person who answers for the work.",
  ]);
  await expect(section.getByRole("link", { name: "Read Favio's note" })).toHaveAttribute("href", "/about");
  // the list of websites is gone; the proof above already carries Transparent Energy
  for (const gone of ["DANIEL AVILA 64", "Victoria's Painting", "Transparent Energy"]) await expect(section).not.toContainText(gone);
  const text = (await section.innerText()).toLowerCase();
  for (const banned of [/one-man/, /\bsolo\b/, /\bour team\b/, /\bour staff\b/, /award/, /years of experience/]) {
    expect(text).not.toMatch(banned);
  }
});

test("the page is dark at the root on the home page and light elsewhere", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(14, 19, 32)");
  await page.goto("/about");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
});

test("the hero still is framed where the live camera puts the saddle", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); // the still stays; no scene code runs
  await page.goto("/");
  const still = page.locator("#scene picture img");
  await expect(still).toBeVisible();
  const desktop = testInfo.project.name === "desktop";
  await expect(still).toHaveCSS("object-fit", "cover");
  await expect(still).toHaveCSS("object-position", desktop ? "68% 40%" : "58% 24%");
  expect(await still.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(
    desktop ? "/stills/hero-desktop.svg" : "/stills/hero-phone.svg",
  );
  // the still fills the same box as the canvas
  const boxes = await page.evaluate(() => {
    const img = document.querySelector("#scene picture img")!.getBoundingClientRect();
    const gl = document.querySelector("#gl")!.getBoundingClientRect();
    return { img: [img.width, img.height], gl: [gl.width, gl.height] };
  });
  expect(boxes.img).toEqual(boxes.gl);
});

test("the hero names software, reports and AI, and ends on a free conversation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero .lead")).toHaveText(
    "We build software that takes the re-typing out of your team’s day, make your reports agree, and put AI to work only where it pays for itself, with rules your staff can follow. It starts with a free conversation.",
  );
});

test("the approach section starts with a conversation and puts the reply time beside the button", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#discovery");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("It starts with a conversation.");
  await expect(section.locator(".sec-head .lead")).toHaveText(
    "A free 45-minute conversation, by video or in person, about the tools you use, where your numbers live and where the hours go. If you go ahead, this is how it runs.",
  );
  await expect(section.locator(".cta-contact")).toHaveText(
    "Or write to contact@caminocode.com or call +1 973-234-2073. You’ll hear back within one business day.",
  );
  // each promise once on the page: the summary is the Route stage's, the reply time the contact line's
  const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
  expect(text.match(/one business day/g)).toHaveLength(1);
  expect(text.match(/one-page summary/g)).toHaveLength(1);
  expect(text.match(/45-minute/g)).toHaveLength(1);
});
