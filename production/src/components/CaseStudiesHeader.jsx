"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BookOpen, Award, Zap, FileSearch, Target } from "lucide-react";

const CaseStudiesHeader = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Generate random positions for particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 10 + 20,
    delay: Math.random() * 10,
  }));

  return (
    <section
      id="case-studies"
      className="relative flex min-h-[90vh] flex-col items-center justify-center gap-10 overflow-hidden bg-black text-center"
    >
      {/* Enhanced background with parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <Image
          src="/assets/images/casestudies_background.png"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </motion.div>

      {/* Multiple gradient overlays for depth */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(239,68,68,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(251,146,60,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Advanced grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,black_100%)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      {/* Floating particles with safe window access */}
      <div className="absolute inset-0 -z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-amber-400 to-red-600"
            initial={{
              x: `${particle.initialX}%`,
              y: `${particle.initialY}%`,
              opacity: 0,
            }}
            animate={{
              x: `${particle.initialX}%`,
              y: ["-5%", "105%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute -top-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-gradient-to-r from-amber-400/20 via-orange-500/10 to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
          rotate: 360,
        }}
        transition={{
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 },
          rotate: { duration: 100, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute -right-[400px] -bottom-[400px] h-[800px] w-[800px] rounded-full bg-gradient-to-r from-red-600/20 via-orange-600/10 to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
          rotate: -360,
        }}
        transition={{
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 },
          rotate: { duration: 100, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Content container with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center gap-10 px-8 sm:px-10"
      >
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-t from-amber-400 to-red-600 opacity-50 blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FileSearch className="h-5 w-5 text-amber-400" />
            </motion.div>
            <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-sm font-semibold tracking-wider text-transparent uppercase">
              Success Stories
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Target className="h-5 w-5 text-red-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main heading with advanced animations */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem]"
        >
          <motion.span
            className="relative inline-block"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span
              className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent"
              style={{
                transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
              }}
            >
              Case
            </span>
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-amber-400/20 to-red-600/20 blur-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.span>{" "}
          <motion.span
            className="relative inline-block"
            initial={{ scale: 0.5, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span
              className="text-white"
              style={{
                transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
              }}
            >
              Studies
            </span>
            <motion.div
              className="absolute -bottom-4 left-0 h-2 w-full rounded-full bg-gradient-to-t from-amber-400 to-red-600"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.span>
        </motion.h2>

        {/* Enhanced description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-base leading-relaxed font-medium text-gray-200 sm:text-lg md:text-xl lg:text-2xl">
            At{" "}
            <motion.strong
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
                Camino Code
              </span>
            </motion.strong>
            , we take pride in delivering high-quality, innovative solutions in{" "}
            <motion.strong
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text text-transparent">
                data science
              </span>
            </motion.strong>{" "}
            and{" "}
            <motion.strong
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text text-transparent">
                web development
              </span>
            </motion.strong>
            . Our portfolio showcases a range of successful projects, from{" "}
            <span className="font-semibold text-gray-100">
              custom web applications
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-100">
              data-driven platforms
            </span>{" "}
            that enhance business efficiency and performance.
          </p>
        </motion.div>

        {/* Interactive stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-8"
        >
          {[
            {
              icon: BookOpen,
              value: "50+",
              label: "Projects Completed",
              color: "from-amber-400 to-orange-400",
            },
            {
              icon: Award,
              value: "98%",
              label: "Client Satisfaction",
              color: "from-orange-400 to-red-600",
            },
            {
              icon: Zap,
              value: "3x",
              label: "Average ROI",
              color: "from-amber-400 to-red-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 blur-xl transition-opacity group-hover:opacity-40`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
              <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20">
                <div
                  className={`rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}
                >
                  <div className="rounded-xl bg-black p-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <motion.div
                    className={`bg-gradient-to-r text-3xl font-bold ${stat.color} bg-clip-text text-transparent`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Advanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-[0.2em] text-white/40 uppercase">
            Scroll to explore
          </span>
          <div className="relative">
            <div className="h-12 w-7 rounded-full border-2 border-white/20 p-1">
              <motion.div
                className="mx-auto h-2 w-2 rounded-full bg-gradient-to-t from-amber-400 to-red-600"
                animate={{
                  y: [0, 20, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div
              className="absolute inset-0 h-12 w-7 rounded-full border-2 border-white/40"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CaseStudiesHeader;
