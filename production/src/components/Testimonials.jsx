"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO of TechWave",
    quote:
      "Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO of DataSphere",
    quote: "Their web development team delivered beyond our expectations with a scalable solution that grew with our business needs.",
    stars: 5
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Product Manager at Finova",
    quote: "The AI integration they implemented reduced our operational costs by 40% while improving customer satisfaction.",
    stars: 5
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative flex min-h-[80vh] flex-col items-center justify-center gap-10 overflow-hidden px-8 py-20 text-center text-white sm:gap-12 sm:px-10 sm:py-24 md:gap-16 md:px-12 lg:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/landing-bg2.png"
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Heading */}
      <h2 className="mx-auto text-center text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
        What Our{" "}
        <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
          Clients Say
        </span>
      </h2>

      {/* Testimonial Carousel */}
      <div className="w-full max-w-4xl overflow-hidden animate-fade-in-up animation-delay-200">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex w-full flex-shrink-0 flex-col items-center px-8"
            >
              {/* Stars */}
              <div className="mb-8 flex gap-2">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-8 w-8 fill-amber-400 text-amber-400 drop-shadow-lg transition-all duration-300 hover:scale-110"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl font-medium italic leading-relaxed sm:text-2xl md:text-3xl lg:text-4xl lg:leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="mt-10 space-y-2">
                <p className="text-2xl font-bold sm:text-3xl">
                  {testimonial.name}
                </p>
                <p className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-xl text-transparent font-medium sm:text-2xl">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-3 animate-fade-in-up animation-delay-400">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentTestimonial === index 
                ? "bg-gradient-to-r from-amber-400 to-red-600 w-8 shadow-lg" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
