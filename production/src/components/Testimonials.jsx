"use client";

import React from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  User,
  Building2,
  Sparkles,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CEO of TechWave",
    company: "TechWave Solutions",
    quote:
      "Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making.", // cspell:disable-line
    stars: 5,
    avatar: "/assets/images/partner_1.png",
    industry: "Technology",
    metric: "+45%",
    metricLabel: "Efficiency Boost",
    icon: TrendingUp,
  },
  // {
  //   id: 2,
  //   name: "Sarah Chen",
  //   role: "CTO of DataSphere",
  //   company: "DataSphere Analytics",
  //   quote:
  //     "Their web development team delivered beyond our expectations with a scalable solution that grew with our business needs.",
  //   stars: 5,
  //   avatar: "/assets/images/partner_2.png",
  //   industry: "Data Analytics",
  //   metric: "3x",
  //   metricLabel: "Performance Gain",
  //   icon: Zap,
  // },
  // {
  //   id: 3,
  //   name: "Michael Rodriguez",
  //   role: "Product Manager at Finova", // cspell:disable-line
  //   company: "Finova Finance", // cspell:disable-line
  //   quote:
  //     "The AI integration they implemented reduced our operational costs by 40% while improving customer satisfaction.",
  //   stars: 5,
  //   avatar: "/assets/images/partner_3.png",
  //   industry: "Fintech", // cspell:disable-line
  //   metric: "-40%",
  //   metricLabel: "Cost Reduction",
  //   icon: Award,
  // },
];

export default function Testimonials() {
  const testimonial = testimonials[0]; // Only show the first testimonial

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-black py-24 md:py-32 lg:py-40"
    >
      {/* Advanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#000000_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:4rem_4rem]" />

        {/* Static Gradient Overlays */}
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-amber-400/10 to-red-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-orange-400/10 to-amber-500/10 blur-3xl" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 h-64 w-64 border-t-2 border-l-2 border-orange-500/10" />
      <div className="absolute top-0 right-0 h-64 w-64 border-t-2 border-r-2 border-orange-500/10" />
      <div className="absolute bottom-0 left-0 h-64 w-64 border-b-2 border-l-2 border-orange-500/10" />
      <div className="absolute right-0 bottom-0 h-64 w-64 border-r-2 border-b-2 border-orange-500/10" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-20 text-center">
          {/* Futuristic Badge */}
          <div className="mb-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-30 blur-2xl" />
              <div className="relative flex items-center gap-3 rounded-full border border-orange-500/20 bg-gradient-to-r from-orange-950/50 to-amber-950/50 px-8 py-4 backdrop-blur-xl">
                <Sparkles className="h-5 w-5 text-orange-400" />
                <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-sm font-bold tracking-[0.3em] text-transparent uppercase">
                  Client Success Stories
                </span>
                <Sparkles className="h-5 w-5 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl font-black tracking-tight text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="mb-2 block">What Our</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600 opacity-40 blur-3xl" />
              <span className="relative bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
                Clients Say
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Discover how we've helped businesses transform their digital
            presence
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Background Decorative Circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-full border border-orange-500/5" />
              <div className="absolute inset-[50px] rounded-full border border-orange-500/10" />
              <div className="absolute inset-[100px] rounded-full border border-orange-500/5" />
            </div>
          </div>

          {/* Main Testimonial Card */}
          <div className="relative mx-auto max-w-4xl">
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 z-20 flex h-16 w-16 items-center justify-center rounded-full border-4 bg-gradient-to-t from-amber-400 to-red-600 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-amber-400 to-red-600 opacity-50 blur-xl" />
                <div className="relative rounded-2xl bg-gradient-to-t from-amber-400 to-red-600 p-1">
                  <div className="rounded-2xl bg-black p-4">
                    <Quote className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 overflow-hidden rounded-3xl">
              <div className="relative overflow-hidden rounded-3xl border border-orange-500/10 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-black/80 p-8 backdrop-blur-2xl sm:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(251,146,60,0.03)_1px,_transparent_1px)] bg-[size:24px_24px]" />

                {/* Gradient Border Glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-t from-amber-400/10 to-red-600/10" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Stars Rating */}
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 fill-orange-400 text-orange-400"
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm font-medium text-orange-400">
                      5.0 Rating
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="mb-8 text-2xl leading-relaxed font-medium text-gray-200 sm:text-3xl">
                    <span className="text-orange-400/60">"</span>
                    {testimonial.quote}
                    <span className="text-orange-400/60">"</span>
                  </blockquote>

                  {/* Metric Card */}
                  <div className="mb-8 inline-flex items-center gap-4 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-950/30 to-amber-950/30 p-4 backdrop-blur-xl">
                    <div className="rounded-xl bg-gradient-to-t from-amber-400 to-red-600 p-3">
                      {React.createElement(testimonial.icon, {
                        className: "h-6 w-6 text-white",
                      })}
                    </div>
                    <div>
                      <div className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                        {testimonial.metric}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with Glow */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-30 blur-lg" />
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-orange-500/20">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                            <User className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name and Details */}
                    <div>
                      <h3 className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-xl font-bold text-transparent">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400">{testimonial.role}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-orange-400/60" />
                        <span className="text-sm text-gray-500">
                          {testimonial.industry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-tr-3xl border-t-2 border-r-2 border-orange-500/10" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-bl-3xl border-b-2 border-l-2 border-orange-500/10" />
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full border border-orange-500/10" />
          <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full border border-orange-500/10" />
        </div>

        {/* Bottom Decoration */}
        <div className="mt-20 flex justify-center">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
