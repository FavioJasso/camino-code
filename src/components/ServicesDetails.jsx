"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    id: "data-science",
    title: "Data Science",
    subtitle: "Transform Data Into Competitive Advantage",
    icon: <Database className="h-full w-full" />,
    gradient: "from-blue-400 to-purple-600",
    services: [
      {
        icon: <ClipboardList className="h-full w-full" />,
        title: "Data Strategy and Consulting",
        description: "We analyze your business challenges, optimize data systems, and create comprehensive strategies for data collection and utilization. Our approach ensures data security, compliance, and establishes KPIs that drive measurable business growth.",
      },
      {
        icon: <CloudUpload className="h-full w-full" />,
        title: "Data Engineering",
        description: "Build robust, scalable data pipelines and infrastructure using cutting-edge cloud technologies. We design systems that efficiently collect, store, and process massive datasets while ensuring reliability and performance.",
      },
      {
        icon: <LineChart className="h-full w-full" />,
        title: "Data Analysis & Visualization",
        description: "Transform complex data into actionable insights through advanced analytics and stunning visualizations. Our interactive dashboards and reports make data-driven decision-making intuitive and accessible.",
      },
      {
        icon: <Brain className="h-full w-full" />,
        title: "Machine Learning and AI",
        description: "Leverage state-of-the-art AI solutions for automation, predictive analytics, fraud detection, and intelligent decision-making. We build custom models tailored to your specific business needs.",
      },
      {
        icon: <Cloud className="h-full w-full" />,
        title: "Industry-Specific Solutions",
        description: "Specialized AI-driven solutions designed for healthcare, finance, retail, manufacturing, and other industries. Our domain expertise ensures solutions that address your unique challenges.",
      },
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    subtitle: "Build Digital Products That Scale",
    icon: <Code className="h-full w-full" />,
    gradient: "from-amber-400 to-red-600",
    services: [
      {
        icon: <Laptop className="h-full w-full" />,
        title: "Software Strategy & Solutions",
        description: "We architect and design scalable software solutions that align perfectly with your business objectives. Our strategic approach ensures long-term success and adaptability.",
      },
      {
        icon: <Paintbrush className="h-full w-full" />,
        title: "UI/UX Design",
        description: "Create exceptional user experiences through research-driven design. We craft intuitive interfaces that delight users and drive engagement across all platforms.",
      },
      {
        icon: <Globe className="h-full w-full" />,
        title: "Website Development",
        description: "Build lightning-fast, secure, and SEO-optimized websites that deliver results. Our modern web applications are designed to convert visitors into customers.",
      },
      {
        icon: <Smartphone className="h-full w-full" />,
        title: "Mobile Development",
        description: "Develop powerful cross-platform mobile applications using React Native and Flutter. We create seamless experiences that work flawlessly on iOS and Android.",
      },
    ],
  },
  {
    id: "audit-sme",
    title: "Audit & SME Solutions",
    subtitle: "Optimize and Scale Your Operations",
    icon: <Shield className="h-full w-full" />,
    gradient: "from-green-400 to-teal-600",
    services: [
      {
        icon: <SearchCheck className="h-full w-full" />,
        title: "Analyze Existing Solutions",
        description: "Comprehensive evaluation of your current systems to identify optimization opportunities, security vulnerabilities, and areas for improvement.",
      },
      {
        icon: <FilePlus className="h-full w-full" />,
        title: "Improve Business Processes",
        description: "Streamline workflows and automate repetitive tasks to enhance efficiency, reduce costs, and accelerate growth.",
      },
      {
        icon: <PanelTop className="h-full w-full" />,
        title: "Customize for SME Needs",
        description: "Tailored solutions designed specifically for small and medium enterprises, addressing unique challenges with scalable approaches.",
      },
      {
        icon: <BarChart2 className="h-full w-full" />,
        title: "Ensure Smooth Integration",
        description: "Seamlessly integrate new solutions with your existing infrastructure, ensuring minimal disruption and maximum compatibility.",
      },
      {
        icon: <Headphones className="h-full w-full" />,
        title: "Ongoing Support and Updates",
        description: "Continuous monitoring, maintenance, and updates to keep your solutions running at peak performance with 24/7 support.",
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

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
        animate={{ opacity: isActive ? 0.3 : 0.1 }}
        transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Icon with gradient background */}
            <motion.div
              className={`relative h-32 w-32 rounded-3xl bg-gradient-to-br ${section.gradient} p-1`}
              // Removed whileHover rotate animation
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              whileTap={{ scale: 0.95 }}
              whileFocus={{ scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ backgroundSize: "200% 100%" }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ backgroundSize: "200% 100%" }}
              whileFocus={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <motion.span
                className={`bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 100%" }}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
            <span className="relative z-10">Let's Talk</span>
            <motion.span
              className="relative z-10 ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
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
              whileHover={{ x: 0 }}
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
      <motion.div
        className={`absolute ${index % 2 === 0 ? 'left-20 top-1/4' : 'right-20 bottom-1/4'} h-64 w-64 rounded-full bg-gradient-to-r ${section.gradient} opacity-10 blur-3xl`}
        animate={{
          x: [0, index % 2 === 0 ? 50 : -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  );
};

const ServiceCard = ({ service, index, gradient, isActive, textClass, descClass }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <motion.div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm ${textClass} shadow-lg transition-transform duration-300 hover:scale-105`}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 blur-xl`}
          animate={{
            opacity: isActive ? [0, 0.3, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            delay: index * 0.2,
          }}
        />

        {/* Icon */}
        <motion.div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${gradient} text-white`}
          whileHover={{
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.5 },
          }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <motion.h3
          className={`mb-3 text-xl font-bold ${textClass}`}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Description */}
        <p className={`${descClass} leading-relaxed`}>
          {service.description}
        </p>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`h-8 w-8 rounded-full bg-gradient-to-r ${gradient}`}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
