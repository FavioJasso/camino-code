"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Zap,
  Target,
  Layers,
  Brain,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Activity,
} from "lucide-react";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const CaseStudyDetails = () => {
  const casebackground = "/assets/images/services_work01.png";
  const caseimage1 = "/assets/images/case_image01.png";
  const caseimage2 = "/assets/images/case_image02.png";
  const caseimage3 = "/assets/images/case_image03.png";
  const caseimage4 = "/assets/images/case_image04.png";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  // Stats data
  const stats = [
    {
      value: "30%",
      label: "Increased Retention",
      icon: TrendingUp,
      color: "from-blue-400 to-cyan-400",
    },
    {
      value: "250%",
      label: "ROI Improvement",
      icon: BarChart3,
      color: "from-purple-400 to-pink-400",
    },
    {
      value: "60%",
      label: "Faster Insights",
      icon: Zap,
      color: "from-amber-400 to-orange-400",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-auto flex-col gap-12 overflow-x-hidden bg-black p-8 py-24 text-center md:p-12 lg:py-32"
    >
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,black_100%)] bg-[size:100px_100px]" />
        <motion.div
          className="absolute -top-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-transparent blur-3xl"
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
      </div>

      {/* Top Image and Title */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto flex flex-col items-center gap-8"
      >
        <motion.div
          className="relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[40rem]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={casebackground}
            alt="Case study background"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 mix-blend-overlay"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          {/* Floating particles overlay */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/30"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: ["-20%", "120%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-10 py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto flex items-center gap-2"
          >
            <Activity className="h-5 w-5 text-blue-400" />
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Success Story
            </span>
            <Sparkles className="h-5 w-5 text-blue-400" />
          </motion.div>

          <h2 className="text-6xl font-black tracking-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-block"
            >
              Case
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Study
            </motion.span>
          </h2>

          <motion.h3
            className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Data-Driven Insights for{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              TechWave
            </span>
          </motion.h3>

          <motion.p
            className="mx-auto max-w-3xl text-base leading-relaxed font-medium text-gray-400 sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            TechWave approached us to improve customer retention through better
            data insights. Their existing system lacked predictive capabilities,
            leading to missed opportunities for engagement and customer
            satisfaction.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto my-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 blur-xl transition-opacity group-hover:opacity-40`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
            />
            <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20">
              <div
                className={`rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}
              >
                <div className="rounded-xl bg-black p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`bg-gradient-to-r text-4xl font-bold ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <hr className="w-full border-t border-white/10" />

      {/* Challenge Section */}
      <motion.div
        className="relative container mx-auto p-8 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Mobile Model */}
        <motion.div
          className="relative top-4 -right-[200px] z-0 h-[200px] w-[200px] scale-75 md:hidden"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ModelViewer url="/cone.glb" />
        </motion.div>

        <div className="relative z-10 flex w-full max-w-[800px] flex-col items-start space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-0.5">
              <div className="rounded-xl bg-black p-3">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-5xl font-black tracking-tight text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              Challenge
            </h3>
          </motion.div>

          <motion.p
            className="inline-block w-full bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-lg leading-relaxed font-semibold text-transparent sm:text-xl md:max-w-2/3 md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TechWave struggled with a declining customer retention rate and low
            customer satisfaction. Their data collection was fragmented, and
            they lacked the tools to analyze customer behavior and predict
            future trends.
          </motion.p>
        </div>

        {/* Desktop Model with glow effect */}
        <motion.div
          className="absolute top-0 right-0 hidden translate-x-[20%] overflow-auto md:block"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative h-[350px] w-[350px] scale-75">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <ModelViewer url="/cone.glb" />
          </div>
        </motion.div>
      </motion.div>

      {/* Solution Section */}
      <motion.div
        className="relative container mx-auto p-8 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Mobile Model */}
        <motion.div
          className="relative top-4 -left-[20%] z-0 h-[200px] w-[200px] scale-75 md:hidden"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ModelViewer url="/cone-1.glb" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-end space-y-6 text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <h3 className="text-5xl font-black tracking-tight text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              Solution
            </h3>
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
              <div className="rounded-xl bg-black p-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.ul
            className="inline-block w-full list-none space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              "We developed a predictive analytics model using advanced machine learning algorithms to analyze customer behavior and identify patterns.",
              "Real-time data processing was implemented to provide immediate insights, enabling TechWave to adjust their customer engagement strategies dynamically.",
              "Personalized recommendations and targeted communication were introduced to improve customer satisfaction and encourage repeat business.",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-lg leading-relaxed font-semibold text-transparent sm:text-xl md:text-2xl lg:text-3xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Desktop Model with glow effect */}
        <motion.div
          className="absolute top-0 left-0 hidden -translate-x-[20%] md:block"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative h-[350px] w-[350px] scale-75">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <ModelViewer url="/cone-1.glb" />
          </div>
        </motion.div>
      </motion.div>

      {/* Implementation Section */}
      <motion.div
        className="relative container mx-auto p-8 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Mobile Model */}
        <motion.div
          className="relative -right-[200px] z-0 h-[200px] w-[200px] scale-75 md:hidden"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ModelViewer url="/cone-2.glb" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-start space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <div className="rounded-xl bg-black p-3">
                <Code2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-5xl font-black tracking-tight text-white uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              Implementation
            </h3>
          </motion.div>

          <motion.ul
            className="inline-block w-full list-none space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              "We built a predictive analytics engine using machine learning models to analyze customer behavior and improve decision-making.",
              "A real-time data processing system was developed to deliver faster insights, enabling dynamic adjustments to customer engagement.",
              "We also created a personalized customer engagement framework based on predictive insights, ensuring targeted and effective communication.",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-lg leading-relaxed font-semibold text-transparent sm:text-xl md:text-2xl lg:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Layers className="mt-1 h-6 w-6 flex-shrink-0 text-purple-400" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Desktop Model with glow effect */}
        <motion.div
          className="absolute top-0 right-0 hidden translate-x-[20%] md:block"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative h-[350px] w-[350px] scale-75">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <ModelViewer url="/cone-2.glb" />
          </div>
        </motion.div>
      </motion.div>

      <hr className="mb-16 w-full border-t border-white/10" />

      {/* Image Grid with enhanced animations */}
      <motion.div
        className="container mx-auto flex w-full flex-col gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="group relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[50rem]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={caseimage1}
            alt="Case study image 1"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>

        <div className="flex flex-col gap-6 md:flex-row">
          <motion.div
            className="group relative h-96 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[51rem] md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={caseimage2}
              alt="Case study image 2"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>

          <div className="container flex w-full flex-col gap-6">
            <motion.div
              className="group relative h-48 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[25rem]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={caseimage3}
                alt="Case study image 3"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>

            <motion.div
              className="group relative h-48 w-full overflow-hidden rounded-3xl shadow-2xl md:h-[25rem]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={caseimage4}
                alt="Case study image 4"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <hr className="my-12 w-full border-t border-white/10" />

      {/* Result Section with enhanced testimonial */}
      <motion.div
        className="container mx-auto flex h-auto flex-col items-center justify-center space-y-8 py-20 text-center md:h-[36rem]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-8 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <h3 className="relative inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-5xl font-black tracking-tight text-transparent uppercase sm:text-6xl md:text-7xl lg:text-8xl">
            Result
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-4xl"
        >
          {/* Testimonial card */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 p-12 backdrop-blur-xl">
            <motion.div
              className="absolute -top-6 -left-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-1"
              initial={{ rotate: -10 }}
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="rounded-2xl bg-black p-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <div className="mb-6 flex justify-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className="h-8 px-1 drop-shadow-lg"
                  />
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              className="mb-8 text-xl leading-relaxed font-medium text-gray-200 italic sm:text-2xl md:text-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              "Camino Code transformed our data strategy, giving us valuable
              insights that boosted efficiency and decision-making."
            </motion.blockquote>

            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-50 blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-white">
                  AJ
                </div>
              </div>

              <div className="text-left">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  Alex Johnson
                </p>
                <p className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-lg font-medium text-transparent">
                  CEO of TechWave
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <hr className="my-12 w-full border-t border-white/10" />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 py-12"
      >
        <h4 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to transform your business?
        </h4>
        <motion.a
          href="/contact"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="h-5 w-5" />
          <span>Start Your Project</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default CaseStudyDetails;
