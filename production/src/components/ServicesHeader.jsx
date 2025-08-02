// components/PageHeader.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-left md:flex-row md:justify-between">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(111.43%_111.43%_at_50%_50%,#222222_0%,#000000_100%)] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-center py-20 md:flex-row md:justify-between md:py-24 lg:py-32">
        <div className="flex w-full flex-col gap-6 px-8 md:gap-10 md:px-10 lg:px-12">
          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                Code.
              </span>{" "}
              <span className="text-white">Innovate. Elevate.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-gray-200 sm:text-lg md:text-xl lg:text-2xl"
            >
              Empowering businesses with advanced data science, web development,
              and AI integration.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="#services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10">Explore Our Services</span>
              <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </motion.div>
        </div>

        <div className="relative -mr-48 -mb-20 h-[300px] w-[300px] md:-mr-10 md:mb-0 md:h-[490px] md:w-[498px]">
          <Image
            src={"/assets/Vector-3.png"}
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
