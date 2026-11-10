export const transparentEnergy = {
  name: "Transparent Energy",
  wording: "Camino Code's founder led the build",
  figures: [
    { value: "$65,000+", label: "a year saved in analyst time" },
    { value: "85%", label: "less manual reconciliation work" },
    { value: "3.5 months", label: "from start to running system" },
  ],
  summary:
    "Analysts were reconciling Excel, PDF and vendor files by hand. An automated system now does it every day.",
  href: "/work/transparent-energy",
} as const;

/** Long-form case study. Only what the project supports: no client quote, no logo, no figures beyond the three above. */
export const transparentEnergyStudy = {
  facts: [
    { label: "Client", value: "Transparent Energy" },
    { label: "Industry", value: "Energy brokerage" },
    { label: "Team", value: "2 people" },
    { label: "Time", value: "3.5 months" },
  ],
  before: [
    "Analysts reconciled contract and deal data between Excel files, PDFs and vendor files by hand.",
    "Checking contract terms, invoices and client data took hours of repeated work.",
    "There was no single place to see how deals and reconciliations stood.",
  ],
  built: [
    "A Python ETL pipeline, using Pandas and regular expressions, that cleans, matches and consolidates data from each source.",
    "Matching logic that lines up contract deal IDs with vendor data.",
    "A validation layer that flags discrepancies and leaves a clear audit trail.",
    "Dashboards inside Transparent Energy's Operations Platform to follow reconciliation results.",
    "Excel and PDF exports for reporting.",
    "A configurable scheduler that refreshes the data every day.",
  ],
  timeline: [
    { phase: "Discovery and planning", length: "2 weeks", line: "Worked with analysts and operations leadership to document how reconciliation actually ran, and what data it depended on." },
    { phase: "Pipeline development", length: "1 month", line: "Built the ETL scripts for large Excel and PDF data sets, and normalised inconsistent contract formats." },
    { phase: "Integration and testing", length: "2 months", line: "Built the modules into the Operations Platform and tested them against live production data." },
    { phase: "Launch", length: "Then ongoing", line: "Deployed to production on AWS. Improvements continued from user feedback." },
  ],
  stack: ["Python", "Pandas", "Regular expressions", "AWS S3", "AWS Elastic Beanstalk"],
  handedOver:
    "A running system inside the company's own Operations Platform: the daily pipeline, the validation checks, the dashboards and the exports.",
} as const;
