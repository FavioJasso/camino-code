"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import {
  Laptop,
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
  Database,
  Shield,
  Code,
} from "lucide-react";

const servicesSections = [
  {
    id: "applied-ai",
    title: "Applied AI Systems",
    subtitle: "Transform Workflows with Intelligent Automation",
    icon: <Brain className="h-full w-full" />,
    gradient: "from-blue-400 to-purple-600",
    services: [
      {
        icon: <ClipboardList className="h-full w-full" />,
        title: "AI Strategy & Consulting",
        description: "We design tailored AI strategies that align with your business goals, ensuring security, compliance, and measurable ROI.",
      },
      {
        icon: <LineChart className="h-full w-full" />,
        title: "Natural Language Processing",
        description: "From chatbots to document analysis, we build NLP systems that understand and respond intelligently.",
      },
      {
        icon: <SearchCheck className="h-full w-full" />,
        title: "Computer Vision & Recognition",
        description: "Intelligent recognition systems for images, video, and real-time monitoring.",
      },
      {
        icon: <Paintbrush className="h-full w-full" />,
        title: "Generative AI Integrations",
        description: "Harness the power of text, code, and visual AI to accelerate creativity and productivity.",
      },
      {
        icon: <BarChart2 className="h-full w-full" />,
        title: "Predictive Systems",
        description: "Forecast demand, detect anomalies, and enable predictive maintenance with custom AI models.",
      },
    ],
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence & Engineering",
    subtitle: "Turn Raw Data into Scalable Intelligence",
    icon: <Database className="h-full w-full" />,
    gradient: "from-amber-400 to-red-600",
    services: [
      {
        icon: <ClipboardList className="h-full w-full" />,
        title: "Data Strategy & Architecture",
        description: "Build secure, compliant, and scalable data ecosystems with clear KPIs that drive growth.",
      },
      {
        icon: <CloudUpload className="h-full w-full" />,
        title: "Data Engineering",
        description: "Design robust pipelines (ETL/ELT, APIs, automation) to collect, process, and store massive datasets.",
      },
      {
        icon: <BarChart2 className="h-full w-full" />,
        title: "Analytics & Visualization",
        description: "Transform complexity into clarity with interactive dashboards and advanced analytics.",
      },
      {
        icon: <Brain className="h-full w-full" />,
        title: "Machine Learning & Predictive Analytics",
        description: "Deploy models that automate decision-making and uncover hidden opportunities.",
      },
      {
        icon: <Cloud className="h-full w-full" />,
        title: "Industry-Specific Solutions",
        description: "Tailored data-driven systems for healthcare, finance, retail, manufacturing, and beyond.",
      },
    ],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    subtitle: "Build Digital Products That Scale",
    icon: <Code className="h-full w-full" />,
    gradient: "from-green-400 to-teal-600",
    services: [
      {
        icon: <Laptop className="h-full w-full" />,
        title: "Software Strategy & Solutions",
        description: "Architect scalable platforms that adapt to evolving business needs.",
      },
      {
        icon: <Paintbrush className="h-full w-full" />,
        title: "UI/UX Design",
        description: "Create intuitive, research-driven interfaces that delight users and boost engagement.",
      },
      {
        icon: <Globe className="h-full w-full" />,
        title: "Web & Mobile Development",
        description: "Build secure, SEO-optimized websites and cross-platform apps with React Native and Flutter.",
      },
      {
        icon: <PanelTop className="h-full w-full" />,
        title: "AI-Integrated Platforms",
        description: "From dashboards to internal tools, we embed AI into products for smarter performance.",
      },
      {
        icon: <Shield className="h-full w-full" />,
        title: "Performance & Reliability Engineering",
        description: "Ensure seamless scalability, speed, and reliability across all digital products.",
      },
    ],
  },
];

export default function ServicesDetails() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.service-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {servicesSections.map((section, sectionIndex) => (
        <ServiceSection
          key={section.id}
          section={section}
          index={sectionIndex}
          isActive={activeSection === sectionIndex}
        />
      ))}
    </div>
  );
}

const ServiceSection = ({ section, index, isActive }) => {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0.9, 1, 0.9] : [0.8, 1, 0.8]);

  // Alternate backgrounds and text colors
  const isEven = index % 2 === 0;
  const bgClass = isEven ? "bg-black" : "bg-white";
  // Use complementary text colors for each background
  const textClass = isEven ? "text-white" : "text-gray-900";
  const subtitleClass = isEven ? "text-white/70" : "text-gray-700";
  const cardTextClass = isEven ? "text-white" : "text-gray-900";
  const cardDescClass = isEven ? "text-white/70" : "text-gray-700";

  // Only first section gets min-h-screen, others get min-h-0
  const minHeightClass = index === 0 ? "min-h-screen" : "min-h-0";

  return (
    <motion.section
      ref={sectionRef}
      id={section.id}
      className={`service-section relative ${minHeightClass} ${bgClass} transition-colors duration-500`}
      style={{ opacity }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? (isMobile ? 0.2 : 0.3) : 0.1 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(ellipse at ${index % 2 === 0 ? 'top left' : 'bottom right'}, rgba(245, 158, 11, 0.2) 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {/* Sticky left content */}
          <motion.div
            className={`flex w-full flex-col justify-center gap-8 p-8 text-left lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:p-12 ${textClass}`}
            initial={{ opacity: 0, x: isMobile ? -50 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.8 }}
            viewport={{ once: true }}
          >
            {/* Icon with gradient background */}
            <motion.div
              className={`relative h-32 w-32 rounded-3xl bg-gradient-to-br ${section.gradient} p-1`}
              whileTap={{ scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className={`flex h-full w-full items-center justify-center rounded-3xl bg-black/50 text-white backdrop-blur-sm`}>
                {section.icon}
              </div>
            </motion.div>

            {/* Title with gradient */}
            <motion.h2
              className={`text-4xl font-black uppercase sm:text-5xl lg:text-6xl ${textClass}`}
              initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: isMobile ? 0.4 : 0.5 }}
              viewport={{ once: true }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
            >
              <motion.span
                className={`bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
              >
                {section.title}
              </motion.span>
            </motion.h2>

            <motion.p
              className={`text-xl ${subtitleClass}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {section.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/contact">
                <motion.button
            className={`group relative overflow-hidden rounded-full bg-gradient-to-r ${section.gradient} px-8 py-4 text-lg font-semibold text-white shadow-2xl`}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
            <span className="relative z-10">Let's Talk</span>
            <motion.span
              className="relative z-10 ml-2 inline-block"
              animate={!prefersReducedMotion ? { x: [0, 5, 0] } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 "
              initial={{ x: "-100%" }}
              whileHover={!isMobile ? { x: 0 } : {}}
              transition={{ duration: 0.3 }}
            />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scrollable right content */}
        <div className="flex w-full flex-col gap-6 p-8 lg:w-1/2 lg:p-12 lg:pt-24">
          {section.services.map((service, serviceIndex) => (
            <ServiceCard
              key={serviceIndex}
              service={service}
              index={serviceIndex}
              gradient={section.gradient}
              isActive={isActive}
              textClass={cardTextClass}
              descClass={cardDescClass}
            />
          ))}
        </div>
      </div>

      {/* Floating orbs */}
      {!isMobile && (
        <motion.div
          className={`absolute ${index % 2 === 0 ? 'left-20 top-1/4' : 'right-20 bottom-1/4'} h-64 w-64 rounded-full bg-gradient-to-r ${section.gradient} opacity-10 blur-2xl`}
          animate={!prefersReducedMotion ? {
            x: [0, index % 2 === 0 ? 50 : -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.section>
  );
};

const ServiceCard = ({ service, index, gradient, isActive, textClass, descClass }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? 0 : -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        delay: index * (isMobile ? 0.05 : 0.1),
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <motion.div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm ${textClass} shadow-lg ${!isMobile ? 'transition-transform duration-300 hover:scale-105' : ''}`}
        whileHover={!isMobile ? {
          scale: 1.02,
          transition: { duration: 0.3 },
        } : {}}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 ${isMobile ? 'blur-lg' : 'blur-xl'}`}
          animate={!prefersReducedMotion ? {
            opacity: isActive ? [0, isMobile ? 0.2 : 0.3, 0] : 0,
          } : {}}
          transition={{
            duration: 2,
            repeat: isActive && !prefersReducedMotion ? Infinity : 0,
            delay: index * 0.2,
          }}
        />

        {/* Icon */}
        <motion.div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${gradient} text-white`}
          whileHover={!isMobile ? {
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.5 },
          } : {}}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          className={`mb-3 text-xl font-bold ${textClass}`}
          whileHover={!isMobile ? { x: 5 } : {}}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <p className={`${descClass} leading-relaxed`}>
          {service.description}
        </p>

        {/* Hover indicator */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`h-8 w-8 rounded-full bg-gradient-to-r ${gradient}`}
              animate={!prefersReducedMotion ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
