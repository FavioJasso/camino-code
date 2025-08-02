// components/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Layers2, Laptop, Cpu, Laptop2 } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Data Science",
    description: "Data, insights, infrastructure & AI",
    icon: <Layers2 className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    color: "text-black",
  },
  {
    id: 2,
    title: "Software Development",
    description: "Web, app, prototypes & products",
    icon: <Laptop2 className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    color: "gradient-text",
  },
  {
    id: 3,
    title: "Audit and Refine SME Solutions",
    description: "Data, insights, infrastructure & AI",
    icon: <Cpu className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />,
    color: "gradient-text",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="mx-auto flex h-auto max-w-[1440px] flex-col items-center px-8 py-20 sm:px-10 sm:py-24 md:items-start md:px-12 lg:px-16 lg:py-32"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-black tracking-tight text-gray-900 uppercase sm:text-5xl md:text-6xl lg:my-8 lg:text-7xl xl:text-8xl"
      >
        Our Services
      </motion.h2>

      {/* Services Grid */}
      <div className="mt-12 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative flex flex-col gap-8 rounded-2xl bg-gradient-to-br from-[rgba(236,234,232,1)] to-[rgba(240,238,236,1)] p-10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            {/* Service Icon */}
            <div className="h-24 text-gray-700 transition-all duration-300 group-hover:text-amber-600 group-hover:scale-110">
              {service.icon}
            </div>

            {/* Service Title */}
            <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-3xl md:text-4xl">
              {service.title}
            </h3>

            {/* Service Description */}
            <p className="text-lg font-medium bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent sm:text-xl md:text-2xl">
              {service.description}
            </p>
            
            {/* Hover accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-red-600 transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
