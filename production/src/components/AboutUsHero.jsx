// components/AboutMissionVision.tsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

export default function AboutMissionVision() {
  return (
    <div className="relative overflow-x-hidden bg-gradient-to-b from-transparent via-white to-[rgba(248,244,239,0.3)]">
      {/* Mission Section */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Only Right Model - half off screen */}
        <div className="md:-tr relative top-1/2 right-0 -mr-[400px] h-[350px] w-[800px] md:absolute md:h-[450px] md:-translate-y-1/2">
          <ModelViewer url="/ring-2.glb" />
        </div>
        <motion.section
          id="mission"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 flex min-h-[50vh] flex-col items-start justify-center px-8 py-16 text-left sm:px-10 sm:py-24 md:px-16 md:py-32 lg:px-24 lg:py-40 xl:px-36"
        >
          <h2 className="text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] animate-fade-in-up">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Mission
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl md:text-2xl lg:leading-relaxed"
          >
            At Camino Code, our mission is to deliver innovative data science
            and web development solutions that empower businesses to thrive in a
            fast-paced digital world. We aim to combine technical expertise with
            creative thinking to develop scalable, secure, and high-performing
            systems. By focusing on user experience, data accuracy, and seamless
            functionality, we strive to help businesses make informed decisions,
            automate processes, and improve operational efficiency. Our mission
            is to drive technological growth and provide long-term value through
            cutting-edge solutions.
          </motion.p>
        </motion.section>
      </div>

      {/* Vision Section */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="relative bottom-1/4 left-0 -ml-[350px] h-[350px] w-[800px] md:absolute md:-ml-[400px] md:h-[450px]">
          <ModelViewer url="/ring-1.glb" />
        </div>
        <motion.section
          id="vision"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 flex min-h-[50vh] flex-col items-end justify-center px-8 py-16 text-right sm:px-10 sm:py-24 md:px-16 md:py-32 lg:px-24 lg:py-40 xl:px-36"
        >
          <h2 className="text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] animate-fade-in-up">
            Our{" "}
            <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
              Vision
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl md:text-2xl lg:leading-relaxed"
          >
            Our vision is to become a global leader in data science and web
            development by setting new standards for innovation, performance,
            and customer satisfaction. We envision a future where businesses of
            all sizes have access to intelligent, scalable, and efficient
            technological solutions. By staying at the forefront of industry
            trends and continuously evolving our approach, we aim to create
            transformative solutions that not only meet today's demands but also
            anticipate future challenges and opportunities.
          </motion.p>
        </motion.section>
      </div>
    </div>
  );
}
