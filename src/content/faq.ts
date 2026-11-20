/*
 * General questions, shown on the About page and repeated word for word in that
 * page's FAQPage structured data. Answers are plain text for that reason: no links,
 * no markup.
 *
 * Every answer restates a fact or promise the site already makes elsewhere. Nothing
 * here about price, guarantees, ownership or support after hand-over: those wait for
 * Favio's confirmation (see PLACEHOLDERS.md).
 */
export type FaqItem = { question: string; answer: string };

export const faq: readonly FaqItem[] = [
  {
    question: "Who will I work with?",
    answer:
      "Favio Jasso, the founder. He runs the discovery session, leads the work and is your point of contact from discovery to hand-over. When a project needs more hands, specialists join for specific parts of the work, and Favio stays responsible for all of it.",
  },
  {
    question: "How does it start?",
    answer:
      "With a free 45-minute discovery session, by video or in person. It is a conversation about your business: the tools you use, where the data lives, and where time is being lost.",
  },
  {
    question: "What do I get after discovery?",
    answer: "A one-page written summary within a week: what to fix first, and what to leave alone.",
  },
  {
    question: "How is the work delivered?",
    answer:
      "In stages you can see working, one at a time. At hand-over you get documentation your team can work from.",
  },
  {
    question: "Where are you based, and can we meet by video?",
    answer:
      "Camino Code is based in Newark, New Jersey. The discovery session is by video or in person.",
  },
  {
    question: "What size of business do you work with?",
    answer:
      "Small and mid-sized businesses. Our work is software, data and AI, and the rules to run them safely.",
  },
  {
    question: "What if we have not started with data or AI?",
    answer:
      "You are not behind. Starting properly matters more than starting first, and discovery is where we work out where to start.",
  },
  {
    question: "How fast do you reply?",
    answer: "We reply within one business day.",
  },
];
