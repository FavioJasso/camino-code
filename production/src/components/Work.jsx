"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Award, BarChart3, Brain, Cloud, Code2, Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const caseStudies = [
  {
    id: 1,
    title: "Data-Driven Insights for TechWave",
    description:
      "Developed a predictive analytics model that increased customer retention by 30%.",
    image: "/assets/images/services_work01.png",
    href: "/case-study-detailed",
    icon: BarChart3,
    color: "from-cyan-400 to-blue-500",
    stats: { metric: "+30%", label: "Retention" },
    tags: ["Analytics", "ML", "Python"],
  },
  {
    id: 2,
    title: "E-Commerce Platform for StyleHub",
    description:
      "Built a scalable web application that boosted online sales by 150%.",
    image: "/assets/images/services_work02.png",
    href: "/case-study-detailed",
    icon: TrendingUp,
    color: "from-purple-400 to-pink-500",
    stats: { metric: "+150%", label: "Sales" },
    tags: ["React", "Node.js", "AWS"],
  },
  {
    id: 3,
    title: "AI-Powered Chatbot for FinServe",
    description:
      "Implemented NLP solutions reducing customer service costs by 40%.",
    image: "/assets/images/services_work03.png",
    href: "/case-study-detailed",
    icon: Brain,
    color: "from-amber-400 to-orange-500",
    stats: { metric: "-40%", label: "Costs" },
    tags: ["NLP", "AI", "Python"],
  },
  {
    id: 4,
    title: "Cloud Migration for HealthTrack",
    description:
      "Seamless transition to cloud infrastructure improving system reliability.",
    image: "/assets/images/services_work04.png",
    href: "/case-study-detailed",
    icon: Cloud,
    color: "from-green-400 to-emerald-500",
    stats: { metric: "99.9%", label: "Uptime" },
    tags: ["Cloud", "DevOps", "Docker"],
  },
];

const floatingElements = [
  { Icon: Code2, position: "top-20 left-10", delay: "0s", size: "h-8 w-8" },
  { Icon: Zap, position: "top-40 right-20", delay: "3s", size: "h-6 w-6" },
  { Icon: Award, position: "bottom-20 left-20", delay: "6s", size: "h-7 w-7" },
  { Icon: Sparkles, position: "bottom-40 right-10", delay: "9s", size: "h-5 w-5" },
];

export default function WorkShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('work')?.getBoundingClientRect();
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
      id="work"
      className="relative flex w-full flex-col items-center justify-center overflow-x-hidden bg-black px-8 py-20 sm:px-10 md:py-24 md:pb-32 lg:px-12 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-3xl animate-float-delayed"></div>

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
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Full width container */}
      <div className="relative mx-auto w-full max-w-[1800px]">
        {/* Left Model with Enhanced Container */}
        <div className="absolute bottom-0 left-0 z-0 -ml-[13vw] hidden h-[350px] w-[50vw] lg:block">
          <div className="flex h-full w-full items-center justify-end overflow-hidden pr-[25vw]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
              <ModelViewer url="/triangle-1.glb" />
            </div>
          </div>
        </div>

        {/* Right Model with Enhanced Container */}
        <div className="absolute top-1/4 right-0 z-0 -mr-[13vw] hidden h-[350px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-start overflow-hidden pl-[25vw]">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
              <ModelViewer url="/triangle-2.glb" />
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
          {/* Badge */}
          <div className="animate-fade-in-down mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Portfolio Showcase</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="mx-auto text-center text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              Our
            </span>{" "}
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
              Work
            </span>
          </h2>

          {/* Description */}
          <p className="w-full max-w-3xl text-center text-base font-medium leading-relaxed text-gray-300 sm:text-lg md:text-xl animate-fade-in-up animation-delay-200">
            We take pride in delivering innovative and impactful solutions for
            our clients. Our work reflects our expertise in{" "}
            <span className="text-cyan-400 font-semibold">data science</span>,{" "}
            <span className="text-purple-400 font-semibold">web development</span>, and{" "}
            <span className="text-pink-400 font-semibold">AI integration</span>, helping businesses achieve
            measurable success.
          </p>

          {/* Mobile 3D Model */}
          <div className="relative -mr-[300px] h-[200px] w-[200px] lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <ModelViewer url="/triangle-1.glb" />
          </div>

          {/* Case Studies Grid - Enhanced */}
          <div className="relative grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 sm:grid-cols-2 animate-fade-in-up animation-delay-400">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`group relative max-w-[500px] overflow-hidden rounded-3xl border border-gray-800 shadow-2xl transition-all duration-500 hover:border-gray-700 hover:shadow-neon hover:-translate-y-2 animate-fade-in-up ${
                  index % 2 === 1 ? "sm:translate-y-12" : ""
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(study.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link
                  href={study.href}
                  className="flex flex-col overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-950/90"
                >
                  {/* Image with enhanced hover effect */}
                  <div className="relative h-72 overflow-hidden sm:h-80 md:h-96">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {/* Overlay gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.color} mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-30`} />
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div className="rounded-2xl bg-black/50 backdrop-blur-md p-4">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                          {study.stats.metric}
                        </div>
                        <div className="text-sm text-gray-300">{study.stats.label}</div>
                      </div>
                      
                      {/* Icon */}
                      <div className={`rounded-2xl bg-gradient-to-br ${study.color} p-1`}>
                        <div className="rounded-2xl bg-black/50 p-3 backdrop-blur-md">
                          <study.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 text-left">
                    {/* Background glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
                    
                    <div className="relative z-10">
                      <h3 className={`text-xl font-bold transition-all duration-300 sm:text-2xl ${
                        hoveredCard === study.id 
                          ? `text-transparent bg-clip-text bg-gradient-to-r ${study.color}` 
                          : 'text-white'
                      }`}>
                        {study.title}
                      </h3>
                      
                      <p className="mt-3 text-base leading-relaxed text-gray-400 group-hover:text-gray-300 sm:text-lg">
                        {study.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {study.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="rounded-full border border-gray-700 bg-gray-900/50 px-3 py-1 text-xs text-gray-400 transition-all duration-300 group-hover:border-gray-600 group-hover:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className={`mt-6 flex items-center text-base font-semibold transition-all duration-300 ${
                        hoveredCard === study.id 
                          ? `text-transparent bg-clip-text bg-gradient-to-r ${study.color}` 
                          : 'text-purple-400'
                      }`}>
                        View case study
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile 3D Model 2 */}
          <div className="relative -ml-[300px] h-[200px] w-[200px] lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-purple-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            <ModelViewer url="/triangle-2.glb" />
          </div>

          {/* CTA Section */}
          <div className="mt-12 flex flex-col items-center gap-6 animate-fade-in-up animation-delay-800">
            <p className="text-lg text-gray-400 text-center">
              Ready to see how we can transform your business?
            </p>
            <Link
              href="/case-studies"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-10 py-5 font-semibold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Content */}
              <span className="relative z-10 text-white text-lg">View All Projects</span>
              <ArrowRight className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}