"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import { BookOpen, Layers, Users, Share2 } from "lucide-react";

const AnatomyQuestCaseStudy = () => {
  const caseData = {
    client: "AnatomyQuest",
    industry: "Education / EdTech",
    duration: "Ongoing",
    team: "Product & Community",
    title: "AnatomyQuest",
    subtitle:
      "Free, interactive anatomy resource that helps you understand why each structure exists—so you remember it for life. Community-driven and open source.",
    heroImage: "/assets/images/case_studies/anatomyquest_work.webp",
    ctaLabel: "Visit AnatomyQuest",
    ctaLink: "https://www.anatomyquest.org",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "100+",
        label: "Labeled landmarks",
        icon: <BookOpen className="h-6 w-6" />,
      },
      {
        value: "10+",
        label: "Anatomical views",
        icon: <Layers className="h-6 w-6" />,
      },
      {
        value: "Free",
        label: "Open source (CC BY-SA)",
        icon: <Share2 className="h-6 w-6" />,
      },
      {
        value: "Community",
        label: "Anyone can contribute",
        icon: <Users className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro:
        "Anatomy students often memorize structures without understanding context. Key challenges included:",
      items: [
        "Making anatomy understandable, not just memorable",
        "Providing interactive diagrams with hide/show labels",
        "Structuring content (location, shape, neighbors, landmarks, blood supply)",
        "Keeping the resource free and open for education",
      ],
    },
    challengeVisual: {
      emoji: "🦴",
      title: "Understand, Not Just Memorize",
      description:
        "An interactive anatomy resource built for long-term understanding.",
    },
    solutions: {
      intro:
        "We focused on a five-step learning method, interactive diagrams, and a community-driven model so the resource can grow and stay up to date.",
      items: [
        "Interactive diagrams with labeled landmarks and hover definitions",
        "Structured learning steps: location, shape, neighbors, landmarks, blood supply",
        "Multiple views and clear spatial context for each structure",
        "Open source, CC BY-SA licensed, with contribution workflows",
      ],
    },
    solutionVisual: {
      emoji: "📚",
      title: "Education That Gives Back",
      description:
        "A free resource built with and for students and educators.",
    },
    phases: [
      {
        title: "Discovery & Content Design",
        duration: "Ongoing",
        description:
          "Defining the learning model and diagram structure with educators and students.",
      },
      {
        title: "UX & Interactivity",
        duration: "Iterative",
        description:
          "Designing interactive diagrams and navigation that support the five-step method.",
      },
      {
        title: "Implementation",
        duration: "Continuous",
        description:
          "Building the site, diagram interactions, and contribution flows.",
      },
      {
        title: "Community & Content",
        duration: "Continuous",
        description:
          "Onboarding contributors and expanding content coverage.",
      },
    ],
    images: [],
    results: [
      "Interactive anatomy pages that support understanding, not just recall",
      "A consistent five-step method applied across content",
      "Free, open source resource available to all students",
      "A community-driven model for ongoing improvement",
    ],
    prevCaseStudy: {
      title: "ReMatter",
      link: "/case-study/rematter-us",
    },
    nextCaseStudy: {
      title: "NJIT Student Life Connect",
      link: "/case-study/student-life",
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

export default AnatomyQuestCaseStudy;
