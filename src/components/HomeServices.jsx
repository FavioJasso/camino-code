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
      className="relative  flex flex-col items-center justify-center overflow-hidden px-6 py-16 text-center md:flex-row md:items-start md:px-10"
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative  z-10 flex container flex-col items-center gap-10 md:flex-row">
        {/* Left Column */}
        <div className="flex w-full flex-col items-center text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left">
          <h2 className="font-bold uppercase leading-tight text-5xl md:text-[70px] lg:text-[120px]">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="max-w-md mt-4 text-base text-white/90 md:text-lg">
            At Camino Code, we provide cutting-edge solutions in data science
            and web development to help businesses unlock new opportunities and
            drive growth.
          </p>
          <div className="w-full h-[300px] flex items-center justify-center mt-6">
            <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
          </div>
        </div>

        {/* Right Column - Services Cards */}
        <div className="flex w-full flex-col gap-6 text-white md:w-1/2 md:px-8 md:py-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-xl border border-gray-700/50 bg-black/30 transition hover:bg-black/50 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold md:text-2xl">
                  {service.title}
                </h3>
                <div className="rounded-full">{service.icon}</div>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-2 text-left text-base">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Button */}
          <div className="flex w-full justify-center pt-4 md:justify-start">
            <Link
              href="/services"
              className="group flex items-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              See All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
