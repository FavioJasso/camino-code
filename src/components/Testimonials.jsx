// Changes:
// - All text colors are now lighter for better contrast on black background.
// - Used text-white, text-white/90, text-white/80, text-white/60, etc. for all text elements.
// - Removed gradients from text, replaced with solid white or white/amber for accent.
// - Ensured navigation dots and scroll indicator are visible on black.

"use client";

import { Star, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const testimonials = [
  {
    id: 1,
    name: "Juan Porras",
    role: "Founder",
    company: "Victoria's Painting",
    quote:
      "His ability to turn my ideas into a modern, functional, and visually appealing design exceeded all my expectations.",
    stars: 5,
    image: "/assets/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Daniel Avila",
    role: "IT Support Professional",
    company: "danielavila.tech",
    quote:
      "They didn't just build me a website, they helped me create an online presence that actually feels like me.",
    stars: 5,
    image: "/assets/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Founder of FinServe",
    company: "FinServe Technologies",
    quote:
      "The AI-powered solutions they delivered revolutionized our customer service and reduced costs significantly.",
    stars: 5,
    image: "/assets/images/testimonial-3.jpg",
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
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

  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-10%" : "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 25;

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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isAutoPlaying]);

  const testimonial = testimonials[currentTestimonial];

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
      rotateX: isMobile ? 0 : -90,
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

  const testimonialVariants = {
    enter: {
      opacity: 0,
      x: 300,
      scale: 0.8,
      rotateY: 45,
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
    exit: {
      opacity: 0,
      x: -300,
      scale: 0.8,
      rotateY: -45,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black py-24 sm:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ opacity }}
    >
      {!isMobile && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      <motion.div
        className="absolute inset-0 opacity-20"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(ellipse at 0% 0%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 100% 100%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 0% 0%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
          ],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {!isMobile && (
        <>
          <motion.div
            className="absolute left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-amber-400/5 to-red-600/5 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-gradient-to-r from-orange-400/5 to-amber-600/5 blur-2xl"
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

      <div ref={observerRef} className="relative z-10 container mx-auto px-6 sm:px-8">
        {/* Heading with dramatic animation */}
        <motion.div
          className="perspective-1000 mb-16 overflow-visible"
          variants={titleVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          <motion.h2 className="flex flex-col items-center justify-center">
            <motion.span
              className="inline-block text-white text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl px-4"
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
              CLIENT
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl px-4"
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
              TESTIMONIALS
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className="perspective-1000 flex flex-col items-center"
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <motion.div
              className="relative max-w-4xl rounded-3xl bg-gradient-to-br from-white/5 to-white/10 p-12 backdrop-blur-md"
              whileHover={!isMobile ? {
                scale: 1.02,
                transition: { duration: 0.3 }
              } : {}}
            >
              {!isMobile && (
                <motion.div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 opacity-0 blur-xl"
                  animate={!prefersReducedMotion ? {
                    opacity: [0, 0.3, 0],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              <motion.div
                className="mb-8 flex justify-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                {[...Array(testimonial.stars)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={!isMobile ? {
                      scale: 1.3,
                      rotate: 360,
                      transition: { duration: 0.3 },
                    } : {}}
                  >
                    <Star className="h-8 w-8 fill-amber-400 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative mb-8"
              >
                <Quote className="absolute -top-6 -left-6 h-16 w-16 text-amber-400/20" />
                <motion.p
                  className="text-center text-2xl font-light leading-relaxed text-white/90 sm:text-3xl"
                  style={{ y: parallaxY }}
                >
                  {testimonial.quote}
                </motion.p>
                <Quote className="absolute -bottom-6 -right-6 h-16 w-16 rotate-180 text-amber-400/20" />
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div
                  className="mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-red-600 p-0.5"
                  whileHover={!isMobile ? { scale: 1.1, rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </motion.div>

                <motion.h3
                  className="text-2xl font-semibold text-white"
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p
                  className="mt-1 text-lg text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {testimonial.role}
                </motion.p>
                <motion.p
                  className="mt-1 text-sm text-white/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {testimonial.company}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`relative h-3 rounded-full transition-all duration-500 ${
                currentTestimonial === index
                  ? "w-12 bg-amber-400"
                  : "w-3 bg-white/60 hover:bg-white/80"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View testimonial ${index + 1}`}
            >
              {currentTestimonial === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-400"
                  layoutId="activeTestimonial"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
