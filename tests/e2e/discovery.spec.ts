import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const REFUSED =
  "Your details are still in the form, so you can try again. You can also call +1 973-234-2073, or email us at contact@caminocode.com and we'll reply within one business day.";
const NOT_SENT =
  "Your request did not go through. Your details are still in the form. Check your connection and try again. You can also call +1 973-234-2073 or email us at contact@caminocode.com.";
/**
 * The form waits by itself until its signed timestamp is 3 seconds old, so the answer to any submit
 * (an empty one too) can take a few seconds: the first assertion after each submit gets this.
 */
const SLOW = { timeout: 15_000 };

/** `business` "__test_sent__" reaches the success state without a mail service (test builds only). */
async function fill(page: Page, business = "Ruiz Bakery, wholesale bread") {
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await page.getByLabel(/Business name/).fill(business);
}

/**
 * Opens (or reopens) the form and waits until its script has run: it asks for its token then.
 * Without the wait a quick test could press Send on the plain HTML form, which posts with no token.
 */
async function live(page: Page, go: () => Promise<unknown>) {
  const ready = page.waitForRequest((request) => request.method() === "POST" && request.url().includes("/discovery"));
  await go();
  await ready;
}
const open = (page: Page, path = "/discovery") => live(page, () => page.goto(path));

/** Collects the form's own sends (a multipart POST), each as its body; the token requests are POSTs too, with a JSON body. */
function countSends(page: Page) {
  const sends: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" && (request.headers()["content-type"] ?? "").startsWith("multipart/")) {
      sends.push(request.postData() ?? "");
    }
  });
  return sends;
}

/**
 * The page's accessibility violations, read at rest. Axe takes colours as they are at that instant, and
 * the button just pressed is still under the pointer: its hover colours fade out over 150 ms once the
 * page moves beneath it, and a scan in the middle of that fade reports a contrast no visitor is left with.
 * So the pointer is taken off the page's controls and the fade is allowed to finish first.
 */
async function violations(page: Page) {
  await page.mouse.move(0, 0);
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation instanceof CSSTransition)
        .map((animation) => animation.finished.catch(() => {})),
    ),
  );
  return (await new AxeBuilder({ page }).analyze()).violations;
}

/** Counts the answered token requests: the form's POSTs to its own page that are not sends. */
function countTokens(page: Page) {
  const tokens: string[] = [];
  page.on("response", (response) => {
    const request = response.request();
    if (
      request.method() === "POST" &&
      new URL(request.url()).pathname === "/discovery" &&
      !(request.headers()["content-type"] ?? "").startsWith("multipart/")
    ) {
      tokens.push(request.url());
    }
  });
  return tokens;
}

test("empty submit focuses the error summary listing three fields", async ({ page }) => {
  await open(page);
  await expect(page).toHaveTitle("Book a discovery session | Camino Code");
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "Please fix the following" });
  await expect(summary).toBeFocused(SLOW);
  await expect(summary.getByRole("link")).toHaveCount(3);
  // GOV.UK error-summary pattern: the tab title says there is an error while the summary shows
  await expect(page).toHaveTitle("Error: Book a discovery session | Camino Code");
  await summary.getByRole("link").first().click();
  await expect(page.getByLabel(/Your name/)).toBeFocused();
  expect(await violations(page)).toEqual([]);
});

test("a summary link lands its field with the label in view below the sticky header", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); // the page then jumps instead of gliding, so positions can be read at once
  await open(page);
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "Please fix the following" });
  await expect(summary).toBeFocused(SLOW);
  for (const id of ["f-name", "f-email", "f-business"]) {
    await summary.locator(`a[href="#${id}"]`).click();
    await expect(page.locator(`#${id}`)).toBeFocused();
    const header = (await page.locator("header").first().boundingBox())!;
    const label = (await page.locator(`label[for="${id}"]`).boundingBox())!;
    const field = (await page.locator(`#${id}`).boundingBox())!;
    // the whole label is clear of the header, and the field has been brought up under it
    expect(label.y - (header.y + header.height), id).toBeGreaterThanOrEqual(8);
    expect(field.y - (header.y + header.height), id).toBeLessThanOrEqual(120);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }
});

