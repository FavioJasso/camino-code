import { proofBlocks, transparentEnergy } from "./proof";
import type { Service } from "./services";

type Study = keyof typeof proofBlocks;
type FigureValue = (typeof proofBlocks)[Study]["figures"][number]["value"];

/**
 * A case study as one page shows it: which study, the one figure the page leads with
 * (by its value, so it can only be a cleared figure), and the summary written from that
 * page's side of the work.
 */
export type ProofOnPage = { study: Study; figure: FigureValue; summary: string };

export type ServicePage = {
  slug: Service["slug"];
  title: string;
  description: string;
  kicker: string;
  intro: string;
  problems: string[];
  gets: string[];
  engaged: string[];
  faq: { q: string; a: string }[];
  /** The case study the page shows as its proof point (see src/content/proof.ts), if any. */
  proof: ProofOnPage | null;
};

/**
 * Copy for the /services index. It describes how the three services relate and repeats the
 * process promises already made elsewhere; it makes no claim of past delivery beyond the one
 * case study both Software and Data point to.
 */
export const servicesIndex = {
  title: "Software, data and AI services | Camino Code",
  description:
    "The three services Camino Code offers small and mid-sized businesses: software, data, and AI & governance. What each covers and how they fit together.",
  intro:
    "Software, data and AI for small and mid-sized businesses. Every service starts with the same first conversation.",
  fitLead:
    "The three overlap, so the first conversation starts from the technology and data you already have, not from a service.",
  fit: [
    {
      name: "Software is where the work happens",
      line: "Internal tools, portals and integrations decide what gets recorded, and how many times someone has to type it.",
    },
    {
      name: "Data is what the work leaves behind",
      line: "Pipelines and reporting turn those records into numbers you can check and decide on.",
    },
    {
      name: "AI and governance rest on both",
      line: "AI is only as useful as the data it can reach. Rules, access controls and checks decide what it may see, and who confirms its output before it is relied on.",
    },
  ],
  fitNote:
    "You may only need one of them. The one-page written summary you get after the first conversation says what to fix first and what to leave alone.",
  /** The one case study card: a single project that shows two services at once. */
  proof: {
    heading: "One system, two services",
    study: "transparentEnergy",
    figure: "$65,000+",
    summary:
      "The data work cleans and matches Excel, PDF and vendor files. The software runs it every day, built into the client’s own operations platform, with dashboards and exports.",
  } satisfies ProofOnPage & { heading: string },
} as const;

const commonEngaged = [
  "It starts with a conversation about your business: the tools you use, where your numbers live and where the hours go.",
  "You get a one-page summary of what we found and what we would do first.",
  "If you go ahead, we build in stages you can see working, one at a time.",
  "When the project is finished, you get documentation your team can work from.",
];

export const servicePages: Record<Service["slug"], ServicePage> = {
  software: {
    slug: "software",
    title: "Software for small and mid-sized businesses",
    description:
      "Automation, internal tools and integrations built around how your business already runs, and a website when you need one. Start with a free conversation.",
    kicker: "Software",
    intro:
      "Most businesses do not need a new platform. They need the three or four things their team does every day to stop living in spreadsheets, inboxes and someone’s memory.",
    problems: [
      "Your team re-types the same information into two or three systems.",
      "Work depends on a spreadsheet that only one person fully understands.",
      "Clients ask for status by email because there is nowhere for them to look.",
      "Off-the-shelf software almost fits, but the gap is where the time goes.",
    ],
    gets: [
      "Automation for the jobs your team repeats every day or every week, so they run on a schedule instead of on someone’s memory.",
      "Internal tools shaped around your actual process, not a generic one.",
      "Integrations that move data between the systems you already pay for.",
      "Client portals, so customers can see their own status without asking.",
      "A website, when you need one, built to fit with the rest.",
    ],
    engaged: commonEngaged,
    faq: [
      {
        q: "Do we have to replace what we already use?",
        a: "Not as a starting point. The first conversation looks at what you have, and we only suggest something new where the existing tools cannot be made to fit.",
      },
      {
        q: "Do you build websites too?",
        a: "Yes, when the business needs one. It is one part of the software work, and the website projects are on the Work page.",
      },
    ],
    proof: {
      study: "transparentEnergy",
      figure: "85%",
      summary:
        "A system built into Transparent Energy’s own operations platform now does the daily reconciliation their analysts used to do by hand. It runs on a schedule, flags anything that doesn’t match, and gives the team dashboards and exports to work from.",
    },
  },
  data: {
    slug: "data",
    title: "Data pipelines, reporting and dashboards",
    description:
      "Pipelines, clean reporting and dashboards, so the numbers you decide on are the same numbers everywhere. Start with a free conversation.",
    kicker: "Data",
    intro:
      "If two people can open two files and get two different totals, the problem is not the people. It is how the data moves. That is where we start.",
    problems: [
      "Analysts spend their week reconciling files by hand instead of analyzing them.",
      "Reports disagree, and nobody is sure which one is right.",
      "Data arrives as Excel, PDF and vendor files, each in its own format.",
      "A manual monthly process that everyone dreads and nobody can audit.",
    ],
    gets: [
      "Automated pipelines that collect, clean and match data from each source.",
      "Checks that flag discrepancies instead of burying them.",
      "Dashboards and exports your team can read without asking for help.",
      "A system that runs on a schedule, without anyone having to start it.",
    ],
    engaged: commonEngaged,
    faq: [
      {
        q: "We only have messy spreadsheets. Is that enough to start?",
        a: "Yes. Messy files in several formats are the usual starting point, and the first conversation is where we find out what is usable.",
      },
      {
        q: "Will it replace our analysts?",
        a: "The aim is to give them back the hours they spend on reconciliation, so they can spend them on analysis.",
      },
    ],
    proof: { study: "transparentEnergy", figure: "$65,000+", summary: transparentEnergy.summary },
  },
  "ai-governance": {
    slug: "ai-governance",
    title: "AI & governance",
    description:
      "Practical AI where it pays for itself, with the rules, access controls and checks to use it safely. Start with a free conversation.",
    kicker: "AI & governance",
    intro:
      "AI is worth using where it saves real time, and not worth using where it adds complexity for no gain. The first conversation is how we tell the two apart for your business.",
    problems: [
      "Staff are already pasting company information into AI tools, and nobody has set rules.",
      "You are not sure which jobs AI would help with and which it would only complicate.",
      "Nobody has decided who can see which data, or who checks AI output before it is used.",
      "You want to use AI, but you need to be able to explain how to a client or an auditor.",
    ],
    gets: [
      "A review of where AI would pay for itself in your business, and where it would not.",
      "Written rules for what staff may and may not put into AI tools.",
      "Access controls that decide who can reach which data.",
      "Checks on AI output, so someone confirms it before it is relied on.",
    ],
    engaged: commonEngaged,
    faq: [
      {
        q: "Do we need to be using AI already?",
        a: "No. If you have not started, the first conversation is a good place to decide whether to, and where. Starting properly matters more than starting first.",
      },
      {
        q: "Is this legal advice?",
        a: "No. We help you set practical rules and controls. For legal or regulatory questions you would still speak to a lawyer.",
      },
    ],
    proof: null,
  },
};

/** The figure a page leads with, looked up in the study's cleared figures. */
export function proofFigure(proof: ProofOnPage) {
  // the type of `figure` allows only values from this study's list
  return proofBlocks[proof.study].figures.find((f) => f.value === proof.figure)!;
}
