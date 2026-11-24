/*
 * The three questions on the About page, repeated word for word in that page's FAQPage
 * structured data. Answers are plain text for that reason: no links, no markup. Like the
 * rest of the About page, they are in Favio's own voice.
 *
 * Only questions the page does not already answer: who you deal with is in the founder
 * note, and the cost, length, format, summary and reply time are in the closing band.
 * Nothing here about price, guarantees, ownership or support once a project is finished:
 * those wait for Favio's confirmation (see PLACEHOLDERS.md).
 */
export type FaqItem = { question: string; answer: string };

export const faq: readonly FaqItem[] = [
  {
    question: "Our data is a mess. Is that a problem?",
    answer:
      "No. Messy files in several formats, and a spreadsheet nobody wants to touch, are a normal place to start. The first conversation is where I find out what's usable.",
  },
  {
    question: "Do we have to replace the software we already use?",
    answer:
      "Not as a starting point. I look at what you have first, and only suggest something new where the tools you already pay for can't be made to fit.",
  },
  {
    question: "How does the work run once we agree on it?",
    answer:
      "In stages you can see working, one at a time, so you can check each part before the next one starts. When it's finished, you get documentation your team can work from.",
  },
];
