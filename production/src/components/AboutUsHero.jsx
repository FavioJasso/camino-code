// components/AboutMissionVision.tsx
"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { 
  Target, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Zap,
  Globe,
  Cpu,
  Binary
} from "lucide-react";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

export default function AboutMissionVision() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles configuration
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="relative overflow-x-hidden bg-white">
      {/* Futuristic Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf24_1px,transparent_1px),linear-gradient(to_bottom,#fbbf24_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-red-600/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent" />
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-orange-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dynamic Mouse Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.2), transparent 50%)`,
        }}
      />

      {/* Mission Section */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Enhanced 3D Model Container - Right */}
        <motion.div 
          className="absolute right-0 top-1/2 -mr-[400px] h-[350px] w-[800px] md:h-[450px] md:-translate-y-1/2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Glow Effect for 3D Model */}
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <ModelViewer url="/ring-2.glb" />
          </div>
          
          {/* Tech Elements around 3D Model */}
          <motion.div
            className="absolute top-10 left-20"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <Cpu className="h-6 w-6 text-orange-500/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-20"
            animate={{ 
              y: [0, 10, 0],
              rotate: [360, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Binary className="h-8 w-8 text-red-500/60" />
          </motion.div>
        </motion.div>

        <motion.section
          id="mission"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 flex min-h-[60vh] flex-col items-start justify-center px-8 py-16 text-left sm:px-10 sm:py-24 md:px-16 md:py-32 lg:px-24 lg:py-40 xl:px-36"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-orange-500/20 blur-md" />
              <div className="relative rounded-full border border-orange-400/30 bg-gradient-to-r from-amber-50/80 to-orange-50/80 px-4 py-2 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Our Purpose</span>
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="relative text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                opacity: isHovering ? 0.8 : 0.5,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </motion.div>
            
            <span className="relative">
              Our{" "}
              <span className="inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
                Mission
              </span>
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "300px" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl md:text-2xl lg:leading-relaxed"
          >
            At{" "}
            <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text font-bold text-transparent">
              Camino Code
            </span>
            , our mission is to deliver innovative{" "}
            <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-bold text-transparent">
              data science
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text font-bold text-transparent">
              web development
            </span>{" "}
            solutions that empower businesses to thrive in a fast-paced digital world. We aim to combine technical expertise with creative thinking to develop scalable, secure, and high-performing systems. By focusing on user experience, data accuracy, and seamless functionality, we strive to help businesses make informed decisions, automate processes, and improve operational efficiency.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-500/25"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.section>
      </div>

      {/* Vision Section */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Enhanced 3D Model Container - Left */}
        <motion.div 
          className="absolute bottom-1/4 left-0 -ml-[350px] h-[350px] w-[800px] md:-ml-[400px] md:h-[450px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Glow Effect for 3D Model */}
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-red-500/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <ModelViewer url="/ring-1.glb" />
          </div>
          
          {/* Tech Elements around 3D Model */}
          <motion.div
            className="absolute top-20 right-10"
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          >
            <Globe className="h-7 w-7 text-red-500/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -360],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <Zap className="h-6 w-6 text-orange-500/60" />
          </motion.div>
        </motion.div>

        <motion.section
          id="vision"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 flex min-h-[60vh] flex-col items-end justify-center px-8 py-16 text-right sm:px-10 sm:py-24 md:px-16 md:py-32 lg:px-24 lg:py-40 xl:px-36"
        >
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-500/20 blur-md" />
              <div className="relative rounded-full border border-red-400/30 bg-gradient-to-r from-orange-50/80 to-red-50/80 px-4 py-2 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Our Future</span>
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="relative text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
                Our Vision
              </span>
            </motion.div>
            
            <span className="relative">
              Our{" "}
              <span className="inline-block bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text text-transparent">
                Vision
              </span>
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "300px" }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 ml-auto h-1 bg-gradient-to-l from-red-500 via-orange-500 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-gray-700 sm:text-xl md:text-2xl lg:leading-relaxed"
          >
            Our vision is to become a global leader in{" "}
            <span className="bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text font-bold text-transparent">
              data science
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text font-bold text-transparent">
              web development
            </span>{" "}
            by setting new standards for innovation, performance, and customer satisfaction. We envision a future where businesses of all sizes have access to intelligent, scalable, and efficient technological solutions. By staying at the forefront of industry trends and continuously evolving our approach, we aim to create transformative solutions that not only meet today's demands but also anticipate future challenges and opportunities.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex gap-8"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl font-bold bg-gradient-to-t from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                100+
              </motion.div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-3xl font-bold bg-gradient-to-t from-amber-400 to-orange-600 bg-clip-text text-transparent"
              >
                50+
              </motion.div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Animated Tech Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}