test("the tab title loses its Error prefix once the request is sent, or when the visitor leaves", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page).toHaveTitle("Error: Book a discovery session | Camino Code", SLOW);
  await fill(page, "__test_sent__");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Your request is in", SLOW);
  await expect(page).toHaveTitle("Book a discovery session | Camino Code");

  await open(page);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page).toHaveTitle("Error: Book a discovery session | Camino Code", SLOW);
  await page.getByRole("contentinfo").getByRole("link", { name: "Privacy" }).click();
  await expect(page).toHaveTitle("Privacy | Camino Code");
});

test("with Resend unset, submit says the details are kept, offers another try, the phone and the email, and keeps typed values", async ({
  page,
}) => {
  await open(page);
  await fill(page);
  await page.getByLabel(/What would you like/).fill("Our invoices");
  // sent straight away: the form itself waits until its signed timestamp is old enough
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(REFUSED, SLOW);
  await expect(summary).toBeFocused();
  await expect(summary.getByRole("button", { name: "Try again" })).toBeVisible();
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/^Email/)).toHaveValue("ana@example.com");
  await expect(page.getByLabel(/Business name/)).toHaveValue("Ruiz Bakery, wholesale bread");
  await expect(page.getByLabel(/What would you like/)).toHaveValue("Our invoices");
  // a refused send is not a field error: the title keeps its plain form
  await expect(page).toHaveTitle("Book a discovery session | Camino Code");
  expect(await violations(page)).toEqual([]);
  // "Try again" sends the same values again
  const sends = countSends(page);
  await summary.getByRole("button", { name: "Try again" }).click();
  await expect.poll(() => sends.length, SLOW).toBe(1);
  for (const typed of ["Ana Ruiz", "ana@example.com", "Ruiz Bakery, wholesale bread", "Our invoices"]) {
    expect(sends[0], typed).toContain(typed);
  }
  // the button reads "Sending…" until the second answer is back: only then is it "Try again" once more
  await expect(summary.getByRole("button", { name: "Try again" })).toBeEnabled(SLOW);
  await expect(page.getByRole("button", { name: "Sending…" })).toHaveCount(0);
  await expect(summary).toContainText(REFUSED);
  await expect(summary).toBeFocused();
  expect(sends.length).toBe(1);
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/^Email/)).toHaveValue("ana@example.com");
  await expect(page.getByLabel(/Business name/)).toHaveValue("Ruiz Bakery, wholesale bread");
  await expect(page.getByLabel(/What would you like/)).toHaveValue("Our invoices");
});

test("while a send is under way the button keeps keyboard focus, the status region says so, and a second press sends nothing more", async ({
  page,
}) => {
  await open(page);
  await fill(page);
  const sends = countSends(page);
  const status = page.getByRole("status");
  await expect(status).toBeEmpty();
  await page.getByRole("button", { name: "Send request" }).focus();
  await page.keyboard.press("Enter");
  // not disabled (that would drop focus to the page for the seconds the send takes), but marked as unavailable
  const sending = page.getByRole("button", { name: "Sending…" });
  await expect(sending).toBeFocused();
  await expect(sending).toHaveAttribute("aria-disabled", "true");
  expect(await sending.evaluate((button: HTMLButtonElement) => button.disabled)).toBe(false);
  await expect(sending).toHaveCSS("opacity", "0.7");
  await expect(status).toHaveText("Sending…");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => document.activeElement?.textContent)).toBe("Sending…");

  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(REFUSED, SLOW);
  await expect(summary).toBeFocused();
  await expect(status).toBeEmpty();
  await expect(page.getByRole("button", { name: "Send request" })).not.toHaveAttribute("aria-disabled");
  expect(sends.length).toBe(1);

  // the same from "Try again", pressed straight after the refusal: its new token must age first
  const again = summary.getByRole("button", { name: "Try again" });
  await again.focus();
  await page.keyboard.press("Enter");
  await expect(summary.getByRole("button", { name: "Sending…" })).toBeFocused();
  await expect(status).toHaveText("Sending…");
  await page.waitForTimeout(1500);
  expect(await page.evaluate(() => document.activeElement?.textContent)).toBe("Sending…");
  await expect(again).toBeEnabled(SLOW);
  expect(sends.length).toBe(2);
});

