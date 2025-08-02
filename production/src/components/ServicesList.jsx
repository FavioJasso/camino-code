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
      className="mx-auto flex h-auto max-w-[1440px] flex-col items-center px-6 py-16 sm:px-8 sm:py-20 md:items-start md:px-10 lg:px-12"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl lg:my-6 lg:text-6xl"
      >
        Our Services
      </motion.h2>

      {/* Services Grid */}
      <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="flex flex-col gap-6 rounded-xl bg-[rgba(236,234,232,1)] p-8"
          >
            {/* Service Icon */}
            <div className="h-20">{service.icon}</div>

            {/* Service Title */}
            <h3 className="text-xl font-bold sm:text-2xl md:text-3xl">
              {service.title}
            </h3>

            {/* Service Description */}
            <p className="text-base text-red-600 sm:text-lg md:text-xl">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
