"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Brain, Palette, Database, Cloud, Shield } from "lucide-react";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useAnimations";

const services = [
  {
    id: 1,
    title: "Data Science & Analytics",
    description: "Transform raw data into actionable insights with advanced analytics, machine learning models, and predictive algorithms.",
    icon: <Database className="h-12 w-12" />,
    gradient: "from-blue-400 to-purple-600",
    features: ["Machine Learning", "Predictive Analytics", "Data Visualization", "Big Data Processing"],
  },
  {
    id: 2,
    title: "Web Development",
    description: "Build stunning, high-performance web applications with modern frameworks and cutting-edge technologies.",
    icon: <Code className="h-12 w-12" />,
    gradient: "from-amber-400 to-red-600",
    features: ["React & Next.js", "Full-Stack Solutions", "Progressive Web Apps", "API Development"],
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Leverage the power of artificial intelligence to automate processes and enhance decision-making.",
    icon: <Brain className="h-12 w-12" />,
    gradient: "from-green-400 to-teal-600",
    features: ["Natural Language Processing", "Computer Vision", "AI Chatbots", "Intelligent Automation"],
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Create intuitive and engaging user experiences with research-driven design and modern aesthetics.",
    icon: <Palette className="h-12 w-12" />,
    gradient: "from-pink-400 to-purple-600",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: 5,
    title: "Cloud Solutions",
    description: "Migrate and optimize your infrastructure with scalable cloud architectures and DevOps practices.",
    icon: <Cloud className="h-12 w-12" />,
    gradient: "from-orange-400 to-yellow-600",
    features: ["AWS & Azure", "Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
  },
  {
    id: 6,
    title: "Cybersecurity",
    description: "Protect your digital assets with comprehensive security audits and robust defense strategies.",
    icon: <Shield className="h-12 w-12" />,
    gradient: "from-red-400 to-pink-600",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"],
  },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ opacity }}
      className="group relative"
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-black/5 to-black/10 p-8 backdrop-blur-sm"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 blur-xl`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Icon container */}
          <motion.div
            className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r ${service.gradient} p-4`}
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            <div className="text-white">
              {service.icon}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="mb-4 text-2xl font-bold text-neutral-900"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <p className="mb-6 text-neutral-700 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2"
          >
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <motion.div
                  className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                />
                <span className="text-sm text-neutral-500">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Learn more link */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#"
              className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text font-semibold`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              Learn More
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 h-32 w-32"
          whileHover={{ scale: 1.5, rotate: 90 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`h-full w-full bg-gradient-to-br ${service.gradient} opacity-10`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesList() {
  const sectionRef = useRef(null);
  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: -45,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="services-list"
      className="relative min-h-screen bg-white py-24 sm:py-32"
    >
      {/* Animated mesh gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
            "radial-gradient(ellipse at 80% 100%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
            "radial-gradient(ellipse at 20% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 40%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div ref={observerRef} className="container relative z-10 mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <motion.div className="perspective-1000 mb-16 text-center">
          <motion.h2
            className="text-5xl font-black uppercase tracking-tighter text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            <motion.span 
              className="block"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 },
              }}
            >
              WHAT WE
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              OFFER
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="mb-8 text-xl text-neutral-700"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            Ready to transform your business with cutting-edge technology?
          </motion.p>
          <motion.button
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">Get Started Today</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-400"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute left-10 top-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 h-80 w-80 rounded-full bg-gradient-to-r from-orange-400/10 to-amber-600/10 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}