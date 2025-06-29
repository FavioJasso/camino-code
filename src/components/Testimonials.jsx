"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO of TechWave",
    quote:
      "Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO of StyleHub",
    quote:
      "Their expertise in web development and AI integration helped us scale our platform beyond our expectations.",
    stars: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Founder of FinServe",
    quote:
      "The AI-powered solutions they delivered revolutionized our customer service and reduced costs significantly.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
  });

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const testimonial = testimonials[currentTestimonial];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const testimonialVariants = {
    enter: {
      opacity: 0,
      x: 100,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      className="relative flex h-[800px] flex-col items-center justify-center gap-10 px-6 py-16 text-center text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/images/landing-bg2.png"
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: "100vh",
            }}
            animate={{
              y: "-10vh",
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.h2 
        className="font-bold uppercase text-5xl md:text-7xl lg:text-8xl leading-tight z-10"
        variants={containerVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
      >
        <motion.span variants={itemVariants}>What Our</motion.span>{" "}
        <motion.span 
          className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent inline-block"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
            transition: { duration: 0.3 }
          }}
        >
          Clients Say
        </motion.span>
      </motion.h2>

      {/* Testimonial Carousel */}
      <div className="container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className="flex flex-col items-center"
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Stars */}
            <motion.div 
              className="mb-6 flex gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              {[...Array(testimonial.stars)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -180, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.3 + i * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Star
                    className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-lg"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <motion.span
                className="absolute -top-8 -left-8 text-6xl text-amber-400/20 font-serif"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                "
              </motion.span>
              <p className="text-xl italic lg:text-2xl max-w-3xl px-8">
                {testimonial.quote}
              </p>
              <motion.span
                className="absolute -bottom-8 -right-8 text-6xl text-amber-400/20 font-serif rotate-180"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                "
              </motion.span>
            </motion.div>

            {/* Author */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.p 
                className="text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                {testimonial.name}
              </motion.p>
              <motion.p 
                className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent text-base italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {testimonial.role}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <motion.div 
        className="mt-8 flex gap-3 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentTestimonial(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`relative h-3 w-3 rounded-full transition-all duration-300 ${
              currentTestimonial === index 
                ? "bg-amber-400 w-8" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`View testimonial ${index + 1}`}
          >
            {currentTestimonial === index && (
              <motion.div
                className="absolute inset-0 rounded-full bg-amber-400"
                layoutId="activeTestimonial"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </motion.section>
  );
}
