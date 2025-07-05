"use client";

import Image from "next/image";
import { ArrowDown, Sparkles, Users, Puzzle, Scaling } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const features = [
  {
    id: 1,
    title: "Innovation at the Core",
    description: "Cutting-edge solutions that drive business transformation",
    icon: <Sparkles className="h-10 w-10" />,
    image: "/assets/images/offers_bg01.png",
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "Tailored strategies focused on your business goals",
    icon: <Users className="h-10 w-10" />,
    image: "/assets/images/offers_bg02.png",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Effortless compatibility with your existing systems",
    icon: <Puzzle className="h-10 w-10" />,
    image: "/assets/images/offers_bg03.png",
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "Future-proof technology that grows with your business",
    icon: <Scaling className="h-10 w-10" />,
    image: "/assets/images/offers_bg04.png",
  },
];

export default function WhatSetsUsApart() {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[rgba(248,244,239,1)] px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative container mx-auto">
        {/* Left Model with animation */}
        <motion.div
          className="absolute bottom-0 left-0 z-0 ml-[-15vw] hidden h-[500px] w-[50vw] lg:block"
          initial={{ opacity: 0, x: -100 }}
          animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-end overflow-hidden pr-[25vw]"
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
            <ModelViewer url="/bolb-1.glb" />
          </motion.div>
        </motion.div>

        {/* Right Model with animation */}
        <motion.div
          className="absolute top-1/2 right-0 z-0 mr-[-15vw] hidden h-[500px] w-[50vw] -translate-y-1/2 lg:block"
          initial={{ opacity: 0, x: 100 }}
          animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-start overflow-hidden pl-[25vw]"
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
            <ModelViewer url="/bolb-2.glb" />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
          <motion.h2
            className="text-center text-3xl font-bold text-black uppercase sm:text-4xl md:text-[4rem] lg:text-[5rem]"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            What Sets Us{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              Apart
            </motion.span>
          </motion.h2>

          <motion.p
            className="max-w-[600px] text-center text-sm text-gray-700 sm:text-base md:text-lg"
            variants={fadeInUp}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
            transition={{ delay: 0.3 }}
          >
            At Camino Code, we combine data science and web development to
            create innovative, future-ready solutions. From predictive analytics
            to custom web applications, we help businesses thrive in the digital
            age.
          </motion.p>

          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="#contact">
              <motion.button
                className="group relative overflow-hidden rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg sm:px-8 sm:py-4 sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="relative z-10 ml-2 inline-block"
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </Link>
          </motion.div>

          <motion.ul
            className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
          >
            {features.map((feature, index) => (
              <motion.li
                key={feature.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={hasIntersected ? "visible" : "hidden"}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="group relative h-64 w-full overflow-hidden rounded-xl shadow-lg">
                  <div className="absolute inset-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      quality={90}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                    <motion.div
                      className="mb-4 rounded-full bg-gradient-to-t from-amber-400/20 to-red-600/20 p-4 backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-sm opacity-90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
}
