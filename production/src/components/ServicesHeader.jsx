// components/PageHeader.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, Sparkles, Zap, Code2, Cpu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageHeader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black text-left md:flex-row md:justify-between">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,black_100%)]" />
        
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute -left-[400px] -top-[400px] h-[800px] w-[800px] rounded-full bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute -right-[400px] -bottom-[400px] h-[800px] w-[800px] rounded-full bg-gradient-to-r from-red-600/30 via-pink-600/20 to-transparent blur-3xl"
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-amber-400/50 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-center py-20 md:flex-row md:justify-between md:py-24 lg:py-32"
      >
        <div className="flex w-full flex-col gap-8 px-8 md:gap-12 md:px-10 lg:px-12">
          {/* Floating icons */}
          <div className="absolute -left-10 top-20 opacity-20">
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 360],
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            >
              <Code2 className="h-24 w-24 text-amber-400" />
            </motion.div>
          </div>
          <div className="absolute -right-20 top-40 opacity-20">
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                rotate: [360, 0],
              }}
              transition={{ 
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 15, repeat: Infinity, ease: "linear" }
              }}
            >
              <Cpu className="h-32 w-32 text-red-400" />
            </motion.div>
          </div>

          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 flex items-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-amber-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Transforming Ideas Into Reality
              </span>
            </motion.div>

            <h1 className="text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <motion.span 
                className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              >
                Code.
              </motion.span>{" "}
              <motion.span 
                className="relative inline-block text-white"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Innovate.
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.span>{" "}
              <motion.span 
                className="relative inline-block text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Elevate.
                <motion.div
                  className="absolute -inset-2 -z-10 bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:text-2xl"
            >
              Empowering businesses with advanced{" "}
              <span className="text-amber-400 font-semibold">data science</span>,{" "}
              <span className="text-orange-400 font-semibold">web development</span>,
              and <span className="text-red-400 font-semibold">AI integration</span>.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#services"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105"
            >
              <Zap className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Explore Our Services</span>
              <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            
            <Link
              href="/case-studies"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105"
            >
              <span>View Case Studies</span>
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* 3D Model Container */}
        <motion.div 
          className="relative -mr-48 -mb-20 h-[300px] w-[300px] md:-mr-10 md:mb-0 md:h-[490px] md:w-[498px]"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <Image
            src={"/assets/Vector-3.png"}
            alt="Decorative Vector"
            fill
            className="object-contain drop-shadow-2xl"
            quality={100}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <div className="h-6 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>
    </header>
  );
}
