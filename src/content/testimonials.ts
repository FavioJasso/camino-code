/**
 * The two real testimonials, both for website projects. Nothing else is quoted anywhere on the site.
 * Every word is the client's own, copied from the original site's case-study pages: do not edit the wording.
 *
 * `quote` is one whole sentence taken from `full`, for places that show a short line (the About page).
 * `full` is the complete testimonial, paragraph by paragraph, shown on the project's case-study page
 * under `attribution`, which is the role exactly as the original page gave it.
 */
export const testimonials = [
  {
    name: "Juan Porras",
    role: "Founder",
    company: "Victoria's Painting",
    attribution: "Founder of Victoria's Painting",
    href: "/work/victorias-painting",
    quote:
      "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
    full: [
      "I would like to express my sincere appreciation to Favio Jasso from Camino Code for the outstanding work he did in developing the website for my company, Victoria's Painting.",
      "From the very beginning, Favio demonstrated a high level of professionalism, commitment, and a genuine interest in understanding the essence of my business. His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
      "Throughout the entire process, he provided clear communication, personalized guidance, and creative solutions that perfectly captured the identity and values of Victoria's Painting. Thanks to his work, we now have a strong online presence that conveys trust and professionalism to our clients.",
      "I highly recommend Favio Jasso and the Camino Code team for their dedication, talent, and excellence in every detail of the project.",
    ],
  },
  {
    name: "Daniel Avila",
    role: "IT Support Professional",
    company: "danielavila.tech",
    attribution: "IT Support Professional",
    href: "/work/daniel-avila",
    quote:
      "Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me.",
    full: [
      "Collaborating with Camino Code in creating my professional website, danielavila.tech, was a phenomenal experience. From start to finish, the process was fast and remarkably convenient owing to their exceptional staff. My designer was speedy in replying and exceedingly thorough in his attentiveness, always working to explain in a clear manner and ensure that my thoughts and likes were understood to the fullest.",
      "What impressed me most was how collaborative the process was. They always checked with me before they'd do any part of the site to get my approval and make sure I was fine with each choice they made in design. I had quite a few choices visually to select from, and what they wrote and proposed really helped to frame the overall concept in a professional and personal sort of manner.",
      "I really appreciated how friendly and easy to work with Camino Code was, they struck that perfect balance of technical expertise and approachability. Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me. I'd recommend them in a heartbeat to anyone looking for a web team that truly listens, communicates, and delivers excellent work quickly.",
    ],
  },
] as const;

export type Testimonial = (typeof testimonials)[number];

/** The testimonial given for a case study, looked up by the study's path. */
export function testimonialFor(href: Testimonial["href"]): Testimonial {
  // every href in the union above belongs to exactly one entry
  return testimonials.find((t) => t.href === href)!;
}