test("the email and phone in the failure message are links, and the email link carries what was typed", async ({ page }) => {
  await open(page);
  await fill(page);
  await page.getByLabel(/Phone/).fill("973 555 0100");
  await page.getByLabel(/What would you like/).fill("Our invoices & the stock sheet.\nWho pays late?");
  await page.getByLabel(/Who introduced/).fill("Maria");
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(REFUSED, SLOW);
  await expect(summary.getByRole("link", { name: "+1 973-234-2073" })).toHaveAttribute("href", "tel:+19732342073");

  const mail = summary.getByRole("link", { name: "contact@caminocode.com" });
  const href = (await mail.getAttribute("href"))!;
  // every character that could end the address, the subject or the body early is percent-encoded
  expect(href).toMatch(/^mailto:contact@caminocode\.com\?subject=[^&?#\s]+&body=[^&?#\s]+$/);
  const [to, query] = href.slice("mailto:".length).split("?");
  expect(to).toBe("contact@caminocode.com");
  const params = new URLSearchParams(query);
  expect(params.get("subject")).toBe("Discovery request: Ana Ruiz");
  expect(params.get("body")).toBe(
    [
      "Name: Ana Ruiz",
      "Email: ana@example.com",
      "Business: Ruiz Bakery, wholesale bread",
      "Phone: 973 555 0100",
      "Introduced by: Maria",
      "",
      "What I would like you to look at:",
      "Our invoices & the stock sheet.\r\nWho pays late?", // line breaks in a mailto body are CR LF
    ].join("\r\n"),
  );

  // the link follows the form: a change made after the failure is in the email too
  await page.getByLabel(/Your name/).fill("Ana Maria Ruiz");
  await mail.evaluate((a) => a.addEventListener("click", (event) => event.preventDefault())); // stay on the page
  await mail.click();
  expect(await mail.getAttribute("href")).toContain("subject=Discovery%20request%3A%20Ana%20Maria%20Ruiz");
});

test("a send refused only for its token is sent again by the form, once, without the visitor seeing a failure", async ({
  page,
}) => {
  // The token is tied to the network address it was issued to (the server reads x-real-ip). Changing the
  // address between opening the form and sending is what a phone does when it leaves Wi-Fi.
  await page.setExtraHTTPHeaders({ "x-real-ip": "203.0.113.41" });
  await open(page);
  await fill(page, "__test_sent__");
  await page.waitForTimeout(3500); // so the first send goes out at once, with a token that is old enough
  await page.evaluate(() => {
    const seen = window as unknown as { sawSummary: boolean };
    seen.sawSummary = false;
    new MutationObserver(() => {
      if (document.querySelector(".in-summary")) seen.sawSummary = true;
    }).observe(document.body, { childList: true, subtree: true });
  });
  const sends = countSends(page);
  await page.setExtraHTTPHeaders({ "x-real-ip": "203.0.113.42" });
  await page.getByRole("button", { name: "Send request" }).click();

  // the first send is refused; the button keeps saying "Sending…" while the form fetches a new token and waits for it to age
  await expect.poll(() => sends.length).toBe(1);
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await page.waitForTimeout(1500);
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  expect(sends.length).toBe(1);

  await expect(page.getByRole("status")).toContainText("Your request is in", SLOW);
  expect(sends.length).toBe(2);
  expect(await page.evaluate(() => (window as unknown as { sawSummary: boolean }).sawSummary)).toBe(false);
});

test("the automatic resend happens once: a second token refusal shows the failure message with everything kept", async ({
  page,
}) => {
  await page.setExtraHTTPHeaders({ "x-real-ip": "203.0.113.51" });
  await open(page);
  await fill(page, "__test_sent__");
  await page.waitForTimeout(3500);
  const sends = countSends(page);
  // every send now arrives from an address no token was issued to: the first by the header set here,
  // the resend because the header changes again as soon as the new token has been handed out
  await page.setExtraHTTPHeaders({ "x-real-ip": "203.0.113.52" });
  page.on("response", (response) => {
    const request = response.request();
    if (request.method() === "POST" && !(request.headers()["content-type"] ?? "").startsWith("multipart/")) {
      page.setExtraHTTPHeaders({ "x-real-ip": "203.0.113.53" }).catch(() => {});
    }
  });
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(REFUSED, SLOW);
  expect(sends.length).toBe(2);
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/Business name/)).toHaveValue("__test_sent__");
});

