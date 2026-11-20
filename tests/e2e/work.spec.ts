import { expect, test } from "@playwright/test";
import { STUDIES } from "./routes";

/* The four case studies and the /work index. The two website projects carry facts and the
   client's own words only: no figures block, and none of the old pages' filler statistics. */

const flat = (text: string | null) => (text ?? "").replace(/\s+/g, " ");

test("Victoria's Painting case study: facts only, the client's quote, gallery and visit link", async ({ page }) => {
  await page.goto("/work/victorias-painting");
  await expect(page.locator("h1")).toHaveText("Victoria's Painting: a first website for a painting company");
  const main = flat(await page.locator("main").innerText());
  // no figures block, and none of the old template stats, the client's own numbers, or unconfirmed durations
  await expect(page.locator(".in-fig")).toHaveCount(0);
  for (const banned of ["100%", "3x", "24/7", "SEO", "390", "40 years", "members", "4 months", "3 weeks"]) {
    expect(main, banned).not.toContain(banned);
  }
  expect(main).toMatch(/Built by Camino Code for Victoria's Painting/i);
  for (const fact of ["Painting company, New Jersey", "Website design and build", "Figma", "React", "EmailJS", "Google Maps"]) {
    expect(main.toLowerCase(), fact).toContain(fact.toLowerCase());
  }
  // six numbered sections, as on the other studies
  await expect(page.locator("main .in-label")).toHaveCount(6);
  // the testimonial is the client's whole text, attributed as the original page gave it
  const quote = page.locator("figure.in-quote");
  await expect(quote.locator("blockquote p")).toHaveCount(4);
  await expect(quote.locator("blockquote p").first()).toHaveText(
    "I would like to express my sincere appreciation to Favio Jasso from Camino Code for the outstanding work he did in developing the website for my company, Victoria's Painting.",
  );
  await expect(quote).toContainText(
    "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
  );
  await expect(quote.locator("blockquote p").last()).toHaveText(
    "I highly recommend Favio Jasso and the Camino Code team for their dedication, talent, and excellence in every detail of the project.",
  );
  await expect(quote.locator("figcaption")).toHaveText("Juan Porras, Founder of Victoria's Painting");
  await expect(page.locator(".gallery img")).toHaveCount(4);
  for (const img of await page.locator(".gallery img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
    await expect(img).toHaveAttribute("srcset", /-960\.webp 960w, \S+\.webp 1920w/);
  }
  await expect(page.getByRole("link", { name: "Visit victoriaspainting.com" })).toHaveAttribute(
    "href",
    "https://www.victoriaspainting.com",
  );
});

test("Daniel Avila's first site: facts only, his quote, three safe images, and the way on to DANIEL AVILA 64", async ({
  page,
  request,
}) => {
  await page.goto("/work/daniel-avila");
  await expect(page.locator("h1")).toHaveText("Daniel Avila: a first portfolio site");
  const main = flat(await page.locator("main").innerText());
  await expect(page.locator(".in-fig")).toHaveCount(0);
  for (const banned of ["100%", "3x", "SEO", "members", "1 month", "1 week"]) expect(main, banned).not.toContain(banned);
  expect(main).toMatch(/Built by Camino Code for Daniel Avila/i);
  for (const fact of ["Personal portfolio", "Website design and build", "Figma", "Next.js", "Monda", "Quicksand"]) {
    expect(main.toLowerCase(), fact).toContain(fact.toLowerCase());
  }
  await expect(page.locator("main .in-label")).toHaveCount(6);
  const quote = page.locator("figure.in-quote");
  await expect(quote.locator("blockquote p")).toHaveCount(3);
  await expect(quote.locator("blockquote p").first()).toHaveText(
    /^Collaborating with Camino Code in creating my professional website, danielavila\.tech, was a phenomenal experience\./,
  );
  await expect(quote).toContainText(
    "Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.",
  );
  await expect(quote.locator("figcaption")).toHaveText("Daniel Avila, IT Support Professional");
  // three gallery images; the old contact screenshot (a personal phone number and email) must never ship
  await expect(page.locator(".gallery img")).toHaveCount(3);
  for (const img of await page.locator(".gallery img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
  }
  expect(await page.locator("main").innerHTML()).not.toContain("gallery-04");
  expect((await request.get("/work/daniel-avila/gallery-04.webp")).status()).toBe(404);
  expect((await request.get("/work/daniel-avila/gallery-04-960.webp")).status()).toBe(404);
  // the first site is offline: no outbound visit link, a forward link instead
  await expect(page.locator('main a[href*="danielavila.tech"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Read the DANIEL AVILA 64 case study" })).toHaveAttribute(
    "href",
    "/work/daniel-avila-64",
  );
});

test("the two Daniel Avila studies point at each other, and every study lists the others", async ({ page }) => {
  await page.goto("/work/daniel-avila-64");
  await expect(page.getByRole("link", { name: "Read the case study of his first site" })).toHaveAttribute(
    "href",
    "/work/daniel-avila",
  );
  await page.goto("/work/daniel-avila");
  await expect(page.locator(`main section:not(.in-more) a[href="/work/daniel-avila-64"]`)).toHaveCount(1);
  for (const route of STUDIES) {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "More work" });
    const hrefs = await nav.locator("a").evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    expect(hrefs, route).toEqual([...STUDIES.filter((r) => r !== route), "/work"]);
  }
});

test("/work lists all four studies, each with a credit and its own link", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator("main h2")).toHaveText([
    "Transparent Energy",
    "DANIEL AVILA 64",
    "Victoria's Painting",
    "Daniel Avila",
    "Start with discovery",
  ]);
  const links = page.locator("main a.in-link");
  expect(await links.evaluateAll((els) => els.map((a) => a.getAttribute("href")))).toEqual(STUDIES);
  // four links with the same visible words carry four different names
  expect(await links.evaluateAll((els) => els.map((a) => a.textContent))).toEqual([
    "Read the case study: Transparent Energy",
    "Read the case study: DANIEL AVILA 64",
    "Read the case study: Victoria's Painting",
    "Read the case study: Daniel Avila",
  ]);
  const main = flat(await page.locator("main").innerText());
  for (const credit of [
    "Camino Code's founder led the build",
    "Built by Camino Code for Daniel Avila",
    "Built by Camino Code for Victoria's Painting",
  ]) {
    expect(main.toLowerCase(), credit).toContain(credit.toLowerCase());
  }
  // only the two measured projects show figures
  await expect(page.locator("main section").filter({ has: page.locator(".in-fig") })).toHaveCount(2);
  // the card that used to describe the wrong image
  await expect(page.locator('img[src*="/work/daniel-avila-64/card"]')).toHaveAttribute("alt", /title screen/);
  await expect(page.locator(".work-card img")).toHaveCount(3);
  for (const img of await page.locator(".work-card img").all()) {
    await expect(img).toHaveAttribute("alt", /\S+ \S+ \S+/);
    await expect(img).toHaveAttribute("width", "1920");
    await expect(img).toHaveAttribute("height", "1280");
  }
});

test("About quotes each client in their own words and links to the case study", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main).toContainText("Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.");
  await expect(main).not.toContainText("They didn't just build me a website");
  await expect(main).toContainText(
    "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
  );
  await expect(page.getByRole("link", { name: "Read the Victoria's Painting case study" })).toHaveAttribute(
    "href",
    "/work/victorias-painting",
  );
  await expect(page.getByRole("link", { name: "Read the Daniel Avila portfolio case study" })).toHaveAttribute(
    "href",
    "/work/daniel-avila",
  );
});

test("the short quote on About is a sentence from the full testimonial on the case study", async ({ page }) => {
  await page.goto("/about");
  const short = await page.locator("main .quotes blockquote p").allInnerTexts();
  expect(short).toHaveLength(2);
  for (const [i, route] of ["/work/victorias-painting", "/work/daniel-avila"].entries()) {
    await page.goto(route);
    const full = flat(await page.locator("figure.in-quote blockquote").innerText());
    // About wraps the sentence in curly quotation marks
    expect(full, route).toContain(short[i].replace(/^“|”$/g, ""));
  }
});
