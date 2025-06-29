'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutUsHero() {
  return (
    <section
      id="about-hero"
      className="relative flex flex-col items-center justify-center gap-6 px-6 py-24 text-center min-h-[700px]"
    >
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/about_background.png"
          alt="About Us Background"
          fill
          className="object-cover grayscale"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold uppercase text-white md:text-6xl"
      >
        <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          About
        </span>{' '}
        Us
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-base text-white/90"
      >
        At Camino Code, we specialize in delivering advanced data science and web development solutions. Our goal is to empower businesses with innovative, scalable, and intelligent platforms that drive growth and efficiency.
      </motion.p>
    </section>
  );
}
