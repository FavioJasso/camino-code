// components/AboutUsFounder.tsx
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Award, Rocket } from "lucide-react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

export default function AboutUsFounder() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.8, 1.1, 0.8]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-5, 5]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-5%" : "-10%"]);

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

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black py-24"
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        animate={!isMobile && !prefersReducedMotion ? {
          backgroundPosition: ["0px 0px", "50px 50px"],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating orbs */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/5 to-red-600/5 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-orange-400/5 to-amber-600/5 blur-2xl"
            animate={!prefersReducedMotion ? {
              x: [0, -40, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        /* Animated Heading with perspective */
          <motion.div className="perspective-1000 text-center mb-16">
            <motion.h1
              className="text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span 
                className="block text-white"
                whileHover={!isMobile ? {
            scale: 1.05,
            textShadow: "0 0 40px rgba(255, 255, 255, 0.8) text-amber-400",
            transition: { duration: 0.3 },
                } : {}}
              >
                OUR
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={!isMobile ? {
            scale: 1.05,
            textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
            transition: { duration: 0.3 },
                } : {}}
              >
                FOUNDER
              </motion.span>
            </motion.h1>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            {/* Founder Image with advanced effects */}
          <motion.div
            ref={imageRef}
            className="relative mx-auto max-w-lg lg:max-w-none"
            style={{ scale: imageScale, rotate: imageRotate }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* Glow effect */}
              {!isMobile && (
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 opacity-30 blur-2xl"
                  animate={!prefersReducedMotion ? {
                    opacity: [0.2, 0.4, 0.2],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400/20 to-red-600/20 p-1">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="/assets/images/about_founder.png"
                    alt="Our Founder"
                    width={600}
                    height={700}
                    className="w-full object-cover"
                    quality={90}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute top-6 right-6 rounded-full bg-gradient-to-r from-amber-400 to-red-600 p-4 shadow-2xl"
                    animate={!isMobile && !prefersReducedMotion ? {
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Award className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content with enhanced animations */}
          <motion.div
            className="text-left"
            style={{ y: textY }}
          >
            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                John Doe
              </h2>
              <p className="mt-2 text-lg text-amber-400 sm:text-xl">
                Founder & CEO
              </p>
            </motion.div>

            {/* Bio with animated highlighting */}
            <motion.p
              initial={{ opacity: 0, y: isMobile ? 20 : 30, filter: isMobile ? "none" : "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "none" }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg font-light leading-relaxed text-white/80 sm:text-xl"
            >
              With over 15 years of experience in{" "}
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
                software development
              </motion.span>
              , our founder has led teams at Fortune 500 companies and pioneered innovative solutions that have transformed businesses across industries.
            </motion.p>

            {/* Achievement cards */}
            <motion.div 
              className="mt-12 grid gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { number: "50+", label: "Projects Delivered", icon: <Rocket className="h-5 w-5" /> },
                { number: "15+", label: "Years Experience", icon: <Award className="h-5 w-5" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm"
                  whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <div className="mb-2 text-amber-400">{stat.icon}</div>
                    <motion.p 
                      className="text-3xl font-bold text-white"
                      animate={!isMobile && !prefersReducedMotion ? { 
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Quote */}
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative mt-12 rounded-2xl bg-gradient-to-br from-amber-400/10 to-red-600/10 p-8 backdrop-blur-sm"
            >
              <Quote className="absolute -top-4 -left-4 h-8 w-8 text-amber-400/50" />
              <p className="text-xl italic text-white/90 sm:text-2xl">
                "Innovation is seeing what everyone has seen and thinking what nobody has thought."
              </p>
              <Quote className="absolute -bottom-4 -right-4 h-8 w-8 rotate-180 text-amber-400/50" />
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
