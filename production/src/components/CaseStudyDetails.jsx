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
    <div className="mx-auto flex h-auto max-w-[1440px] flex-col gap-12 overflow-x-hidden bg-gradient-to-b from-[rgba(248,244,239,1)] to-white p-8 py-24 text-center md:p-12 lg:py-32">
      {/* Top Image and Title */}
      <div className="flex flex-col items-center gap-8">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-amber-500/20 md:h-[40rem]">
          <Image
            src={casebackground}
            alt="Case study background"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="flex flex-col gap-10 py-12 animate-fade-in-up">
          <h2 className="text-6xl font-black tracking-tight text-gray-900 uppercase sm:text-7xl md:text-8xl lg:text-9xl">
            Case{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Study
            </span>
          </h2>
          <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl animate-fade-in-up animation-delay-200">
            Data-Driven Insights for TechWave
          </h3>
          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-gray-700 sm:text-lg md:text-xl lg:text-2xl animate-fade-in-up animation-delay-400">
            TechWave approached us to improve customer retention through better
            data insights. Their existing system lacked predictive capabilities,
            leading to missed opportunities for engagement and customer
            satisfaction.
          </p>
        </div>
      </div>

      <hr className="w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />

      {/* Challenge */}
      <div className="relative p-8 md:py-16">
        {/* Mobile Model - clipped right */}
        <div className="relative top-4 -right-[200px] z-0 h-[200px] w-[200px] scale-75 rotate-12 md:hidden">
          <ModelViewer url="/cone.glb" />
        </div>

        <div className="relative z-10 flex w-full max-w-[800px] flex-col items-start space-y-6 text-left animate-fade-in-up">
          <h3 className="text-5xl font-black tracking-tight text-gray-900 uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            Challenge
          </h3>
          <p className="inline-block w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-lg font-semibold text-transparent sm:text-xl md:max-w-2/3 md:text-2xl lg:text-3xl leading-relaxed">
            TechWave struggled with a declining customer retention rate and low
            customer satisfaction. Their data collection was fragmented, and
            they lacked the tools to analyze customer behavior and predict
            future trends.
          </p>
        </div>
        {/* Desktop Model */}
        <div className="absolute top-0 right-0 hidden translate-x-[20%] overflow-auto md:block">
          <div className="h-[350px] w-[350px] scale-75 rotate-12">
            <ModelViewer url="/cone.glb" />
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="relative p-8 md:py-16">
        {/* Mobile Model - clipped left */}
        <div className="relative top-4 -left-[20%] z-0 h-[200px] w-[200px] scale-75 -rotate-12 md:hidden">
          <ModelViewer url="/cone-1.glb" />
        </div>

        <div className="relative z-10 flex flex-col items-end space-y-6 text-right animate-fade-in-up">
          <h3 className="text-5xl font-black tracking-tight text-gray-900 uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            Solution
          </h3>
          <ul className="inline-block w-full list-none bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-lg font-semibold text-transparent sm:text-xl md:max-w-2/3 md:text-2xl lg:text-3xl leading-relaxed">
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
        <div className="absolute top-0 left-0 hidden -translate-x-[20%] md:block">
          <div className="h-[350px] w-[350px] scale-75 -rotate-12">
            <ModelViewer url="/cone-1.glb" />
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="relative p-8 md:py-16">
        {/* Mobile Model - clipped right */}
        <div className="relative -right-[200px] z-0 h-[200px] w-[200px] scale-75 rotate-12 md:hidden">
          <ModelViewer url="/cone-2.glb" />
        </div>

        <div className="relative z-10 flex flex-col items-start space-y-6 text-left animate-fade-in-up">
          <h3 className="text-5xl font-black tracking-tight text-gray-900 uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            Implementation
          </h3>
          <ul className="inline-block w-full list-none bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-lg font-semibold text-transparent sm:text-xl md:max-w-2/3 md:text-2xl lg:text-3xl leading-relaxed">
            <li className="mb-2">
              We built a predictive analytics engine using machine learning
              models to analyze customer behavior and improve decision-making.
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
        <div className="absolute top-0 right-0 hidden translate-x-[20%] md:block">
          <div className="h-[350px] w-[350px] scale-75 rotate-12">
            <ModelViewer url="/cone-2.glb" />
          </div>
        </div>
      </div>

      <hr className="mb-16 w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />

      {/* Rest of your component remains the same... */}
      {/* Image Grid */}
      <div className="flex w-full flex-col gap-6 animate-fade-in-up">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl md:h-[50rem]">
          <Image
            src={caseimage1}
            alt="Case study image 1"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="relative h-96 w-full overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl md:h-[51rem] md:w-1/2">
            <Image
              src={caseimage2}
              alt="Case study image 2"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              quality={100}
            />
          </div>
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <div className="relative h-48 w-full overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl md:h-[25rem]">
              <Image
                src={caseimage3}
                alt="Case study image 3"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={100}
              />
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl md:h-[25rem]">
              <Image
                src={caseimage4}
                alt="Case study image 4"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-12 w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />

      {/* Result */}
      <div className="flex h-auto flex-col items-center justify-center space-y-8 py-20 text-center md:h-[36rem] animate-fade-in-up">
        <h3 className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-5xl font-black tracking-tight text-transparent uppercase drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl">
          Result
        </h3>

        <div>
          <div className="mb-6 flex justify-center text-base text-amber-500 sm:text-lg md:text-xl">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="h-8 px-1 drop-shadow-lg transition-all duration-300 hover:scale-110" />
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              Alex Johnson
            </p>
            <p className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-lg font-medium text-transparent sm:text-xl">
              CEO of TechWave
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium italic leading-relaxed text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
            "Camino Code transformed our data strategy, giving us valuable
            insights that boosted efficiency and decision-making."
          </p>
        </div>
      </div>

      <hr className="my-12 w-full border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />
    </div>
  );
};

export default CaseStudyDetails;
