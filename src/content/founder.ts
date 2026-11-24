import { transparentEnergy } from "@/content/proof";
import { site } from "@/content/site";

/*
 * Who a client is hiring: everything the site says about the founder. The home founder
 * block and the About page both read from here, so the bio is extended in this one file.
 *
 * Rules for this file:
 * - Confirmed facts only. Not yet confirmed, and so left out: the founding year,
 *   education, past employers, years of experience, awards, certifications, project
 *   counts, team size, named collaborators, prices, and ownership or support terms.
 *   Add a fact when Favio confirms it; never leave a slot or a guess.
 * - Never "one-man" or "solo", and never "our team", "staff" or "agency". Say what the
 *   client gets instead of putting a label on the company.
 * - The home block is in the third person, because the rest of the home page speaks as
 *   the firm. The About note is in the first person from top to bottom.
 * - The Transparent Energy wording stays as cleared: the founder led the build, with
 *   the three figures in src/content/proof.ts and nothing beyond them.
 */

const [savedAYear, , startToRunning] = transparentEnergy.figures;

/**
 * A "$65,000+" figure as it is said inside a sentence: "more than $65,000". Derived from
 * the cleared figure, so the note and the figure cannot drift apart.
 */
export function moreThan(figure: string): string {
  return `more than ${figure.replace(/\+$/, "")}`;
}

export const founder = {
  name: "Favio Jasso",
  role: "Founder",
  /** The larger portrait file, for structured data. The page images come from FounderPhoto. */
  portrait: "/people/favio-jasso-800.webp",

  /** Home page block. Third person, short: his own note is on the About page. */
  home: {
    heading: "You work with the founder.",
    paragraphs: [
      `Favio Jasso started ${site.name} in ${site.contact.place}. The person you talk to first is the person who answers for the work.`,
    ],
    link: { label: "Read Favio’s note", href: "/about" },
  },

  /**
   * About page block: a note in Favio's own voice. Every sentence here is a draft waiting
   * for his yes (see PLACEHOLDERS.md).
   */
  about: {
    heading: "Favio Jasso, founder",
    note: [
      `A lot of good businesses run on workarounds: the spreadsheet only one person understands, the report someone rebuilds every Monday, the same numbers typed into three systems. That holds until that person takes a week off, or the business grows. I started ${site.name} in ${site.contact.place}, to replace those workarounds with software, cleaner data and, where it pays, AI.`,
      `${transparentEnergy.name} had a version of this. Their analysts were reconciling Excel, PDF and vendor files by hand. I led the build of an automated system that now does it every day, built into their own operations platform. It went from start to running system in ${startToRunning.value}, and it saves ${moreThan(savedAYear.value)} a year in analyst time.`,
      "Most of the money is in the work your people repeat every week, rarely in a new platform. So I start with what you already have and fix what costs you most. If you haven’t started, you’re not behind.",
      "If we work together, you deal with me, from the first conversation to the finished system. On bigger projects, people I trust take on specific parts, and you still have one person to call.",
    ],
    links: [
      { label: "Read the Transparent Energy case study", href: transparentEnergy.href },
      { label: "See all work", href: "/work" },
    ],
  },
} as const;
