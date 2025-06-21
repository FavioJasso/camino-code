"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex h-[120vh] items-center justify-center overflow-hidden rounded-lg bg-black mx-auto md:h-auto md:px-10 md:py-20"
    >
      <div className="relative flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 text-center h-full">
        {/* Top Left Spline Model */}
        <div className="absolute top-0 left-10 h-[200px] w-[200px] -translate-x-1/4 -translate-y-1/4 opacity-70 transition-opacity duration-300 hover:scale-110 hover:opacity-100 sm:h-[300px] sm:w-[300px]">
          <Spline
            scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
            className="h-full w-full"
          />
        </div>

        {/* Bottom Right Spline Model */}
        <div className="absolute bottom-0 right-10 h-[200px] w-[200px] translate-x-1/4 translate-y-1/4 opacity-70 transition-opacity duration-300 hover:scale-110 hover:opacity-100 sm:h-[300px] sm:w-[300px]">
          <Spline
            scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
            className="h-full w-full"
          />
        </div>

        {/* Heading */}
        <h2 className="mx-auto w-full max-w-[900px] text-5xl font-bold uppercase text-white leading-[60px] md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
          Shaping the Future of{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Technology
          </span>
        </h2>

        {/* Description */}
        <p className="relative z-10 max-w-md text-xs text-white sm:text-sm md:max-w-lg md:text-base lg:max-w-xl lg:text-lg">
          At Camino Code, we are passionate about transforming businesses
          through the power of data and technology. Founded with a vision to
          redefine the digital landscape, we specialize in cutting-edge data
          science and web development solutions designed to drive innovation and
          growth.
        </p>

        {/* Button */}
        <div className="relative z-10">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white hover:opacity-90"
          >
            Learn More
            <span className="ml-2">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
