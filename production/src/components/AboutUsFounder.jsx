// components/AboutUsFounder.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Quote,
  Sparkles,
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  Linkedin,
  Twitter,
  Mail,
  Code2,
  Cpu,
  Binary,
  Zap,
} from "lucide-react";

export default function AboutUsFounder() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document
        .getElementById("founder-section")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Founder achievements/stats
  const achievements = [
    { icon: Award, label: "10+ Years Experience", value: "Industry Leader" },
    { icon: Briefcase, label: "50+ Projects", value: "Successfully Delivered" },
    { icon: Calendar, label: "Founded 2020", value: "Camino Code" },
  ];

  // Social links
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  // Floating tech icons
  const floatingIcons = [
    {
      Icon: Code2,
      position: "top-[15%] left-[10%]",
      delay: 0,
      size: "h-6 w-6",
    },
    { Icon: Cpu, position: "top-[20%] right-[15%]", delay: 1, size: "h-5 w-5" },
    {
      Icon: Binary,
      position: "bottom-[25%] left-[12%]",
      delay: 2,
      size: "h-7 w-7",
    },
    {
      Icon: Zap,
      position: "bottom-[20%] right-[10%]",
      delay: 3,
      size: "h-5 w-5",
    },
  ];

  return (
    <section
      id="founder-section"
      className="relative flex min-h-[90vh] flex-col items-center justify-center gap-10 overflow-hidden bg-black px-8 py-20 text-center sm:gap-12 sm:px-10 sm:py-24 md:gap-14 md:px-12 lg:py-32"
    >
      {/* Futuristic Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#331800_1px,transparent_1px),linear-gradient(to_bottom,#331800_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-gradient-to-t from-amber-400/10 to-red-600/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-t from-orange-500/10 to-red-500/10 blur-3xl"
        />
      </div>

      {/* Dynamic Mouse Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.15), transparent 40%)`,
        }}
      />

      {/* Floating Tech Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} pointer-events-none z-10`}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.Icon className={`${item.size} text-orange-500/30`} />
        </motion.div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500/20 blur-xl" />
            <div className="relative rounded-full border border-orange-500/30 bg-gray-900/80 px-6 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">
                  Leadership & Vision
                </span>
                <Sparkles className="h-4 w-4 text-orange-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative mb-12 text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              Our Founder
            </span>
          </motion.div>

          <span className="relative text-white">
            Our{" "}
            <span className="inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              Founder
            </span>
          </span>
        </motion.h1>

        {/* Founder Card with Image and Info */}
        <div className="mb-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-1">
              {/* Animated Border Gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-t from-amber-400 via-orange-500 to-red-600"
                animate={{
                  opacity: isImageHovered ? 0.8 : 0.3,
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative overflow-hidden rounded-3xl bg-gray-950">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <Image
                  src="/assets/images/partner_1.png"
                  alt="Our Founder"
                  width={600}
                  height={600}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />

                {/* Overlay Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isImageHovered ? 1 : 0,
                    y: isImageHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6"
                >
                  <h3 className="text-2xl font-bold text-white">John Doe</h3>
                  <p className="text-orange-400">CEO & Founder</p>
                </motion.div>
              </div>
            </div>

            {/* Floating Elements around Image */}
            <motion.div
              className="absolute -top-4 -right-4 rounded-full bg-gradient-to-t from-amber-400 to-red-600 p-3"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Award className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed font-medium text-gray-300 sm:text-xl"
              >
                With over a decade of experience in{" "}
                <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-bold text-transparent">
                  data science
                </span>{" "}
                and{" "}
                <span className="bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text font-bold text-transparent">
                  web development
                </span>
                , our founder has been at the forefront of technological
                innovation. Leading teams across multiple industries, they've
                delivered transformative solutions that drive business growth
                and operational excellence.
              </motion.p>
            </div>

            {/* Achievements */}
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-red-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-4">
                    <div className="rounded-lg bg-gradient-to-br from-amber-400/20 to-red-600/20 p-3">
                      <achievement.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {achievement.value}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {achievement.label}
                      </p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-900/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-red-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <social.icon className="relative z-10 h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-white" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-xl">
            {/* Quote Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <Quote className="absolute -top-10 -left-10 h-40 w-40 text-orange-400" />
              <Quote className="absolute -right-10 -bottom-10 h-40 w-40 rotate-180 text-orange-400" />
            </div>

            {/* Animated Gradient Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-red-600/5"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <blockquote className="relative z-10 text-center">
              <Quote className="mx-auto mb-4 h-8 w-8 text-orange-400" />
              <p className="text-xl font-medium text-gray-100 italic sm:text-2xl md:text-3xl lg:text-3xl">
                "Innovation is seeing what{" "}
                <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text font-bold text-transparent">
                  everyone has seen
                </span>{" "}
                and thinking what{" "}
                <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-bold text-transparent">
                  nobody has thought
                </span>
                ."
              </p>
              <footer className="mt-6">
                <p className="text-sm text-gray-400">
                  — John Doe, CEO & Founder
                </p>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
      />
    </section>
  );
}