test("a request that fails on the way keeps the form and every value, and Try again sends it", async ({ page, context }) => {
  await open(page);
  await fill(page, "__test_sent__");
  await page.getByLabel(/Phone/).fill("973 555 0100");
  await page.getByLabel(/What would you like/).fill("Our invoices");
  await page.getByLabel(/Who introduced/).fill("Maria");
  await page.waitForTimeout(3500);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Send request" }).click();

  // the form is still there, not the error page
  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(NOT_SENT, SLOW);
  await expect(summary).toBeFocused();
  await expect(page.locator("h1")).toHaveText("Book a discovery session");
  // a failed send is not a sent one: the form keeps its heading
  await expect(page.getByRole("heading", { level: 2, name: "Tell us about your business" })).toBeVisible();
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/^Email/)).toHaveValue("ana@example.com");
  await expect(page.getByLabel(/Business name/)).toHaveValue("__test_sent__");
  await expect(page.getByLabel(/Phone/)).toHaveValue("973 555 0100");
  await expect(page.getByLabel(/What would you like/)).toHaveValue("Our invoices");
  await expect(page.getByLabel(/Who introduced/)).toHaveValue("Maria");
  await expect(summary.getByRole("link", { name: "+1 973-234-2073" })).toHaveAttribute("href", "tel:+19732342073");
  await expect(summary.getByRole("link", { name: "contact@caminocode.com" })).toHaveAttribute(
    "href",
    /^mailto:contact@caminocode\.com\?subject=Discovery%20request%3A%20Ana%20Ruiz&body=Name%3A%20Ana%20Ruiz/,
  );

  await context.setOffline(false);
  await summary.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("status")).toContainText("Your request is in", SLOW);
});

test("an error answer from the server keeps the form too", async ({ page }) => {
  await open(page);
  await fill(page);
  await page.route("**/discovery", (route) =>
    route.request().method() === "POST" && (route.request().headers()["content-type"] ?? "").startsWith("multipart/")
      ? route.fulfill({ status: 500, contentType: "text/plain", body: "Internal Server Error" })
      : route.continue(),
  );
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("group", { name: "We could not send your request" })).toContainText(NOT_SENT, SLOW);
  await expect(page.locator("h1")).toHaveText("Book a discovery session");
  await expect(page.getByLabel(/Business name/)).toHaveValue("Ruiz Bakery, wholesale bread");
});

