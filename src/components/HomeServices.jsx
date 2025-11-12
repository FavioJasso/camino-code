"use client";

import { Brain, Cpu, Database, ArrowBigRightIcon, ArrowBigRightDashIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { staggerContainer } from "@/utils/animations";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const services = [
  {
    id: 1,
    title: "Applied AI Systems",
    icon: <Brain className="h-8 w-8 text-amber-400" />,
    items: [
      "Natural Language Processing",
      "Computer Vision & Recognition",
      "Generative AI Integrations",
    ],
  },
  {
    id: 2,
    title: "Data Intelligence & Engineering",
    icon: <Database className="h-8 w-8 text-amber-400" />,
    items: [
      "Data Pipeline Design (ETL/ELT, APIs)",
      "Predictive Analytics & Dashboards",
      "Database Architecture (SQL/NoSQL)",
    ],
  },
  {
    id: 3,
    title: "Product Engineering",
    icon: <Cpu className="h-8 w-8 text-amber-400" />,
    items: [
      "Web & Mobile Development",
      "AI-Integrated Platforms",
      "Performance & Reliability Engineering",
    ],
  },
];

export default function ServicesSection() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useIsMobile();
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: "blur(5px)",
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
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
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = 60;

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

  return (
    <motion.section
      ref={containerRef}
      id="services"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundPositionY: backgroundY }}
      layout={false}
    >
      {/* Animated particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 h-32 w-32 rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-10 bottom-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        ref={sectionRef}
        className="relative z-10 container flex flex-col items-center justify-center gap-10 px-6 py-20 min-h-screen md:min-h-0 md:py-24 md:flex-row"
        style={isMobile ? {} : { y: textY }}
      >
        {/* Left Column */}
        <motion.div
          className="flex w-full flex-col items-center text-center text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left"
          variants={staggerContainer}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
        >
          <motion.div
            className="perspective-1000 mb-8 overflow-visible"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            <motion.h2 className="flex flex-col items-center md:items-start justify-center">
              <motion.span
                className="inline-block text-white text-5xl font-black uppercase tracking-tighter md:text-[70px] lg:text-[120px] px-4"
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
                Our
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent text-5xl font-black uppercase tracking-tighter md:text-[70px] lg:text-[120px] px-4"
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
                Services
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed font-light text-white/80 md:text-xl text-balance"
            initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
            animate={
              hasIntersected ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            At Camino Code, we provide{" "}
            <motion.span
              className="font-semibold text-amber-400 whitespace-nowrap"
              whileHover={!isMobile ? {
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              Cutting-edge AI solutions
            </motion.span>{" "}
            and intelligent automation to help businesses unlock new
            opportunities and drive growth.
          </motion.p>

          {/* 3D Object - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className="mt-16 flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={hasIntersected ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              <motion.div animate={floatingAnimation} className="w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent blur-3xl" />
                  <LazySpline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" className="w-full h-full" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Services Cards */}
        <motion.div
          className="flex w-full flex-col gap-6 text-white md:w-1/2 md:px-8 md:py-12"
          variants={staggerContainer}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-md"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex items-center justify-between gap-4">
                <h3 className="text-xl font-black tracking-tight uppercase md:text-2xl">
                  {service.title}
                </h3>
                <motion.div
                  className="rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 p-3 backdrop-blur-sm"
                  animate={
                    !isMobile && hoveredCard === service.id
                      ? { rotate: 360, scale: 1.1 }
                      : { rotate: 0, scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-amber-400"
                    animate={
                      hoveredCard === service.id
                        ? { filter: "drop-shadow(0 0 20px rgba(245, 158, 11, 0.8))" }
                        : { filter: "drop-shadow(0 0 0px rgba(245, 158, 11, 0))" }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>
              </div>
              <motion.ul
                className="relative mt-4 space-y-2 text-left text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {service.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-white/80"
                    initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.1 }}
                  >
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div
            className="flex w-full justify-center pt-6 md:justify-start"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={
              hasIntersected ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/services">
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
                <span className="relative z-10">Explore All Services</span>
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
      </motion.div>
    </motion.section>
  );
}

// Lazy-loaded Spline component to reduce main-thread work
function LazySpline({ scene, className }) {
  const [SplineComponent, setSplineComponent] = useState(null);

  useEffect(() => {
    // Delay loading Spline by 1 second to prioritize critical content
    const timer = setTimeout(() => {
      import("@splinetool/react-spline").then((module) => {
        setSplineComponent(() => module.default);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!SplineComponent) {
    return (
      <div className={className}>
        {/* Placeholder while Spline loads - invisible to avoid flashing */}
        <div className="w-full h-full opacity-0">
        </div>
      </div>
    );
  }

  return <SplineComponent scene={scene} className={className} />;
}
