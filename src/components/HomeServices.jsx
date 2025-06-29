"use client";

import Image from "next/image";
import { Layers2, Laptop, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { fadeInUp, staggerContainer } from "@/utils/animations";

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
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
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
      id="services"
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-16 text-center md:flex-row md:items-start md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/images/landing-bg1.png"
          alt="Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <motion.div 
          className="absolute inset-0 bg-black/60"
          animate={{
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex container flex-col items-center gap-10 md:flex-row">
        {/* Left Column */}
        <motion.div 
          className="flex w-full flex-col items-center text-white md:w-1/2 md:items-start md:px-8 md:py-12 md:text-left"
          variants={staggerContainer}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
        >
          <motion.h2 
            className="font-bold uppercase leading-tight text-5xl md:text-[70px] lg:text-[120px]"
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
                transition: { duration: 0.3 }
              }}
            >
              Services
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="max-w-md mt-4 text-base text-white/90 md:text-lg"
            variants={fadeInUp}
            initial="initial"
            animate={hasIntersected ? "animate" : "initial"}
            transition={{ delay: 0.3 }}
          >
            At Camino Code, we provide cutting-edge solutions in data science
            and web development to help businesses unlock new opportunities and
            drive growth.
          </motion.p>
          
          <motion.div 
            className="w-full h-[300px] flex items-center justify-center mt-6"
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={hasIntersected ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Spline scene="https://prod.spline.design/hxXzHDWdUo11wqob/scene.splinecode" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Services Cards */}
        <motion.div 
          className="flex w-full flex-col gap-6 text-white md:w-1/2 md:px-8 md:py-12"
          variants={staggerContainer}
          initial="initial"
          animate={hasIntersected ? "animate" : "initial"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={hasIntersected ? "visible" : "hidden"}
              whileHover={{ 
                scale: 1.02,
                x: 10,
                transition: { duration: 0.3 }
              }}
              className="group rounded-xl border border-gray-700/50 bg-black/30 backdrop-blur-sm p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold md:text-2xl">
                  {service.title}
                </h3>
                <motion.div 
                  className="rounded-full p-3 bg-gradient-to-r from-amber-400/20 to-red-600/20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
              </div>
              <motion.ul 
                className="mt-4 list-disc list-inside space-y-2 text-left text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {service.items.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + i * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div 
            className="flex w-full justify-center pt-4 md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link href="/services">
              <motion.button
                className="group relative overflow-hidden flex items-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-base font-medium text-white shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">See All</span>
                <motion.span 
                  className="ml-2 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