test("what is typed survives a reload and a visit to another page, and is forgotten once the request is sent", async ({
  page,
}) => {
  await open(page);
  await fill(page, "__test_sent__");
  await page.getByLabel(/Phone/).fill("973 555 0100");
  await page.getByLabel(/What would you like/).fill("Our invoices\nand the stock sheet");
  await page.getByLabel(/Who introduced/).fill("Maria");

  // only the six visible fields are kept: no token, no honeypot
  const stored = await page.evaluate(() => Object.fromEntries(Object.entries(window.sessionStorage)));
  expect(Object.keys(stored).filter((key) => key.includes("discovery"))).toEqual(["camino:discovery-draft"]);
  expect(JSON.parse(stored["camino:discovery-draft"])).toEqual({
    name: "Ana Ruiz",
    email: "ana@example.com",
    business: "__test_sent__",
    phone: "973 555 0100",
    lookAt: "Our invoices\nand the stock sheet",
    referrer: "Maria",
  });
  // and no signed timestamp anywhere in the browser's storage
  const everything = await page.evaluate(() => JSON.stringify([{ ...window.sessionStorage }, { ...window.localStorage }]));
  expect(everything).not.toMatch(/\d{13}\.[0-9a-f]{24}\./);

  const expectRestored = async () => {
    await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
    await expect(page.getByLabel(/^Email/)).toHaveValue("ana@example.com");
    await expect(page.getByLabel(/Business name/)).toHaveValue("__test_sent__");
    await expect(page.getByLabel(/Phone/)).toHaveValue("973 555 0100");
    await expect(page.getByLabel(/What would you like/)).toHaveValue("Our invoices\nand the stock sheet");
    await expect(page.getByLabel(/Who introduced/)).toHaveValue("Maria");
  };
  await live(page, () => page.reload());
  await expectRestored();
  await page.getByRole("contentinfo").getByRole("link", { name: "Privacy" }).click();
  await expect(page.locator("h1")).toHaveText("Privacy");
  await live(page, () => page.goBack());
  await expectRestored();

  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText("Your request is in", SLOW);
  expect(await page.evaluate(() => window.sessionStorage.getItem("camino:discovery-draft"))).toBeNull();
  await live(page, () => page.reload());
  await expect(page.getByLabel(/Your name/)).toHaveValue("");
  await expect(page.getByLabel(/Business name/)).toHaveValue("");
});

test("?ref=maria prefills the referrer field", async ({ page }) => {
  await open(page, "/discovery?ref=maria");
  await expect(page.getByLabel(/Who introduced you/)).toHaveValue("maria");
});

test("?ref= still prefills beside a restored draft, and never replaces a referrer the visitor typed", async ({ page }) => {
  await open(page);
  await page.getByLabel(/Your name/).fill("Ana Ruiz");
  await open(page, "/discovery?ref=maria");
  await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
  await expect(page.getByLabel(/Who introduced you/)).toHaveValue("maria");
  await page.getByLabel(/Who introduced you/).fill("Maria Lopez");
  await live(page, () => page.reload());
  await expect(page.getByLabel(/Who introduced you/)).toHaveValue("Maria Lopez");
});

test("success is announced in a status region that existed before submit, takes focus, and shows the address back", async ({
  page,
}) => {
  await open(page);
  const status = page.getByRole("status");
  await expect(status).toBeAttached();
  await expect(status).toBeEmpty();
  const handle = await status.elementHandle();
  await fill(page, "__test_sent__");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(status).toContainText("Your request is in", SLOW);
  expect(await handle!.evaluate((el) => el.isConnected)).toBe(true);
  await expect(page.getByRole("heading", { name: /Your request is in/ })).toBeFocused();
  await expect(status).toContainText(
    "We reply within one business day to agree on a time for your free 45-minute conversation. We will reply to ana@example.com. If you do not hear from us, write to contact@caminocode.com.",
  );
  expect(await violations(page)).toEqual([]);
});

