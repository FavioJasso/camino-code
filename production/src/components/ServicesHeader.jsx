// components/PageHeader.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function PageHeader() {
  return (
    <header className="relative flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(111.43%_111.43%_at_50%_50%,#222222_0%,#000000_100%)] text-left md:flex-row md:justify-between">
      {/* Content Container */}
      <div className="mx-auto flex max-w-[1440px] flex-col justify-center md:flex-row md:justify-between">
        <div className="relative z-10 flex w-full flex-col gap-4 px-6 md:gap-8">
          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <h1 className="text-4xl leading-tight font-bold text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
                Code.
              </span>{" "}
              Innovate. Elevate.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xl text-sm text-white/80 sm:text-base md:text-lg lg:text-xl"
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
