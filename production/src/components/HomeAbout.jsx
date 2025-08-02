"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto flex min-h-[80vh] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 px-8 py-20 shadow-2xl sm:px-10 sm:py-24 md:min-h-[600px] md:gap-12 md:px-16 lg:py-32"
    >
      <div className="relative flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-10 text-center">
        {/* Top Left Spline Model */}
        <div className="absolute top-0 left-10 h-[200px] w-[200px] -translate-x-1/4 -translate-y-1/4 opacity-60 transition-all duration-500 hover:scale-110 hover:opacity-90 sm:h-[300px] sm:w-[300px]">
          <Spline
            scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
            className="h-full w-full"
          />
        </div>

        {/* Bottom Right Spline Model */}
        <div className="absolute right-10 bottom-0 h-[200px] w-[200px] translate-x-1/4 translate-y-1/4 opacity-60 transition-all duration-500 hover:scale-110 hover:opacity-90 sm:h-[300px] sm:w-[300px]">
          <Spline
            scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
            className="h-full w-full"
          />
        </div>

        {/* Heading */}
        <h2 className="mx-auto w-full max-w-[1000px] text-center text-5xl leading-[60px] font-black tracking-tight text-white uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
          Shaping the Future of{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
            Technology
          </span>
        </h2>

        <p className="relative z-10 max-w-2xl text-sm font-medium leading-relaxed text-gray-300 sm:text-base md:text-lg lg:max-w-3xl lg:text-xl lg:leading-[32px] animate-fade-in-up animation-delay-200">
          At Camino Code, we are passionate about transforming businesses
          through the power of data and technology. Founded with a vision to
          redefine the digital landscape, we specialize in cutting-edge data
          science and web development solutions designed to drive innovation and
          growth.
        </p>

        {/* Button */}
        <div className="relative z-10 mt-4 animate-fade-in-up animation-delay-400">
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <span className="relative z-10">Learn More</span>
            <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