test("once the request is sent, the confirmation takes the place of the form's heading and lead", async ({ page }) => {
  await open(page);
  const section = page.locator("main > section.inner-sec").first();
  // before: the section is named by the heading above the form, and the lead sits under it
  await expect(section).toHaveAttribute("aria-labelledby", "form-title");
  await expect(page.locator("#form-title")).toHaveText("Tell us about your business");
  await expect(section.locator(".in-lead")).toHaveCount(1);

  await fill(page, "__test_sent__");
  await page.getByRole("button", { name: "Send request" }).click();
  const status = page.getByRole("status");
  await expect(status).toContainText("Your request is in", SLOW);

  // after: nothing is left that reads as if the form were still there
  await expect(section).not.toContainText("Tell us about your business");
  await expect(section.locator(".in-lead")).toHaveCount(0);
  await expect(section.locator("form")).toHaveCount(0);
  // the confirmation's title is the section's heading now: an h2 with the same id, inside the status region
  const title = status.locator("h2#form-title");
  await expect(title).toHaveText("Thank you. Your request is in.");
  await expect(page.locator("#form-title")).toHaveCount(1);
  await expect(page.getByRole("region", { name: "Thank you. Your request is in." })).toHaveCount(1);
  // one h1, and no level skipped: the page title, then the two halves of this section, then the closing band
  expect(
    await page.locator("main :is(h1, h2, h3, h4, h5, h6)").evaluateAll((els) => els.map((el) => `${el.tagName} ${el.textContent}`)),
  ).toEqual([
    "H1 Book a discovery session",
    "H2 Thank you. Your request is in.",
    "H2 What happens next",
    "H3 We reply",
    "H3 We talk",
    "H3 You get a summary",
    "H2 Prefer to write or call?",
  ]);
  // it has the focus, and it comes to rest on screen, clear of the sticky header (the page glides there
  // from the Send button, so the position is read until it settles)
  await expect(title).toBeFocused();
  const header = (await page.locator("header").first().boundingBox())!;
  await expect.poll(async () => (await title.boundingBox())!.y).toBeGreaterThanOrEqual(header.y + header.height);
  await expect(title).toBeInViewport({ ratio: 1 });
  // "What happens next" stays beside (or under) it
  await expect(page.getByRole("heading", { level: 2, name: "What happens next" })).toBeVisible();
});

test("the offer is said above the first field at every width, in the words the other pages use", async ({ page }) => {
  for (const size of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/discovery");
    const lead = page.locator("#form-title + .in-lead");
    await expect(lead, `${size.width}`).toHaveText(
      "Free, 45 minutes, by video or in person. We reply within one business day to find a time.",
    );
    await expect(lead, `${size.width}`).toBeVisible();
    const said = (await lead.boundingBox())!;
    const field = (await page.locator("#f-name").boundingBox())!;
    expect(said.y + said.height, `${size.width}`).toBeLessThanOrEqual(field.y);
  }
  // its first sentence is the one the closing band opens with on the other pages
  await page.goto("/approach");
  await expect(page.locator("main > section.in-book")).toContainText("Free, 45 minutes, by video or in person.");
});

test("on a 390 by 664 phone screen the first field is on the first screen, below the offer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  await page.goto("/discovery");
  await page.evaluate(async () => {
    await document.fonts.ready; // the line breaks above the field are final once the fonts are in
  });
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  const lead = (await page.locator("#form-title + .in-lead").boundingBox())!;
  const field = (await page.locator("#f-name").boundingBox())!;
  expect(lead.y + lead.height).toBeLessThanOrEqual(field.y);
  expect(field.y + field.height).toBeLessThanOrEqual(664);
});

test("a filled honeypot gets the very message a real send gets, its address shown back included", async ({ page }) => {
  // the trap only works while a trapped sender sees exactly what a real sender sees
  const messages: string[] = [];
  for (const trap of ["", "http://spam.example"]) {
    await open(page);
    await fill(page, "__test_sent__");
    await page.locator("#f-hp_note").evaluate((el: HTMLInputElement, value) => {
      el.value = value;
    }, trap);
    await page.getByRole("button", { name: "Send request" }).click();
    const status = page.getByRole("status");
    await expect(status).toContainText("Your request is in", SLOW);
    await expect(status.locator(".in-sent-to")).toHaveText("ana@example.com");
    messages.push(await status.innerText());
  }
  expect(messages[1]).toBe(messages[0]);
  expect(messages[1]).toContain("We will reply to ana@example.com.");
});

test("a very long address shown back does not push the page sideways at 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await open(page);
  // no hyphens: nothing in it lets the line break unless the rule on the address allows it anywhere
  const address = "alexandramontgomeryfitzgerald@averylongcompanynamefortesting.example.com";
  await fill(page, "__test_sent__");
  await page.getByLabel(/^Email/).fill(address);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("status")).toContainText(`We will reply to ${address}.`, SLOW);
  const { scroll, client, right } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
    right: document.querySelector(".in-sent-to")!.getBoundingClientRect().right,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
  expect(right).toBeLessThanOrEqual(client);
});

