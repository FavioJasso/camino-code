"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { fadeInUp, scaleIn, textReveal } from "@/utils/animations";

export default function AboutSection() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

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
      y: 50,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const splineVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
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
      className="relative flex h-[120vh] items-center justify-center overflow-hidden rounded-lg bg-black mx-auto md:h-auto md:px-10 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 text-center h-full">
        {/* Top Left Spline Model */}
        <motion.div 
          className="absolute top-0 left-10 h-[200px] w-[200px] -translate-x-1/4 -translate-y-1/4 sm:h-[300px] sm:w-[300px]"
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
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
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
          className="absolute bottom-0 right-10 h-[200px] w-[200px] translate-x-1/4 translate-y-1/4 sm:h-[300px] sm:w-[300px]"
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
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
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
          className="mx-auto w-full max-w-[900px] text-5xl font-bold uppercase text-white leading-[60px] md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] perspective-1000"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-4 ${
                word === "Technology" 
                  ? "bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent" 
                  : ""
              }`}
              custom={index}
              variants={wordVariants}
              whileHover={word === "Technology" ? {
                scale: 1.05,
                textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
                transition: { duration: 0.3 }
              } : {}}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Description with fade in animation */}
        <motion.p 
          className="relative z-10 max-w-md text-xs text-white sm:text-sm md:max-w-lg md:text-base lg:max-w-xl lg:text-lg"
          variants={fadeInUp}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
          transition={{ delay: 0.8 }}
        >
          At Camino Code, we are passionate about transforming businesses
          through the power of data and technology. Founded with a vision to
          redefine the digital landscape, we specialize in cutting-edge data
          science and web development solutions designed to drive innovation and
          growth.
        </motion.p>

        {/* Button with advanced hover effects */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/contact">
            <motion.button
              className="relative overflow-hidden flex items-center justify-center gap-1 rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-8 py-4 text-white group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 font-medium">Learn More</span>
              <motion.span 
                className="ml-2 relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRightIcon className="h-4 w-4" />
              </motion.span>
              
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                initial={{ x: "-100%" }}
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
                  background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: "100vh",
              }}
              animate={{
                y: "-10vh",
                x: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
