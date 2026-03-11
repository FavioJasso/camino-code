"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import { UtensilsCrossed, Truck, Leaf, Clock } from "lucide-react";

const PrepifyCaseStudy = () => {
  const caseData = {
    client: "Prepify",
    industry: "Meal Prep / Food Tech",
    duration: "Ongoing",
    team: "Product & Engineering",
    title: "Prepify",
    subtitle:
      "Fresh prepared meals near NJIT. Low-cost, convenient meal prep service with local pickup—nutritious options designed for students and busy professionals.",
    heroImage: "/assets/images/case_studies/prepify_work.webp",
    ctaLabel: "Visit Prepify",
    ctaLink: "https://www.prepify.us",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "Fresh",
        label: "Freshly made daily, ready for pickup",
        icon: <UtensilsCrossed className="h-6 w-6" />,
      },
      {
        value: "Local",
        label: "Pickup only near NJIT campus",
        icon: <Truck className="h-6 w-6" />,
      },
      {
        value: "Balanced",
        label: "Meals designed for wellness",
        icon: <Leaf className="h-6 w-6" />,
      },
      {
        value: "Simple",
        label: "Order ahead, no hassle",
        icon: <Clock className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro:
        "Students and busy professionals need convenient, affordable meals without sacrificing nutrition. Key challenges included:",
      items: [
        "Offering low-cost options without compromising quality",
        "Streamlining order and pickup flow for campus-area users",
        "Providing balanced nutrition in prepared formats",
        "Keeping operations contactless and efficient",
      ],
    },
    challengeVisual: {
      emoji: "🥗",
      title: "Convenience & Nutrition",
      description:
        "A meal prep service that fits campus life and busy schedules.",
    },
    solutions: {
      intro:
        "We focused on a clear ordering experience, local pickup workflow, and a weekly menu that balances variety with operational simplicity.",
      items: [
        "Simple menu and ordering flow for weekly selection",
        "Local pickup–only model to keep costs down",
        "Contactless pickup and clear communication",
        "Freshly made daily options with balanced nutrition",
      ],
    },
    solutionVisual: {
      emoji: "📦",
      title: "Product & Operations",
      description:
        "A product designed for repeat orders and predictable pickup.",
    },
    phases: [
      {
        title: "Discovery & Scoping",
        duration: "Ongoing",
        description:
          "Understanding user needs around campus, schedule, and nutrition preferences.",
      },
      {
        title: "UX & Order Flow",
        duration: "Iterative",
        description:
          "Designing an intuitive menu and checkout experience for recurring use.",
      },
      {
        title: "Implementation",
        duration: "Continuous",
        description:
          "Building and maintaining the site and order flow with a focus on reliability.",
      },
      {
        title: "Stabilization & Refinement",
        duration: "Continuous",
        description:
          "Improving based on feedback and operational needs.",
      },
    ],
    images: [],
    results: [
      "A clear, easy-to-use ordering experience for students and professionals",
      "Local pickup–only model that supports low-cost, fresh meals",
      "Weekly menu and contactless pickup aligned with campus life",
      "A foundation to grow the offering and user base",
    ],
    prevCaseStudy: {
      title: "NJIT Student Life Connect",
      link: "/case-study/student-life",
    },
    nextCaseStudy: {
      title: "ReMatter",
      link: "/case-study/rematter-us",
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

export default PrepifyCaseStudy;
