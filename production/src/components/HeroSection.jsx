import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="relative mx-auto flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[rgba(248,244,239,1)] via-[rgba(252,248,243,1)] to-[rgba(255,251,247,1)]">
      <div className="relative z-10 container flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 text-center md:px-10 md:py-20 lg:py-24">
        {/* Top Right Spline */}
        <div className="absolute top-0 -right-10 h-[250px] w-[250px] animate-pulse opacity-90 md:top-32 md:h-[318px] md:w-[315px]">
          <Image
            src="/assets/Vector-1.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain drop-shadow-xl md:h-[318px] md:w-[315px]"
          />
        </div>

        {/* Bottom Left Spline */}
        <div className="absolute -bottom-10 -left-10 h-[250px] w-[250px] animate-pulse opacity-90 md:-bottom-16 md:-left-32 md:h-[540px] md:w-[540px]">
          <Image
            src="/assets/Vector.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain drop-shadow-xl md:h-[468px] md:w-[468px]"
          />
        </div>
      </div>

      {/* Centered Content */}
      <section
        id="home"
        className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-8 py-16 text-center md:px-10 md:py-20 lg:py-24"
      >
        <h1 className="animate-fade-in-up w-full text-5xl font-black tracking-tight text-black uppercase md:max-w-5xl md:text-7xl lg:text-8xl xl:text-[10rem]">
          <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
            Code
          </span>{" "}
          <span className="text-gray-900">the Future</span>
        </h1>
        <p className="animate-fade-in-up animation-delay-200 w-full max-w-3xl text-sm leading-relaxed font-medium text-gray-700 sm:text-base md:text-lg lg:text-xl lg:leading-[32px]">
          At Camino Code, we combine data science and web development to create
          innovative, future-ready solutions. From predictive analytics to
          custom web applications, we help businesses thrive in the digital age.
        </p>

        <div className="animate-fade-in-up animation-delay-400 mt-4 flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRightIcon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </section>
    </main>
  );
}
