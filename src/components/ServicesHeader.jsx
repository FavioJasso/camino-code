// components/ServicesHeader.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function ServicesHeader() {
  return (
    <header
      className="relative flex h-[800px] items-center justify-center bg-[radial-gradient(111.43%_111.43%_at_50%_50%,#222_0%,#000_100%)] overflow-hidden"
    >
      {/* Main Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto px-6 container">
        {/* Text Content */}
        <div className="z-10 flex flex-col gap-6 w-full md:w-1/2">
          {/* Animated Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-tight text-white">
              <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
                Code.
              </span>{" "}
              Innovate. Elevate.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xl text-base md:text-lg text-white/80"
            >
              Empowering businesses with advanced data science, web development,
              and AI integration.
            </motion.p>
          </motion.div>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white hover:opacity-90"
            >
              Explore Our Services
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        {/* Decorative Image */}
        <div className="relative size-[500px] md:size-[600px] mt-10 md:mt-0">
          <Image
            src="/assets/Vector-3.png"
            alt="Decorative Vector"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>
    </header>
  );
}
