"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

export default function AboutMissionVision() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredWord, setHoveredWord] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const cardHoverTimeoutRef = useRef(null);

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

  const handleCardHoverStart = (index) => {
    if (cardHoverTimeoutRef.current) {
      clearTimeout(cardHoverTimeoutRef.current);
    }
    setHoveredCard(index);
  };

  const handleCardHoverEnd = () => {
    cardHoverTimeoutRef.current = setTimeout(() => {
      setHoveredCard(null);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (cardHoverTimeoutRef.current) clearTimeout(cardHoverTimeoutRef.current);
    };
  }, []);
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

  const missionVisionCards = [
    {
      title: "Mission",
      icon: "🎯",
      description: "At Camino Code, our mission is to deliver innovative Applied AI and intelligent automation solutions that empower businesses to thrive in a fast-paced digital world. We combine technical expertise with AI innovation to develop scalable, intelligent, and high-performing systems."
    },
    {
      title: "Vision",
      icon: "🔭",
      description: "Our vision is to become a global leader in Applied AI and intelligent automation by setting new standards for innovation, performance, and customer satisfaction. We envision a future where businesses of all sizes have access to intelligent, scalable, and efficient AI-powered solutions."
    }
  ];

  const valueCards = [
    {
      emoji: "🚀",
      title: "Innovation First"
    },
    {
      emoji: "🔒",
      title: "Secure Systems"
    },
    {
      emoji: "📈",
      title: "Scalable Growth"
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 sm:py-32"
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

      <div className="container relative z-10 mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        {/* Centered Title */}
        <motion.div className="perspective-1000 mb-8 text-center">
          <motion.h2 
            className="text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gray-900"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              className="block"
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
              WHO WE
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent"
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
              ARE
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto mb-16">
          {missionVisionCards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut" 
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200/80 shadow-xl p-8"
              animate={
                hoveredCard === index && !isMobile
                  ? {
                      scale: 1.03,
                      y: -8,
                    }
                  : {
                      scale: 1,
                      y: 0,
                    }
              }
              onHoverStart={() => handleCardHoverStart(index)}
              onHoverEnd={handleCardHoverEnd}
            >
              {/* Subtle gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-600/5 opacity-0"
                animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />

              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="text-5xl"
                    animate={
                      hoveredCard === index && !isMobile && !prefersReducedMotion
                        ? {
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.15, 1],
                          }
                        : {}
                    }
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-700">
                  {card.description}
                </p>
              </div>

              {/* Decorative corner */}
              <motion.div
                className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/10 to-red-600/10 blur-2xl"
                animate={
                  hoveredCard === index && !isMobile && !prefersReducedMotion
                    ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }
                    : {}
                }
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Values Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {valueCards.map((card, index) => {
            const cardIndex = index + 2; // Offset para no conflictuar con mission/vision
            return (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200/80 shadow-xl p-8"
                animate={
                  hoveredCard === cardIndex && !isMobile
                    ? {
                        scale: 1.05,
                        y: -10,
                      }
                    : {
                        scale: 1,
                        y: 0,
                      }
                }
                onHoverStart={() => handleCardHoverStart(cardIndex)}
                onHoverEnd={handleCardHoverEnd}
              >
                {/* Subtle overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-600/5 opacity-0"
                  animate={{ opacity: hoveredCard === cardIndex ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Emoji */}
                  <motion.div
                    className="mb-4 text-5xl"
                    animate={
                      hoveredCard === cardIndex && !isMobile && !prefersReducedMotion
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0],
                          }
                        : {}
                    }
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {card.emoji}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {card.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
