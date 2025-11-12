"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from '@/components/common/CaseStudyLayout';
import {
  Database,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

const TransparentEnergyCaseStudy = () => {
  const caseData = {
    title: "Transparent Energy",
    subtitle: "Data Automation & Reconciliation System",
    description: "How we automated reconciliation and streamlined operations for a leading national energy brokerage firm",
    category: "Data Engineering",
    year: "2025",
    client: "Transparent Energy",
    heroImage: "/assets/images/case_studies/transparent_work.webp",
    industry: "Energy Brokerage",
    duration: "3.5 months",
    team: "2 members",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "$65K+",
        label: "Annual Savings",
        icon: <TrendingUp className="h-6 w-6" />,
      },
      {
        value: "85%",
        label: "Time Reduction",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "Data Accuracy",
        icon: <Shield className="h-6 w-6" />,
      },
      {
        value: "AWS",
        label: "Cloud Infrastructure",
        icon: <Database className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro: "Transparent Energy, a major energy brokerage firm, needed a way to streamline its internal contract management and reconciliation process. The company faced several operational challenges:",
      items: [
        "Manual reconciliation between Excel, PDF and vendor files",
        "Time-intensive verification of contract terms, invoices, and client data",
        "Repetitive analyst workflows with limited automation",
        "No centralized visibility into deal tracking or reconciliation results"
      ],
    },
    challengeVisual: {
      emoji: "⚡",
      title: "Operational Bottleneck",
      description: "Manual reconciliation causing delays and inconsistencies in critical business operations.",
    },
    solutions: {
      intro: "Camino Code partnered with Transparent Energy to build an automated data reconciliation and reporting system—fully integrated within their Operations Platform. The system eliminated redundant manual work and gave the operations team a single, reliable source of truth for all contract deal data.",
      items: [
        "Python-Based ETL Pipeline using Pandas and Regex for cleaning, matching, and consolidating data across sources",
        "Automated Matching Logic that aligns contract deal IDs with vendor data for accuracy and compliance",
        "Seamless Integration within Transparent Energy's existing Operations Platform",
        "Secure Cloud Infrastructure hosted on AWS (S3 + Elastic Beanstalk) for scalability and uptime",
        "Data Validation Layer that flags discrepancies and provides clear audit visibility",
        "Internal dashboards within the Operations Platform to monitor reconciliation results",
        "Excel and PDF export features for compliance and executive reporting",
        "Configurable job scheduler for automated daily data refreshes"
      ],
    },
    solutionVisual: {
      emoji: "🚀",
      title: "Automated Pipeline",
      description: "End-to-end automation with cloud infrastructure and real-time data validation.",
    },
    phases: [
      {
        title: "Discovery & Planning",
        duration: "2 Weeks",
        description: "Collaborated with analysts and operations leadership to understand existing workflows. Documented reconciliation logic and data dependencies. Outlined system requirements and integration plan within the Operations Platform."
      },
      {
        title: "Pipeline Development",
        duration: "1 Month",
        description: "Developed Python-based ETL scripts to process large Excel and PDF data sets. Implemented Regex extraction to normalize inconsistent contract formats. Added automated logging for transparency and troubleshooting."
      },
      {
        title: "Integration & Testing",
        duration: "2 Months",
        description: "Embedded modules directly into the company's Operations Platform. Conducted user testing with live production data. Optimized runtime and improved accuracy through iterative tuning."
      },
      {
        title: "Launch & Iteration",
        duration: "Ongoing",
        description: "Deployed to production via AWS Elastic Beanstalk. Continued enhancements based on user feedback and new departmental needs. Established regular checkpoints to identify new automation opportunities."
      }
    ],
    testimonial: {
      quotes: [
        "Favio Jasso's work brought an immediate and measurable impact to our operational workflows. The reconciliation tools he built saved us thousands of dollars in analyst time and gave our teams reliable, automated data visibility.",
        "His ability to integrate seamlessly into our existing platform made adoption simple and efficient. The ongoing collaboration continues to reveal new efficiencies across our departments."
      ],
      author: "Director of Operations",
      role: "Leadership",
      company: "Transparent Energy"
    },
    results: [
      "$65,000+ in annual savings in analyst time",
      "85% reduction in manual reconciliation work",
      "100% improvement in data accuracy and consistency",
      "Seamless integration into the company's core Operations Platform",
      "Improved coordination across Operations, Marketing, Sales, and Pricing",
      "Enhanced data transparency and decision-making speed"
    ],
    prevCaseStudy: {
      title: "Daniel Avila Portfolio",
      link: "/case-study/daniel-avila"
    },
    nextCaseStudy: {
      title: "Victoria's Painting",
      link: "/case-study/victorias-painting"
    }
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <CaseStudyLayout {...caseData} />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default TransparentEnergyCaseStudy;
