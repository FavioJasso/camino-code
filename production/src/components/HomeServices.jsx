"use client";

import Image from "next/image";
import { Layers2, Laptop, Cpu, ArrowRight, Code2, Database, Globe, Sparkles, Zap, Shield, Binary } from "lucide-react";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";
import { useState, useEffect } from "react";

const services = [
  {
    id: 1,
    title: "Data Science",
    icon: <Layers2 className="h-8 w-8" />,
    items: [
      "Predictive Analytics",
      "Machine Learning Models",
      "Big Data Solutions",
    ],
    color: "from-cyan-400 to-blue-500",
    bgGradient: "from-cyan-500/20 to-blue-500/20",
    glowColor: "cyan",
    floatingIcon: Database,
  },
  {
    id: 2,
    title: "Software Development",
    icon: <Laptop className="h-8 w-8" />,
    items: [
      "Custom Web Applications",
      "Scalable Architecture",
      "Performance Optimization",
    ],
    color: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    glowColor: "purple",
    floatingIcon: Code2,
  },
  {
    id: 3,
    title: "Automated Solutions",
    icon: <Cpu className="h-8 w-8" />,
    items: ["Natural Language Processing", "AI-Driven Insights", "Process Automation"],
    color: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-500/20 to-orange-500/20",
    glowColor: "amber",
    floatingIcon: Zap,
  },
];

const floatingElements = [
  { Icon: Binary, position: "top-10 left-10", delay: "0s", size: "h-6 w-6" },
  { Icon: Shield, position: "top-20 right-20", delay: "2s", size: "h-8 w-8" },
  { Icon: Globe, position: "bottom-20 left-20", delay: "4s", size: "h-7 w-7" },
  { Icon: Sparkles, position: "bottom-10 right-10", delay: "6s", size: "h-5 w-5" },
];

export default function ServicesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('services')?.getBoundingClientRect();
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
      id="services"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-black px-8 py-20 text-center sm:px-10 md:flex-row md:items-center md:px-12 md:py-24 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/landing-bg1.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000 -z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/3 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 -right-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float-delayed"></div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} opacity-10 animate-bounce-slow`}
          style={{ animationDelay: element.delay }}
        >
          <element.Icon className={`${element.size} text-purple-400`} />
        </div>
      ))}

      {/* Particle Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-12 md:flex-row">
        {/* Left Column */}
        <div className="flex w-full flex-col items-center gap-8 p-4 text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left">
          {/* Badge */}
          <div className="animate-fade-in-down">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Our Expertise</span>
            </div>
          </div>

          <h2 className="w-full text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              Our
            </span>{" "}
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
              Services
            </span>
          </h2>

          <p className="max-w-lg text-base font-medium leading-relaxed text-gray-300 sm:text-lg md:text-xl animate-fade-in-up animation-delay-200">
            At <span className="text-cyan-400 font-semibold">Camino Code</span>, we provide cutting-edge solutions in{" "}
            <span className="text-purple-400 font-semibold">data science</span> and{" "}
            <span className="text-pink-400 font-semibold">web development</span> to help businesses unlock new opportunities and
            drive growth.
          </p>

          {/* 3D Model Container with Enhanced Styling */}
          <div className="relative flex h-[400px] w-full items-center justify-center animate-fade-in-up animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative h-full w-full rounded-3xl border border-purple-500/20 bg-black/30 p-4 backdrop-blur-sm">
              <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 h-16 w-16 border-l-2 border-t-2 border-cyan-500/30"></div>
              <div className="absolute top-0 right-0 h-16 w-16 border-r-2 border-t-2 border-purple-500/30"></div>
              <div className="absolute bottom-0 left-0 h-16 w-16 border-l-2 border-b-2 border-pink-500/30"></div>
              <div className="absolute bottom-0 right-0 h-16 w-16 border-r-2 border-b-2 border-yellow-500/30"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Services Cards */}
        <div className="flex w-full flex-col gap-6 p-4 text-white md:w-1/2 md:px-8 md:py-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-md transition-all duration-500 hover:border-gray-700 hover:shadow-neon hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${600 + index * 100}ms` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Background Gradient on Hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 transition-opacity duration-500 ${hoveredService === service.id ? 'opacity-100' : ''}`}
              />

              {/* Floating Icon Background */}
              {hoveredService === service.id && (
                <service.floatingIcon className="absolute -right-8 -top-8 h-32 w-32 text-white opacity-5 rotate-12 transition-all duration-700" />
              )}

              <div className="relative z-10 flex w-full items-center justify-between gap-4">
                <h3 className={`text-xl font-bold transition-all duration-300 sm:text-2xl md:text-3xl ${hoveredService === service.id ? 'text-transparent bg-clip-text bg-gradient-to-r ' + service.color : 'text-white'}`}>
                  {service.title}
                </h3>
                <div className={`rounded-2xl bg-gradient-to-br ${service.color} p-1 transition-all duration-500 ${hoveredService === service.id ? 'scale-110 rotate-3' : ''}`}>
                  <div className="rounded-2xl bg-black/50 p-3 backdrop-blur-md">
                    <div className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>

              <ul className="relative z-10 mt-6 w-full space-y-3 text-left text-base font-medium text-gray-400 transition-colors duration-300 sm:text-lg group-hover:text-gray-300">
                {service.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-3 transition-all duration-300 hover:text-white"
                  >
                    <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color} ${hoveredService === service.id ? 'animate-pulse' : ''}`}></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Indicator */}
              <div className={`absolute bottom-4 right-4 h-2 w-2 rounded-full bg-gradient-to-r ${service.color} opacity-0 transition-all duration-300 ${hoveredService === service.id ? 'opacity-100' : ''}`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} animate-ping`}></div>
              </div>
            </div>
          ))}

          {/* CTA Buttons */}
          <div className="flex w-full flex-col sm:flex-row gap-4 justify-center pt-4 md:justify-start animate-fade-in-up animation-delay-900">
            <Link
              href="/services"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Content */}
              <span className="relative z-10 text-white">See All Services</span>
              <ArrowRight className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            <Link
              href="/contact"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-700 bg-gray-900/50 px-8 py-4 font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:text-white"
            >
              <span>Get Started</span>
              <Zap className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}