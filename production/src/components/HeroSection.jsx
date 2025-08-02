import { ArrowRightIcon, Code2, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <main className="relative mx-auto flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-black">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 blur-3xl animate-float-delayed"></div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="relative z-10 container flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-16 text-center md:px-10 md:py-20 lg:py-24">
        {/* Top Right Futuristic Element */}
        <div className="absolute top-0 -right-10 h-[250px] w-[250px] animate-spin-slow opacity-30 md:top-32 md:h-[318px] md:w-[315px]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl"></div>
          <Image
            src="/assets/Vector-1.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain drop-shadow-xl md:h-[318px] md:w-[315px] mix-blend-screen"
          />
        </div>

        {/* Bottom Left Futuristic Element */}
        <div className="absolute -bottom-10 -left-10 h-[250px] w-[250px] animate-spin-slow-reverse opacity-30 md:-bottom-16 md:-left-32 md:h-[540px] md:w-[540px]">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl"></div>
          <Image
            src="/assets/Vector.png"
            alt="Vector Graphic"
            width={500}
            height={500}
            className="h-[230px] w-[230px] object-contain drop-shadow-xl md:h-[468px] md:w-[468px] mix-blend-screen"
          />
        </div>
      </div>

      {/* Centered Content */}
      <section
        id="home"
        className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-8 py-16 text-center md:px-10 md:py-20 lg:py-24"
      >
        {/* Floating Icons */}
        <div className="absolute -top-10 left-1/4 animate-bounce-slow">
          <Code2 className="h-8 w-8 text-cyan-400 opacity-50" />
        </div>
        <div className="absolute top-10 right-1/4 animate-bounce-slow animation-delay-200">
          <Sparkles className="h-6 w-6 text-purple-400 opacity-50" />
        </div>
        <div className="absolute bottom-10 left-1/3 animate-bounce-slow animation-delay-400">
          <Zap className="h-7 w-7 text-yellow-400 opacity-50" />
        </div>

        {/* Badge */}
        <div className="animate-fade-in-down mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm font-medium text-purple-200">Innovating the Digital Future</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up w-full text-5xl font-black tracking-tight uppercase md:max-w-5xl md:text-7xl lg:text-8xl xl:text-[10rem]">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
            Code
          </span>{" "}
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            the Future
          </span>
        </h1>

        <p className="animate-fade-in-up animation-delay-200 w-full max-w-3xl text-sm leading-relaxed font-medium text-gray-300 sm:text-base md:text-lg lg:text-xl lg:leading-[32px]">
          At Camino Code, we harness cutting-edge{" "}
          <span className="text-cyan-400 font-semibold">data science</span> and{" "}
          <span className="text-purple-400 font-semibold">web development</span>{" "}
          to architect next-generation digital solutions. Transform your vision into reality with our
          innovative approach to technology.
        </p>

        <div className="animate-fade-in-up animation-delay-400 mt-8 flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-10 py-5 font-semibold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Content */}
            <span className="relative z-10 text-white text-lg">Launch Your Project</span>
            <ArrowRightIcon className="relative z-10 h-5 w-5 text-white transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/case-studies"
            className="group flex items-center gap-2 text-gray-400 font-medium hover:text-white transition-all duration-300"
          >
            <span className="border-b border-transparent group-hover:border-gray-400 transition-all duration-300">
              View Our Work
            </span>
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tech Stack Preview */}
        <div className="animate-fade-in-up animation-delay-600 mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50">
          <div className="text-xs text-gray-500 uppercase tracking-wider">Powered by</div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-gray-400 font-mono text-sm hover:text-cyan-400 transition-colors">React</span>
            <span className="text-gray-400 font-mono text-sm hover:text-purple-400 transition-colors">Next.js</span>
            <span className="text-gray-400 font-mono text-sm hover:text-pink-400 transition-colors">TypeScript</span>
            <span className="text-gray-400 font-mono text-sm hover:text-yellow-400 transition-colors">Python</span>
          </div>
        </div>
      </section>
    </main>
  );
}