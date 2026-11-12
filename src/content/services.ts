export type Service = {
  slug: "software" | "data" | "ai-governance";
  name: string;
  line: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "software",
    name: "Software",
    line: "Internal tools, client portals and integrations built around how your business already runs.",
    href: "/services/software",
  },
  {
    slug: "data",
    name: "Data",
    line: "Pipelines, clean reporting and dashboards, so the numbers you decide on are the same numbers everywhere.",
    href: "/services/data",
  },
  {
    slug: "ai-governance",
    name: "AI & governance",
    line: "Practical AI where it pays for itself, with the rules, access controls and checks to use it safely.",
    href: "/services/ai-governance",
  },
];
