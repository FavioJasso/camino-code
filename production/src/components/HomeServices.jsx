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
      className="relative flex h-auto flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:px-8 md:flex-row md:items-start md:px-10"
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

      {/* Left Column */}
      <div className="relative z-10 flex max-w-[1440px] flex-col items-center justify-center gap-10 md:flex-row">
        <div className="flex w-full flex-col items-center p-4 text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left">
          <h2 className="w-full text-5xl leading-[60px] font-bold uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="max-w-md text-sm text-white/90 sm:text-base md:text-lg">
            At Camino Code, we provide cutting-edge solutions in data science
            and web development to help businesses unlock new opportunities and
            drive growth.
          </p>

          <div className="flex h-[300px] w-full items-center justify-center object-contain">
            <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
          </div>
        </div>

        {/* Right Column - Services Cards */}
        <div className="flex w-full flex-col gap-6 p-4 text-white md:w-1/2 md:px-8 md:py-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-xl border border-gray-700/50 p-6 transition-all duration-300 ${"bg-black/30 hover:bg-black/50"}`}
            >
              <div className="flex w-full items-center justify-between gap-4">
                <h3
                  className={`text-lg font-bold transition-colors duration-300 sm:text-xl md:text-2xl`}
                >
                  {service.title}
                </h3>
                <div
                  className={`rounded-full p-2 transition-colors duration-300`}
                >
                  {service.icon}
                </div>
              </div>

              <ul
                className={`mt-4 w-full list-inside list-disc space-y-2 text-left text-sm transition-colors duration-300 sm:text-base`}
              >
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Button */}
          <div className="flex w-full justify-center border-none pt-4 md:justify-start">
            <Link
              href="/services"
              className="group flex w-full items-center justify-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-center text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto sm:text-base"
            >
              See All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
