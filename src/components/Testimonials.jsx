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
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <section
      id="testimonials"
      className="relative flex h-[800px] flex-col items-center justify-center gap-10 px-6 py-16 text-center text-white"
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Heading */}
      <h2 className="font-bold uppercase text-5xl md:text-7xl lg:text-8xl leading-tight">
        What Our{" "}
        <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Clients Say
        </span>
      </h2>

      {/* Testimonial */}
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Stars */}
          <div className="mb-6 flex gap-1">
            {[...Array(testimonial.stars)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-xl italic lg:text-2xl">
            "{testimonial.quote}"
          </p>

          {/* Author */}
          <div className="mt-8">
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent text-base italic">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="mt-8 flex gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              currentTestimonial === index ? "bg-amber-400" : "bg-white/30"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
