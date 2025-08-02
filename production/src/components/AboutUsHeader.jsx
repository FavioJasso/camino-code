"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsHero() {
  return (
    <section
      id="about-hero"
      className="relative flex h-auto flex-col items-center justify-center gap-6 px-6 py-24 text-center sm:gap-8 sm:px-8 sm:py-20 md:gap-[34px] md:px-10"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/about_background.png"
          alt="About Us Background"
          fill
          className="object-cover blur-[1px] grayscale"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-white uppercase sm:text-5xl sm:leading-[2.5rem] md:text-6xl md:leading-[3rem] lg:text-7xl lg:leading-[3.5rem] xl:text-8xl xl:leading-[4rem] 2xl:text-9xl 2xl:leading-[6rem]"
      >
        <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          About
        </span>{" "}
        Us
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-sm text-white/90 sm:text-base md:text-lg"
      >
        At Camino Code, we specialize in delivering advanced data science and
        web development solutions. Our goal is to empower businesses with
        innovative, scalable, and intelligent platforms that drive growth and
        efficiency.
      </motion.p>
    </section>
  );
}
