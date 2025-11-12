"use client";

import Image from "next/image";
import { Sparkles, Users, Puzzle, Scaling, ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useRef, useEffect, useState } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const features = [
  {
    id: 1,
    title: "Innovation at the Core",
    description: "Cutting-edge solutions that drive business transformation",
    icon: <Sparkles className="h-8 w-8" />,
    image: "/assets/images/offers_bg01.webp",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-8 w-8" />,
    image: "/assets/images/offers_bg02.webp",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-8 w-8" />,
    image: "/assets/images/offers_bg03.webp",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-8 w-8" />,
    image: "/assets/images/offers_bg04.webp",
  },
];

export default function WhatSetsUsApart() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simplified transforms for better performance
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "30%" : "60%"],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "-5%" : "-10%"],
  );

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Particle animation effect
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = isMobile ? 30 : 60;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(251, 191, 36, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, [dimensions, isMobile, prefersReducedMotion]);

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
      rotateX: isMobile ? 0 : -90,
      filter: isMobile ? "none" : "blur(10px)",
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 30 : 50,
      filter: isMobile ? "none" : "blur(5px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.6,
        delay: i * (isMobile ? 0.05 : 0.1),
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
    },
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { rotate: 360, scale: 1.1 },
  };

  return (
    <motion.section
      ref={containerRef}
      id="offers"
      className="relative mx-auto flex min-h-screen items-center justify-center overflow-hidden bg-white py-20 will-change-transform"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout={false}
    >
      {/* Animated particles canvas */}
      {!isMobile && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-30"
        animate={
          !isMobile && !prefersReducedMotion
            ? {
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)",
                ],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Decorative floating elements */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-1/3 left-20 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl"
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
            className="absolute right-20 bottom-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
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
        ref={sectionRef}
        className="relative z-10 flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-6 text-center"
        style={{ y: textY }}
      >
        {/* Title */}
        <motion.div
          className="perspective-1000 mb-8 overflow-visible"
          variants={titleVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2 className="flex flex-col items-center justify-center gap-6">
            <motion.span
              className="inline-block text-gray-900 text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] px-4"
              style={{ wordSpacing: '0.1em' }}
              animate={
                hoveredWord === 0 && !isMobile && !prefersReducedMotion
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
              What Sets Us
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] px-4"
              animate={
                hoveredWord === 1 && !isMobile && !prefersReducedMotion
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
              Apart
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="relative z-10 mx-auto mb-8 max-w-3xl text-lg leading-relaxed font-light text-gray-700 sm:text-xl md:text-2xl text-balance"
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
          At Camino Code, we combine{" "}
          <motion.span
            className="font-semibold text-orange-500 whitespace-nowrap"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            Applied AI
          </motion.span>{" "}
          and{" "}
          <motion.span
            className="font-semibold text-orange-500 whitespace-nowrap"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            Intelligent automation
          </motion.span>{" "}
          to create innovative, AI-powered solutions that drive business
          transformation.
        </motion.p>
        {/* Button */}
        <motion.div
          className="relative z-10 mb-8"
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
              <span className="relative z-10">Get Started</span>
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
        {/* Features Grid */}
        <motion.div
          className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
              whileHover={!isMobile ? "hover" : undefined}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative h-64 w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  quality={90}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"
                  whileHover={{
                    background:
                      "linear-gradient(to top, rgba(31,41,55,0.95) 0%, rgba(31,41,55,0.7) 50%, transparent 100%)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                <motion.div
                  className="mb-4 rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 p-3 backdrop-blur-sm"
                  animate={
                    !isMobile && hoveredCard === feature.id
                      ? { rotate: 360, scale: 1.1 }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-amber-400"
                    animate={
                      hoveredCard === feature.id
                        ? { filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))" }
                        : { filter: "drop-shadow(0 0 0px rgba(251, 191, 36, 0))" }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                </motion.div>
                <h3 className="mb-2 text-xl font-black tracking-tight uppercase md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-white/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
