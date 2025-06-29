"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const CaseStudyDetails = () => {
  const casebackground = "/assets/images/services_work01.png";
  const caseimage1 = "/assets/images/case_image01.png";
  const caseimage2 = "/assets/images/case_image02.png";
  const caseimage3 = "/assets/images/case_image03.png";
  const caseimage4 = "/assets/images/case_image04.png";

  return (
    <div className="flex h-auto flex-col gap-8 text-center py-20 max-w-[1440px] mx-auto overflow-x-hidden bg-[rgba(248,244,239,1)]">
      {/* Top Image and Title */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-96 w-full rounded-lg md:h-[40rem]">
          <Image
            src={casebackground}
            alt="Case study background"
            fill
            className="rounded-lg object-cover"
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-8 py-10">
          <h2 className="text-5xl font-bold text-gray-800 sm:text-6xl md:text-7xl lg:text-8xl">
            Case{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Study
            </span>
          </h2>
          <h3 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
            Data-Driven Insights for TechWave
          </h3>
          <p className="text-sm text-gray-600 sm:text-base md:max-w-2xl md:text-lg lg:text-xl">
            TechWave approached us to improve customer retention through better
            data insights. Their existing system lacked predictive capabilities,
            leading to missed opportunities for engagement and customer
            satisfaction.
          </p>
        </div>
      </div>

      <hr className="w-full border-gray-700" />

      {/* Challenge */}
      <div className="relative md:py-10">
        {/* Mobile Model - clipped right */}
        <div className="md:hidden relative -right-[200px] top-4 w-[200px] h-[200px] rotate-12 z-0 scale-75">
          <ModelViewer url="/cone.glb" />
        </div>
        
        <div className="flex w-full flex-col items-start space-y-4 max-w-[700px] text-left relative z-10">
          <h3 className="text-4xl font-bold text-gray-700 uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Challenge
          </h3>
          <p className="inline-block w-full md:max-w-2/3 bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-sm text-transparent sm:text-base md:text-lg lg:text-xl">
            TechWave struggled with a declining customer retention rate and low
            customer satisfaction. Their data collection was fragmented, and
            they lacked the tools to analyze customer behavior and predict
            future trends.
          </p>
        </div>
        {/* Desktop Model */}
        <div className="absolute right-0 top-0 hidden md:block translate-x-[20%] overflow-auto">
          <div className="w-[350px] h-[350px] rotate-12 scale-75">
            <ModelViewer url="/cone.glb" />
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="relative md:py-10">
        {/* Mobile Model - clipped left */}
        <div className="md:hidden relative -left-[20%] top-4 w-[200px] h-[200px] -rotate-12 z-0 scale-75">
          <ModelViewer url="/cone-1.glb" />
        </div>
        
        <div className="flex flex-col items-end space-y-4 text-right relative z-10">
          <h3 className="text-4xl font-bold text-gray-700 uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Solution
          </h3>
          <ul className="inline-block w-full md:max-w-2/3 list-none bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-sm text-transparent sm:text-base md:text-lg lg:text-xl">
            <li className="mb-2">
              We developed a predictive analytics model using advanced machine
              learning algorithms to analyze customer behavior and identify
              patterns.
            </li>
            <li className="mb-2">
              Real-time data processing was implemented to provide immediate
              insights, enabling TechWave to adjust their customer engagement
              strategies dynamically.
            </li>
            <li>
              Personalized recommendations and targeted communication were
              introduced to improve customer satisfaction and encourage repeat
              business.
            </li>
          </ul>
        </div>
        {/* Desktop Model */}
        <div className="absolute left-0 top-0 hidden md:block -translate-x-[20%]">
          <div className="w-[350px] h-[350px] -rotate-12 scale-75">
            <ModelViewer url="/cone-1.glb" />
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="relative md:py-10">
        {/* Mobile Model - clipped right */}
        <div className="md:hidden relative  -right-[200px] w-[200px] h-[200px] rotate-12 z-0 scale-75">
          <ModelViewer url="/cone-2.glb" />
        </div>
        
        <div className="flex flex-col items-start space-y-4 text-left relative z-10">
          <h3 className="text-4xl font-bold text-gray-700 uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Implementation
          </h3>
          <ul className="inline-block w-full md:max-w-2/3 list-none bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-sm text-transparent sm:text-base md:text-lg lg:text-xl">
            <li className="mb-2">
              We built a predictive analytics engine using machine learning models
              to analyze customer behavior and improve decision-making.
            </li>
            <li className="mb-2">
              A real-time data processing system was developed to deliver faster
              insights, enabling dynamic adjustments to customer engagement.
            </li>
            <li>
              We also created a personalized customer engagement framework based
              on predictive insights, ensuring targeted and effective
              communication.
            </li>
          </ul>
        </div>
        {/* Desktop Model */}
        <div className="absolute right-0 top-0 hidden md:block translate-x-[20%]">
          <div className="w-[350px] h-[350px] rotate-12 scale-75">
            <ModelViewer url="/cone-2.glb" />
          </div>
        </div>
      </div>

      <hr className="mb-10 w-full border-gray-700" />

      {/* Rest of your component remains the same... */}
      {/* Image Grid */}
      <div className="flex w-full flex-col gap-4">
        <div className="relative h-96 w-full rounded-lg md:h-[50rem]">
          <Image
            src={caseimage1}
            alt="Case study image 1"
            fill
            className="rounded-lg object-cover"
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative h-96 w-full rounded-lg md:h-[51rem] md:w-1/2">
            <Image
              src={caseimage2}
              alt="Case study image 2"
              fill
              className="rounded-lg object-cover"
              quality={100}
            />
          </div>
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <div className="relative h-48 w-full rounded-lg md:h-[25rem]">
              <Image
                src={caseimage3}
                alt="Case study image 3"
                fill
                className="rounded-lg object-cover"
                quality={100}
              />
            </div>
            <div className="relative h-48 w-full rounded-lg md:h-[25rem]">
              <Image
                src={caseimage4}
                alt="Case study image 4"
                fill
                className="rounded-lg object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 w-full border-gray-700" />

      {/* Result */}
      <div className="flex h-auto flex-col items-center justify-center space-y-4 py-14 text-center md:h-[32rem]">
        <h3 className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-4xl font-extrabold uppercase text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Result
        </h3>

        <div>
          <div className="mb-4 flex justify-center text-base text-amber-500 sm:text-lg md:text-xl">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="px-1 h-6" />
            ))}
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-base font-semibold sm:text-lg md:text-xl">
              Alex Johnson
            </p>
            <p className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-sm italic text-transparent sm:text-base">
              CEO of TechWave
            </p>
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl">
            "Camino Code transformed our data strategy, giving us valuable
            insights that boosted efficiency and decision-making."
          </p>
        </div>
      </div>

      <hr className="my-8 w-full border-gray-700" />
    </div>
  );
};

export default CaseStudyDetails;