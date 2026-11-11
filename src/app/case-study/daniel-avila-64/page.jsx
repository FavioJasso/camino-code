"use client";

/**
 * Case study: DANIEL AVILA 64 (the 2026 3D hub-world rebuild of danielavila.tech).
 * Same structure as src/app/case-study/daniel-avila/page.jsx; rendered by CaseStudyLayout.
 *
 * Before publishing, replace the two values marked TODO (duration, team).
 * Every other figure comes from the project's production build and test runs.
 */

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import CaseStudyLayout from "@/components/common/CaseStudyLayout";
import { Gamepad2, Zap, Smartphone, Sparkles } from "lucide-react";

const DanielAvila64CaseStudy = () => {
  const caseData = {
    client: "Daniel Avila",
    industry: "Personal Portfolio · Interactive 3D",
    duration: "TODO", // TODO: e.g. "2 weeks"
    team: "TODO", // TODO: e.g. "2 members"
    title: "DANIEL AVILA 64: A Playable 3D Portfolio",
    subtitle:
      "How we turned an IT professional’s portfolio into an N64-era castle you can explore, without making recruiters play to read it.",
    ctaLabel: "Play Daniel's Portfolio",
    ctaLink: "https://www.danielavila.tech",
    colorScheme: {
      primary: "255, 201, 60",
      gradient: "from-yellow-400 to-blue-700",
      gradientReverse: "from-blue-700 to-yellow-400",
    },
    stats: [
      {
        value: "158 kB",
        label: "First-Load JavaScript",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "0",
        label: "Model, Texture or Audio Files",
        icon: <Sparkles className="h-6 w-6" />,
      },
      {
        value: "4",
        label: "Control Schemes, All Live",
        icon: <Gamepad2 className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "Touch & Plain-HTML Ready",
        icon: <Smartphone className="h-6 w-6" />,
      },
    ],
    challenges: {
      intro:
        "Daniel came back to us with a bold blueprint: rebuild his portfolio as a castle hub world inspired by 1996-era 3D platformers. The challenges were:",
      items: [
        "Make a real 3D world fun to explore while keeping every section one click away for recruiters",
        "Run smoothly on phones and keep the download small, with no heavy models or audio files",
        "Keep all content readable by search engines, résumé parsers and screen readers",
        "Capture the feel of the era with 100% original characters, art, music and sound",
      ],
    },
    challengeVisual: {
      emoji: "🏰",
      title: "A Castle Full of Résumé",
      description:
        "An octagonal lobby with five doors; behind each one, a painting that opens a section of Daniel’s career.",
    },
    solutions: {
      intro:
        "Camino Code rebuilt danielavila.tech from scratch as a hybrid: a low-poly 3D hub world layered over a complete, server-rendered HTML portfolio.",
      items: [
        "Hybrid controls: Prev/Next Door, point-and-click, WASD or touch thumbstick, and a pause menu, all active at once",
        "Five doors and five original pixel-art paintings: The Royal Archive, Deep Rack Caverns, Clockwork Network, Skyward Star Tower and Sunset Courtyard",
        "“Daniel 64”, a 671-triangle custom avatar with idle, run, jump, dive, backflip and victory animations",
        "A retro render pipeline (low internal resolution, 64×64 textures, a GLSL painting-ripple shader) built on three.js and Next.js",
        "Original Web Audio chiptune and sound effects, plus a plain HTML version and automatic fallback when WebGL is unavailable",
      ],
    },
    solutionVisual: {
      emoji: "🎮",
      title: "Play It or Skip It",
      description:
        "Explorers roam the castle and collect stars; recruiters open the pause menu and download the PDF résumé in one click.",
    },
    phases: [
      {
        title: "Research & Blueprint",
        duration: "Step 1",
        description:
          "Reviewed Daniel’s blueprint and studied how leading game-style portfolios are built, kept fast and made accessible.",
      },
      {
        title: "Architecture & Contract",
        duration: "Step 2",
        description:
          "Defined the room layout, controls and content model as one shared contract, then prototyped a whitebox lobby.",
      },
      {
        title: "Build",
        duration: "Step 3",
        description:
          "Built the engine, world, avatar, pixel art, audio, game UI, course overlays and SEO layer in parallel against that contract.",
      },
      {
        title: "Review & Verification",
        duration: "Step 4",
        description:
          "Every module independently reviewed and repaired, then tested end to end in the browser on desktop and mobile.",
      },
    ],
    images: [
      "/assets/images/case_studies/danielavila64_gallery01.webp",
      "/assets/images/case_studies/danielavila64_gallery02.webp",
      "/assets/images/case_studies/danielavila64_gallery03.webp",
      "/assets/images/case_studies/danielavila64_gallery04.webp",
    ],
    // No testimonial yet: add Daniel's words here after launch (the layout hides the block when omitted).
    results: [
      "All of Daniel’s experience, skills, certifications and projects kept and reorganized into five courses",
      "Six collectible stars that reward visitors for seeing every section",
      "A full plain-HTML portfolio for search engines, assistive tech and devices without WebGL",
      "Same Vercel workflow as before: merge to main and it is live",
    ],
    prevCaseStudy: {
      title: "Portfolio Daniel Avila",
      link: "/case-study/daniel-avila",
    },
    nextCaseStudy: {
      title: "Victoria's Painting",
      link: "/case-study/victorias-painting",
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

export default DanielAvila64CaseStudy;
