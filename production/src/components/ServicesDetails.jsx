// components/ServicesDetails.tsx
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

// Register GSAP plugins
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

    // Refresh ScrollTrigger after a short delay
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [isMounted]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center text-center text-white">
      {/* Data Science Section */}
      <section
        ref={addToRefs}
        id="data-science"
        className="relative flex w-full flex-col bg-[radial-gradient(111.43%_111.43%_at_50%_50%,#222222_0%,#000000_100%)] md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:flex-row">
          <div className="sticky-content w-full gap-8 p-6 text-left md:sticky md:top-0 md:w-1/2 md:p-12 md:pt-24">
            <span className="inline-block h-[136px] w-[136px] text-orange-400">
              <Layers className="h-full w-full" />
            </span>
            <h2 className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
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

          <div className="scroll-content flex w-full flex-col gap-6 p-6 text-left md:w-1/2 md:p-12 md:pt-24 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div]:rounded-xl [&>div]:bg-black [&>div]:p-10">
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <ClipboardList className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Data Strategy and Consulting
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We look at your business problems, make your data systems
                better, and plan how to gather and use your data effectively. We
                make sure your data is safe and follows the rules. We also set
                up ways to measure success and manage your data. This helps you
                make smart decisions based on data and grow your business over
                time.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <CloudUpload className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Data Engineering
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We build systems to collect, store, and manage data efficiently
                using cloud technology.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <LineChart className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Data Analysis & Visualization
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We uncover insights through data analysis and present them in
                easy-to-understand reports and charts.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Brain className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Machine Learning and AI
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We create AI solutions for automation, predictive analytics,
                fraud detection, and more.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Cloud className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Specific Industry Solutions
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We offer AI-driven solutions for healthcare, finance, retail,
                manufacturing, and other industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Development Section */}
      <section
        ref={addToRefs}
        id="software-development"
        className="relative flex w-full flex-col bg-[rgba(248,244,239,1)] text-black md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:flex-row">
          <div className="sticky-content w-full gap-8 p-6 text-left md:sticky md:top-0 md:w-1/2 md:p-12 md:pt-24">
            <span className="inline-block h-[136px] w-[136px] text-orange-400">
              <Laptop className="h-full w-full" />
            </span>
            <h2 className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Software Development
            </h2>
            <p className="block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Data, Insights, Infrastructure & AI
            </p>
            <Link
              href="/contact"
              className="btn mt-6 inline-block rounded-full border-2 border-orange-400 px-8 py-3 text-sm uppercase transition-all duration-300 hover:bg-orange-400 hover:text-black md:px-10 md:py-4 md:text-base"
            >
              Let's Talk
            </Link>
          </div>

          <div className="scroll-content flex w-full flex-col gap-6 p-6 text-left md:w-1/2 md:p-12 md:pt-24 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div]:rounded-xl [&>div]:bg-[rgba(236,234,232,1)] [&>div]:p-10">
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Laptop className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Software Strategy & Solutions
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We plan and design scalable software solutions tailored to your
                business needs.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Paintbrush className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                UI/UX Design
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We create intuitive and visually appealing designs to enhance
                user experience.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Globe className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Website Development
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We build fast, secure, and SEO-friendly websites to strengthen
                your online presence.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Smartphone className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Mobile Development
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We develop cross-platform mobile apps using modern technologies
                like React Native and Flutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit and SME Solutions */}
      <section
        ref={addToRefs}
        id="audit"
        className="relative flex w-full flex-col bg-[radial-gradient(111.43%_111.43%_at_50%_50%,#222222_0%,#000000_100%)] md:flex-row"
      >
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col md:flex-row">
          <div className="sticky-content w-full gap-8 p-6 text-left md:sticky md:top-0 md:w-1/2 md:p-12 md:pt-24">
            <span className="inline-block h-[136px] w-[136px] text-orange-400">
              <Cpu className="h-full w-full" />
            </span>
            <h2 className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
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

          <div className="scroll-content flex w-full flex-col gap-6 p-6 text-left md:w-1/2 md:p-12 md:pt-24 [&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div]:rounded-xl [&>div]:bg-black [&>div]:p-10">
            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <SearchCheck className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Analyze Existing Solutions
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We evaluate your business solutions to identify areas for
                improvement.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <FilePlus className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Improve Business Processes
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We optimize workflows to enhance efficiency and reduce costs.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <PanelTop className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Customize for SME Needs
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We develop solutions tailored to the unique challenges of small
                and medium-sized businesses.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <BarChart2 className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Ensure Smooth Integration
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We integrate new solutions seamlessly into your existing systems
                with minimal disruptions.
              </p>
            </div>

            <div className="transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-block h-9 w-9 text-orange-400">
                <Headphones className="h-full w-full" />
              </span>
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Ongoing Support and Updates
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                We provide continuous support to keep your solutions running
                smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
