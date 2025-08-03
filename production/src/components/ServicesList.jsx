// components/ServicesSection.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, Brain, Code, Sparkles } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Data Science",
    description: "Data, insights, infrastructure & AI",
    icon: <Brain className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    gradient: "from-amber-400 to-red-600",
    shadowColor: "shadow-orange-500/20",
    href: "#data-science",
  },
  {
    id: 2,
    title: "Software Development",
    description: "Web, app, prototypes & products",
    icon: <Code className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    gradient: "from-orange-400 to-red-500",
    shadowColor: "shadow-red-500/20",
    href: "#software-development",
  },
  {
    id: 3,
    title: "Audit and Refine SME Solutions",
    description: "Data, insights, infrastructure & AI",
    icon: <Cpu className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    gradient: "from-amber-400 to-orange-600",
    shadowColor: "shadow-amber-500/20",
    href: "#audit",
  },
];

function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.a
      href={service.href}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative flex flex-col gap-6 rounded-3xl border border-gray-200 bg-gradient-to-br from-white/90 to-gray-50/90 p-8 backdrop-blur-xl transition-all duration-500 hover:border-orange-300 ${service.shadowColor} hover:shadow-2xl sm:p-10 md:p-12`}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-1 w-1 rounded-full bg-gradient-to-r ${service.gradient}`}
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 300,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 300,
                y: Math.random() * 300,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Icon container with glow effect */}
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        <motion.div
          className={`absolute -inset-4 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50`}
        />
        <div
          className={`relative bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110`}
        >
          {service.icon}
        </div>
      </div>

      {/* Title with 3D effect */}
      <h3
        className="text-2xl font-bold text-gray-800 transition-all duration-300 sm:text-3xl md:text-4xl"
        style={{ transform: "translateZ(30px)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={`text-base font-medium text-gray-600 transition-all duration-300 group-hover:text-gray-700 sm:text-lg md:text-xl`}
        style={{ transform: "translateZ(20px)" }}
      >
        {service.description}
      </p>

      {/* Interactive elements */}
      <div className="mt-auto flex items-center justify-between">
        <motion.div
          className={`h-1 w-0 rounded-full bg-gradient-to-r ${service.gradient} transition-all duration-500 group-hover:w-20`}
        />
        <motion.div
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-orange-600"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          Learn more
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* Corner accent */}
      <div
        className={`absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
      />
    </motion.a>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-white">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-8 py-20 sm:px-10 sm:py-24 md:px-12 lg:px-16 lg:py-32">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-orange-500" />
            <span className="text-sm font-semibold tracking-wider text-orange-600 uppercase">
              What We Offer
            </span>
            <Sparkles className="h-6 w-6 text-orange-500" />
          </motion.div>

          <h2 className="text-4xl font-black text-gray-800 uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our
            </motion.span>{" "}
            <motion.span
              className="inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Services
            </motion.span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="perspective-1000 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
