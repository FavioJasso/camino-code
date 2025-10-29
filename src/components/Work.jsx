"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useIntersectionObserver,
  useCursorPosition,
} from "@/hooks/useAnimations";
import { staggerContainer } from "@/utils/animations";
import { useState } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import { ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Data-Driven Insights for TechWave",
    description:
      "Developed a predictive analytics model that increased customer retention by 30%.",
    image: "/assets/images/services_work01.png",
    href: "/case-study/techwave",
    color: "from-blue-400 to-purple-600",
  },
  {
    id: 2,
    title: "E-Commerce Platform for StyleHub",
    description:
      "Built a scalable web application that boosted online sales by 150%.",
    image: "/assets/images/services_work02.png",
    href: "/case-study/stylehub",
    color: "from-green-400 to-teal-600",
  },
  {
    id: 3,
    title: "Professional Portfolio Design & Development",
    description:
      "How we built a clean, modern, and user-focused portfolio website that reflects expertise, clarity, and trust.",
    image: "/assets/images/danielavila_work.png",
    href: "/case-study/daniel-avila",
    color: "from-blue-700 to-blue-400",
  },
  {
    id: 4,
    title: "Cloud Migration for HealthTrack",
    description:
      "Seamless transition to cloud infrastructure improving system reliability.",
    image: "/assets/images/services_work04.png",
    href: "/case-study/healthtrack",
    color: "from-pink-400 to-purple-600",
  },
];

const CaseStudyCard = ({ study, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: cardRef, position } = useCursorPosition();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
      scale: isMobile ? 0.9 : 0.8,
      rotateX: isMobile ? 0 : -30,
      filter: isMobile ? "none" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        delay: index * (isMobile ? 0.1 : 0.15),
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm transition-all duration-500 ${
        index % 2 === 1 ? "lg:translate-y-16" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!isMobile ? { 
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      style={{
        transform: !isMobile && isHovered
          ? `perspective(1000px) rotateX(${position.y * 8}deg) rotateY(${
              position.x * 8
            }deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
    >
      <Link href={study.href} className="relative block h-full">
        {/* Card glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 opacity-0 blur-xl"
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="relative h-full overflow-hidden rounded-3xl backdrop-blur-xl">
          {/* Background gradient layer */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${study.color}`}
            animate={{
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative h-80 overflow-hidden sm:h-96 lg:h-[28rem]">
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={study.image}
                alt={study.title}
                fill
                className="object-cover"
                quality={90}
              />
            </motion.div>

            {/* Advanced gradient overlay */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isHovered ? 0.8 : 0.3 }}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(135deg, ${study.color.split(' ')[1]} 0%, transparent 50%, ${study.color.split(' ')[3]} 100%)`,
                mixBlendMode: "multiply",
              }}
            />

            {/* Animated particles overlay */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: isHovered && !prefersReducedMotion ? ["0% 0%", "100% 100%"] : "0% 0%",
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            )}

            {/* Content overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.h3
                  className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
                  animate={{
                    y: isHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {study.title}
                </motion.h3>

                <motion.p
                  className="mb-6 text-base text-white/80 sm:text-lg overflow-hidden"
                  initial={{ height: 0, opacity: 0, y: 20 }}
                  animate={{ 
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {study.description}
                </motion.p>

                <motion.div
                  className="flex items-center gap-3"
                  animate={{
                    x: isHovered ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-lg font-semibold text-amber-400">
                    View Case Study
                  </span>
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 backdrop-blur-sm"
                    animate={{
                      scale: isHovered ? [1, 1.2, 1] : 1,
                      rotate: isHovered ? 360 : 0,
                    }}
                    transition={{
                      scale: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
                      rotate: { duration: 0.5 },
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Corner accent */}
            <motion.div
              className="absolute top-0 right-0 h-32 w-32"
              animate={{
                scale: isHovered ? 1.5 : 1,
                rotate: isHovered ? 90 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-full w-full bg-gradient-to-br from-amber-400/30 to-transparent" />
            </motion.div>

            {/* Number badge */}
            <motion.div
              className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-md"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-bold text-amber-400">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function WorkShowcase() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.05,
  });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

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
    <motion.section
      ref={sectionRef}
      id="work"
      className="relative flex w-full flex-col items-center overflow-hidden bg-white py-24 sm:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated mesh gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.2) 0%, transparent 40%)",
            "radial-gradient(ellipse at 80% 100%, rgba(245, 158, 11, 0.2) 0%, transparent 40%)",
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.2) 0%, transparent 40%)",
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
            backgroundImage: "linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative container mx-auto w-full">
        {/* Left Model removed */}

        {/* Right Model removed */}

        {/* Center Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6">
          <motion.div className="perspective-1000 mb-12">
            <motion.h2
              className="text-center text-6xl font-black uppercase tracking-tighter text-black sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
              variants={titleVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
            >
              <motion.span 
                className="block"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 50px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                OUR
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 50px rgba(245, 158, 11, 0.3)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                WORK
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="mb-16 max-w-3xl text-center text-lg font-light leading-relaxed text-black/80 sm:text-xl md:text-2xl"
            initial={{ opacity: 0, y: isMobile ? 20 : 30, filter: isMobile ? "none" : "blur(10px)" }}
            animate={hasIntersected ? { opacity: 1, y: 0, filter: "none" } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.3 }}
          >
            We take pride in delivering{" "}
            <motion.span
              className="font-semibold text-amber-400"
              whileHover={!isMobile ? { 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              innovative solutions
            </motion.span>{" "}
            that drive measurable success. Our portfolio showcases transformative projects in data science, web development, and AI integration.
          </motion.p>

          {/* Mobile Models removed */}

          {/* Case Studies Grid with enhanced stagger animation */}
          <motion.div
            className="grid w-full max-w-7xl grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </motion.div>

          {/* View All Projects Button */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/case-study-detailed">
            <motion.button
              className="group lg:mt-8 text-lg font-semibold relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t from-amber-600 to-red-600 px-8 py-4 text-white"
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
              <span className="relative z-10">View All Projects</span>
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
                className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-600"
                variants={{
                  initial: { y: "100%" },
                  hover: { y: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Model removed */}
        </div>
      </div>

      {/* Floating decorative elements */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute left-10 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/5 to-red-600/5 blur-2xl"
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
            className="absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-gradient-to-r from-orange-400/5 to-amber-600/5 blur-2xl"
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
    </motion.section>
  );
}
