import { transparentEnergy } from "@/content/proof";
import { site } from "@/content/site";

/*
 * Who a client is hiring: everything the site says about the founder and about who
 * does the work. The home founder block and the About page both read from here, so
 * the bio is extended in this one file.
 *
 * Rules for this file:
 * - Confirmed facts only. Not yet confirmed, and so left out: the founding year,
 *   education, past employers, years of experience, awards, certifications, project
 *   counts, team size, named collaborators, prices, and ownership or support terms.
 *   Add a fact when Favio confirms it; never leave a slot or a guess.
 * - Camino Code is founder-led. Never "one-man" or "solo", and never "our team",
 *   "staff" or "agency".
 * - "We" is how Camino Code works. "Favio" (or "I" in his own note) is used wherever
 *   one person acts or makes the promise.
 * - The Transparent Energy wording stays as cleared: the founder led the build, with
 *   the three figures in src/content/proof.ts and nothing beyond them.
 */

const [savedAYear, , startToRunning] = transparentEnergy.figures;

export const founder = {
  name: "Favio Jasso",
  role: "Founder",
  /** The larger portrait file, for structured data. The page images come from FounderPhoto. */
  portrait: "/people/favio-jasso-800.webp",

  /** Home page block. Third person, short: the full note is on the About page. */
  home: {
    heading: "You work with the founder.",
    paragraphs: [
      `Favio Jasso founded ${site.name} in ${site.contact.place}. He runs every discovery session, leads every build and is your point of contact from the first conversation to hand-over.`,
      `He led the build of the reconciliation system for ${transparentEnergy.name}. Camino Code has also built DANIEL AVILA 64, a playable 3D portfolio, and websites for Victoria's Painting and Daniel Avila.`,
    ],
    link: { label: "More about Favio", href: "/about" },
  },

  /**
   * About page block: a short note in Favio's own voice. To extend the bio, add
   * sentences here (first person) and the matching fact to `home.paragraphs` (third
   * person) if it belongs on the home page too.
   */
  about: {
    heading: "Favio Jasso, founder",
    note: [
      `I founded ${site.name} in ${site.contact.place}. We work with small and mid-sized businesses on software, data and AI.`,
      `I led the build of the reconciliation system for ${transparentEnergy.name}. Analysts had been reconciling Excel, PDF and vendor files by hand, and an automated system now does it every day. It went from start to running system in ${startToRunning.value} and saves ${savedAYear.value} a year in analyst time.`,
      "Camino Code has also built DANIEL AVILA 64, a playable 3D portfolio for Daniel Avila, and websites for Victoria's Painting and for Daniel Avila.",
      "I run every discovery session myself. The person you talk to first is the person who answers for the work.",
    ],
    links: [
      { label: "Read the Transparent Energy case study", href: transparentEnergy.href },
      { label: "See all work", href: "/work" },
    ],
  },
} as const;

/** The "Who you work with" block on the About page. It also defines the site's "we". */
export const whoYouWorkWith = {
  heading: "Who you work with",
  lead: "Camino Code is founder-led. Favio leads every engagement and is your point of contact from discovery to hand-over.",
  body: "When a project needs more hands, specialists join for specific parts of the work. Favio stays responsible for all of it.",
  facts: [
    { label: "Your contact", value: "Favio Jasso, founder" },
    { label: "Discovery", value: "Run by Favio" },
    { label: "The build", value: "Led by Favio" },
    { label: "Reply time", value: "Within one business day" },
  ],
  link: { label: "See how we work", href: "/approach" },
  /** The one place the site says who "we" is. */
  we: "When this site says “we”, it means Favio and the people working on your project.",
} as const;
