"use client";

import Image from "next/image";
import { Sparkles, Users, Puzzle, Scaling } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useRef, useEffect, useState } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const features = [
  {
    id: 1,
    title: "Innovation at the Core",
    description: "Cutting-edge solutions that drive business transformation",
    icon: <Sparkles className="h-10 w-10" />,
    image: "/assets/images/offers_bg01.png",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-10 w-10" />,
    image: "/assets/images/offers_bg02.png",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-10 w-10" />,
    image: "/assets/images/offers_bg03.png",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-10 w-10" />,
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "50%" : "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-10%" : "-20%"]);

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
    if (typeof window === "undefined" || isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = 30;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
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
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

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
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.section
      ref={containerRef}
      id="offers"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundPositionY: backgroundY }}
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
        className="absolute inset-0 opacity-30"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
          ],
        } : {}}
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
            className="absolute top-1/4 left-10 h-32 w-32 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-10 bottom-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            } : {}}
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
        className="relative z-10 container flex flex-col items-center gap-16 px-6 py-24"
        style={{ y: textY }}
      >
        {/* 3D Models */}
        <div className="relative mx-auto w-full max-w-7xl">
          {/* Left Model */}
          {!isMobile && (
            <motion.div
              className="absolute top-1/2 left-4 z-20 hidden h-[300px] w-[300px] -translate-y-1/2 md:block"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={
                hasIntersected ? { scale: 1, rotate: 0, opacity: 0.8 } : {}
              }
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div animate={!prefersReducedMotion ? floatingAnimation : {}}>
                <motion.div
                  animate={!prefersReducedMotion ? {
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="h-full w-full"
                >
                  <ModelViewer
                    url="/bolb-1.glb"
                    style={{ height: "100%", width: "100%" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Right Model */}
          {!isMobile && (
            <motion.div
              className="absolute top-1/2 right-4 z-20 hidden h-[300px] w-[300px] -translate-y-1/2 md:block"
              initial={{ scale: 0, rotate: 180, opacity: 0 }}
              animate={
                hasIntersected ? { scale: 1, rotate: 0, opacity: 0.8 } : {}
              }
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div
                animate={!prefersReducedMotion ? {
                  y: [0, 20, 0],
                } : {}}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-full"
              >
                <motion.div
                  animate={!prefersReducedMotion ? {
                    rotate: -360,
                  } : {}}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-full w-full"
                >
                  <ModelViewer
                    url="/bolb-2.glb"
                    style={{ height: "100%", width: "100%" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.div
          className="perspective-1000 text-center"
          variants={titleVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2 className="text-5xl leading-tight font-black tracking-tighter uppercase md:text-[70px] lg:text-[120px]">
            <motion.span
              className="text-black"
              whileHover={!isMobile ? {
                scale: 1.05,
                textShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
                transition: { duration: 0.3 },
              } : {}}
            >
              What Sets Us{" "}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
              whileHover={!isMobile ? {
                scale: 1.05,
                textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                transition: { duration: 0.3 },
              } : {}}
            >
              Apart
            </motion.span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed font-light text-black md:text-xl"
            initial={{ opacity: 0, y: isMobile ? 30 : 50, filter: isMobile ? "none" : "blur(5px)" }}
            animate={
              hasIntersected ? { opacity: 1, y: 0, filter: "none" } : {}
            }
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.3, ease: "easeOut" }}
          >
            At Camino Code, we combine{" "}
            <motion.span
              className="font-semibold text-amber-400"
              whileHover={!isMobile ? {
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              data science
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="font-semibold text-amber-400"
              whileHover={!isMobile ? {
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              web development
            </motion.span>{" "}
            to create innovative, future-ready solutions.
          </motion.p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
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
                    "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.ul
          className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          initial={{ opacity: 0, y: isMobile ? 30 : 50, filter: isMobile ? "none" : "blur(10px)" }}
          animate={
            hasIntersected ? { opacity: 1, y: 0, filter: "none" } : {}
          }
          transition={{ delay: 0.6, duration: isMobile ? 0.5 : 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={feature.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
              whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="group relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    quality={90}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                    whileHover={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                  <motion.div
                    className="mb-4 rounded-full border border-white/10 bg-gradient-to-r from-amber-400/20 to-red-600/20 p-4 backdrop-blur-sm"
                    whileHover={!isMobile ? { scale: 1.1, rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* CSS Animation */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.section>
  );
}
