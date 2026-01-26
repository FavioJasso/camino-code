"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import { Truck, FileText, Scale, ShieldCheck } from "lucide-react";

const ReMatterCaseStudy = () => {
  const caseData = {
    client: "ReMatter",
    industry: "Scrap Recycling Software",
    duration: "Ongoing",
    team: "Product Engineering",
    title: "Website ReMatter",
    subtitle:
      "Transforming municipal waste into clean electricity and construction materials through intelligent AI-driven optimization.",
    ctaLabel: "Visit ReMatter",
    ctaLink: "https://www.rematter.us",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "Docs",
        label: "Faster purchase & sales paperwork",
        icon: <FileText className="h-6 w-6" />,
      },
      {
        value: "Dispatch",
        label: "Bin tracking & routing workflows",
        icon: <Truck className="h-6 w-6" />,
      },
      {
        value: "Scale",
        label: "Scale-ready operational flows",
        icon: <Scale className="h-6 w-6" />,
      },
      {
        value: "Secure",
        label: "Compliance-minded engineering",
        icon: <ShieldCheck className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro:
        "Scrap recyclers operate in high-volume environments where speed, accuracy, and reporting requirements matter. Key challenges included:",
      items: [
        "Reducing manual steps in purchasing and sales documentation",
        "Keeping dispatch and bin tracking reliable across daily operations",
        "Making workflows intuitive for operators working quickly on-site",
        "Supporting reporting needs without slowing down the business",
      ],
    },
    challengeVisual: {
      emoji: "♻️",
      title: "High-Volume Operations",
      description:
        "Operational software that keeps up with fast-moving, compliance-sensitive workflows.",
    },
    solutions: {
      intro:
        "We focused on product engineering that improves operational throughput and usability while keeping the platform maintainable and scalable.",
      items: [
        "Workflow-oriented UI patterns for operators and office staff",
        "Document generation flows (purchase/sales documents, shipping paperwork)",
        "Support for dispatch and bin tracking use-cases",
        "Integration-friendly architecture for hardware and operational systems",
      ],
    },
    solutionVisual: {
      emoji: "⚙️",
      title: "Platform Engineering",
      description:
        "A centralized system designed to streamline day-to-day work across teams.",
    },
    phases: [
      {
        title: "Discovery & Scoping",
        duration: "Ongoing",
        description:
          "Mapping operational workflows, identifying friction points, and prioritizing high-impact improvements.",
      },
      {
        title: "UX & Workflow Design",
        duration: "Iterative",
        description:
          "Designing fast, operator-friendly flows that reduce clicks and increase clarity in high-pressure environments.",
      },
      {
        title: "Implementation",
        duration: "Continuous",
        description:
          "Shipping improvements with a focus on reliability, maintainability, and performance.",
      },
      {
        title: "Stabilization & Refinement",
        duration: "Continuous",
        description:
          "Monitoring feedback, tightening edge cases, and improving the overall user experience.",
      },
    ],
    images: [
      "/assets/images/case_studies/rematter_gallery01.webp",
      "/assets/images/case_studies/rematter_gallery02.webp",
      "/assets/images/case_studies/rematter_gallery03.webp",
      "/assets/images/case_studies/rematter_gallery04.webp",
    ],
    results: [
      "Streamlined operational workflows for buying and selling transactions",
      "Improved usability for teams working across the yard and the office",
      "A foundation designed to support integrations and reporting needs",
      "A consistent platform experience that scales with growth",
    ],
    prevCaseStudy: {
      title: "Victoria's Painting",
      link: "/case-study/victorias-painting",
    },
    nextCaseStudy: {
      title: "Transparent Energy",
      link: "/case-study/transparent-energy",
    },
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
        {/* Tailwind safelist helpers for CaseStudyLayout's dynamic color classes */}
        <div className="hidden">
          <span className="text-amber-400" />
          <span className="text-amber-500" />
          <span className="text-amber-400/20" />
          <span className="fill-amber-400" />
        </div>
        <NavigationBar />
        <CaseStudyLayout
          {...caseData}
          prevCaseStudy={caseData.prevCaseStudy}
          galleryAspectClass="aspect-[4/3]"
          galleryItemOverflowClassName="overflow-visible"
          galleryHoverScale={1.01}
          galleryContentHoverScale={1.01}
          galleryImageClassName="object-contain"
          galleryFrameClassName="bg-[#212528] p-3 sm:p-4 rounded-2xl"
          galleryImageContainerClassName="w-[90%] sm:w-[88%] aspect-[16/9] rounded-xl overflow-hidden border-4 border-white/15 drop-shadow-[0_22px_30px_rgba(0,0,0,0.55)]"
          galleryImageShadowClassName=""
          galleryItemClassName="bg-transparent rounded-2xl border border-white/10"
        />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default ReMatterCaseStudy;

