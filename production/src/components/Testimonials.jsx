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
  // {
  //   id: 2,
  //   name: "Sarah Chen",
  //   role: "CTO of DataSphere",
  //   quote: "Their web development team delivered beyond our expectations with a scalable solution that grew with our business needs.",
  //   stars: 5
  // },
  // {
  //   id: 3,
  //   name: "Michael Rodriguez",
  //   role: "Product Manager at Finova",
  //   quote: "The AI integration they implemented reduced our operational costs by 40% while improving customer satisfaction.",
  //   stars: 4
  // }
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
      className="relative flex h-auto min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-16 text-center text-white sm:gap-10 sm:px-8 sm:py-20 md:gap-12 md:px-10"
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
      <h2 className="font-bold uppercase text-5xl md:text-[70px] lg:text-[120px] mx-auto lg:leading-[130px] md:leading-[80px] text-center leading-[60px]">
        What Our{" "}
        <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Clients Say
        </span>
      </h2>

      {/* Testimonial Carousel */}
      <div className="w-full max-w-4xl overflow-hidden">
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex w-full flex-shrink-0 flex-col items-center px-4"
            >
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
              <p className="text-lg italic sm:text-xl md:text-2xl lg:text-3xl">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="mt-8 space-y-1">
                <p className="text-xl font-semibold sm:text-2xl">
                  {testimonial.name}
                </p>
                <p className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-lg italic text-transparent sm:text-xl">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
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
