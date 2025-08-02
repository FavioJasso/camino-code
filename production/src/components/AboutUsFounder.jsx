// components/AboutUsFounder.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutUsFounder() {
  return (
    <section
      id="founder"
      className="flex h-auto flex-col items-center justify-center gap-8 px-6 py-16 text-center sm:gap-10 sm:px-8 sm:py-20 md:px-10"
    >
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        Our{' '}
        <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Founder
        </span>
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl text-sm text-gray-600 sm:text-base md:text-lg"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos
        corrupti sit beatae fugiat in saepe, reiciendis iusto? Illo dolores quia
        veniam animi beatae iure doloribus officia. Libero consectetur, rem
        molestias natus repellat quos harum fugit deserunt unde fuga culpa
        repudiandae aut facere impedit adipisci, tempore error dicta sequi? Saepe.
      </motion.p>

      {/* Founder Image with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl"
      >
        <Image
          src="/assets/images/partner_1.png"
          alt="Our Founder"
          width={800}
          height={600}
          className="w-full object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>

      {/* Optional Founder Quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-6 max-w-2xl text-lg italic text-gray-700 sm:text-xl md:text-2xl"
      >
        "Innovation is seeing what everyone has seen and thinking what nobody has thought."
      </motion.blockquote>
    </section>
  );
}