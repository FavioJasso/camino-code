"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsHero() {
  return (
    <section
      id="about-hero"
      className="relative flex min-h-[60vh] flex-col items-center justify-center gap-8 overflow-hidden px-8 py-32 text-center sm:gap-10 sm:px-10 md:min-h-[70vh] md:gap-12 md:px-12 lg:py-40"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/about_background.png"
          alt="About Us Background"
          fill
          className="object-cover scale-105 transition-transform duration-[3000ms] hover:scale-100"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]"
      >
        <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          About
        </span>{" "}
        <span className="text-white drop-shadow-2xl">Us</span>
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="max-w-3xl text-base font-medium leading-relaxed text-gray-100 drop-shadow-lg sm:text-lg md:text-xl lg:text-2xl"
      >
        At Camino Code, we specialize in delivering advanced data science and
        web development solutions. Our goal is to empower businesses with
        innovative, scalable, and intelligent platforms that drive growth and
        efficiency.
      </motion.p>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-5 rounded-full border-2 border-white/50 p-1"
        >
          <div className="h-2 w-2 mx-auto rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
