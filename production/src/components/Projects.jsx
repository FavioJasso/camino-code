// components/ProjectsShowcase.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "Data-Driven Insights for TechWave",
    description:
      "Developed a predictive analytics model that increased customer retention by 30%.",
    image: "/assets/images/services_work01.png",
    href: "/case-studies/techwave",
  },
  {
    id: 2,
    title: "E-Commerce Platform for StyleHub",
    description:
      "Built a scalable web application that boosted online sales by 150%.",
    image: "/assets/images/services_work02.png",
    href: "/case-studies/stylehub",
  },
  {
    id: 3,
    title: "AI-Powered Chatbot for FinServe",
    description:
      "Implemented NLP solutions reducing customer service costs by 40%.",
    image: "/assets/images/services_work03.png",
    href: "/case-studies/finserve",
  },
  {
    id: 4,
    title: "Cloud Migration for HealthTrack",
    description:
      "Seamless transition to cloud infrastructure improving system reliability.",
    image: "/assets/images/services_work04.png",
    href: "/case-studies/healthtrack",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex flex-col items-center px-6 py-16 sm:px-8 sm:py-20 md:px-10 justify-center w-full max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex max-w-2xl flex-col items-center text-center md:items-start md:text-left"
      >
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Featured Projects
        </h2>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          We take pride in delivering innovative and impactful solutions for our
          clients. Our work reflects our expertise in data science, web
          development, and AI integration, helping businesses achieve measurable
          success.
        </p>
      </motion.div>

      {/* Case Studies Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="relative mt-12 grid w-full max-w-[1440px] mx-auto grid-cols-1 sm:grid-cols-2 gap-8 h-[250vh]"
      >
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className={`group max-w-[414px] rounded-lg w-full ${
              index % 2 === 1 ? "sm:translate-y-1/2" : ""
            }`}
          >
            <Link
              href={study.href}
              className="flex flex-col overflow-hidden rounded-xl"
            >
              {/* Image with hover effect */}
              <div className="relative h-[548px] overflow-hidden rounded-lg">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 h-[548px]"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="bg-white p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-amber-600 sm:text-xl">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  {study.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex w-full justify-center"
      >
        <Link
          href="/case-studies"
          className="rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:text-base"
        >
          View All Projects
        </Link>
      </motion.div>
    </section>
  );
}