test("the failure message fits a 320 px phone, with a Try again button at least 44 px tall", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await open(page);
  await fill(page);
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.getByRole("group", { name: "We could not send your request" });
  await expect(summary).toContainText(REFUSED, SLOW);
  const { scroll, client } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
  const box = (await summary.getByRole("button", { name: "Try again" }).boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(44);
});

test("the fields ask the phone keyboard for the right keys, and the business box has two rows", async ({ page }) => {
  await open(page);
  const name = page.getByLabel(/Your name/);
  await expect(name).toHaveAttribute("autocapitalize", "words");
  await expect(name).toHaveAttribute("enterkeyhint", "next");
  await expect(page.getByLabel(/^Email/)).toHaveAttribute("enterkeyhint", "next");
  await expect(page.getByLabel(/Phone/)).toHaveAttribute("enterkeyhint", "next");
  await expect(page.getByLabel(/Who introduced/)).toHaveAttribute("enterkeyhint", "send");
  const business = page.getByLabel(/Business name/);
  expect(await business.evaluate((el) => el.tagName)).toBe("TEXTAREA");
  await expect(business).toHaveAttribute("rows", "2");
  await expect(business).toHaveAttribute("name", "business");
  await expect(business).toHaveAttribute("autocomplete", "organization");
  await expect(business).toHaveAttribute("required", "");
  // the same limit as before: over 200 characters the server says so, and keeps the text
  await name.fill("Ana Ruiz");
  await page.getByLabel(/^Email/).fill("ana@example.com");
  await business.fill("x".repeat(201));
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByRole("group", { name: "Please fix the following" })).toContainText(
    "Business name and what it does: Keep this to 200 characters or fewer.",
    SLOW,
  );
  await expect(business).toHaveValue("x".repeat(201));
});

test("Enter in a one-line field moves on with a touch keyboard, and sends with a mouse and keyboard", async ({
  page,
}, testInfo) => {
  await open(page);
  const sends = countSends(page);
  const name = page.getByLabel(/Your name/);
  await name.fill("Ana Ruiz");
  await name.press("Enter");
  if (testInfo.project.name === "phone") {
    await expect(page.getByLabel(/^Email/)).toBeFocused();
    await page.getByLabel(/^Email/).press("Enter");
    await expect(page.getByLabel(/Business name/)).toBeFocused();
    // Nothing was sent as well as the focus moving. Read once, at this instant: a send that had started
    // would show "Sending…" now, and its answer (the summary) only seconds later, after the token wait.
    expect(await page.getByRole("button", { name: "Sending…" }).count()).toBe(0);
    expect(await page.getByRole("status").textContent()).toBe("");
    // and none follows: longer than the form waits for its token before any send leaves
    await page.waitForTimeout(4500);
    expect(sends.length).toBe(0);
    await expect(page.locator(".in-summary")).toHaveCount(0);
    await expect(page.getByLabel(/Business name/)).toBeFocused();
  } else {
    const summary = page.getByRole("group", { name: "Please fix the following" });
    await expect(summary).toBeFocused(SLOW);
    await expect(summary.getByRole("link")).toHaveCount(2);
    expect(sends.length).toBe(1);
  }
});

