"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import {
  Home,
  Hammer,
  Droplets,
  Paintbrush,
} from "lucide-react";

const VictoriasPaintingCaseStudy = () => {
  const caseData = {
    client: "Victoria's Painting",
    industry: "Business Website",
    duration: "4 months and 3 weeks",
    team: "6 members",
    title: "Professional Painting Business Website Design & Development",
    subtitle:
      "How we built a clean, modern website that helps homeowners find trusted painting services and connects them with experts.",
    colorScheme: {
      primary: "245, 158, 11",
      gradient: "from-amber-400 to-red-600",
      gradientReverse: "from-red-600 to-amber-400",
    },
    stats: [
      {
        value: "100%",
        label: "Custom-Built Design",
        icon: <Home className="h-6 w-6" />,
      },
      {
        value: "3x",
        label: "Fast Loading Speed",
        icon: <Droplets className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "Mobile-Friendly",
        icon: <Paintbrush className="h-6 w-6" />,
      },
      {
        value: "24/7",
        label: "Easy Contact System",
        icon: <Hammer className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro: "Victoria's Painting needed a professional website to reach more customers and showcase their painting services. Their main challenges were:",
      items: [
        "No online presence to show their work and services",
        "Hard for customers to find them when searching for painters online",
        "Need to show trust and experience with clear information",
        "Make it easy for customers to contact them quickly",
      ],
    },
    challengeVisual: {
      emoji: "🏠",
      title: "Local Business Challenge",
      description: "Building an online presence for a trusted local painting service business.",
    },
    solutions: {
      intro: "Camino Code created a custom business website built from scratch with a focus on customers and easy use, featuring:",
      items: [
        "Clean, simple design that's easy to understand and navigate",
        "Trust-building colors (blue and white) that look professional",
        "Clear sections: Home, About, Services, Contact with integrated Google Maps",
        "Big call-to-action buttons with phone number for quick customer contact",
        "Service icons (house, door, shower, paint roller) that are easy to understand",
        "Statistics display showing 40 years experience, 390+ clients, and 100% satisfaction",
      ],
    },
    solutionVisual: {
      emoji: "🎨",
      title: "Modern Web Presence",
      description: "Professional website designed to build trust and drive customer inquiries.",
    },
    phases: [
      {
        title: "Discovery & Planning",
        duration: "2 weeks",
        description:
          "Met with client to understand business goals. Researched other painting company websites. Created plan for website structure and content.",
      },
      {
        title: "Design (UI/UX)",
        duration: "1 month",
        description: "Created sample designs in Figma. Made layouts that adjust to any screen size. Chose colors and fonts that build trust.",
      },
      {
        title: "Development",
        duration: "3 months",
        description: "Built with React for fast, modern website. Added contact form with EmailJS. Integrated Google Maps for service areas.",
      },
      {
        title: "Testing & Deployment",
        duration: "1 week",
        description: "Tested on different browsers and devices. Checked loading speed and fixed issues. Launched website with hosting and security.",
      },
    ],
    images: [
      "/assets/images/case_studies/victorias_gallery01.webp",
      "/assets/images/case_studies/victorias_gallery02.webp",
      "/assets/images/case_studies/victorias_gallery03.webp",
      "/assets/images/case_studies/victorias_gallery04.webp",
    ],
    testimonial: {
      quotes: [
        "I would like to express my sincere appreciation to Favio Jasso from Camino Code for the outstanding work he did in developing the website for my company, Victoria's Painting.",
        "From the very beginning, Favio demonstrated a high level of professionalism, commitment, and a genuine interest in understanding the essence of my business. His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
        "Throughout the entire process, he provided clear communication, personalized guidance, and creative solutions that perfectly captured the identity and values of Victoria's Painting. Thanks to his work, we now have a strong online presence that conveys trust and professionalism to our clients.",
        "I highly recommend Favio Jasso and the Camino Code team for their dedication, talent, and excellence in every detail of the project.",
      ],
      author: "Juan Porras",
      role: "Founder of Victoria's Painting",
    },
    results: [
      "Professional online presence that builds trust with customers",
      "Services are easy to find and understand with clear descriptions",
      "Quick and simple contact options available 24/7",
      "Mobile-friendly design that works perfectly on all devices",
      "Fast loading speed for better user experience",
      "SEO-ready to help customers find them in local search results",
      "Increased customer inquiries and bookings through website",
    ],
    nextCaseStudy: {
      title: "Daniel Avila Portfolio",
      link: "/case-study/daniel-avila",
    },
    prevCaseStudy: {
      title: "Transparent Energy",
      link: "/case-study/transparent-energy",
    },
    websiteUrl: "https://www.victoriaspainting.com",
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <CaseStudyLayout {...caseData} websiteUrl={caseData.websiteUrl} ctaLink={caseData.websiteUrl} prevCaseStudy={caseData.prevCaseStudy} />
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

export default VictoriasPaintingCaseStudy;

