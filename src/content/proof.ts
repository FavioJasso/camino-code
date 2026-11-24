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
    { phase: "Pipeline development", length: "1 month", line: "Built the ETL scripts for large Excel and PDF data sets, and normalized inconsistent contract formats." },
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
  // these four are developer measurements, not business results: pages show them as one small line
  // under this label (<UnderTheHood />), never in the large <Figures /> block
  figuresLabel: "Under the hood",
  summary:
    "A playable 3D portfolio: an N64-era castle you can explore, with every section one click away for recruiters.",
  href: "/work/daniel-avila-64",
  cardImage: { src: "/work/daniel-avila-64/card.webp", alt: "The DANIEL AVILA 64 title screen: the game logo over a low-poly castle lobby with a checkerboard floor, doors marked Education and Skills, a small blocky avatar and a Press Start button." },
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
  // points back to the first project for the same client (danielAvila below)
  firstSiteNote:
    "Camino Code also built Daniel’s first portfolio site, which this rebuild replaced at the same address.",
  firstSiteLabel: "Read the case study of his first site",
  firstSiteHref: "/work/daniel-avila",
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

/*
 * The two website builds below were carried over from the original site's case-study pages.
 * They are website design-and-build projects for small clients, and are described as that.
 * Nobody measured an outcome on either, so neither has figures: do not pass them to <Figures />.
 * Left out on purpose: the old pages' filler stats ("3x", "100%", "24/7", "SEO ready"), their star
 * ratings, any claim of more inquiries or faster loading, and the duration and team size, which are unconfirmed.
 * The client's words for each project are in testimonials.ts.
 */

/** Victoria's Painting: the company's first website. Facts come from the old case-study page and screenshots of the client's site. */
export const victoriasPainting = {
  name: "Victoria's Painting",
  wording: "Built by Camino Code for Victoria's Painting",
  summary:
    "The first website for a New Jersey painting company, with its services, the towns it serves and a free-estimate form.",
  href: "/work/victorias-painting",
  cardImage: {
    src: "/work/victorias-painting/card.webp",
    alt: "The Victoria's Painting home page in a browser window: a navy hero with the headline Transform Your Home, four round service icons and a Call Us button.",
  },
} as const;

export const victoriasPaintingStudy = {
  title: "Victoria's Painting: a first website for a painting company",
  subtitle:
    "How we built a clean, modern website that shows homeowners what Victoria's Painting does and makes it easy to get in touch.",
  facts: [
    { label: "Client", value: "Victoria's Painting" },
    { label: "Industry", value: "Painting company, New Jersey" },
    { label: "Project", value: "Website design and build" },
  ],
  challengeIntro:
    "Victoria's Painting needed a professional website to reach more customers and show its painting services. The main challenges were:",
  challenges: [
    "No online presence to show the company's work and services.",
    "Showing trust and experience with clear information.",
    "Making it easy for customers to get in touch quickly.",
  ],
  builtIntro:
    "Camino Code designed and built a custom business website from scratch, with the focus on customers and ease of use. It has:",
  built: [
    "A clean, simple design that is easy to understand and navigate.",
    "A blue and white palette, chosen to look professional and build trust.",
    "Clear sections for home, about, services and contact.",
    "Service icons (house, door, shower, paint roller) and a photo card for each service, from drywall repair to deck staining.",
    "A service-area section with a Google map and a list of the towns served.",
    "Large call buttons that show the phone number, for quick contact.",
    "A free-estimate form that asks which service is needed.",
    "A statistics band for the company's own track record.",
  ],
  phases: [
    { phase: "Discovery and planning", line: "Met with the client to understand the business goals. Researched other painting company websites. Planned the site's structure and content." },
    { phase: "Design", line: "Created sample designs in Figma. Made layouts that adjust to any screen size. Chose colors and fonts that build trust." },
    { phase: "Development", line: "Built the site with React. Added the contact form with EmailJS. Integrated Google Maps for the service areas." },
    { phase: "Testing and deployment", line: "Tested on different browsers and devices. Checked loading speed and fixed issues. Launched the site with hosting and security." },
  ],
  gallery: [
    { src: "/work/victorias-painting/gallery-01.webp", alt: "The Our Services section: six photo cards, from drywall painting and repair to deck sealing and staining, each with an Explore button." },
    { src: "/work/victorias-painting/gallery-02.webp", alt: "The Areas Served section: a Google map of northern New Jersey with pins, beside a list of twenty towns and a call button." },
    { src: "/work/victorias-painting/gallery-03.webp", alt: "The free-estimate form, with name, email, phone, service and message fields, beside a card with the company's phone, email and location." },
    { src: "/work/victorias-painting/gallery-04.webp", alt: "The Ready For A Change section: five statistics tiles beside a short pitch and a Get Free Consultation button." },
  ],
  results: [
    "Victoria's Painting has its first website, live at victoriaspainting.com.",
    "Services, service areas and contact details each have a clear place on the site.",
    "Customers can call the number on the buttons or ask for a free estimate through the form.",
    "Layouts adjust to any screen size, and the site was tested on different browsers and devices before launch.",
  ],
  visitLabel: "Visit victoriaspainting.com",
  visitHref: "https://www.victoriaspainting.com",
} as const;

