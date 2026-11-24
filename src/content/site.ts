const email = "contact@caminocode.com";
const phone = "+1 973-234-2073";

export const site = {
  name: "Camino Code",
  contact: {
    email,
    phone,
    place: "Newark, New Jersey",
    /** Link targets for the two above. The tel: value is the phone number in E.164 form (a plus, then digits only). */
    emailHref: `mailto:${email}`,
    phoneHref: `tel:${phone.replace(/[^+\d]/g, "")}`,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/caminocode",
  },
} as const;
