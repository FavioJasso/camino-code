import type { FaqItem } from "@/content/faq";

/**
 * Questions and answers as a description list, in the ".faq" block from inner.css
 * (which reaches the page through PageBand). Answers are rendered as plain text, so
 * the same items can go to faqPage() and the structured data matches the page word
 * for word.
 */
export function Faq({ items, className }: { items: readonly FaqItem[]; className?: string }) {
  return (
    <dl className={className ? `faq ${className}` : "faq"}>
      {items.map((item) => (
        <div key={item.question}>
          <dt>{item.question}</dt>
          <dd>{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
