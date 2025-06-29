"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  useIntersectionObserver,
  useCursorPosition,
} from "@/hooks/useAnimations";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { useRef, useState } from "react";

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
    color: "from-blue-400 to-purple-600",
  },
  {
    id: 2,
    title: "E-Commerce Platform for StyleHub",
    description:
      "Built a scalable web application that boosted online sales by 150%.",
    image: "/assets/images/services_work02.png",
    href: "/case-study-detailed",
    color: "from-green-400 to-teal-600",
  },
  {
    id: 3,
    title: "AI-Powered Chatbot for FinServe",
    description:
      "Implemented NLP solutions reducing customer service costs by 40%.",
    image: "/assets/images/services_work03.png",
    href: "/case-study-detailed",
    color: "from-orange-400 to-red-600",
  },
  {
    id: 4,
    title: "Cloud Migration for HealthTrack",
    description:
      "Seamless transition to cloud infrastructure improving system reliability.",
    image: "/assets/images/services_work04.png",
    href: "/case-study-detailed",
    color: "from-pink-400 to-purple-600",
  },
];

const CaseStudyCard = ({ study, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: cardRef, position } = useCursorPosition();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative max-w-[414px] overflow-hidden rounded-3xl transition-all duration-300 ${
        index % 2 === 1 ? "sm:translate-y-12" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${position.y * 5}deg) rotateY(${
              position.x * 5
            }deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.1s ease-out",
      }}
    >
      <Link href={study.href} className="flex flex-col">
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover"
              quality={90}
            />
          </motion.div>

          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${study.color} mix-blend-multiply`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent rounded-3xl"
            animate={{
              borderColor: isHovered
                ? "rgba(245, 158, 11, 0.5)"
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating elements on hover */}
          <motion.div
            className="absolute top-4 right-4 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.div>
        </div>

        <motion.div
          className="p-6 bg-white"
          animate={{
            backgroundColor: isHovered ? "#fef3c7" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-lg font-semibold text-gray-900 sm:text-xl"
            animate={{
              color: isHovered ? "#f59e0b" : "#111827",
            }}
            transition={{ duration: 0.3 }}
          >
            {study.title}
          </motion.h3>

          <motion.p
            className="mt-2 text-sm text-gray-600 sm:text-base"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {study.description}
          </motion.p>

          <motion.div
            className="mt-4 flex items-center text-sm font-medium text-amber-600"
            animate={{
              x: isHovered ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            View case study
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                x: isHovered ? [0, 5, 0] : 0,
              }}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function WorkShowcase() {
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="work"
      className="relative w-full flex flex-col items-center py-16 px-4 bg-[rgba(248,244,239,1)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(245, 158, 11, 0.1) 35px, rgba(245, 158, 11, 0.1) 70px)`,
          }}
        />
      </div>

      <div className="w-full container mx-auto relative">
        {/* Left Model with enhanced animation */}
        <motion.div
          className="absolute left-0 bottom-0 w-[50vw] h-[350px] -ml-[13vw] z-0 hidden lg:block"
          initial={{ opacity: 0, x: -100 }}
          animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-end pr-[25vw] overflow-hidden"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ModelViewer url="/triangle-1.glb" />
          </motion.div>
        </motion.div>

        {/* Right Model with enhanced animation */}
        <motion.div
          className="absolute right-0 top-1/4 -translate-y-1/2 w-[50vw] h-[350px] -mr-[13vw] z-0 hidden lg:block"
          initial={{ opacity: 0, x: 100 }}
          animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-start pl-[25vw] overflow-hidden"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ModelViewer url="/triangle-2.glb" />
          </motion.div>
        </motion.div>

        {/* Center Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-8">
          <motion.h2
            className="font-bold uppercase text-5xl md:text-[70px] lg:text-[120px] text-center leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            Our{" "}
            <motion.span
              className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              Work
            </motion.span>
          </motion.h2>

          <motion.p
            className="max-w-2xl text-base text-gray-600 text-center"
            variants={fadeInUp}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
            transition={{ delay: 0.3 }}
          >
            We take pride in delivering innovative and impactful solutions for
            our clients. Our work reflects our expertise in data science, web
            development, and AI integration, helping businesses achieve
            measurable success.
          </motion.p>

          {/* Mobile Models with enhanced animation */}
          <motion.div
            className="relative h-[200px] w-[200px] lg:hidden -mr-[150px]"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <ModelViewer url="/triangle-1.glb" />
          </motion.div>

          {/* Case Studies Grid with stagger animation */}
          <motion.div
            className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
          >
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="relative h-[200px] w-[200px] lg:hidden -ml-[150px]"
            animate={{
              rotate: -360,
              y: [0, -20, 0],
            }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <ModelViewer url="/triangle-2.glb" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
