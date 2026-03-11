"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  useIntersectionObserver,
  useCursorPosition,
} from "@/hooks/useAnimations";
import { useState, useEffect, useRef } from "react";
import { useIsMobile, useReducedMotion, useIsFirefox } from "@/hooks/useIsMobile";
import { ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const caseStudies = [
  {
    id: 1,
    title: "Prepify",
    description:
      "Fresh prepared meals near NJIT. Low-cost, convenient meal prep service with local pickup—nutritious options designed for students and busy professionals.",
    image: "/assets/images/case_studies/prepify_work.webp",
    href: "/case-study/prepify",
    color: "from-emerald-500 to-teal-600",
    clientLabel: "Prepify",
  },
  {
    id: 2,
    title: "Website ReMatter",
    description:
      "Transforming municipal waste into clean electricity and construction materials through intelligent AI-driven optimization.",
    image: "/assets/images/case_studies/rematter_work.webp",
    href: "/case-study/rematter-us",
    color: "from-amber-400 to-red-600",
    clientLabel: "ReMatter",
  },
  {
    id: 3,
    title: "AnatomyQuest",
    description:
      "Free, interactive anatomy resource that helps you understand why each structure exists—so you remember it for life. Community-driven and open source.",
    image: "/assets/images/case_studies/anatomyquest_work.webp",
    href: "/case-study/anatomy-quest",
    color: "from-blue-400 to-indigo-600",
    clientLabel: "AnatomyQuest",
  },
  {
    id: 4,
    title: "NJIT Student Life Connect",
    description:
      "One-stop platform for everything NJIT: find friends, join clubs, stay updated on athletics, events, and campus resources.",
    image: "/assets/images/case_studies/studentlife_work.webp",
    href: "/case-study/student-life",
    color: "from-rose-500 to-red-600",
    clientLabel: "Student Life",
  },
];

const CaseStudyCard = ({ study, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const isFirefox = useIsFirefox();
  const { ref: cardRef, position } = useCursorPosition(isHovered && !isFirefox);

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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: !isMobile && isHovered
          ? `perspective(1000px) rotateX(${position.y * 4}deg) rotateY(${position.x * 4}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
      }}
    >
      <Link href={study.href} className="relative block h-full">
        <motion.div
          className="relative h-full overflow-hidden rounded-2xl bg-white transition-shadow duration-300"
          animate={{
            y: !isMobile && isHovered ? -8 : 0,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)"
              : "0 4px 20px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {study.image ? (
              <>
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: isHovered ? 1.04 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={90}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
              </>
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${study.color}`}>
                <span className="px-6 text-center text-2xl font-black uppercase tracking-tight text-white/90">
                  {study.clientLabel ?? "Case Study"}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative p-5">
            <motion.div
              className="mb-2 h-0.5 w-8 rounded-full bg-orange-500"
              animate={{ width: isHovered ? 40 : 32 }}
              transition={{ duration: 0.25 }}
              aria-hidden
            />
            <motion.h3
              className="mb-1.5 text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl"
              animate={{ y: isHovered ? -1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {study.title}
            </motion.h3>
            <p className="mb-4 text-sm leading-relaxed text-neutral-500 line-clamp-3">
              {study.description}
            </p>
            <motion.div
              className="flex items-center gap-2 text-orange-500"
              animate={{ x: isHovered && !isFirefox ? 4 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-sm font-medium">View Case Study</span>
              <motion.span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10"
                animate={{ scale: isHovered && !isFirefox ? 1.1 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
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
                OUR
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
            Ideas we've helped take from concept to testable reality. Early-stage work,{" "}
            <motion.span
              className="font-semibold text-amber-400"
              whileHover={!isMobile ? { 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              proof-of-concepts
            </motion.span>{" "}
            and collaborations where technical execution made the difference before traditional funding.
          </motion.p>

          {/* Case Studies Grid: 4 filas en móvil, 2×2 en pantallas grandes */}
          <motion.div
            className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 md:gap-6 lg:gap-8"
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
            <Link href="/case-study/prepify">
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
