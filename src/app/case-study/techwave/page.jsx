"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import {
  TrendingUp,
  Users,
  Clock,
  Award,
} from "lucide-react";

const TechWaveCaseStudy = () => {
  const caseData = {
    client: "TechWave Solutions",
    industry: "Technology",
    duration: "6 months",
    team: "8 members",
    title: "Data-Driven Transformation",
    subtitle:
      "How we increased customer retention by 30% through predictive analytics",
    heroImage: "/assets/images/services_work01.webp",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "30%",
        label: "Retention Increase",
        icon: <TrendingUp className="h-6 w-6" />,
      },
      {
        value: "150%",
        label: "ROI Growth",
        icon: <Award className="h-6 w-6" />,
      },
      {
        value: "2.5M",
        label: "Data Points Analyzed",
        icon: <Users className="h-6 w-6" />,
      },
      {
        value: "45%",
        label: "Time Saved",
        icon: <Clock className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro: "TechWave faced significant challenges with declining customer retention rates and fragmented data systems. Their inability to predict customer behavior led to missed opportunities and decreased satisfaction.",
      items: [
        "30% decline in customer retention over 12 months",
        "Fragmented data across multiple systems",
        "No predictive analytics capabilities",
        "Manual processes causing delays in insights",
      ],
    },
    challengeVisual: {
      emoji: "📊",
      title: "Data Analytics",
      description: "Comprehensive analytics system to understand customer behavior and improve retention.",
    },
    solutions: {
      intro: "We developed a comprehensive data strategy leveraging advanced machine learning algorithms and real-time analytics to transform TechWave's customer engagement approach.",
      items: [
        "Predictive analytics engine with 95% accuracy",
        "Real-time data processing pipeline",
        "Automated customer segmentation",
        "Personalized recommendation system",
      ],
    },
    solutionVisual: {
      emoji: "🤖",
      title: "ML Predictions",
      description: "Advanced machine learning models to predict customer behavior and optimize engagement.",
    },
    phases: [
      {
        title: "Discovery & Analysis",
        duration: "4 weeks",
        description:
          "Comprehensive audit of existing systems and data architecture",
      },
      {
        title: "Development",
        duration: "12 weeks",
        description: "Building the predictive analytics engine and data pipeline",
      },
      {
        title: "Integration",
        duration: "6 weeks",
        description: "Seamless integration with existing systems and workflows",
      },
      {
        title: "Optimization",
        duration: "4 weeks",
        description: "Fine-tuning models and performance optimization",
      },
    ],
    images: [
      "/assets/images/case_image01.webp",
      "/assets/images/case_image02.webp",
      "/assets/images/case_image03.webp",
      "/assets/images/case_image04.webp",
    ],
    testimonial: {
      quotes: [
        "Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making. The 30% increase in retention exceeded our expectations.",
      ],
      author: "Alex Johnson",
      role: "CEO of TechWave Solutions",
    },
    results: [
      "30% increase in customer retention within 6 months",
      "150% ROI growth through predictive analytics",
      "2.5M data points analyzed daily for actionable insights",
      "45% reduction in time spent on manual data processes",
    ],
    nextCaseStudy: {
      title: "Victoria's Painting",
      link: "/case-study/victorias-painting",
    },
    prevCaseStudy: {
      title: "Daniel Avila Portfolio",
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

export default TechWaveCaseStudy;
