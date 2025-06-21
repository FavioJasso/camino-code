import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <main className="relative container flex w-full h-[900px] items-center justify-center mx-auto bg-[rgba(248,244,239,1)]">
      {/* Top Right Spline */}
      <div className="absolute top-0 -right-10 md:top-32 md:w-[315px] md:h-[318px] w-[250px] h-[250px]">
        <Image
          src="/assets/Vector-1.png"
          alt="Vector Graphic"
          width={500}
          height={500}
          className="object-contain md:w-[315px] md:h-[318px] w-[230px] h-[230px]"
        />
      </div>

      {/* Bottom Left Spline */}
      <div className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-32 md:w-[540px] md:h-[540px] w-[250px] h-[250px]">
        <Image
          src="/assets/Vector.png"
          alt="Vector Graphic"
          width={500}
          height={500}
          className="object-contain md:w-[468px] md:h-[468px] w-[230px] h-[230px]"
        />
      </div>

      {/* Centered Content */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center gap-6 px-8 py-10 text-center w-full md:px-10"
      >
        <h1 className="w-full font-bold uppercase text-6xl text-black md:max-w-4xl md:text-6xl lg:text-6xl xl:text-[10rem]">
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
};

export default HeroSection;
