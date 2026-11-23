# Camino Code website

The website of Camino Code, a software, data and AI consultancy in Newark, New Jersey. The canonical address is `https://www.caminocode.com`.

## Stack

- Next.js 16 (App Router, Turbopack) with React 19 and TypeScript. This Next.js version has breaking changes: read `AGENTS.md` and the docs in `node_modules/next/dist/docs/` before using an unfamiliar API.
- Hand-written CSS (`src/app/*.css`) on top of the Tailwind 4 reset, which is loaded through `@tailwindcss/turbopack` in `next.config.ts`.
- three.js for the live terrain scene on the home page and in the inner-page header bands (`src/scene/`).
- sharp for the images made at build time.
- Resend for the discovery form's email. Vercel Analytics and Speed Insights for visit counts and page speed.
- Vitest for unit tests. Playwright with axe for end-to-end and accessibility tests.

The project targets Node 24 (`.nvmrc`, and `engines` in `package.json`). CI runs on it.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload. |
| `npm run build` | Production build. `prebuild` runs `npm run stills` first. |
| `npm run start` | Serves the production build. |
| `npm run lint` | ESLint. `next build` does not lint. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm test` | Vitest unit tests. This rewrites the generated stills (see below). |
| `npm run test:e2e` | Playwright tests against a production build. |
| `npm run stills` | Regenerates the still images and the share image. |
| `npm run icons` | Regenerates the tab, Apple and web-manifest icons. Run by hand when the mark changes. |

## Environment variables

Copy `.env.example` to `.env.local` for local work. `.env.local` is ignored by git. All four are optional locally.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for the discovery form. |
| `BOOKING_FROM` | Sender address on a domain verified in Resend. |
| `BOOKING_TO` | Where discovery requests are delivered. Defaults to the published contact address. |
| `FORM_SECRET` | Random string that signs the form's token. Required in production. |

Without `RESEND_API_KEY` or `BOOKING_FROM` the form sends nothing: it shows its failure message (try again, phone, pre-filled email link) and keeps what the visitor typed. In production, a missing `FORM_SECRET` has the same effect. Each fallback writes `[booking] fallback: <reason>` to the server log, with nothing the visitor typed (the reason codes are in `src/app/discovery/actions.ts`).

Two more variables exist for automated tests only and are ignored in production: `BOOKING_TEST_MODE` and `BOOKING_SENDS_PER_10_MIN` (`src/app/discovery/actions.ts`, `playwright.config.ts`).

## Generated images

- **Stills and the share image.** `npm run stills` runs `scripts/render-stills.ts`, which draws the SVG stills in `public/stills/` and the share image `public/og.png` from the same terrain maths the live scene uses (`src/scene/terrain.ts`). It runs before every build, and `npm test` runs it too. The output is committed. If `git status` shows these files changed after a build or a test run, find out why before committing.
- **Icons.** `npm run icons` runs `scripts/render-icons.mjs`, which writes `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icon-192.png` and `public/icon-512.png` from the mark. It is not part of the build: run it when the mark changes and commit the output. The mark itself is drawn in `src/components/BrandMark.tsx`.
- **Case-study images.** Each image lives in `public/work/<slug>/` as a pair: `<name>.webp` (1920 x 1280) and `<name>-960.webp` (960 x 640). `node scripts/work-images.mjs <slug> <name> <source-file>` makes both files from one source image.

## Tests

```
npm run lint
npm run typecheck
npm test
npx playwright install chromium   # once
npm run test:e2e
```

- Unit tests are the `*.test.ts` files under `src/` and `scripts/`.
- End-to-end tests are in `tests/e2e/`. Playwright builds the site and serves it on port 3100, then runs three projects: desktop, phone, and the live scene with software WebGL. Locally it reuses anything already listening on port 3100, so stop other servers on that port first.
- CI (`.github/workflows/ci.yml`) runs lint, the type check, the unit tests and the Playwright tests on pushes to `main` and `rebuild` and on every pull request.

A new page has to be added by hand to the sitemap list (`PAGE_PATHS` in `src/content/seo.ts`) and to the route list the tests share (`PAGES` in `tests/e2e/routes.ts`). A redirect is added in `next.config.ts` and in `REDIRECTS` in `tests/e2e/seo.spec.ts`.

## Security headers

`next.config.ts` sets the response headers for every path, including a Content-Security-Policy and a Permissions-Policy. The policy allows this origin only, plus what each environment needs: `eval`, a websocket and the Vercel debug scripts in development, and the Vercel toolbar's origins on preview deployments (`VERCEL_ENV=preview`). Anything new that loads from another origin (a font, a script, an embed, an image host) has to be added there, or the browser will block it. `tests/e2e/csp.spec.ts` loads every page and fails on any violation.

## Previews and production

The site deploys on Vercel (`vercel.json`). A branch is reviewed on its Vercel preview deployment. Nothing merges to `main` without Favio's go-ahead (`PLACEHOLDERS.md`).

Before a production launch:

1. Set `RESEND_API_KEY`, `BOOKING_FROM` and `FORM_SECRET` for the Production environment in the Vercel project.
2. Send one real request through `/discovery` on the deployed site and confirm the email arrives.
3. Check that Web Analytics and Speed Insights are switched on in the Vercel project.
4. Open the deployed site with the browser console open and confirm it reports no Content-Security-Policy violation, on the preview (with the Vercel toolbar) and on production. The tests cover a local production build, not Vercel's own scripts.

## Where content lives

- `src/content/site.ts`: company name, contact details and the LinkedIn address.
- `src/content/seo.ts`: the site address, the sitemap list and the page metadata helper.
- `src/content/services.ts` and `src/content/service-pages.ts`: the three services, their pages and the `/services` index.
- `src/content/proof.ts`: case studies and their figures.
- `src/content/approach.ts`, `src/content/faq.ts`, `src/content/founder.ts`, `src/content/testimonials.ts`: the approach stages, questions, founder text and client quotes.
- `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`: the legal pages. Both are drafts until the owner approves them.
- `src/app/`: one folder per page. `src/components/`: shared parts such as the header, footer, header band and closing band.
- `public/.well-known/security.txt`: the security contact. Its `Expires` date needs renewing before 20 November 2027.

`PLACEHOLDERS.md` lists every statement that still waits for the owner's confirmation. Only confirmed facts go on the site.
