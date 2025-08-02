"use client";

import Image from "next/image";
import { Star, Quote, User, Building2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO of TechWave",
    company: "TechWave Solutions",
    quote:
      "Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making.",
    stars: 5,
    avatar: "/assets/images/avatar-1.png",
    color: "from-cyan-400 to-blue-500",
    industry: "Technology",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO of DataSphere",
    company: "DataSphere Analytics",
    quote: "Their web development team delivered beyond our expectations with a scalable solution that grew with our business needs.",
    stars: 5,
    avatar: "/assets/images/avatar-2.png",
    color: "from-purple-400 to-pink-500",
    industry: "Data Analytics",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Product Manager at Finova",
    company: "Finova Finance",
    quote: "The AI integration they implemented reduced our operational costs by 40% while improving customer satisfaction.",
    stars: 5,
    avatar: "/assets/images/avatar-3.png",
    color: "from-amber-400 to-orange-500",
    industry: "Fintech",
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('testimonials')?.getBoundingClientRect();
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

  const handlePrev = () => {
    setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative flex min-h-[90vh] flex-col items-center justify-center gap-10 overflow-hidden bg-black px-8 py-20 text-center text-white sm:gap-12 sm:px-10 sm:py-24 md:gap-16 md:px-12 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/landing-bg2.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
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
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 -right-40 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 blur-3xl animate-float-delayed"></div>

      {/* Floating Quote Icons */}
      <Quote className="absolute top-10 left-10 h-20 w-20 text-purple-500/10 rotate-180 animate-bounce-slow" />
      <Quote className="absolute bottom-10 right-10 h-20 w-20 text-cyan-500/10 animate-bounce-slow animation-delay-200" />

      {/* Particle Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Badge */}
      <div className="animate-fade-in-down mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/50 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-200">Client Success Stories</span>
        </div>
      </div>

      {/* Heading */}
      <h2 className="mx-auto text-center text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
          What Our
        </span>{" "}
        <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-glow animate-gradient-x">
          Clients Say
        </span>
      </h2>

      {/* Testimonial Carousel */}
      <div 
        className="relative w-full max-w-5xl overflow-hidden animate-fade-in-up animation-delay-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-3 backdrop-blur-sm border border-gray-700 opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:border-purple-500/50 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-3 backdrop-blur-sm border border-gray-700 opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-110 hover:border-purple-500/50 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </button>

        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex w-full flex-shrink-0 flex-col items-center px-12 py-8"
            >
              {/* Testimonial Card */}
              <div className="relative w-full max-w-3xl rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-12 backdrop-blur-md">
                {/* Background Gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.color} opacity-5`}></div>
                
                {/* Stars */}
                <div className="relative z-10 mb-8 flex justify-center gap-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 text-transparent fill-current bg-gradient-to-r ${testimonial.color} drop-shadow-lg transition-all duration-300 hover:scale-110`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className={`absolute top-6 left-6 h-12 w-12 text-transparent bg-gradient-to-r ${testimonial.color} bg-clip-text opacity-20`} />
                <p className="relative z-10 text-xl font-medium italic leading-relaxed text-gray-300 sm:text-2xl md:text-3xl lg:text-3xl lg:leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <Quote className={`absolute bottom-6 right-6 h-12 w-12 text-transparent bg-gradient-to-r ${testimonial.color} bg-clip-text opacity-20 rotate-180`} />

                {/* Author Info */}
                <div className="relative z-10 mt-10 flex items-center justify-center gap-6">
                  {/* Avatar */}
                  <div className={`relative h-20 w-20 rounded-full bg-gradient-to-br ${testimonial.color} p-1`}>
                    <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-600" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-left">
                    <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${testimonial.color} sm:text-3xl`}>
                      {testimonial.name}
                    </p>
                    <p className="text-lg text-gray-400 font-medium">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{testimonial.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className={`absolute top-0 left-0 h-20 w-20 border-l-2 border-t-2 border-transparent bg-gradient-to-br ${testimonial.color} bg-clip-text opacity-20`}></div>
                <div className={`absolute bottom-0 right-0 h-20 w-20 border-r-2 border-b-2 border-transparent bg-gradient-to-tl ${testimonial.color} bg-clip-text opacity-20`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="flex items-center gap-4 animate-fade-in-up animation-delay-400">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`relative h-3 rounded-full transition-all duration-500 ${
              currentTestimonial === index 
                ? `bg-gradient-to-r ${testimonial.color} w-12 shadow-lg shadow-purple-500/50` 
                : "bg-gray-700 w-3 hover:bg-gray-600 hover:scale-110"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          >
            {currentTestimonial === index && (
              <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.color} animate-ping opacity-30`}></span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 animate-fade-in-up animation-delay-600">
        <p className="text-lg text-gray-400 mb-4">Join our growing list of satisfied clients</p>
        <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-neon">
          <span className="relative z-10">Start Your Project</span>
        </button>
      </div>
    </section>
  );
}