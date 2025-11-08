"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, Eye } from "lucide-react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

export default function AboutMissionVision() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "50%" : "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-10%" : "-20%"]);

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

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50,
      filter: isMobile ? "none" : "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        delay: isMobile ? 0.2 : 0.3,
        ease: "easeOut",
      },
    },
  };


  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white"
      style={{ backgroundPositionY: backgroundY }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={!isMobile && !prefersReducedMotion ? {
          background: [
            "radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.10) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.10) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(245, 158, 11, 0.10) 0%, transparent 50%)",
          ],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Mission Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Decorative Model removed */}

        <motion.section
          id="mission"
          className="container relative z-10 mx-auto px-6 py-24 sm:px-8 md:px-16 lg:px-24"
          style={{ y: textY }}
        >
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 p-4 backdrop-blur-sm"
              whileHover={!isMobile ? { scale: 1.1, rotate: 180 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Target className="h-8 w-8 text-amber-500" />
            </motion.div>
            <span className="text-sm font-medium uppercase tracking-widest text-amber-600">Our Purpose</span>
          </motion.div>

          <motion.div className="perspective-1000">
            <motion.h2 
              className="text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gray-900"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span 
                className="block"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                OUR
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                MISSION
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-gray-700 sm:text-xl md:text-2xl"
          >
            At Camino Code, our mission is to deliver{" "}
            <motion.span
              className="font-semibold text-amber-600"
              whileHover={!isMobile ? { 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              innovative Applied AI
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="font-semibold text-amber-600"
              whileHover={!isMobile ? { 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              intelligent automation solutions
            </motion.span>{" "}
            that empower businesses to thrive in a fast-paced digital world. We combine technical expertise with AI innovation to develop scalable, intelligent, and high-performing systems.
          </motion.p>

          {/* Animated feature cards */}
          <motion.div 
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "🚀", text: "Innovation First" },
              { icon: "🔒", text: "Secure Systems" },
              { icon: "📈", text: "Scalable Growth" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-100/40 to-white/80 p-6 backdrop-blur-sm border border-amber-100"
                whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-red-600/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-2 font-medium text-gray-900">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Vision Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Decorative Model removed */}

        <motion.section
          id="vision"
          className="container relative z-10 mx-auto px-6 py-24 text-right sm:px-8 md:px-16 lg:px-24"
          style={{ y: textY }}
        >
          <motion.div 
            className="flex items-center justify-end gap-4 mb-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-amber-600">Our Future</span>
            <motion.div
              className="rounded-full bg-gradient-to-r from-amber-400/20 to-red-600/20 p-4 backdrop-blur-sm"
              whileHover={!isMobile ? { scale: 1.1, rotate: -180 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Eye className="h-8 w-8 text-amber-500" />
            </motion.div>
          </motion.div>

          <motion.div className="perspective-1000">
            <motion.h2 
              className="text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gray-900"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span 
                className="block"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                OUR
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={!isMobile ? {
                  scale: 1.05,
                  textShadow: "0 0 40px rgba(245, 158, 11, 0.8)",
                  transition: { duration: 0.3 },
                } : {}}
              >
                VISION
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 ml-auto max-w-3xl text-lg font-light leading-relaxed text-gray-700 sm:text-xl md:text-2xl"
          >
            Our vision is to become a{" "}
            <motion.span
              className="font-semibold text-amber-600"
              whileHover={!isMobile ? { 
                textShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                scale: 1.05,
              } : {}}
            >
              global leader
            </motion.span>{" "}
            in Applied AI and intelligent automation by setting new standards for innovation, performance, and customer satisfaction. We envision a future where businesses of all sizes have access to intelligent, scalable, and efficient AI-powered solutions.
          </motion.p>

          {/* Animated sparkles */}
          <motion.div
            className="mt-12 flex justify-end"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-12 w-12 text-amber-500" />
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
