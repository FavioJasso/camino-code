// components/AboutMissionVision.jsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import ModelViewer for client-side rendering only
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

export default function AboutMissionVision() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Mission Section */}
      <div className="relative mx-auto container">
        {/* Decorative Model on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[350px] md:h-[450px] -mr-[400px] pointer-events-none select-none hidden md:block">
          <ModelViewer url="/ring-2.glb" />
        </div>
        <motion.section
          id="mission"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start justify-center px-6 py-8 text-left sm:px-8 md:px-16 lg:px-24 xl:px-36"
        >
          <h2 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 max-w-2xl text-base text-orange-600 md:text-xl"
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
      <div className="relative mx-auto container">
        {/* Decorative Model on the left */}
        <div className="absolute left-0 bottom-1/4 w-[800px] h-[350px] md:h-[450px] -ml-[400px] pointer-events-none select-none hidden md:block">
          <ModelViewer url="/ring-1.glb" />
        </div>
        <motion.section
          id="vision"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-end justify-center px-6 py-8 text-right sm:px-8 md:px-16 lg:px-24 xl:px-36"
        >
          <h2 className="text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Vision
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 max-w-2xl text-base text-orange-600 md:text-xl"
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
