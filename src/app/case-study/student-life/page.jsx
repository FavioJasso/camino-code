"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import { Users, Calendar, GraduationCap, Building2 } from "lucide-react";

const StudentLifeCaseStudy = () => {
  const caseData = {
    client: "NJIT Student Life",
    industry: "Higher Ed / Campus Platform",
    duration: "Ongoing",
    team: "Product & Engineering",
    title: "NJIT Student Life Connect",
    subtitle:
      "One-stop platform for everything NJIT: find friends, join clubs, stay updated on athletics, events, and campus resources.",
    heroImage: "/assets/images/case_studies/studentlife_work.webp",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "Social",
        label: "Find friends & clubs",
        icon: <Users className="h-6 w-6" />,
      },
      {
        value: "Events",
        label: "Campus events & athletics",
        icon: <Calendar className="h-6 w-6" />,
      },
      {
        value: "Academics",
        label: "Office hours, research, resources",
        icon: <GraduationCap className="h-6 w-6" />,
      },
      {
        value: "Campus",
        label: "Building hours, volunteer, feedback",
        icon: <Building2 className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro:
        "Students need a single place to connect with campus life—clubs, events, athletics, and resources. Key challenges included:",
      items: [
        "Unifying social, academic, and campus info in one experience",
        "Helping students find clubs and friends by interests",
        "Surfacing events, games, and building hours clearly",
        "Supporting career opportunities and feedback channels",
      ],
    },
    challengeVisual: {
      emoji: "🏫",
      title: "Build Your NJIT Community",
      description:
        "A platform that connects Highlanders to everything campus has to offer.",
    },
    solutions: {
      intro:
        "We focused on a modular, easy-to-navigate experience with personalized club recommendations and clear access to events and resources.",
      items: [
        "Find a Friend and club discovery based on interests",
        "Today's events, athletics, and intramurals in one view",
        "Academic resources: office hours, research, study support",
        "Campus resources: building hours, volunteer, feedback",
      ],
    },
    solutionVisual: {
      emoji: "🔗",
      title: "One-Stop Campus Hub",
      description:
        "A centralized place for social, academic, and campus life.",
    },
    phases: [
      {
        title: "Discovery & Scoping",
        duration: "Ongoing",
        description:
          "Mapping student and campus needs across social, academic, and administrative use cases.",
      },
      {
        title: "UX & Information Architecture",
        duration: "Iterative",
        description:
          "Designing navigation and flows that make many resource types easy to find and use.",
      },
      {
        title: "Implementation",
        duration: "Continuous",
        description:
          "Building the platform with a focus on reliability and maintainability.",
      },
      {
        title: "Stabilization & Growth",
        duration: "Continuous",
        description:
          "Iterating on feedback and expanding features and content.",
      },
    ],
    images: [],
    results: [
      "A single platform for NJIT social, events, athletics, and resources",
      "Personalized club and friend discovery for students",
      "Clear access to events, building hours, and academic support",
      "A foundation to grow with campus needs",
    ],
    prevCaseStudy: {
      title: "AnatomyQuest",
      link: "/case-study/anatomy-quest",
    },
    nextCaseStudy: {
      title: "Prepify",
      link: "/case-study/prepify",
    },
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
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

export default StudentLifeCaseStudy;
