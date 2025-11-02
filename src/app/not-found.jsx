"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ClientProviders from "@/components/ClientProviders";
import NavigationBar from "@/components/NavigationBar";
import { ArrowBigLeftIcon, ArrowBigLeftDashIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

export default function NotFound() {
  return (
    <ClientProviders>
      <NotFoundContent />
    </ClientProviders>
  );
}

function NotFoundContent() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

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
    const particleCount = 30;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
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
        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0.1, Math.min(0.5, this.opacity))})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.3;
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900">
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
              "radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.1) 0%, transparent 40%)",
              "radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.1) 0%, transparent 40%)",
              "radial-gradient(ellipse at top left, rgba(245, 158, 11, 0.1) 0%, transparent 40%)",
            ],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

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

        <div className="relative z-20 w-full">
          <NavigationBar />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 className="text-9xl md:text-[150px] font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-4 max-w-2xl text-3xl md:text-5xl font-bold text-white"
          >
            Page not found
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-lg text-lg text-white/70 leading-relaxed"
          >
            Sorry, the page you are looking for does not exist or has been moved. Use the navigation above or go back to the previous page.
          </motion.p>

          <motion.button
            variants={itemVariants}
            className="group text-lg font-semibold relative flex items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-t from-amber-600 to-red-600 px-8 py-4 text-white"
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
            onClick={() => window.history.back()}
          >
            <motion.span
              className="relative z-10"
              variants={{
                initial: { x: 0 },
                hover: {
                  x: [-5, 0, -5],
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
                    <ArrowBigLeftIcon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dash"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowBigLeftDashIcon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
            <span className="relative z-10">Go Back</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-600"
              variants={{
                initial: { y: "100%" },
                hover: { y: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>
        </motion.div>
      </div>
  );
}
