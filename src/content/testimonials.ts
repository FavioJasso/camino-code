/**
 * The two real testimonials, both from clients whose websites Camino Code built. Nothing else is quoted anywhere on the site.
 * Every word is the client's own, copied from the original site's case-study pages: do not edit the wording.
 *
 * `quote` is one whole sentence taken from `full`, for places that show a short line (the About page),
 * where it sits over a small caption: name, role and company (`company` is null where there is no
 * business name, so the role stands alone), and `project`, what was built.
 * `full` is the complete testimonial, paragraph by paragraph, shown on the project's case-study page
 * under `attribution`, which is the role exactly as the original page gave it.
 */
export const testimonials = [
  {
    name: "Juan Porras",
    role: "Founder",
    company: "Victoria’s Painting",
    attribution: "Founder of Victoria’s Painting",
    project: "Business website",
    href: "/work/victorias-painting",
    quote:
      "From the very beginning, Favio demonstrated a high level of professionalism, commitment, and a genuine interest in understanding the essence of my business.",
    full: [
      "I would like to express my sincere appreciation to Favio Jasso from Camino Code for the outstanding work he did in developing the website for my company, Victoria’s Painting.",
      "From the very beginning, Favio demonstrated a high level of professionalism, commitment, and a genuine interest in understanding the essence of my business. His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
      "Throughout the entire process, he provided clear communication, personalized guidance, and creative solutions that perfectly captured the identity and values of Victoria’s Painting. Thanks to his work, we now have a strong online presence that conveys trust and professionalism to our clients.",
      "I highly recommend Favio Jasso and the Camino Code team for their dedication, talent, and excellence in every detail of the project.",
    ],
  },
  {
    name: "Daniel Avila",
    role: "IT Support Professional",
    company: null,
    attribution: "IT Support Professional",
    project: "Portfolio website",
    href: "/work/daniel-avila",
    quote: "What impressed me most was how collaborative the process was.",
    full: [
      "Collaborating with Camino Code in creating my professional website, danielavila.tech, was a phenomenal experience. From start to finish, the process was fast and remarkably convenient owing to their exceptional staff. My designer was speedy in replying and exceedingly thorough in his attentiveness, always working to explain in a clear manner and ensure that my thoughts and likes were understood to the fullest.",
      "What impressed me most was how collaborative the process was. They always checked with me before they’d do any part of the site to get my approval and make sure I was fine with each choice they made in design. I had quite a few choices visually to select from, and what they wrote and proposed really helped to frame the overall concept in a professional and personal sort of manner.",
      "I really appreciated how friendly and easy to work with Camino Code was, they struck that perfect balance of technical expertise and approachability. Camino Code didn’t just build me a website, they helped me create an online presence that actually feels like me. I’d recommend them in a heartbeat to anyone looking for a web team that truly listens, communicates, and delivers excellent work quickly.",
    ],
  },
] as const;

export type Testimonial = (typeof testimonials)[number];

/** The small caption under a short quote: "name · role, company · what was built". */
export function captionFor(t: Testimonial): string {
  const who = t.company ? `${t.role}, ${t.company}` : t.role;
  return [t.name, who, t.project].join(" · ");
}

/** The testimonial given for a case study, looked up by the study's path. */
export function testimonialFor(href: Testimonial["href"]): Testimonial {
  // every href in the union above belongs to exactly one entry
  return testimonials.find((t) => t.href === href)!;
}
