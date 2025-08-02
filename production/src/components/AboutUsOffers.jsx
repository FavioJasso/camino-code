"use client";
import Image from "next/image";
import { ArrowDown, Sparkles, Users, Puzzle, Scaling } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const features = [
  {
    id: 1,
    title: "Innovation at the Core",
    description: "Cutting-edge solutions that drive business transformation",
    icon: <Sparkles className="h-10 w-10" />,
    image: "/assets/images/offers_bg01.png",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-10 w-10" />,
    image: "/assets/images/offers_bg02.png",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-10 w-10" />,
    image: "/assets/images/offers_bg03.png",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-10 w-10" />,
    image: "/assets/images/offers_bg04.png",
  },
];

export default function WhatSetsUsApart() {
  return (
    <section
      // id="what-sets-us-apart"
      className="relative flex w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[rgba(248,244,239,1)] to-white px-8 py-20 sm:px-10 md:py-24 lg:px-12 lg:py-32"
    >
      {/* Full width container */}
      <div className="relative mx-auto h-max w-full max-w-[1800px]">
        {/* Left Model (clipped 50% on the left) */}
        <div className="absolute -bottom-1/3 left-0 z-0 -ml-[15vw] hidden h-[500px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-end overflow-hidden pr-[25vw]">
            <ModelViewer url="/bolb-1.glb" />
          </div>
        </div>

        {/* Right Model (clipped 50% on the right) */}
        <div className="absolute top-1/2 right-0 z-0 -mr-[15vw] hidden h-[500px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-start overflow-hidden pl-[25vw]">
            <ModelViewer url="/bolb-2.glb" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
          {/* Heading */}
          <h2 className="text-center text-4xl font-black tracking-tight text-gray-900 uppercase sm:text-5xl md:text-[4rem] lg:text-[5rem] animate-fade-in-up">
            What Sets Us{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Apart
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl text-center text-base font-medium leading-relaxed text-gray-700 sm:text-lg md:text-xl animate-fade-in-up animation-delay-200">
            At Camino Code, we combine data science and web development to
            create innovative, future-ready solutions. From predictive analytics
            to custom web applications, we help businesses thrive in the digital
            age.
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-fade-in-up animation-delay-400">
            <Link
              href="#contact"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowDown className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>

          <div className="relative -mr-[300px] h-[200px] w-[200px] lg:hidden">
            <ModelViewer url="/bolb-1.glb" />
          </div>
          {/* Features Grid - Maintaining original card layout */}
          <ul className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 animate-fade-in-up animation-delay-600">
            {features.map((feature, index) => (
              <li key={feature.id} style={{ animationDelay: `${600 + index * 100}ms` }}>
                <div className="group relative h-72 w-full overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute inset-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 transition-all duration-300 group-hover:from-black/80 group-hover:via-black/60" />
                  </div>
                  <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center text-white">
                    <div className="mb-4 rounded-full bg-gradient-to-br from-amber-400/30 to-red-600/30 p-5 backdrop-blur-md transition-all duration-300 group-hover:from-amber-400/40 group-hover:to-red-600/40 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{feature.title}</h3>
                    <p className="mt-3 text-base opacity-90 transition-all duration-300 group-hover:opacity-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative -ml-[300px] h-[200px] w-[200px] lg:hidden">
            <ModelViewer url="/bolb-2.glb" />
          </div>
        </div>
      </div>
    </section>
  );
}
