import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="relative mx-auto flex h-min w-full items-center justify-center bg-[rgba(248,244,239,1)]">
      {/* Top Right Spline */}
      <div className="absolute top-0 -right-10 h-[250px] w-[250px] md:top-32 md:h-[318px] md:w-[315px]">
        <Image
          src="/assets/Vector-1.png"
          alt="Vector Graphic"
          width={500}
          height={500}
          className="h-[230px] w-[230px] object-contain md:h-[318px] md:w-[315px]"
        />
      </div>

      {/* Bottom Left Spline */}
      <div className="absolute -bottom-10 -left-10 h-[250px] w-[250px] md:-bottom-16 md:-left-32 md:h-[540px] md:w-[540px]">
        <Image
          src="/assets/Vector.png"
          alt="Vector Graphic"
          width={500}
          height={500}
          className="h-[230px] w-[230px] object-contain md:h-[468px] md:w-[468px]"
        />
      </div>

      {/* Centered Content */}
      <section
        id="home"
        className="relative flex w-full flex-col items-center justify-center gap-6 px-8 py-10 text-center md:px-10"
      >
        <h1 className="w-full text-6xl font-bold text-black uppercase md:max-w-4xl md:text-6xl lg:text-6xl xl:text-[10rem]">
          <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Code
          </span>{" "}
          the Future
        </h1>
        <p className="w-full text-xs text-black sm:text-sm md:max-w-2xl md:text-base lg:text-[21px] lg:leading-[31px]">
          At Camino Code, we combine data science and web development to create
          innovative, future-ready solutions. From predictive analytics to
          custom web applications, we help businesses thrive in the digital age.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white hover:opacity-90"
          >
            Get Started
            <span className="ml-2">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
