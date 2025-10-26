"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  Cpu,
  Database,
  Globe,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Database,
    title: "Data Science",
    description: "Advanced analytics & ML solutions",
    color: "from-amber-400 to-orange-500",
    delay: "0",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, scalable applications",
    color: "from-orange-400 to-red-500",
    delay: "100",
  },
  {
    icon: Layers,
    title: "Full Stack",
    description: "End-to-end digital solutions",
    color: "from-amber-400 to-red-600",
    delay: "200",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Cutting-edge AI implementation",
    color: "from-orange-300 to-amber-500",
    delay: "300",
  },
];

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById("about")?.getBoundingClientRect();
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
      id="about"
      className="relative mx-auto flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
      </div>

      {/* Dynamic Gradient */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="animate-float absolute top-40 left-20 h-96 w-96 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-20 blur-3xl"></div>
      <div className="animate-float-delayed absolute right-20 bottom-40 h-96 w-96 rounded-full bg-gradient-to-t from-amber-300 to-orange-500 opacity-20 blur-3xl"></div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-20 text-center">
        {/* Top Left Spline Model with Enhanced Container */}
        <div className="animate-fade-in animation-delay-600 absolute top-10 left-10 opacity-0">
          <div className="relative h-[250px] w-[250px] sm:h-[350px] sm:w-[350px]">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 blur-2xl"></div>
            <div className="relative h-full w-full rounded-full border border-orange-500/20 bg-black/30 p-4 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-orange-400/40">
              <Spline
                scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom Right Spline Model with Enhanced Container */}
        <div className="animate-fade-in animation-delay-800 absolute right-10 bottom-10 opacity-0">
          <div className="relative h-[250px] w-[250px] sm:h-[350px] sm:w-[350px]">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-t from-amber-400/20 to-orange-600/20 blur-2xl"></div>
            <div className="relative h-full w-full rounded-full border border-amber-500/20 bg-black/30 p-4 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-amber-400/40">
              <Spline
                scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-down mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-gradient-to-t from-amber-950/50 to-orange-950/50 px-4 py-2 backdrop-blur-sm">
            <Terminal className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-200">
              About Our Mission
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="animate-fade-in-up mx-auto w-full max-w-[1000px] text-center text-3xl leading-[40px] font-black tracking-tight uppercase md:text-[50px] md:leading-[60px] lg:text-[80px] lg:leading-[90px]">
          <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Shaping the Future of
          </span>{" "}
          <span className="drop-shadow-glow animate-gradient-x inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
            Technology
          </span>
        </h2>

        <p className="animate-fade-in-up animation-delay-200 relative z-10 max-w-3xl text-sm leading-relaxed font-medium text-gray-300 sm:text-base md:text-lg lg:text-xl lg:leading-[32px]">
          At <span className="font-semibold text-orange-400">Camino Code</span>,
          we are passionate about transforming businesses through the power of{" "}
          <span className="font-semibold text-amber-400">
            data and technology
          </span>
          . Founded with a vision to redefine the digital landscape, we
          specialize in cutting-edge{" "}
          <span className="font-semibold text-red-500">data science</span> and{" "}
          <span className="font-semibold text-orange-500">web development</span>{" "}
          solutions designed to drive innovation and growth.
        </p>

        {/* Feature Cards */}
        <div className="animate-fade-in-up animation-delay-400 mt-8 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group animate-fade-in-up relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-700`}
              style={{ animationDelay: `${600 + parseInt(feature.delay)}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              ></div>
              <feature.icon
                className={`mb-3 h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
              />
              <h3 className="mb-1 text-sm font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-orange-500/20 transition-all duration-300 group-hover:rotate-180 group-hover:text-orange-400/40" />
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animation-delay-600 relative z-10 mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/about"
            className="group hover:shadow-neon relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold shadow-2xl transition-all duration-500 hover:scale-105"
          >
            {/* Animated background */}
            <div className="animate-gradient-x absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600"></div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Content */}
            <span className="relative z-10 text-white">Discover Our Story</span>
            <ArrowRightIcon className="relative z-10 h-5 w-5 text-white transition-all duration-500 group-hover:translate-x-2" />
          </Link>

          <Link
            href="/services"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-700 bg-gray-900/50 px-8 py-4 font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:text-white"
          >
            <span>Explore Services</span>
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="animate-fade-in-up animation-delay-800 absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-8 opacity-50">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">500+</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
          <div className="h-8 w-px bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">50+</div>
            <div className="text-xs text-gray-500">Clients</div>
          </div>
          <div className="h-8 w-px bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">10+</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
        </div>
      </div>
    </section>
  );
}
