"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
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
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.main
      className="relative container mx-auto flex h-[900px] w-full items-center justify-center overflow-hidden bg-[rgba(248,244,239,1)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.3 }}
      />

      {/* Top Right Animated Element */}
      <motion.div
        className="absolute top-0 -right-10 h-[250px] w-[250px] md:top-32 md:h-[318px] md:w-[315px]"
        initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
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
          <Image
            src="/assets/Vector-1.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain md:h-[318px] md:w-[315px]"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Left Animated Element */}
      <motion.div
        className="absolute -bottom-10 -left-10 h-[250px] w-[250px] md:-bottom-16 md:-left-32 md:h-[540px] md:w-[540px]"
        initial={{ opacity: 0, scale: 0.8, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/assets/Vector.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain md:h-[468px] md:w-[468px]"
          />
        </motion.div>
      </motion.div>

      {/* Centered Content */}
      <motion.section
        id="home"
        className="relative z-10 flex w-full flex-col items-center justify-center gap-6 px-8 py-10 text-center md:px-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="perspective-1000 w-full text-6xl font-bold text-black uppercase md:max-w-4xl md:text-6xl lg:text-6xl xl:text-[10rem]"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"
            custom={0}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            Code
          </motion.span>{" "}
          <motion.span
            custom={1}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
          >
            the Future
          </motion.span>
        </motion.h1>

        <motion.p
          className="w-full text-xs text-black sm:text-sm md:max-w-2xl md:text-base lg:text-[21px] lg:leading-[31px]"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          At Camino Code, we combine data science and web development to create
          innovative, future-ready solutions. From predictive analytics to
          custom web applications, we help businesses thrive in the digital age.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/contact">
            <motion.button
              className="group relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-8 py-4 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 font-medium">Get Started</span>
              <motion.span
                className="relative z-10 ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRightIcon className="h-4 w-4" />
              </motion.span>

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Ripple effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
                }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-2 h-3 w-1 rounded-full bg-gray-400"
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default HeroSection;