test("the form asks for a fresh token on a timer, when the tab comes back and when the connection does, and no more often", async ({
  page,
}) => {
  await page.clock.install();
  const tokens = countTokens(page);
  const settle = () => page.waitForTimeout(400); // for a request that should not have been made to show up
  const setHidden = (hidden: boolean) =>
    page.evaluate((value) => {
      Object.defineProperty(document, "hidden", { configurable: true, get: () => value });
      document.dispatchEvent(new Event("visibilitychange"));
    }, hidden);
  const online = () => page.evaluate(() => window.dispatchEvent(new Event("online")));

  // one when the form appears
  await open(page);
  await expect.poll(() => tokens.length).toBe(1);
  await settle();

  // on screen: none in the first ten minutes (the timer checks every minute), one after that
  await page.clock.fastForward("09:00");
  await settle();
  expect(tokens.length).toBe(1);
  await page.clock.fastForward("02:00");
  await expect.poll(() => tokens.length).toBe(2);
  await settle();

  // hidden: none, however old the token gets
  await setHidden(true);
  await page.clock.fastForward("11:00");
  await settle();
  expect(tokens.length).toBe(2);
  // back after more than a minute away: one, at once
  await setHidden(false);
  await expect.poll(() => tokens.length).toBe(3);
  await settle();

  // with a token that fresh, neither a second return nor the connection coming back asks again
  await setHidden(true);
  await setHidden(false);
  await online();
  await settle();
  expect(tokens.length).toBe(3);
  // half a minute on, the connection coming back does (the network may have changed), a tab return still does not
  await page.clock.fastForward("00:30");
  await setHidden(true);
  await setHidden(false);
  await settle();
  expect(tokens.length).toBe(3);
  await online();
  await expect.poll(() => tokens.length).toBe(4);
  await settle();
  expect(tokens.length).toBe(4);
});

test("the form says what the details are used for, with a link to the privacy page", async ({ page }) => {
  await open(page);
  const note = page.locator("#privacy-note");
  await expect(note).toBeVisible();
  await expect(note).toContainText("We use these details to reply to you and to prepare for the conversation.");
  const link = note.getByRole("link", { name: "Read the privacy page (opens in a new tab)" });
  await expect(link).toHaveAttribute("href", "/privacy");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(page.getByRole("button", { name: "Send request" })).toHaveAttribute("aria-describedby", "privacy-note");
  // the note repeats the privacy page's own sentence
  await page.goto("/privacy");
  await expect(page.locator("main")).toContainText("We use this to reply to you and to prepare for the conversation.");
  // and the privacy page says that the form keeps a draft in the browser
  await expect(page.locator("main")).toContainText(
    "What you type into the discovery form is also kept in session storage, so a reload does not lose it, until your request is sent or you close the tab.",
  );
});

test("the closing band gives the email and phone as links", async ({ page }) => {
  await open(page);
  const band = page.locator("main > section.in-book");
  await expect(band.locator('a[href="mailto:contact@caminocode.com"]')).toHaveText("contact@caminocode.com");
  await expect(band.locator('a[href="tel:+19732342073"]')).toHaveText("+1 973-234-2073");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("a send gets the failure message from the server, with the values kept and the contact links", async ({ page }) => {
    await page.goto("/discovery");
    // the heading and the offer above the form are in the server's HTML
    await expect(page.locator("#form-title")).toHaveText("Tell us about your business");
    await expect(page.locator("#form-title + .in-lead")).toContainText("Free, 45 minutes, by video or in person.");
    await fill(page);
    await page.getByRole("button", { name: "Send request" }).click();
    const summary = page.getByRole("group", { name: "We could not send your request" });
    await expect(summary).toContainText(REFUSED);
    // "Try again" needs the script (a send needs a token, and only the script fetches one): no dead button here
    await expect(summary.getByRole("button")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Try again" })).toHaveCount(0);
    await expect(page.locator("h1")).toHaveText("Book a discovery session");
    await expect(page.getByLabel(/Your name/)).toHaveValue("Ana Ruiz");
    await expect(page.getByLabel(/Business name/)).toHaveValue("Ruiz Bakery, wholesale bread");
    await expect(summary.getByRole("link", { name: "+1 973-234-2073" })).toHaveAttribute("href", "tel:+19732342073");
    await expect(summary.getByRole("link", { name: "contact@caminocode.com" })).toHaveAttribute(
      "href",
      /^mailto:contact@caminocode\.com\?subject=Discovery%20request%3A%20Ana%20Ruiz&body=Name%3A%20Ana%20Ruiz/,
    );
  });
});
