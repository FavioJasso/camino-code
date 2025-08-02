// components/AboutUsFounder.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUsFounder() {
  return (
    <section
      id="founder"
      className="flex min-h-[80vh] flex-col items-center justify-center gap-10 px-8 py-20 text-center sm:gap-12 sm:px-10 sm:py-24 md:gap-14 md:px-12 lg:py-32"
    >
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl animate-fade-in-up"
      >
        Our{" "}
        <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
          Founder
        </span>
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl md:text-2xl animate-fade-in-up animation-delay-200"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos
        corrupti sit beatae fugiat in saepe, reiciendis iusto? Illo dolores quia
        veniam animi beatae iure doloribus officia. Libero consectetur, rem
        molestias natus repellat quos harum fugit deserunt unde fuga culpa
        repudiandae aut facere impedit adipisci, tempore error dicta sequi?
        Saepe.
      </motion.p>

      {/* Founder Image with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400"
      >
        <Image
          src="/assets/images/partner_1.png"
          alt="Our Founder"
          width={800}
          height={600}
          className="w-full object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 hover:opacity-70" />
      </motion.div>

      {/* Optional Founder Quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-8 max-w-3xl text-xl font-medium text-gray-800 italic sm:text-2xl md:text-3xl lg:text-4xl animate-fade-in-up animation-delay-600"
      >
        "Innovation is seeing what everyone has seen and thinking what nobody
        has thought."
      </motion.blockquote>
    </section>
  );
}
