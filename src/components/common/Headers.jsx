"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowBigRightIcon, ArrowBigRightDashIcon } from "lucide-react";
import Link from "next/link";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const PageHeader = ({
  sectionId,
  titleWords,
  description,
  items,
  ctaLabel,
  ctaLink,
  gradientWordIndex = 1,
}) => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8, 0.85],
    [1, 0.8, 0.6, 0.4, 0.1]
  );

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

  useEffect(() => {
    if (typeof window === "undefined" || isMobile || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulse = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += Math.sin(Date.now() * this.pulse) * 0.01;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0.1, Math.min(0.8, this.opacity))})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();
  }, [dimensions, isMobile, prefersReducedMotion]);

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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative flex w-full flex-col items-center overflow-visible bg-gradient-to-b from-neutral-900 via-black to-neutral-900"
    >
      {!isMobile && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      <motion.div
        className="absolute inset-0 z-[1]"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.15) 0%, transparent 40%)",
            "radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.15) 0%, transparent 40%)",
            "radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.15) 0%, transparent 40%)",
          ],
        } : {}}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative min-h-[100vh] z-10 flex flex-col items-center justify-center text-center overflow-visible w-full md:pt-24 pt-20"
      >
        <motion.div
          className="perspective-1000 mb-8 overflow-visible"
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
                className={`inline-block text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] px-4 ${index === gradientWordIndex
                  ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                  : "text-white"
                  }`}
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: index === gradientWordIndex
                    ? "0 0 50px rgba(245, 158, 11, 0.2)"
                    : "0 0 50px rgba(255, 255, 255, 0.2)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: isMobile ? 20 : 30, filter: isMobile ? "none" : "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "none" }}
          transition={{ duration: isMobile ? 0.6 : 1, delay: 0.6 }}
          className="mx-auto mb-12 max-w-5xl px-6 text-lg font-light leading-relaxed text-white/80 sm:text-xl md:text-2xl text-balance"
        >
          {typeof description === 'string' ? description : description}
        </motion.p>

        <motion.div
          className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm max-w-[190px] mx-auto"
              whileHover={!isMobile ? {
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              } : {}}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="relative z-10 flex flex-col items-center"
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 text-amber-400">{item.icon}</div>
                <p className="text-sm font-medium text-white/80 text-center">{item.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href={ctaLink}>
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
              <span className="relative z-10">{ctaLabel}</span>
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

      {!isMobile && (
        <>
          <motion.div
            className="absolute left-20 top-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-20 h-48 w-48 rounded-full bg-gradient-to-r from-orange-400/10 to-amber-600/10 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
            } : {}}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <div className="relative w-full h-24 flex items-center justify-center">
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], opacity: [0.6, 0.6, 0.6] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm uppercase tracking-widest text-white/60">
              Scroll
            </span>
            <ArrowDown className="h-6 w-6 text-amber-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;


