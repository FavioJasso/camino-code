"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import {
  Cloud,
  Shield,
  Zap,
  DollarSign,
} from "lucide-react";

const HealthTrackCaseStudy = () => {
  const caseData = {
    client: "HealthTrack Medical",
    industry: "Healthcare",
    duration: "7 months",
    team: "15 members",
    title: "Cloud Infrastructure Transformation",
    subtitle:
      "Seamless transition to cloud infrastructure improving system reliability",
    heroImage: "/assets/images/services_work04.png",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "99.99%",
        label: "Uptime Achieved",
        icon: <Shield className="h-6 w-6" />,
      },
      {
        value: "60%",
        label: "Cost Reduction",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        value: "5x",
        label: "Faster Deployment",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "HIPAA Compliant",
        icon: <Cloud className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro: "HealthTrack's legacy on-premise infrastructure was costly to maintain, difficult to scale, and posed compliance risks. System downtime affected patient care, while outdated hardware limited their ability to implement modern healthcare solutions.",
      items: [
        "Frequent downtime impacting critical patient services",
        "High maintenance costs for aging server infrastructure",
        "Limited scalability preventing growth and innovation",
        "Compliance concerns with data security and HIPAA requirements",
      ],
    },
    challengeVisual: {
      emoji: "🏥",
      title: "Healthcare IT",
      description: "Modern cloud infrastructure for critical healthcare services and patient care systems.",
    },
    solutions: {
      intro: "We orchestrated a comprehensive cloud migration strategy using AWS, implementing HIPAA-compliant infrastructure with automated backups, disaster recovery, and advanced security measures. The new cloud architecture provides unmatched reliability and scalability.",
      items: [
        "HIPAA-compliant AWS cloud infrastructure",
        "Automated backup and disaster recovery systems",
        "Zero-downtime migration strategy",
        "Advanced security with encryption and access controls",
      ],
    },
    solutionVisual: {
      emoji: "☁️",
      title: "Cloud Platform",
      description: "Secure, scalable cloud infrastructure with automated backups and disaster recovery.",
    },
    phases: [
      {
        title: "Assessment & Planning",
        duration: "6 weeks",
        description:
          "Infrastructure audit and cloud migration roadmap development",
      },
      {
        title: "Cloud Setup",
        duration: "10 weeks",
        description: "Building HIPAA-compliant AWS infrastructure and security",
      },
      {
        title: "Migration",
        duration: "12 weeks",
        description: "Phased data migration with zero downtime approach",
      },
      {
        title: "Optimization",
        duration: "4 weeks",
        description: "Performance tuning and staff training on new systems",
      },
    ],
    images: [
      "/assets/images/case_image01.png",
      "/assets/images/case_image02.png",
      "/assets/images/case_image03.png",
      "/assets/images/case_image04.png",
    ],
    testimonial: {
      quotes: [
        "The cloud migration was transformative. We achieved 99.99% uptime, reduced IT costs by 60%, and gained the flexibility to scale our services as needed. Patient care has improved dramatically with zero system downtime.",
      ],
      author: "Dr. Emily Rodriguez",
      role: "CIO of HealthTrack Medical",
    },
    results: [
      "99.99% uptime ensuring reliable patient care services",
      "60% reduction in IT infrastructure costs",
      "5x faster deployment of new healthcare features",
      "100% HIPAA compliant with advanced security measures",
    ],
    prevCaseStudy: {
      title: "Professional Portfolio for Daniel Avila",
      link: "/case-study/daniel-avila",
    },
    nextCaseStudy: {
      title: "Professional Portfolio for Daniel Avila",
      link: "/case-study/daniel-avila",
    },
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <CaseStudyLayout {...caseData} prevCaseStudy={caseData.prevCaseStudy} />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default HealthTrackCaseStudy;
