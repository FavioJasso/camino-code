"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import {
  Award,
  Zap,
  Smartphone,
  TrendingUp,
} from "lucide-react";

const DanielAvilaCaseStudy = () => {
  const caseData = {
    client: "Daniel Avila",
    industry: "Personal Portfolio",
    duration: "1 month",
    team: "2 members",
    title: "Professional Portfolio Design & Development",
    subtitle:
      "How we built a clean, modern, and user-focused portfolio website that reflects expertise, clarity, and trust.",
    ctaLabel: "Visit Daniel's Portfolio",
    ctaLink: "https://www.danielavila.tech",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "100%",
        label: "Custom-Built Design",
        icon: <Award className="h-6 w-6" />,
      },
      {
        value: "3x",
        label: "Faster Page Load Speed",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "Mobile-Optimized",
        icon: <Smartphone className="h-6 w-6" />,
      },
      {
        value: "SEO",
        label: "Ready & Optimized",
        icon: <TrendingUp className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro: "Daniel needed a professional online space to showcase his IT support expertise, certifications, and career journey. His main challenges were:",
      items: [
        "No existing portfolio website to represent his professional profile",
        "Need for clear, structured presentation of skills and certifications",
        "Desire for a professional yet approachable visual identity",
        "Requirement for responsive, modern design that reflects reliability",
      ],
    },
    challengeVisual: {
      emoji: "💼",
      title: "Professional Portfolio",
      description: "A comprehensive digital showcase designed to highlight expertise, certifications, and professional achievements.",
    },
    solutions: {
      intro: "Camino Code created a custom personal portfolio website built from the ground up with a focus on easy usage and professional branding.",
      items: [
        "Clean, minimal design with structured content arrangement",
        "Color palette reinforcing trust and reliability (#3970EB, #212020, #FFFFFF, #F6F6F6)",
        "Typography (Monda + Quicksand) for a modern, tech-inspired tone",
        "Rounded shapes, soft shadows, and gradient backgrounds for approachability",
        "Clear sections: Hero, About, Experience, Certifications, Projects, Contact",
      ],
    },
    solutionVisual: {
      emoji: "🎨",
      title: "Modern Design",
      description: "Clean, minimal aesthetics with intuitive navigation and contemporary visual elements that engage users.",
    },
    phases: [
      {
        title: "Discovery & Planning",
        duration: "1 week",
        description:
          "Client consultation on branding, goals, and objectives. Market research on IT professional portfolios.",
      },
      {
        title: "Design (UI/UX)",
        duration: "1 week",
        description: "Wireframes and mockups in Figma. Responsive layouts for desktop and mobile.",
      },
      {
        title: "Development",
        duration: "1 week",
        description: "Built with NextJS, HTML, CSS and JavaScript/TypeScript. Integrated content, animations, and responsive features.",
      },
      {
        title: "Testing & Deployment",
        duration: "1 week",
        description: "Browser and device compatibility checks. Load speed and performance testing. Live launch with hosting, DNS, and SSL setup.",
      },
    ],
    images: [
      "/assets/images/case_studies/danielavila_gallery01.webp",
      "/assets/images/case_studies/danielavila_gallery02.webp",
      "/assets/images/case_studies/danielavila_gallery03.webp",
      "/assets/images/case_studies/danielavila_gallery04.webp",
    ],
    testimonial: {
      quotes: [
        "Collaborating with Camino Code in creating my professional website, danielavila.tech, was a phenomenal experience. From start to finish, the process was fast and remarkably convenient owing to their exceptional staff. My designer was speedy in replying and exceedingly thorough in his attentiveness, always working to explain in a clear manner and ensure that my thoughts and likes were understood to the fullest.",
        "What impressed me most was how collaborative the process was. They always checked with me before they'd do any part of the site to get my approval and make sure I was fine with each choice they made in design. I had quite a few choices visually to select from, and what they wrote and proposed really helped to frame the overall concept in a professional and personal sort of manner.",
        "I really appreciated how friendly and easy to work with Camino Code was, they struck that perfect balance of technical expertise and approachability. Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me. I'd recommend them in a heartbeat to anyone looking for a web team that truly listens, communicates, and delivers excellent work quickly.",
      ],
      author: "Daniel Avila",
      role: "IT Support Professional",
    },
    results: [
      "Clear, structured showcase of skills, certifications, and experience",
      "Professional branding aligned with IT support role",
      "Mobile-friendly, fast-loading, and SEO-ready portfolio",
      "Positive feedback on ease of use and professional look",
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
        <NavigationBar />
        <CaseStudyLayout {...caseData} prevCaseStudy={caseData.prevCaseStudy} />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default DanielAvilaCaseStudy;
