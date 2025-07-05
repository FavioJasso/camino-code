"use client";

import { Layers2, Laptop, Cpu, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { staggerContainer } from "@/utils/animations";
import { useRef, useEffect, useState } from "react";

const services = [
  {
    id: 1,
    title: "Data Science",
    icon: <Layers2 className="h-8 w-8" />,
    items: [
      "Predictive Analytics",
      "Machine Learning Models",
      "Big Data Solutions",
    ],
  },
  {
    id: 2,
    title: "Software Development",
    icon: <Laptop className="h-8 w-8" />,
    items: [
      "Custom Web Applications",
      "Scalable Architecture",
      "Performance Optimization",
    ],
  },
  {
    id: 3,
    title: "Automated Solutions",
    icon: <Cpu className="h-8 w-8" />,
    items: ["Natural Language Processing", "AI-Driven Insights"],
  },
];

export default function ServicesSection() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
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
      filter: "blur(10px)"
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
      filter: "blur(5px)"
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundPositionY: backgroundY }}
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
        className="absolute left-10 top-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl"
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
        className="absolute bottom-1/4 right-10 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
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
        className="relative z-10 container flex flex-col items-center gap-10 px-6 py-24 md:flex-row"
        style={{ y: textY }}
      >
        {/* Left Column */}
        <motion.div
          className="flex w-full flex-col items-center text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left"
          variants={staggerContainer}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
        >
          <motion.div className="perspective-1000">
            <motion.h2
              className="text-5xl leading-tight font-black uppercase tracking-tighter md:text-[70px] lg:text-[120px]"
              variants={titleVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
            >
              <motion.span 
                className="block"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(255, 255, 255, 0.8)",
                  transition: { duration: 0.3 },
                }}
              >
                Our
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                  transition: { duration: 0.3 },
                }}
              >
                Services
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/80 md:text-xl"
            initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
            animate={hasIntersected ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            At Camino Code, we provide{" "}
            <motion.span
              className="font-semibold text-amber-400"
              whileHover={{ 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              }}
            >
              cutting-edge solutions
            </motion.span>{" "}
            in data science and web development to help businesses unlock new opportunities and drive growth.
          </motion.p>

          <motion.div
            className="mt-8 flex h-[300px] w-full items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={hasIntersected ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <motion.div
              animate={floatingAnimation}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-transparent blur-3xl" />
                <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
              </motion.div>
            </motion.div>
          </motion.div>
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
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-md border border-white/10"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <div className="relative flex items-center justify-between gap-4">
                <h3 className="text-xl font-black uppercase tracking-tight md:text-2xl">
                  {service.title}
                </h3>
                <motion.div
                  className="rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 p-3 backdrop-blur-sm"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-amber-400"
                    whileHover={{ filter: "drop-shadow(0 0 20px rgba(245, 158, 11, 0.8))" }}
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
            animate={hasIntersected ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/services">
              <motion.button
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">Explore All Services</span>
                <motion.span
                  className="relative z-10 ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-5 w-5" />
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
      </motion.div>
    </motion.section>
  );
}
