export const stages = [
  { name: "Scout", line: "We sit down with you and map the technology and data you already have." },
  { name: "Route", line: "You get a one-page summary: what to fix first, what to leave alone." },
  { name: "Build", line: "We build in stages you can see working." },
  { name: "Hand over", line: "We hand over the system with documentation your team can work from." },
] as const;

export const discoveryFacts = [
  { label: "Cost", value: "Free" },
  { label: "Length", value: "45 minutes" },
  { label: "Format", value: "Video or in person" },
  { label: "You get", value: "A one-page written summary within a week" },
  { label: "Reply time", value: "Within one business day" },
] as const;
