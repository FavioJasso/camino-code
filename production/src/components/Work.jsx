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
      className="relative flex w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[rgba(248,244,239,1)] to-white px-8 py-20 sm:px-10 md:py-24 md:pb-32 lg:px-12 lg:py-32"
    >
      {/* Full width container */}
      <div className="relative mx-auto w-full max-w-[1800px]">
        {/* Left Model (clipped 50% on the left) */}
        <div className="absolute bottom-0 left-0 z-0 -ml-[13vw] hidden h-[350px] w-[50vw] lg:block">
          <div className="flex h-full w-full items-center justify-end overflow-hidden pr-[25vw]">
            <ModelViewer url="/triangle-1.glb" />
          </div>
        </div>

        {/* Right Model (clipped 50% on the right) */}
        <div className="absolute top-1/4 right-0 z-0 -mr-[13vw] hidden h-[350px] w-[50vw] -translate-y-1/2 lg:block">
          <div className="flex h-full w-full items-center justify-start overflow-hidden pl-[25vw]">
            <ModelViewer url="/triangle-2.glb" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
          {/* Heading */}
          <h2 className="mx-auto text-center text-5xl leading-[60px] font-black tracking-tight text-gray-900 uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Work
            </span>
          </h2>

          {/* Description */}
          <p className="w-full max-w-3xl text-center text-base font-medium leading-relaxed text-gray-700 sm:text-lg md:text-xl animate-fade-in-up animation-delay-200">
            We take pride in delivering innovative and impactful solutions for
            our clients. Our work reflects our expertise in data science, web
            development, and AI integration, helping businesses achieve
            measurable success.
          </p>

          <div className="relative -mr-[300px] h-[200px] w-[200px] lg:hidden">
            <ModelViewer url="/triangle-1.glb" />
          </div>
          {/* Case Studies Grid */}
          <div className="relative grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-10 sm:grid-cols-2 animate-fade-in-up animation-delay-400">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`group relative max-w-[500px] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-2 ${
                  index % 2 === 1 ? "sm:translate-y-12" : ""
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <Link
                  href={study.href}
                  className="flex flex-col overflow-hidden"
                >
                  {/* Image with hover effect */}
                  <div className="relative h-72 overflow-hidden sm:h-80 md:h-96">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="bg-white p-8 text-left transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-gray-50 group-hover:to-white">
                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-2xl">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
                      {study.description}
                    </p>
                    <div className="mt-6 flex items-center text-base font-semibold text-amber-600 transition-all duration-300 group-hover:text-red-600">
                      View case study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
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

          <div className="relative -ml-[300px] h-[200px] w-[200px] lg:hidden">
            <ModelViewer url="/triangle-2.glb" />
          </div>
        </div>
      </div>
    </section>
  );
}