/** Daniel Avila's first portfolio site, later replaced at the same address by DANIEL AVILA 64. Facts come from the old case-study page and screenshots of that site. */
export const danielAvila = {
  name: "Daniel Avila",
  wording: "Built by Camino Code for Daniel Avila",
  summary:
    "The first portfolio site for IT professional Daniel Avila: a clean, structured home for his experience, certifications and projects.",
  href: "/work/daniel-avila",
  cardImage: {
    src: "/work/daniel-avila/card.webp",
    alt: "Daniel Avila's first portfolio site in a browser window: his name, the title Desktop Support Technician, two buttons and his portrait on a soft blue background.",
  },
} as const;

export const danielAvilaStudy = {
  title: "Daniel Avila: a first portfolio site",
  // names the project where the client's name alone would be confused with DANIEL AVILA 64 (structured data)
  project: "Daniel Avila's first portfolio site",
  subtitle:
    "How we built a clean, modern portfolio site that sets out an IT professional's skills, certifications and experience.",
  facts: [
    { label: "Client", value: "Daniel Avila" },
    { label: "Industry", value: "Personal portfolio" },
    { label: "Project", value: "Website design and build" },
  ],
  challengeIntro:
    "Daniel needed a professional place online to show his IT support expertise, certifications and career so far. The main challenges were:",
  challenges: [
    "No existing portfolio site to represent him professionally.",
    "Skills and certifications needed a clear, structured presentation.",
    "The visual identity had to be professional yet approachable.",
    "The design had to be responsive and modern, and reflect reliability.",
  ],
  builtIntro:
    "Camino Code designed and built a custom personal portfolio site from the ground up, with the focus on ease of use and professional branding.",
  built: [
    "A clean, minimal design with the content arranged in a clear structure.",
    "A color palette chosen for trust and reliability: #3970EB, #212020, #FFFFFF and #F6F6F6.",
    "The Monda and Quicksand typefaces, for a modern, tech-inspired tone.",
    "Rounded shapes, soft shadows and gradient backgrounds, to keep it approachable.",
    "Clear sections: hero, about, experience, certifications, projects and contact.",
  ],
  phases: [
    { phase: "Discovery and planning", line: "Talked through branding, goals and objectives with Daniel. Researched portfolios of other IT professionals." },
    { phase: "Design", line: "Made wireframes and mockups in Figma, with responsive layouts for desktop and mobile." },
    { phase: "Development", line: "Built the site with Next.js, HTML, CSS, JavaScript and TypeScript. Added the content, animations and responsive behavior." },
    { phase: "Testing and deployment", line: "Checked compatibility across browsers and devices. Tested load speed and performance. Launched the site with hosting, DNS and SSL set up." },
  ],
  gallery: [
    { src: "/work/daniel-avila/gallery-01.webp", alt: "The projects section: two numbered cards, a high-performance PC build and 3D printing projects, each with tags and a View Details button." },
    { src: "/work/daniel-avila/gallery-02.webp", alt: "The about section: a three-paragraph bio beside three highlight cards, Technical Expertise, User-Focused Support and Continuous Growth." },
    { src: "/work/daniel-avila/gallery-03.webp", alt: "The experience section: two part-time IT support roles, each shown with the employer's logo." },
  ],
  results: [
    "Daniel had his first portfolio site, live at danielavila.tech.",
    "His skills, certifications and experience were set out in a clear structure.",
    "The branding matched his IT support role.",
    "Layouts were responsive on desktop and mobile.",
  ],
  // the first site is no longer online, so the page ends by pointing forward instead of out
  nextNote:
    "Daniel later came back for a full rebuild. The same address, danielavila.tech, now runs that version: DANIEL AVILA 64.",
  nextLabel: "Read the DANIEL AVILA 64 case study",
  nextHref: "/work/daniel-avila-64",
} as const;

/**
 * Every case study, in the order /work lists them, with the short label each one carries there.
 * The system comes first; then the three web builds, the business client first. PAGE_PATHS in
 * seo.ts (and so the sitemap) follows the same order.
 */
export const caseStudies = [
  { name: transparentEnergy.name, kind: "Automation and data system", href: transparentEnergy.href },
  { name: victoriasPainting.name, kind: "Business website", href: victoriasPainting.href },
  { name: danielAvila64.name, kind: "Playable 3D portfolio", href: danielAvila64.href },
  { name: danielAvila.name, kind: "Portfolio site", href: danielAvila.href },
] as const;

/** Case studies that the service pages and the /services index can show, keyed by ProofOnPage["study"]. */
export const proofBlocks = {
  transparentEnergy,
} as const;
