"use client";

import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useRef } from "react";

export default function AboutSection() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const titleWords = "Shaping the Future of Technology".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    }),
  };

  const splineVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 0.7,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative mx-auto flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-900 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-[1]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Decorative floating elements */}
      <motion.div
        className="absolute left-20 top-1/3 h-40 w-40 rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl"
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
        className="absolute bottom-1/3 right-20 h-48 w-48 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-3xl"
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
        ref={containerRef}
        style={{ y, opacity }}
        className="relative z-10 flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-8 text-center px-6">
        {/* Top Left Spline Model */}
        <motion.div
          className="absolute top-0 left-10 h-[250px] w-[250px] -translate-x-1/4 -translate-y-1/4 sm:h-[350px] sm:w-[350px]"
          variants={splineVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
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
            whileHover={{ scale: 1.2 }}
            className="h-full w-full"
          >
            <Spline
              scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>

        {/* Bottom Right Spline Model */}
        <motion.div
          className="absolute right-10 bottom-0 h-[250px] w-[250px] translate-x-1/4 translate-y-1/4 sm:h-[350px] sm:w-[350px]"
          variants={splineVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
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
            whileHover={{ scale: 1.2 }}
            className="h-full w-full"
          >
            <Spline
              scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
              className="h-full w-full"
            />
          </motion.div>
        </motion.div>

        {/* Heading with split text animation */}
        <motion.h2
          className="perspective-1000 mx-auto w-full max-w-[900px] text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              className={`mr-4 inline-block ${
                word === "Technology"
                  ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                  : "text-white"
              }`}
              custom={index}
              variants={wordVariants}
              whileHover={
                word === "Technology"
                  ? {
                      scale: 1.05,
                      textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                      transition: { duration: 0.3 },
                    }
                  : {
                      scale: 1.02,
                      transition: { duration: 0.3 },
                    }
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Description with fade in animation */}
        <motion.p
          className="relative z-10 mx-auto mb-8 max-w-3xl text-lg font-light leading-relaxed text-white/80 sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={hasIntersected ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(10px)" }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          At Camino Code, we are passionate about transforming businesses
          through the power of{" "}
          <motion.span
            className="font-semibold text-amber-400"
            whileHover={{ 
              textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
              scale: 1.05,
            }}
          >
            data and technology
          </motion.span>
          . Founded with a vision to redefine the digital landscape, we specialize in{" "}
          <motion.span
            className="font-semibold text-amber-400"
            whileHover={{ 
              textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
              scale: 1.05,
            }}
          >
            cutting-edge solutions
          </motion.span>{" "}
          designed to drive innovation and growth.
        </motion.p>

        {/* Button with advanced hover effects */}
        <motion.div
          className="relative z-10"
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
              <span className="relative z-10">Learn More</span>
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

      </motion.div>
    </motion.section>
  );
}
