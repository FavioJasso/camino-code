"use client";

import Image from "next/image";
import { Sparkles, Users, Puzzle, Scaling } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useRef, useEffect, useState } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const features = [
  {
    id: 1,
    title: "Innovation at the Core",
    description: "Cutting-edge solutions that drive business transformation",
    icon: <Sparkles className="h-8 w-8" />,
    image: "/assets/images/offers_bg01.png",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-8 w-8" />,
    image: "/assets/images/offers_bg02.png",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-8 w-8" />,
    image: "/assets/images/offers_bg03.png",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-8 w-8" />,
    image: "/assets/images/offers_bg04.png",
  },
];

export default function WhatSetsUsApart() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

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

    return () => window.removeEventListener("resize", updateDimensions);
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
        <motion.h2
          className="perspective-1000 mx-auto mt-16 w-full max-w-[900px] text-6xl font-black tracking-tighter uppercase sm:mt-20 sm:text-7xl md:mt-24 md:text-8xl lg:text-9xl xl:text-[10rem]"
          variants={titleVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.span
            className="block text-gray-900"
            whileHover={
              !isMobile
                ? {
                    scale: 1.05,
                    textShadow: "0 0 40px rgba(251, 191, 36, 0.3)",
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            What Sets Us
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
            whileHover={
              !isMobile
                ? {
                    scale: 1.05,
                    textShadow: "0 0 40px rgba(251, 191, 36, 0.8)",
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            Apart
          </motion.span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="relative z-10 mx-auto mb-8 max-w-3xl text-lg leading-relaxed font-light text-gray-700 sm:text-xl md:text-2xl"
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
            className="font-semibold text-orange-500"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            data science
          </motion.span>{" "}
          and{" "}
          <motion.span
            className="font-semibold text-orange-500"
            whileHover={
              !isMobile
                ? {
                    textShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
                    scale: 1.05,
                  }
                : {}
            }
          >
            web development
          </motion.span>{" "}
          to create innovative, future-ready solutions that drive business
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
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Get Started</span>
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

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
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
              whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative h-64 w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
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
                  whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-amber-400"
                    whileHover={
                      !isMobile
                        ? {
                            filter:
                              "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))",
                          }
                        : {}
                    }
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
