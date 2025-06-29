// components/ServicesDetails.jsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Laptop,
  Cpu,
  ClipboardList,
  CloudUpload,
  LineChart,
  Brain,
  Cloud,
  Paintbrush,
  Globe,
  Smartphone,
  SearchCheck,
  FilePlus,
  PanelTop,
  BarChart2,
  Headphones,
} from "lucide-react";

// Register GSAP plugin only on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesDetails() {
  const sectionRefs = useRef([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const sections = sectionRefs.current.filter(Boolean);

    sections.forEach((section) => {
      const content = section.querySelector(".scroll-content");
      const sticky = section.querySelector(".sticky-content");

      gsap.from(content, {
        y: 100,
        opacity: 0,
        duration: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(sticky, {
        x: -100,
        opacity: 0,
        duration: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, [isMounted]);

  // Helper to add refs only once
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Common classes for card containers
  const cardBase =
    "transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 rounded-xl p-10";

  return (
    <div className="flex flex-col items-center container mx-auto text-center text-white">
      {/* Data Science Section */}
      <section
        ref={addToRefs}
        id="data-science"
        className="relative flex flex-col w-full bg-gradient-to-b from-neutral-800 to-black md:min-h-screen md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:min-h-screen md:flex-row">
          {/* Sticky left content */}
          <div className="sticky-content w-full md:sticky md:top-0 md:h-screen md:w-1/2 md:p-12 md:pt-24 flex flex-col gap-8 text-left">
            <span className="inline-block h-32 w-32 text-orange-400">
              <Layers className="h-full w-full" />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Data Science
            </h2>
            <p>Data, Insights, Infrastructure & AI</p>
            <Link
              href="/contact"
              className="btn mt-6 inline-block rounded-full border-2 border-orange-400 px-8 py-3 text-sm uppercase transition-all duration-300 hover:bg-orange-400 hover:text-black md:px-10 md:py-4 md:text-base"
            >
              Let's Talk
            </Link>
          </div>

          {/* Scrollable right content */}
          <div className="scroll-content flex flex-col gap-6 w-full text-left md:w-1/2 md:p-12 md:pt-24">
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <ClipboardList className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Data Strategy and Consulting
              </h3>
              <p className="text-sm md:text-lg">
                We look at your business problems, make your data systems better, and plan how to gather and use your data effectively. We make sure your data is safe and follows the rules. We also set up ways to measure success and manage your data. This helps you make smart decisions based on data and grow your business over time.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <CloudUpload className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Data Engineering
              </h3>
              <p className="text-sm md:text-lg">
                We build systems to collect, store, and manage data efficiently using cloud technology.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <LineChart className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Data Analysis & Visualization
              </h3>
              <p className="text-sm md:text-lg">
                We uncover insights through data analysis and present them in easy-to-understand reports and charts.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Brain className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Machine Learning and AI
              </h3>
              <p className="text-sm md:text-lg">
                We create AI solutions for automation, predictive analytics, fraud detection, and more.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Cloud className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Specific Industry Solutions
              </h3>
              <p className="text-sm md:text-lg">
                We offer AI-driven solutions for healthcare, finance, retail, manufacturing, and other industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Development Section */}
      <section
        ref={addToRefs}
        id="software-development"
        className="relative flex flex-col w-full bg-neutral-100 text-black md:min-h-screen md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:min-h-screen md:flex-row">
          <div className="sticky-content w-full md:sticky md:top-0 md:h-screen md:w-1/2 md:p-12 md:pt-24 flex flex-col gap-8 text-left">
            <span className="inline-block h-32 w-32 text-orange-400">
              <Laptop className="h-full w-full" />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Software Development
            </h2>
            <p className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Data, Insights, Infrastructure & AI
            </p>
            <Link
              href="/contact"
              className="btn mt-6 inline-block rounded-full border-2 border-orange-400 px-8 py-3 text-sm uppercase transition-all duration-300 hover:bg-orange-400 hover:text-black md:px-10 md:py-4 md:text-base"
            >
              Let's Talk
            </Link>
          </div>

          <div className="scroll-content flex flex-col gap-6 w-full text-left md:w-1/2 md:p-12 md:pt-24">
            <div className={`${cardBase} bg-neutral-200`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Laptop className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Software Strategy & Solutions
              </h3>
              <p className="text-sm md:text-lg">
                We plan and design scalable software solutions tailored to your business needs.
              </p>
            </div>
            <div className={`${cardBase} bg-neutral-200`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Paintbrush className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                UI/UX Design
              </h3>
              <p className="text-sm md:text-lg">
                We create intuitive and visually appealing designs to enhance user experience.
              </p>
            </div>
            <div className={`${cardBase} bg-neutral-200`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Globe className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Website Development
              </h3>
              <p className="text-sm md:text-lg">
                We build fast, secure, and SEO-friendly websites to strengthen your online presence.
              </p>
            </div>
            <div className={`${cardBase} bg-neutral-200`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Smartphone className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Mobile Development
              </h3>
              <p className="text-sm md:text-lg">
                We develop cross-platform mobile apps using modern technologies like React Native and Flutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit and SME Solutions */}
      <section
        ref={addToRefs}
        id="audit"
        className="relative flex flex-col w-full bg-gradient-to-b from-neutral-800 to-black md:min-h-screen md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:min-h-screen md:flex-row">
          <div className="sticky-content w-full md:sticky md:top-0 md:h-screen md:w-1/2 md:p-12 md:pt-24 flex flex-col gap-8 text-left">
            <span className="inline-block h-32 w-32 text-orange-400">
              <Cpu className="h-full w-full" />
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Audit and Refined SME Solutions
            </h2>
            <p>Data, Insights, Infrastructure & AI</p>
            <Link
              href="/contact"
              className="btn mt-6 inline-block rounded-full border-2 border-orange-400 px-8 py-3 text-sm uppercase transition-all duration-300 hover:bg-orange-400 hover:text-black md:px-10 md:py-4 md:text-base"
            >
              Let's Talk
            </Link>
          </div>

          <div className="scroll-content flex flex-col gap-6 w-full text-left md:w-1/2 md:p-12 md:pt-24">
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <SearchCheck className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Analyze Existing Solutions
              </h3>
              <p className="text-sm md:text-lg">
                We evaluate your business solutions to identify areas for improvement.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <FilePlus className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Improve Business Processes
              </h3>
              <p className="text-sm md:text-lg">
                We optimize workflows to enhance efficiency and reduce costs.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <PanelTop className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Customize for SME Needs
              </h3>
              <p className="text-sm md:text-lg">
                We develop solutions tailored to the unique challenges of small and medium-sized businesses.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <BarChart2 className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Ensure Smooth Integration
              </h3>
              <p className="text-sm md:text-lg">
                We integrate new solutions seamlessly into your existing systems with minimal disruptions.
              </p>
            </div>
            <div className={`${cardBase} bg-black`}>
              <span className="inline-block h-9 w-9 text-orange-400">
                <Headphones className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold md:text-2xl">
                Ongoing Support and Updates
              </h3>
              <p className="text-sm md:text-lg">
                We provide continuous support to keep your solutions running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
