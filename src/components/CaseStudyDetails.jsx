"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, ArrowRight, CheckCircle, TrendingUp, Users, Clock, Award } from "lucide-react";
import dynamic from "next/dynamic";
import { useIntersectionObserver } from "@/hooks/useAnimations";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const CaseStudyDetails = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Particle animation setup
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();
  }, [dimensions]);

  const caseData = {
    client: "TechWave Solutions",
    industry: "Technology",
    duration: "6 months",
    team: "8 members",
    title: "Data-Driven Transformation",
    subtitle: "How we increased customer retention by 30% through predictive analytics",
    heroImage: "/assets/images/services_work01.png",
    stats: [
      { value: "30%", label: "Retention Increase", icon: <TrendingUp className="h-6 w-6" /> },
      { value: "150%", label: "ROI Growth", icon: <Award className="h-6 w-6" /> },
      { value: "2.5M", label: "Data Points Analyzed", icon: <Users className="h-6 w-6" /> },
      { value: "45%", label: "Time Saved", icon: <Clock className="h-6 w-6" /> },
    ],
    images: [
      "/assets/images/case_image01.png",
      "/assets/images/case_image02.png",
      "/assets/images/case_image03.png",
      "/assets/images/case_image04.png",
    ],
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated particles canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Hero Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroParallax, opacity: heroOpacity }}
        >
          <div className="relative h-full w-full">
            <Image
              src={caseData.heroImage}
              alt="Case study hero"
              fill
              className="object-cover"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div className="mb-8 flex justify-center gap-4 text-sm text-white/60">
            <span>{caseData.client}</span>
            <span>•</span>
            <span>{caseData.industry}</span>
            <span>•</span>
            <span>{caseData.duration}</span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="block text-white">CASE</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              STUDY
            </span>
          </motion.h1>

          <motion.h2
            className="mb-8 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {caseData.title}
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {caseData.subtitle}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="mb-2 text-xs uppercase tracking-widest text-white/60">
                Scroll
              </span>
              <motion.div
                className="h-16 w-[1px] bg-gradient-to-b from-amber-400 to-transparent"
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={caseData.stats} />

      {/* Challenge Section */}
      <ChallengeSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Implementation Section */}
      <ImplementationSection />

      {/* Gallery Section */}
      <GallerySection images={caseData.images} />

      {/* Results Section */}
      <ResultsSection />

      {/* Next Case Study CTA */}
      <NextCaseStudy />
    </div>
  );
};

// Stats Section Component
const StatsSection = ({ stats }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={hasIntersected ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-red-600"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-white">{stat.icon}</div>
              </motion.div>
              <motion.h3
                className="mb-2 text-4xl font-bold text-white"
                animate={hasIntersected ? { scale: [0, 1.2, 1] } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Challenge Section Component
const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const modelRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <motion.div
            style={{ x: textX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="mb-8 text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
                Challenge
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                TechWave faced significant challenges with declining customer retention rates and fragmented data systems. Their inability to predict customer behavior led to missed opportunities and decreased satisfaction.
              </p>
              <ul className="space-y-4">
                {[
                  "30% decline in customer retention over 12 months",
                  "Fragmented data across multiple systems",
                  "No predictive analytics capabilities",
                  "Manual processes causing delays in insights",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-red-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            style={{ rotate: modelRotate }}
          >
            <ModelViewer url="/cone.glb" />
          </motion.div>
        </div>
      </div>

      {/* Floating orb */}
      <motion.div
        className="absolute right-20 top-20 h-64 w-64 rounded-full bg-gradient-to-r from-red-400/20 to-orange-600/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

// Solution Section Component
const SolutionSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const modelRotate = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-black to-neutral-900 py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* 3D Model */}
          <motion.div
            className="relative h-[400px] lg:h-[500px] order-2 lg:order-1"
            style={{ rotate: modelRotate }}
          >
            <ModelViewer url="/cone-1.glb" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={{ x: textX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.h2
              className="mb-8 text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
                Solution
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                We developed a comprehensive data strategy leveraging advanced machine learning algorithms and real-time analytics to transform TechWave's customer engagement approach.
              </p>
              <ul className="space-y-4">
                {[
                  "Predictive analytics engine with 95% accuracy",
                  "Real-time data processing pipeline",
                  "Automated customer segmentation",
                  "Personalized recommendation system",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating orb */}
      <motion.div
        className="absolute left-20 bottom-20 h-80 w-80 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-600/20 blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

// Implementation Section Component
const ImplementationSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const phases = [
    {
      title: "Discovery & Analysis",
      duration: "4 weeks",
      description: "Comprehensive audit of existing systems and data architecture",
      color: "from-blue-400 to-purple-600",
    },
    {
      title: "Development",
      duration: "12 weeks",
      description: "Building the predictive analytics engine and data pipeline",
      color: "from-amber-400 to-red-600",
    },
    {
      title: "Integration",
      duration: "6 weeks",
      description: "Seamless integration with existing systems and workflows",
      color: "from-green-400 to-teal-600",
    },
    {
      title: "Optimization",
      duration: "4 weeks",
      description: "Fine-tuning models and performance optimization",
      color: "from-pink-400 to-purple-600",
    },
  ];

  return (
    <section ref={ref} className="relative bg-black py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          className="mb-16 text-center text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Implementation
          </span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Phase number */}
                <motion.div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${phase.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </motion.div>

                <h3 className="mb-2 text-xl font-bold text-white">{phase.title}</h3>
                <p className="mb-4 text-sm text-amber-400">{phase.duration}</p>
                <p className="text-white/70">{phase.description}</p>

                {/* Connecting line */}
                {index < phases.length - 1 && (
                  <motion.div
                    className="absolute -right-4 top-1/2 hidden h-[2px] w-8 bg-gradient-to-r from-amber-400 to-red-600 lg:block"
                    initial={{ scaleX: 0 }}
                    animate={hasIntersected ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section Component
const GallerySection = ({ images }) => {
  return (
    <section className="relative bg-gradient-to-b from-black to-neutral-900 py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          className="mb-16 text-center text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Project Gallery
          </span>
        </motion.h2>

        <div className="grid gap-8">
          {/* Main image */}
          <motion.div
            className="relative h-[400px] overflow-hidden rounded-3xl md:h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={images[0]}
              alt="Project gallery main"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Grid of smaller images */}
          <div className="grid gap-8 md:grid-cols-3">
            {images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                className="relative h-[300px] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={image}
                  alt={`Project gallery ${index + 2}`}
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Results Section Component
const ResultsSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section ref={ref} className="relative bg-black py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="mb-16 text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Results & Impact
          </span>
        </motion.h2>

        {/* Testimonial */}
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-8 flex justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: -180, scale: 0 }}
                animate={hasIntersected ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="absolute -top-8 -left-8 text-6xl text-amber-400/20">"</span>
            <p className="text-2xl font-light italic text-white/90 sm:text-3xl">
              Camino Code transformed our data strategy, giving us valuable insights that boosted efficiency and decision-making. The 30% increase in retention exceeded our expectations.
            </p>
            <span className="absolute -bottom-8 -right-8 rotate-180 text-6xl text-amber-400/20">"</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="mb-2 text-xl font-semibold text-white">Alex Johnson</p>
            <p className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              CEO of TechWave Solutions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Next Case Study CTA Component
const NextCaseStudy = () => {
  return (
    <section className="relative bg-gradient-to-b from-black to-neutral-900 py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-white/60">Next Case Study</p>
          <h3 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            E-Commerce Platform for StyleHub
          </h3>
          <motion.button
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">View Case Study</span>
            <motion.span
              className="relative z-10 ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-400"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyDetails;