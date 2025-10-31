"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  SearchCheck,
  PanelTop,
  BarChart2,
  Database,
  Shield,
  Code,
  ArrowBigRightIcon,
  ArrowBigRightDashIcon
} from "lucide-react";

const servicesSections = [
  {
    id: "applied-ai",
    title: "Applied AI Systems",
    subtitle: "Transform Workflows with Intelligent Automation",
    icon: <Brain className="h-10/12 w-10/12" />,
    gradient: "from-blue-600 to-purple-600",
    services: [
      {
        icon: <ClipboardList className="h-10/12 w-10/12" />,
        title: "AI Strategy & Consulting",
        description: "We design tailored AI strategies that align with your business goals, ensuring security, compliance, and measurable ROI.",
      },
      {
        icon: <LineChart className="h-10/12 w-10/12" />,
        title: "Natural Language Processing",
        description: "From chatbots to document analysis, we build NLP systems that understand and respond intelligently.",
      },
      {
        icon: <SearchCheck className="h-10/12 w-10/12" />,
        title: "Computer Vision & Recognition",
        description: "Intelligent recognition systems for images, video, and real-time monitoring.",
      },
      {
        icon: <Paintbrush className="h-10/12 w-10/12" />,
        title: "Generative AI Integrations",
        description: "Harness the power of text, code, and visual AI to accelerate creativity and productivity.",
      },
      {
        icon: <BarChart2 className="h-10/12 w-10/12" />,
        title: "Predictive Systems",
        description: "Forecast demand, detect anomalies, and enable predictive maintenance with custom AI models.",
      },
    ],
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    subtitle: "Turn Raw Data into Scalable Intelligence",
    icon: <Database className="h-10/12 w-10/12" />,
    gradient: "from-amber-600 to-red-600",
    services: [
      {
        icon: <ClipboardList className="h-10/12 w-10/12"  />,
        title: "Data Strategy & Architecture",
        description: "Build secure, compliant, and scalable data ecosystems with clear KPIs that drive growth.",
      },
      {
        icon: <CloudUpload className="h-10/12 w-10/12"  />,
        title: "Data Engineering",
        description: "Design robust pipelines (ETL/ELT, APIs, automation) to collect, process, and store massive datasets.",
      },
      {
        icon: <BarChart2 className="h-10/12 w-10/12"  />,
        title: "Analytics & Visualization",
        description: "Transform complexity into clarity with interactive dashboards and advanced analytics.",
      },
      {
        icon: <Brain className="h-10/12 w-10/12" />,
        title: "Machine Learning & Predictive Analytics",
        description: "Deploy models that automate decision-making and uncover hidden opportunities.",
      },
      {
        icon: <Cloud className="h-10/12 w-10/12" />,
        title: "Industry-Specific Solutions",
        description: "Tailored data-driven systems for healthcare, finance, retail, manufacturing, and beyond.",
      },
    ],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    subtitle: "Build Digital Products That Scale",
    icon: <Code className="h-10/12 w-10/12" />,
    gradient: "from-green-600 to-teal-600",
    services: [
      {
        icon: <Laptop className="h-10/12 w-10/12"  />,
        title: "Software Strategy & Solutions",
        description: "Architect scalable platforms that adapt to evolving business needs.",
      },
      {
        icon: <Paintbrush className="h-10/12 w-10/12"  />,
        title: "UI/UX Design",
        description: "Create intuitive, research-driven interfaces that delight users and boost engagement.",
      },
      {
        icon: <Globe className="h-10/12 w-10/12"  />,
        title: "Web & Mobile Development",
        description: "Build secure, SEO-optimized websites and cross-platform apps with React Native and Flutter.",
      },
      {
        icon: <PanelTop className="h-10/12 w-10/12"  />,
        title: "AI-Integrated Platforms",
        description: "From dashboards to internal tools, we embed AI into products for smarter performance.",
      },
      {
        icon: <Shield className="h-10/12 w-10/12"  />,
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
  const [isHovered, setIsHovered] = useState(false);
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
      layout={false}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? (isMobile ? 0.2 : 0.3) : 0.1 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
        layout={false}
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
            layout={false}
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
                  className={`group relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t ${section.gradient} px-6 py-3 text-white`}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                >
                  <span className="relative z-10">Let's Talk</span>
                  <motion.span
                    className="relative z-10 ml-2 inline-block"
                    variants={{
                      initial: { x: 0 },
                      hover: { 
                        x: [0, 5, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {!isHovered ? (
                        <motion.div
                          key="normal"
                          initial={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowBigRightIcon className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="dash"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowBigRightDashIcon className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.span>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-b ${section.gradient}`}
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
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
            opacity: isActive ? [0, isMobile ? 0.15 : 0.2, 0] : 0,
          } : {}}
          transition={{
            duration: 4,
            repeat: isActive && !prefersReducedMotion ? Infinity : 0,
            delay: index * 0.8,
            repeatDelay: 2,
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
      </motion.div>
    </motion.div>
  );
};
