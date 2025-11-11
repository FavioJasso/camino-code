"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useRef, useState, useEffect } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";
import { ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";

export default function AboutSection() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredWord, setHoveredWord] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, isMobile ? -50 : -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const titleWords = "Shaping the Future of Technology".split(" ");

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
      rotateX: isMobile ? 0 : -90,
      filter: isMobile ? "none" : "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        delay: i * (isMobile ? 0.05 : 0.1),
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    }),
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative mx-auto flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-[1]"
        animate={
          !isMobile && !prefersReducedMotion
            ? {
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
                ],
              }
            : {}
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Decorative floating elements */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-1/3 left-20 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-2xl"
            animate={
              !prefersReducedMotion
                ? {
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-20 bottom-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-2xl"
            animate={
              !prefersReducedMotion
                ? {
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                  }
                : {}
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <motion.div
        ref={containerRef}
        style={{ y, opacity }}
        className="relative z-10 flex h-full w-full max-w-[1440px] flex-col items-center justify-center px-6 text-center pt-20 pb-8"
      >
        {/* Heading with split text animation */}
        <motion.div
          className="perspective-1000 overflow-visible"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2 className="flex flex-col items-center justify-center">
            <motion.span
              className="inline-block text-white text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] px-4"
              initial={{ opacity: 0, y: isMobile ? 50 : 100, rotateX: isMobile ? 0 : -90, filter: isMobile ? "none" : "blur(10px)" }}
              animate={
                hasIntersected
                  ? hoveredWord === 0 && !isMobile && !prefersReducedMotion
                    ? { opacity: 1, y: 0, rotateX: 0, filter: "none", scale: 1.02 }
                    : { opacity: 1, y: 0, rotateX: 0, filter: "none", scale: 1 }
                  : {}
              }
              transition={{ 
                opacity: { duration: isMobile ? 0.5 : 0.8, delay: 0 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                y: { duration: isMobile ? 0.5 : 0.8, delay: 0 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                rotateX: { duration: isMobile ? 0.5 : 0.8, delay: 0 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                filter: { duration: isMobile ? 0.5 : 0.8, delay: 0 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                scale: { type: "spring", stiffness: 80, damping: 25 }
              }}
              onHoverStart={() => handleWordHoverStart(0)}
              onHoverEnd={handleWordHoverEnd}
            >
              Shaping the Future of
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] px-4"
              initial={{ opacity: 0, y: isMobile ? 50 : 100, rotateX: isMobile ? 0 : -90, filter: isMobile ? "none" : "blur(10px)" }}
              animate={
                hasIntersected
                  ? hoveredWord === 1 && !isMobile && !prefersReducedMotion
                    ? { opacity: 1, y: 0, rotateX: 0, filter: "none", scale: 1.05, textShadow: "0 0 50px rgba(245, 158, 11, 0.2)" }
                    : { opacity: 1, y: 0, rotateX: 0, filter: "none", scale: 1, textShadow: "0 0 0px rgba(0, 0, 0, 0)" }
                  : {}
              }
              transition={{ 
                opacity: { duration: isMobile ? 0.5 : 0.8, delay: 1 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                y: { duration: isMobile ? 0.5 : 0.8, delay: 1 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                rotateX: { duration: isMobile ? 0.5 : 0.8, delay: 1 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                filter: { duration: isMobile ? 0.5 : 0.8, delay: 1 * (isMobile ? 0.05 : 0.1), ease: [0.215, 0.61, 0.355, 1.0] },
                scale: { type: "spring", stiffness: 80, damping: 25 },
                textShadow: { duration: 0.3 }
              }}
              onHoverStart={() => handleWordHoverStart(1)}
              onHoverEnd={handleWordHoverEnd}
            >
              Technology
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Description with fade in animation */}
        <motion.p
          className="relative z-10 mx-auto mt-8 mb-8 max-w-3xl text-lg leading-relaxed font-light text-white/80 sm:text-xl md:text-2xl"
          initial={{
            opacity: 0,
            y: isMobile ? 20 : 30,
            filter: isMobile ? "none" : "blur(10px)",
          }}
          animate={
            hasIntersected
              ? { opacity: 1, y: 0, filter: "none" }
              : {
                  opacity: 0,
                  y: isMobile ? 20 : 30,
                  filter: isMobile ? "none" : "blur(10px)",
                }
          }
          transition={{ duration: isMobile ? 0.6 : 1, delay: 0.8 }}
        >
          At Camino Code, we are passionate about transforming businesses
          through the power of{" "}
          <motion.span
            className="font-semibold text-amber-400 whitespace-nowrap"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            Data and technology
          </motion.span>
          . Founded with a vision to redefine the digital landscape, we
          specialize in{" "}
          <motion.span
            className="font-semibold text-amber-400 whitespace-nowrap"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            Cutting-edge solutions
          </motion.span>{" "}
          designed to drive innovation and growth.
        </motion.p>

        {/* Button with advanced hover effects */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/contact">
            <motion.button
              className="group text-lg font-semibold relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t from-amber-600 to-red-600 px-8 py-4 text-white"
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
              <span className="relative z-10">Learn More</span>
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
      </motion.div>
    </motion.section>
  );
}
