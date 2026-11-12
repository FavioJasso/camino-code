export const transparentEnergy = {
  name: "Transparent Energy",
  wording: "Camino Code's founder led the build",
  figures: [
    { value: "$65,000+", label: "a year saved in analyst time" },
    { value: "85%", label: "less manual reconciliation work" },
    { value: "3.5 months", label: "from start to running system" },
  ],
  summary:
    "Analysts were reconciling Excel, PDF and vendor files by hand. An automated system now does it every day.",
  href: "/work/transparent-energy",
} as const;

/** Long-form case study. Only what the project supports: no client quote, no logo, no figures beyond the three above. */
export const transparentEnergyStudy = {
  facts: [
    { label: "Client", value: "Transparent Energy" },
    { label: "Industry", value: "Energy brokerage" },
    { label: "Team", value: "2 people" },
    { label: "Time", value: "3.5 months" },
  ],
  before: [
    "Analysts reconciled contract and deal data between Excel files, PDFs and vendor files by hand.",
    "Checking contract terms, invoices and client data took hours of repeated work.",
    "There was no single place to see how deals and reconciliations stood.",
  ],
  built: [
    "A Python ETL pipeline, using Pandas and regular expressions, that cleans, matches and consolidates data from each source.",
    "Matching logic that lines up contract deal IDs with vendor data.",
    "A validation layer that flags discrepancies and leaves a clear audit trail.",
    "Dashboards inside Transparent Energy's Operations Platform to follow reconciliation results.",
    "Excel and PDF exports for reporting.",
    "A configurable scheduler that refreshes the data every day.",
  ],
  timeline: [
    { phase: "Discovery and planning", length: "2 weeks", line: "Worked with analysts and operations leadership to document how reconciliation actually ran, and what data it depended on." },
    { phase: "Pipeline development", length: "1 month", line: "Built the ETL scripts for large Excel and PDF data sets, and normalised inconsistent contract formats." },
    { phase: "Integration and testing", length: "2 months", line: "Built the modules into the Operations Platform and tested them against live production data." },
    { phase: "Launch", length: "Then ongoing", line: "Deployed to production on AWS. Improvements continued from user feedback." },
  ],
  stack: ["Python", "Pandas", "Regular expressions", "AWS S3", "AWS Elastic Beanstalk"],
  handedOver:
    "A running system inside the company's own Operations Platform: the daily pipeline, the validation checks, the dashboards and the exports.",
} as const;

/** DANIEL AVILA 64: Camino Code built it for Daniel Avila. Facts come from the project's production build and test runs. */
export const danielAvila64 = {
  name: "DANIEL AVILA 64",
  wording: "Built by Camino Code for Daniel Avila",
  figures: [
    { value: "158 kB", label: "first-load JavaScript" },
    { value: "0", label: "model, texture or audio files" },
    { value: "4", label: "control schemes, all live" },
    { value: "100%", label: "touch and plain-HTML ready" },
  ],
  summary:
    "A playable 3D portfolio: an N64-era castle you can explore, with every section one click away for recruiters.",
  href: "/work/daniel-avila-64",
  cardImage: { src: "/work/daniel-avila-64/card.webp", alt: "A low-poly castle lobby with a gear-themed painting behind a stone archway, from DANIEL AVILA 64" },
} as const;

export const danielAvila64Study = {
  title: "DANIEL AVILA 64: a playable 3D portfolio",
  subtitle:
    "How we turned an IT professional’s portfolio into an N64-era castle you can explore, without making recruiters play to read it.",
  facts: [
    { label: "Client", value: "Daniel Avila" },
    { label: "Industry", value: "Personal portfolio, interactive 3D" },
  ],
  challengeIntro:
    "Daniel came back to us with a bold blueprint: rebuild his portfolio as a castle hub world inspired by 1996-era 3D platformers. The challenges were:",
  challenges: [
    "Make a real 3D world fun to explore while keeping every section one click away for recruiters.",
    "Run smoothly on phones and keep the download small, with no heavy models or audio files.",
    "Keep all content readable by search engines, résumé parsers and screen readers.",
    "Capture the feel of the era with 100% original characters, art, music and sound.",
  ],
  challengeNote:
    "An octagonal lobby with five doors; behind each one, a painting that opens a section of Daniel’s career.",
  builtIntro:
    "Camino Code rebuilt danielavila.tech from scratch as a hybrid: a low-poly 3D hub world layered over a complete, server-rendered HTML portfolio.",
  built: [
    "Hybrid controls: Prev/Next Door, point-and-click, WASD or touch thumbstick, and a pause menu, all active at once.",
    "Five doors and five original pixel-art paintings: The Royal Archive, Deep Rack Caverns, Clockwork Network, Skyward Star Tower and Sunset Courtyard.",
    "“Daniel 64”, a 671-triangle custom avatar with idle, run, jump, dive, backflip and victory animations.",
    "A retro render pipeline (low internal resolution, 64×64 textures, a GLSL painting-ripple shader) built on three.js and Next.js.",
    "Original Web Audio chiptune and sound effects, plus a plain HTML version and automatic fallback when WebGL is unavailable.",
  ],
  builtNote:
    "Explorers roam the castle and collect stars; recruiters open the pause menu and download the PDF résumé in one click.",
  phases: [
    { phase: "Research and blueprint", length: "Step 1", line: "Reviewed Daniel’s blueprint and studied how leading game-style portfolios are built, kept fast and made accessible." },
    { phase: "Architecture and contract", length: "Step 2", line: "Defined the room layout, controls and content model as one shared contract, then prototyped a whitebox lobby." },
    { phase: "Build", length: "Step 3", line: "Built the engine, world, avatar, pixel art, audio, game UI, course overlays and SEO layer in parallel against that contract." },
    { phase: "Review and verification", length: "Step 4", line: "Every module independently reviewed and repaired, then tested end to end in the browser on desktop and mobile." },
  ],
  gallery: [
    { src: "/work/daniel-avila-64/gallery-01.webp", alt: "The castle lobby: a stone archway leads to a gear-themed painting, with the Career and Labs sign above and Prev Door and Next Door buttons below." },
    { src: "/work/daniel-avila-64/gallery-02.webp", alt: "Inside the Clockwork Network painting: a course panel listing five career and technical project entries." },
    { src: "/work/daniel-avila-64/gallery-03.webp", alt: "The pause menu over the lobby, listing five courses, a sound toggle, a plain HTML version link, the controls and a résumé download button." },
    { src: "/work/daniel-avila-64/gallery-04.webp", alt: "The same portfolio on a phone: the start screen, the lobby with a touch thumbstick and jump button, and a course panel." },
  ],
  results: [
    "All of Daniel’s experience, skills, certifications and projects kept and reorganized into five courses.",
    "Six collectible stars that reward visitors for seeing every section.",
    "A full plain-HTML portfolio for search engines, assistive tech and devices without WebGL.",
    "Same Vercel workflow as before: merge to main and it is live.",
  ],
  visitLabel: "Visit danielavila.tech",
  visitHref: "https://www.danielavila.tech",
} as const;

/** Proof blocks that service pages can show, keyed by ServicePage["proof"]. */
export const proofBlocks = {
  transparentEnergy,
  danielAvila64,
} as const;
