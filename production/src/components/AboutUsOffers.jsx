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
      className="relative w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-[rgba(248,244,239,1)]"
    >
      {/* Full width container */}
      <div className="w-full max-w-[1800px] mx-auto relative h-max">
        {/* Left Model (clipped 50% on the left) */}
        <div className="absolute left-0 -bottom-1/3 -translate-y-1/2 w-[50vw] h-[500px] -ml-[15vw] z-0 hidden lg:block">
          <div className="w-full h-full flex items-center justify-end pr-[25vw] overflow-hidden">
            <ModelViewer url="/bolb-1.glb" />
          </div>
        </div>

        {/* Right Model (clipped 50% on the right) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[500px] -mr-[15vw] z-0 hidden lg:block">
          <div className="w-full h-full flex items-center justify-start pl-[25vw] overflow-hidden">
            <ModelViewer url="/bolb-2.glb" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold uppercase text-black sm:text-4xl md:text-[4rem] lg:text-[5rem] text-center">
            What Sets Us{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Apart
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-[600px] text-sm sm:text-base md:text-lg text-gray-700 text-center">
            At Camino Code, we combine data science and web development to
            create innovative, future-ready solutions. From predictive analytics
            to custom web applications, we help businesses thrive in the digital
            age.
          </p>

          {/* CTA Button */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="#contact"
              className="group relative rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
            >
              Get Started
              <ArrowDown className="ml-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </div>

          <div className="relative h-[200px] w-[200px] lg:hidden -mr-[300px]">
            <ModelViewer url="/bolb-1.glb" />
          </div>
          {/* Features Grid - Maintaining original card layout */}
          <ul className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((feature) => (
              <li key={feature.id}>
                <div className="group relative h-64 w-full overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[1px]"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/60" />
                  </div>
                  <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                    <div className="mb-4 rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 p-4 backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm opacity-90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative h-[200px] w-[200px] lg:hidden -ml-[300px]">
            <ModelViewer url="/bolb-2.glb" />
          </div>
        </div>
      </div>
    </section>
  );
}
