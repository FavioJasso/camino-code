import type { Service } from "./services";

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
  /** Only the Data page has a real proof point. */
  proof: boolean;
};

const commonEngaged = [
  "It starts with a free 45-minute discovery session, by video or in person.",
  "Within a week you get a one-page written summary of what we found and what we would do first.",
  "If you go ahead, we build in stages you can see working, one at a time.",
  "At hand-over you get documentation your team can work from.",
];

export const servicePages: Record<Service["slug"], ServicePage> = {
  software: {
    slug: "software",
    title: "Software for small and mid-sized businesses",
    description:
      "Internal tools, client portals and integrations built around how your business already runs. Start with a free 45-minute discovery session.",
    kicker: "Software",
    intro:
      "Most businesses do not need a new platform. They need the three or four things their team does every day to stop living in spreadsheets, inboxes and someone's memory.",
    problems: [
      "Your team re-types the same information into two or three systems.",
      "Work depends on a spreadsheet that only one person fully understands.",
      "Clients ask for status by email because there is nowhere for them to look.",
      "Off-the-shelf software almost fits, but the gap is where the time goes.",
    ],
    gets: [
      "Internal tools shaped around your actual process, not a generic one.",
      "Client portals, so customers can see their own status without asking.",
      "Integrations that move data between the systems you already pay for.",
      "Working software in stages, with documentation at hand-over.",
    ],
    engaged: commonEngaged,
    faq: [
      {
        q: "Do we have to replace what we already use?",
        a: "Not as a starting point. Discovery looks at what you have first, and we only suggest something new where the existing tools cannot be made to fit.",
      },
      {
        q: "What does discovery cost?",
        a: "Nothing. It is a free 45-minute conversation.",
      },
      {
        q: "How soon will we hear back after we ask?",
        a: "Within one business day.",
      },
    ],
    proof: false,
  },
  data: {
    slug: "data",
    title: "Data pipelines, reporting and dashboards",
    description:
      "Pipelines, clean reporting and dashboards, so the numbers you decide on are the same numbers everywhere. Start with a free discovery session.",
    kicker: "Data",
    intro:
      "If two people can open two files and get two different totals, the problem is not the people. It is how the data moves. That is where we start.",
    problems: [
      "Analysts spend their week reconciling files by hand instead of analysing them.",
      "Reports disagree, and nobody is sure which one is right.",
      "Data arrives as Excel, PDF and vendor files, each in its own format.",
      "A manual monthly process that everyone dreads and nobody can audit.",
    ],
    gets: [
      "Automated pipelines that collect, clean and match data from each source.",
      "Checks that flag discrepancies instead of burying them.",
      "Dashboards and exports your team can read without asking for help.",
      "A system that runs on a schedule, with documentation at hand-over.",
    ],
    engaged: commonEngaged,
    faq: [
      {
        q: "We only have messy spreadsheets. Is that enough to start?",
        a: "Yes. Messy files in several formats are the usual starting point, and discovery is where we find out what is usable.",
      },
      {
        q: "Will it replace our analysts?",
        a: "The aim is to give them back the hours they spend on reconciliation, so they can spend them on analysis.",
      },
      {
        q: "How soon will we hear back after we ask?",
        a: "Within one business day.",
      },
    ],
    proof: true,
  },
  "ai-governance": {
    slug: "ai-governance",
    title: "AI and governance",
    description:
      "Practical AI where it pays for itself, with the rules, access controls and checks to use it safely. Start with a free discovery session.",
    kicker: "AI & governance",
    intro:
      "AI is worth using where it saves real time, and not worth using where it adds complexity for no gain. Discovery is how we tell the two apart for your business.",
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
        a: "No. If you have not started, discovery is a good place to decide whether to, and where. Starting properly matters more than starting first.",
      },
      {
        q: "Is this legal advice?",
        a: "No. We help you set practical rules and controls. For legal or regulatory questions you would still speak to a lawyer.",
      },
      {
        q: "How soon will we hear back after we ask?",
        a: "Within one business day.",
      },
    ],
    proof: false,
  },
};
