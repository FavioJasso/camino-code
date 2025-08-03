"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Building2, Handshake, Rocket, Shield, Star, Zap } from "lucide-react";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const partners = [
  { src: "/assets/images/partner_1.png", alt: "Partner 1", category: "Technology" },
  { src: "/assets/images/partner_2.png", alt: "Partner 2", category: "Innovation" },
  { src: "/assets/images/partner_3.png", alt: "Partner 3", category: "Enterprise" },
  { src: "/assets/images/partner_4.png", alt: "Partner 4", category: "Solutions" },
  { src: "/assets/images/partner_5.png", alt: "Partner 5", category: "Digital" },
];

const stats = [
  { icon: Building2, value: "50+", label: "Global Partners", color: "from-amber-400 to-orange-500" },
  { icon: Handshake, value: "200+", label: "Joint Projects", color: "from-orange-400 to-red-500" },
  { icon: Rocket, value: "15+", label: "Years Experience", color: "from-amber-400 to-red-600" },
  { icon: Shield, value: "99%", label: "Success Rate", color: "from-orange-300 to-amber-500" },
];

export default function Partners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const duration = 30;

    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent + originalContent;

    const trackWidth = track.scrollWidth / 3;
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${duration}s`);

    const handleAnimationIteration = () => {
      if (track.style.transform === `translateX(-${trackWidth}px)`) {
        track.style.transform = "translateX(0)";
        void track.offsetWidth;
        track.style.transform = `translateX(-${trackWidth}px)`;
      }
    };

    track.addEventListener("animationiteration", handleAnimationIteration);

    return () => {
      track.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (isHovering && containerRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHovering]);

  return (
    <section
      id="partners"
      className="relative flex flex-col items-center justify-center gap-16 overflow-hidden bg-white px-6 py-20 text-center sm:px-8 md:px-10 md:py-24 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Dynamic Gradient Orbs */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.15), transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8">
        {/* Badge */}
        <div className="animate-fade-in-down">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-gradient-to-t from-amber-50 to-orange-50 px-4 py-2 backdrop-blur-sm">
            <Star className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Trusted by Industry Leaders</span>
          </div>
        </div>

        <h2 className="mx-auto text-center text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
            Our
          </span>{" "}
          <span className="inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
            Partners
          </span>
        </h2>

        <p className="animate-fade-in-up animation-delay-200 max-w-2xl text-gray-600 text-lg">
          Collaborating with visionary companies to push the boundaries of technology and innovation
        </p>
      </div>

      {/* 3D Model Section with Enhanced Container */}
      <div className="relative z-10 w-full max-w-4xl animate-fade-in-up animation-delay-400">
        <div className="relative rounded-3xl border border-orange-200 bg-gradient-to-br from-amber-100/20 to-orange-100/20 p-1 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600 opacity-20 blur-2xl"></div>
          <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-gradient-to-t from-amber-50/50 to-white/50">
            {/* Futuristic Corner Decorations */}
            <div className="absolute top-0 left-0 h-20 w-20 border-l-2 border-t-2 border-orange-400/50"></div>
            <div className="absolute top-0 right-0 h-20 w-20 border-r-2 border-t-2 border-amber-500/50"></div>
            <div className="absolute bottom-0 left-0 h-20 w-20 border-l-2 border-b-2 border-red-500/50"></div>
            <div className="absolute bottom-0 right-0 h-20 w-20 border-r-2 border-b-2 border-orange-500/50"></div>
            
            <ModelViewer url="/triangle.glb" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 animate-fade-in-up animation-delay-600">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-300 shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}></div>
            <stat.icon className={`mb-3 h-8 w-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Partners Carousel */}
      <div
        ref={containerRef}
        className="logo-slider relative mx-auto w-full overflow-hidden py-12"
      >
        <div
          ref={trackRef}
          className="logo-track flex w-max items-center gap-12"
        >
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-12">
              {partners.map((partner, index) => (
                <div 
                  key={`${setIndex}-${index}`} 
                  className="group relative flex-shrink-0"
                >
                  {/* Partner Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/50 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-orange-400 shadow-lg">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-red-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    
                    {/* Partner Logo */}
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={160}
                      height={160}
                      className="relative z-10 h-32 w-32 object-contain filter grayscale transition-all duration-500 group-hover:grayscale-0 md:h-40 md:w-40"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2 rounded-full bg-gradient-to-t from-amber-100 to-orange-100 px-3 py-1 backdrop-blur-sm">
                      <span className="text-xs font-medium text-orange-700">{partner.category}</span>
                    </div>
                    
                    {/* Floating Icons */}
                    <Zap className="absolute -bottom-2 -right-2 h-6 w-6 text-orange-300 transition-all duration-500 group-hover:text-orange-500 group-hover:rotate-12" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in-up animation-delay-800">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold text-gray-800">Ready to Partner with Us?</h3>
          <p className="text-gray-600">Join our ecosystem of innovation and growth</p>
        </div>
        <button className="group relative overflow-hidden rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon">
          <span className="relative z-10 flex items-center gap-2">
            Become a Partner
            <Handshake className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </span>
        </button>
      </div>

      {/* Enhanced CSS Animation */}
      <style jsx global>{`
        .logo-slider {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }
        
        .logo-track {
          animation: scroll var(--duration) linear infinite;
          transform: translateX(0);
        }
        
        .logo-track:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--track-width)));
          }
        }
      `}</style>
    </section>
  );
}