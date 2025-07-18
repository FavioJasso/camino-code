"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

export default function AboutUsHero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, isMobile ? -50 : -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Split text animation for "ABOUT US"
  const titleWords = ["ABOUT", "US"];

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
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = isMobile ? 0 : (prefersReducedMotion ? 20 : 40);

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
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
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
  }, [dimensions]);

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 50 : 100,
      rotateX: isMobile ? 0 : -90,
      filter: isMobile ? "none" : "blur(10px)"
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        delay: i * (isMobile ? 0.1 : 0.2),
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[120vh] min-h-[900px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900"
    >
      {/* Animated particles canvas */}
      {!isMobile && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
          ],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        {/* Main Title with perspective */}
        <motion.div 
          className="perspective-1000 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="flex flex-col items-center justify-center">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                className={`block text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] ${
                  index === 0 
                    ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent" 
                    : "text-white"
                }`}
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: isMobile ? 20 : 30, filter: isMobile ? "none" : "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "none" }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: 0.6 }}
          className="mx-auto mb-12 max-w-3xl px-6 text-lg font-light leading-relaxed text-white/80 sm:text-xl md:text-2xl"
        >
          At Camino Code, we specialize in delivering{" "}
          <motion.span
            className="font-semibold text-amber-400"
            whileHover={{ 
              textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
              scale: 1.05,
            }}
          >
            advanced data science
          </motion.span>{" "}
          and{" "}
          <motion.span
            className="font-semibold text-amber-400"
            whileHover={{ 
              textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
              scale: 1.05,
            }}
          >
            web development solutions
          </motion.span>
          . Our goal is to empower businesses with innovative, scalable, and intelligent platforms that drive growth and efficiency.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="#about-hero">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Discover Our Story</span>
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
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-sm uppercase tracking-widest text-white/60">
            Scroll
          </span>
          <ArrowDown className="h-6 w-6 text-amber-400" />
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute left-10 top-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-2xl"
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
            className="absolute bottom-1/4 right-10 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-2xl"
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
    </section>
  );
}
