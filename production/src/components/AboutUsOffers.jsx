"use client";
import Image from "next/image";
import {
  ArrowDown,
  Sparkles,
  Users,
  Puzzle,
  Scaling,
  Code2,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

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
    color: "from-amber-400 to-orange-500",
    glowColor: "orange",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-10 w-10" />,
    image: "/assets/images/offers_bg02.png",
    color: "from-orange-400 to-red-500",
    glowColor: "red",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-10 w-10" />,
    image: "/assets/images/offers_bg03.png",
    color: "from-amber-400 to-red-600",
    glowColor: "amber",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-10 w-10" />,
    image: "/assets/images/offers_bg04.png",
    color: "from-orange-300 to-amber-500",
    glowColor: "amber",
  },
];

const floatingIcons = [
  { Icon: Code2, delay: "0s", duration: "20s", position: "top-20 left-10" },
  { Icon: Zap, delay: "5s", duration: "25s", position: "top-40 right-20" },
  {
    Icon: Shield,
    delay: "10s",
    duration: "30s",
    position: "bottom-20 left-20",
  },
  {
    Icon: Rocket,
    delay: "15s",
    duration: "22s",
    position: "bottom-40 right-10",
  },
];

export default function WhatSetsUsApart() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document
        .getElementById("offers-section")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHovering]);

  return (
    <section
      id="offers-section"
      className="relative flex w-full flex-col items-center justify-center bg-white px-8 py-20 sm:px-10 md:py-24 lg:px-12 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="animate-float absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-20 blur-3xl"></div>
      <div className="animate-float-delayed absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-t from-amber-300 to-orange-500 opacity-20 blur-3xl"></div>

      {/* Floating Icons Background */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} animate-bounce-slow opacity-10`}
          style={{
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <item.Icon className="h-12 w-12 text-orange-400" />
        </div>
      ))}

      {/* Particle Effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Full width container */}
      <div className="relative mx-auto h-max w-full max-w-[1800px]">
        {/* Left Model with Enhanced Container */}
        <div className="absolute -bottom-1/3 left-0 z-0 -ml-[15vw] hidden h-[500px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-end overflow-hidden pr-[25vw]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-transparent blur-3xl"></div>
              <ModelViewer url="/bolb-1.glb" />
            </div>
          </div>
        </div>

        {/* Right Model with Enhanced Container */}
        <div className="absolute top-1/2 right-0 z-0 -mr-[15vw] hidden h-[500px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-start overflow-hidden pl-[25vw]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-l from-amber-500/10 to-transparent blur-3xl"></div>
              <ModelViewer url="/bolb-2.glb" />
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
          {/* Badge */}
          <div className="animate-fade-in-down mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-t from-amber-50 to-orange-50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">
                Our Unique Value
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="animate-fade-in-up text-center text-4xl font-black tracking-tight uppercase sm:text-5xl md:text-[4rem] lg:text-[5rem]">
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              What Sets Us
            </span>{" "}
            <span className="drop-shadow-glow animate-gradient-x inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              Apart
            </span>
          </h2>

          {/* Description */}
          <p className="animate-fade-in-up animation-delay-200 max-w-2xl text-center text-base leading-relaxed font-medium text-gray-600 sm:text-lg md:text-xl">
            At <span className="font-semibold text-orange-600">Camino Code</span>,
            we combine{" "}
            <span className="font-semibold text-amber-600">data science</span>{" "}
            and{" "}
            <span className="font-semibold text-red-600">web development</span>{" "}
            to create innovative, future-ready solutions. From predictive
            analytics to custom web applications, we help businesses thrive in
            the digital age.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-400 mb-12">
            <Link
              href="#contact"
              className="group hover:shadow-neon relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-10 py-5 font-semibold shadow-2xl transition-all duration-500 hover:scale-105"
            >
              {/* Animated background */}
              <div className="animate-gradient-x absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600"></div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              {/* Content */}
              <span className="relative z-10 text-lg text-white">
                Get Started
              </span>
              <ArrowDown className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </div>

          {/* Mobile 3D Models */}
          <div className="relative -mr-[300px] h-[200px] w-[200px] lg:hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 blur-2xl"></div>
            <ModelViewer url="/bolb-1.glb" />
          </div>

          {/* Features Grid - Enhanced with futuristic design */}
          <ul className="animate-fade-in-up animation-delay-600 grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <li
                key={feature.id}
                style={{ animationDelay: `${600 + index * 100}ms` }}
                className="animate-fade-in-up"
              >
                <div className="group hover:shadow-neon relative h-80 w-full overflow-hidden rounded-3xl border border-orange-100 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-300">
                  {/* Background Image with Effects */}
                  <div className="absolute inset-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/85 to-white/75 transition-all duration-300 group-hover:from-white/90 group-hover:via-white/80" />

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-20`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
                    {/* Icon Container */}
                    <div
                      className={`mb-4 rounded-2xl bg-gradient-to-br ${feature.color} p-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <div className="rounded-2xl bg-white/80 p-4 backdrop-blur-md shadow-lg">
                        <div
                          className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        >
                          {feature.icon}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-bold text-gray-800 transition-all duration-300 group-hover:scale-105">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-600 opacity-90 transition-all duration-300 group-hover:opacity-100">
                      {feature.description}
                    </p>

                    {/* Hover Indicator */}
                    <div
                      className={`absolute right-4 bottom-4 h-2 w-2 rounded-full bg-gradient-to-r ${feature.color} opacity-0 transition-all duration-300 group-hover:opacity-100`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.color} animate-ping`}
                      ></div>
                    </div>

                    {/* Corner Accents */}
                    <div
                      className={`absolute top-0 left-0 h-12 w-12 border-t-2 border-l-2 border-${feature.glowColor}-500/0 transition-all duration-500 group-hover:border-${feature.glowColor}-500/50`}
                    ></div>
                    <div
                      className={`absolute right-0 bottom-0 h-12 w-12 border-r-2 border-b-2 border-${feature.glowColor}-500/0 transition-all duration-500 group-hover:border-${feature.glowColor}-500/50`}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile 3D Model 2 */}
          <div className="relative -ml-[300px] h-[200px] w-[200px] lg:hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-l from-orange-400/20 to-amber-500/20 blur-2xl"></div>
            <ModelViewer url="/bolb-2.glb" />
          </div>

          {/* Bottom CTA Section */}
          <div className="animate-fade-in-up animation-delay-800 mt-12 text-center">
            <p className="mb-4 text-lg text-gray-600">
              Ready to transform your business with cutting-edge technology?
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-medium text-orange-600 transition-all duration-300 hover:text-orange-700"
            >
              <span className="border-b border-transparent transition-all duration-300 group-hover:border-orange-600">
                Explore Our Services
              </span>
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
