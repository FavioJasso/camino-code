"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  Binary, 
  Network, 
  Zap,
  Globe,
  Database,
  Brain,
  Layers
} from "lucide-react";

export default function AboutUsHeader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHovering]);

  // Floating tech icons configuration
  const floatingIcons = [
    { Icon: Code2, position: "top-[10%] left-[5%]", delay: 0, size: "h-8 w-8" },
    { Icon: Cpu, position: "top-[15%] right-[10%]", delay: 0.5, size: "h-6 w-6" },
    { Icon: Binary, position: "bottom-[20%] left-[8%]", delay: 1, size: "h-7 w-7" },
    { Icon: Network, position: "bottom-[15%] right-[5%]", delay: 1.5, size: "h-6 w-6" },
    { Icon: Database, position: "top-[40%] left-[3%]", delay: 2, size: "h-5 w-5" },
    { Icon: Brain, position: "top-[35%] right-[3%]", delay: 2.5, size: "h-7 w-7" },
    { Icon: Layers, position: "bottom-[40%] left-[90%]", delay: 3, size: "h-6 w-6" },
    { Icon: Globe, position: "bottom-[35%] right-[90%]", delay: 3.5, size: "h-5 w-5" },
  ];

  return (
    <section
      id="about-hero"
      className="relative flex min-h-[80vh] flex-col items-center justify-center gap-8 overflow-hidden bg-black px-8 py-32 text-center sm:gap-10 sm:px-10 md:min-h-[90vh] md:gap-12 md:px-12 lg:py-40"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#331800_1px,transparent_1px),linear-gradient(to_bottom,#331800_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-40 bottom-20 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-orange-500/20 to-red-500/20 blur-3xl"
        />
        
        {/* Center Gradient */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400/10 via-orange-500/10 to-red-600/10 blur-3xl"
        />

        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/about_background.png"
            alt="About Us Background"
            fill
            className="object-cover opacity-30"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute h-1 w-1 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>

      {/* Dynamic Mouse Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.3), transparent 40%)`,
        }}
      />

      {/* Floating Tech Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} pointer-events-none z-10`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <item.Icon className={`${item.size} text-orange-500/50`} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center gap-8">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500/20 blur-xl" />
          <div className="relative flex items-center gap-2 rounded-full border border-orange-500/30 bg-gray-900/80 px-6 py-3 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">Innovating Since 2020</span>
            <Sparkles className="h-4 w-4 text-orange-400" />
          </div>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 blur-3xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-5xl font-black tracking-tight text-transparent bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
              About Us
            </div>
          </motion.div>
          
          <div className="relative text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
            <span className="inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              About
            </span>{" "}
            <span className="inline-block bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text text-transparent">
              Us
            </span>
          </div>
        </motion.h1>

        {/* Animated Tech Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        />

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative max-w-4xl text-base font-medium leading-relaxed sm:text-lg md:text-xl lg:text-2xl"
        >
          <span className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent">
            At{" "}
            <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text font-bold text-transparent">
              Camino Code
            </span>
            , we specialize in delivering advanced{" "}
            <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-bold text-transparent">
              data science
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text font-bold text-transparent">
              web development
            </span>{" "}
            solutions. Our goal is to empower businesses with innovative, scalable, and intelligent platforms that drive growth and efficiency.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-t from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              Our Journey
              <Zap className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-xl border border-orange-500/30 bg-gray-900/50 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-orange-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              Meet the Team
              <Network className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500/30 blur-md" />
          <div className="relative h-12 w-7 rounded-full border-2 border-orange-400/50 p-1 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2.5 w-2.5 mx-auto rounded-full bg-gradient-to-t from-amber-400 to-red-600"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}