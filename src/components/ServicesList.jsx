"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Brain, Database } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const services = [
  {
    id: 1,
    title: "Applied AI Systems",
    tagline: "Bringing intelligence to everyday workflows.",
    description: "Bringing intelligence to everyday workflows. We design AI-powered systems that automate, optimize, and elevate decision-making across industries. Beyond analysis, we build intelligent solutions that do the work.",
    icon: <Brain className="h-12 w-12" />,
    gradient: "from-orange-500 to-red-600",
    features: [
      "Natural Language Processing (document analysis, chatbots, agents)",
      "Computer Vision & Intelligent Recognition Systems",
      "Generative AI Integrations (text, code, visual AI)",
      "Workflow Automation (RPA, orchestration, decision systems)",
      "Predictive Maintenance & Forecasting"
    ],
  },
  {
    id: 2,
    title: "Data Intelligence & Engineering",
    tagline: "Transform raw data into scalable intelligence.",
    description: "Transform raw data into scalable intelligence. We build the foundation for machine learning and automation by collecting, structuring, and analyzing data — turning chaos into clarity.",
    icon: <Database className="h-12 w-12" />,
    gradient: "from-amber-400 to-orange-500",
    features: [
      "Data Pipeline Design (ETL/ELT, APIs, automation)",
      "Machine Learning & Predictive Analytics",
      "Data Visualization & Business Intelligence Dashboards",
      "Database Architecture (SQL, NoSQL, Warehouse Design)",
      "Analytics Strategy & Model Deployment"
    ],
  },
  {
    id: 3,
    title: "Product Engineering",
    tagline: "From prototype to polished product.",
    description: "From prototype to polished product. We create modern, AI-powered digital products that delight users and scale effortlessly. Our focus: technical depth, performance, and exceptional user experience.",
    icon: <Code className="h-12 w-12" />,
    gradient: "from-red-600 to-amber-400",
    features: [
      "Web & App Development (Next.js, Laravel, Go, React)",
      "AI-Integrated Platforms (chatbots, dashboards, internal tools)",
      "API Development & Cloud Deployment (AWS, Azure, GCP)",
      "UI/UX Design & Data Visualization Interfaces",
      "Performance & Reliability Engineering"
    ],
  },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0.8, 1, 0.8] : [0.6, 1, 0.6]);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      initial={{ opacity: 0, y: isMobile ? 30 : 50, rotateX: isMobile ? 0 : -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: isMobile ? 0.5 : 0.8, delay: index * (isMobile ? 0.05 : 0.1) }}
      viewport={{ once: true }}
      style={{ opacity }}
      className="group relative"
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-black/5 to-black/10 p-8 backdrop-blur-sm"
        whileHover={!isMobile ? { 
          scale: 1.02,
          transition: { duration: 0.3 }
        } : {}}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Icon container */}
          <motion.div
            className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r from-amber-600 to-red-600 p-4`}
            animate={!isMobile && isCardHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="text-white">
              {service.icon}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="mb-2 text-2xl font-bold text-neutral-900"
            animate={!isMobile && isCardHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          {/* Tagline */}
          {service.tagline && (
            <p className={`mb-4 text-sm font-semibold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent`}>
              {service.tagline}
            </p>
          )}

          {/* Description */}
          <p className="mb-6 text-neutral-700 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <motion.div
                  className={`h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-red-600`}
                  animate={!isMobile && isCardHovered ? { scale: 1.3 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="text-sm text-neutral-500">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Learn more link */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#"
              className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text font-semibold`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Learn More
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 h-32 w-32"
          animate={!isMobile && isCardHovered ? { scale: 1.5, rotate: 90 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`h-full w-full bg-gradient-to-br ${service.gradient} opacity-10`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesList() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  const [hoveredWord, setHoveredWord] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleWordHoverStart = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredWord(index);
  };

  const handleWordHoverEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredWord(null);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 50 : 100,
      rotateX: isMobile ? 0 : -45,
      filter: isMobile ? "none" : "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="services-list"
      className="relative min-h-screen bg-white py-24 sm:py-32"
    >
      {/* Animated mesh gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
            "radial-gradient(ellipse at 80% 100%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
          ],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div ref={observerRef} className="container relative z-10 mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <motion.div className="perspective-1000 mb-16 text-center">
          <motion.h2
            className="text-5xl font-black uppercase tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            <motion.span 
              className="block"
              animate={
                hoveredWord === 0 && !isMobile
                  ? {
                scale: 1.05,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
                  : {
                      scale: 1,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
              }
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
              onHoverStart={() => handleWordHoverStart(0)}
              onHoverEnd={handleWordHoverEnd}
            >
              WHAT WE
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
              animate={
                hoveredWord === 1 && !isMobile
                  ? {
                scale: 1.05,
                      textShadow: "0 0 50px rgba(245, 158, 11, 0.2)",
                    }
                  : {
                      scale: 1,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
              }
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
              onHoverStart={() => handleWordHoverStart(1)}
              onHoverEnd={handleWordHoverEnd}
            >
              OFFER
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="mb-8 text-xl text-neutral-700"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            Ready to transform your business with cutting-edge technology?
          </motion.p>
            <motion.button
              className="group relative overflow-hidden rounded-full font-semibold text-lg bg-gradient-to-t from-amber-600 to-red-600 px-8 py-4 text-white"
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
              }}
            >
              <span className="relative z-10">Get Started Today</span>
              <motion.span
                className="relative z-10 ml-2"
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
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-600"
                variants={{
                  initial: { y: "100%" },
                  hover: { y: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
        </motion.div>
      </div>

      {/* Floating orbs */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute left-10 top-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/5 to-red-600/5 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 h-80 w-80 rounded-full bg-gradient-to-r from-orange-400/5 to-amber-600/5 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </section>
  );
}