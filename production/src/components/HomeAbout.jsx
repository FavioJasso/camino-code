"use client";

import Link from "next/link";
import { ArrowRightIcon, Cpu, Database, Globe, Layers, Sparkles, Terminal } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Database,
    title: "Data Science",
    description: "Advanced analytics & ML solutions",
    color: "from-cyan-400 to-blue-500",
    delay: "0"
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, scalable applications",
    color: "from-purple-400 to-pink-500",
    delay: "100"
  },
  {
    icon: Layers,
    title: "Full Stack",
    description: "End-to-end digital solutions",
    color: "from-amber-400 to-orange-500",
    delay: "200"
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Cutting-edge AI implementation",
    color: "from-green-400 to-emerald-500",
    delay: "300"
  }
];

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('about')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
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
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Dynamic Gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-40 left-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float-delayed"></div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-20 text-center">
        {/* Top Left Spline Model with Enhanced Container */}
        <div className="absolute top-10 left-10 opacity-0 animate-fade-in animation-delay-600">
          <div className="relative h-[250px] w-[250px] sm:h-[350px] sm:w-[350px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative h-full w-full rounded-full border border-cyan-500/20 bg-black/30 p-4 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-cyan-400/40">
              <Spline
                scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom Right Spline Model with Enhanced Container */}
        <div className="absolute right-10 bottom-10 opacity-0 animate-fade-in animation-delay-800">
          <div className="relative h-[250px] w-[250px] sm:h-[350px] sm:w-[350px]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative h-full w-full rounded-full border border-purple-500/20 bg-black/30 p-4 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-purple-400/40">
              <Spline
                scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-in-down mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
            <Terminal className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">About Our Mission</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="mx-auto w-full max-w-[1000px] text-center text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            Shaping the Future of
          </span>{" "}
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
            Technology
          </span>
        </h2>

        <p className="relative z-10 max-w-3xl text-sm font-medium leading-relaxed text-gray-300 sm:text-base md:text-lg lg:text-xl lg:leading-[32px] animate-fade-in-up animation-delay-200">
          At <span className="text-cyan-400 font-semibold">Camino Code</span>, we are passionate about transforming businesses
          through the power of <span className="text-purple-400 font-semibold">data and technology</span>. Founded with a vision to
          redefine the digital landscape, we specialize in cutting-edge{" "}
          <span className="text-pink-400 font-semibold">data science</span> and{" "}
          <span className="text-yellow-400 font-semibold">web development</span> solutions designed to drive innovation and
          growth.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full max-w-4xl mt-8 animate-fade-in-up animation-delay-400">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-700 animate-fade-in-up`}
              style={{ animationDelay: `${600 + parseInt(feature.delay)}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}></div>
              <feature.icon className={`mb-3 h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
              <h3 className="mb-1 text-sm font-bold text-white">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
              <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-purple-500/20 transition-all duration-300 group-hover:text-purple-400/40 group-hover:rotate-180" />
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
          <Link
            href="/about"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            {/* Content */}
            <span className="relative z-10 text-white">Discover Our Story</span>
            <ArrowRightIcon className="relative z-10 h-5 w-5 text-white transition-all duration-500 group-hover:translate-x-2" />
          </Link>

          <Link
            href="/services"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-700 bg-gray-900/50 px-8 py-4 font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:text-white"
          >
            <span>Explore Services</span>
            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-50 animate-fade-in-up animation-delay-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">500+</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
          <div className="h-8 w-px bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">50+</div>
            <div className="text-xs text-gray-500">Clients</div>
          </div>
          <div className="h-8 w-px bg-gray-700"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">10+</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
        </div>
      </div>
    </section>
  );
}