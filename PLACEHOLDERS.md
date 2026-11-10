# Version 1 placeholders

These are the decisions made for version 1 until Favio answers the open questions (design.md, section 12). Each is safe to ship on a preview and each is easy to swap.

- **Transparent Energy.** Shown with the three permitted figures ("$65,000+ a year saved in analyst time", "85% less manual reconciliation work", "3.5 months from start to running system") and the wording "Camino Code's founder led the build". No client quote, no client logo. Swapping the wording is a data edit.
- **Process promises.** Only these appear: a free discovery session (45 minutes, video or in person), a one-page written summary within a week, building in stages, and documentation at hand-over. Ownership, training, fixed pricing and contract terms are left off until confirmed.
- **Logo.** The mockup's placeholder mark (an Ember dot atop a thin three-turn switchback line).
- **Service pages.** No claims of past delivery beyond Transparent Energy. Software and AI & governance carry no proof block. The service name stays "AI & governance".
- **Contact form.** Sends through Resend when the environment variables are set; otherwise it shows a friendly error with the email address. Recipient: contact@caminocode.com. Published contact: contact@caminocode.com and +1 973-234-2073.
- **Privacy and terms.** Short plain-language drafts, marked as drafts pending review.
- **Founder photo.** A neutral placeholder until Favio supplies one (the current photo may carry an AI-tool watermark).
- **Review.** Version 1 is reviewed on a Vercel preview from a branch. Nothing merges to `main` without Favio's go-ahead.
- **Founder block (home).** A Dusk-coloured block with initials "FJ" stands in for the portrait, and the two lines under "Favio Jasso, founder" are neutral placeholder text. Both wait for Favio's photo and bio. Edit `src/components/home/Founder.tsx`.
