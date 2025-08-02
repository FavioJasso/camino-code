import Image from "next/image";
import { Layers2, Laptop, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import Spline from "@splinetool/react-spline/next";

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
  },
  {
    id: 3,
    title: "Automated Solutions",
    icon: <Cpu className="h-8 w-8" />,
    items: ["Natural Language Processing", "AI-Driven Insights"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-8 py-20 text-center sm:px-10 md:flex-row md:items-center md:px-12 md:py-24 lg:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/landing-bg1.png"
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Left Column */}
      <div className="relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-12 md:flex-row">
        <div className="flex w-full flex-col items-center gap-6 p-4 text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left">
          <h2 className="w-full text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              Services
            </span>
          </h2>

          <p className="max-w-lg text-base font-medium leading-relaxed text-gray-200 sm:text-lg md:text-xl animate-fade-in-up animation-delay-200">
            At Camino Code, we provide cutting-edge solutions in data science
            and web development to help businesses unlock new opportunities and
            drive growth.
          </p>

          <div className="flex h-[350px] w-full items-center justify-center object-contain animate-fade-in-up animation-delay-400">
            <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
          </div>
        </div>

        {/* Right Column - Services Cards */}
        <div className="flex w-full flex-col gap-6 p-4 text-white md:w-1/2 md:px-8 md:py-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl border border-gray-600/30 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-white/15 hover:shadow-2xl hover:-translate-y-1 animate-fade-in-up`}
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <h3
                  className={`text-xl font-bold transition-all duration-300 sm:text-2xl md:text-3xl group-hover:text-amber-400`}
                >
                  {service.title}
                </h3>
                <div
                  className={`rounded-full bg-gradient-to-br from-amber-400/20 to-red-600/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:from-amber-400/30 group-hover:to-red-600/30 group-hover:scale-110`}
                >
                  {service.icon}
                </div>
              </div>

              <ul
                className={`mt-6 w-full list-inside list-disc space-y-3 text-left text-base font-medium text-gray-300 transition-colors duration-300 sm:text-lg group-hover:text-gray-200`}
              >
                {service.items.map((item, i) => (
                  <li key={i} className="transition-all duration-300 hover:text-amber-400">{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Button */}
          <div className="flex w-full justify-center border-none pt-4 md:justify-start animate-fade-in-up animation-delay-600">
            <Link
              href="/services"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 sm:w-auto"
            >
              <span className="relative z-10">See All Services</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
