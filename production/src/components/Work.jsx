"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

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
  },
  {
    id: 2,
    title: "E-Commerce Platform for StyleHub",
    description:
      "Built a scalable web application that boosted online sales by 150%.",
    image: "/assets/images/services_work02.png",
    href: "/case-study-detailed",
  },
  {
    id: 3,
    title: "AI-Powered Chatbot for FinServe",
    description:
      "Implemented NLP solutions reducing customer service costs by 40%.",
    image: "/assets/images/services_work03.png",
    href: "/case-study-detailed",
  },
  {
    id: 4,
    title: "Cloud Migration for HealthTrack",
    description:
      "Seamless transition to cloud infrastructure improving system reliability.",
    image: "/assets/images/services_work04.png",
    href: "/case-study-detailed",
  },
];

export default function WorkShowcase() {
  return (
    <section
      id="work"
      className="relative w-full flex flex-col items-center justify-center py-16 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-[rgba(248,244,239,1)]"
    >
      {/* Full width container */}
      <div className="w-full max-w-[1800px] mx-auto relative">
        {/* Left Model (clipped 50% on the left) */}
        <div className="absolute left-0 bottom-0 w-[50vw] h-[350px] -ml-[13vw] z-0 hidden lg:block">
          <div className="w-full h-full flex items-center justify-end pr-[25vw] overflow-hidden">
            <ModelViewer url="/triangle-1.glb" />
          </div>
        </div>

        {/* Right Model (clipped 50% on the right) */}
        <div className="absolute right-0 top-1/4 -translate-y-1/2 w-[50vw] h-[350px] -mr-[13vw] z-0 hidden lg:block">
          <div className="w-full h-full flex items-center justify-start pl-[25vw] overflow-hidden">
            <ModelViewer url="/triangle-2.glb" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-8">
          {/* Heading */}
          <h2 className="font-bold uppercase text-5xl md:text-[70px] lg:text-[120px] mx-auto lg:leading-[130px] md:leading-[80px] text-center leading-[60px]">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          {/* Description */}
          <p className="w-full max-w-2xl text-sm text-gray-600 sm:text-base md:text-lg md:text-left text-center">
            We take pride in delivering innovative and impactful solutions for
            our clients. Our work reflects our expertise in data science, web
            development, and AI integration, helping businesses achieve
            measurable success.
          </p>

          <div className="relative h-[200px] w-[200px] lg:hidden -mr-[300px]">
            <ModelViewer url="/triangle-1.glb" />
          </div>
          {/* Case Studies Grid */}
          <div className="relative grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 items-center justify-items-center">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`group relative max-w-[414px] overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 ${
                  index % 2 === 1 ? "sm:translate-y-12" : ""
                }`}
              >
                <Link
                  href={study.href}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Image with hover effect */}
                  <div className="relative h-64 overflow-hidden sm:h-80 md:h-96">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className=" p-6 text-left transition-all duration-300 group-hover:bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-xl">
                      {study.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                      {study.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-amber-600">
                      View case study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="relative h-[200px] w-[200px] lg:hidden -ml-[300px]">
            <ModelViewer url="/triangle-2.glb" />
          </div>
        </div>
      </div>
    </section>
  );
}
