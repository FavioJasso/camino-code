"use client";

import NavigationBar from "@/components/NavigationBar";
import ContactForm from "@/components/ContactFormPages";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Smartphone,
  Award,
  ArrowDown,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile } from "@/hooks/useIsMobile";

const DanielAvilaCaseStudy = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

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
        ctx.fillStyle = `rgba(57, 112, 235, ${this.opacity})`;
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
    client: "Daniel Avila",
    industry: "Personal Portfolio",
    duration: "1 month",
    team: "2 members",
    title: "Professional Portfolio Design & Development",
    subtitle:
      "How we built a clean, modern, and user-focused portfolio website that reflects expertise, clarity, and trust.",
    heroImage: "/assets/images/danielavila02_work.png",
    stats: [
      {
        value: "100%",
        label: "Custom-Built Design",
        icon: <Award className="h-6 w-6" />,
      },
      {
        value: "3x",
        label: "Faster Page Load Speed",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "Mobile-Optimized",
        icon: <Smartphone className="h-6 w-6" />,
      },
      {
        value: "SEO",
        label: "Ready & Optimized",
        icon: <TrendingUp className="h-6 w-6" />,
      },
    ],
    images: [
      "/assets/images/case_image01.png",
      "/assets/images/case_image02.png",
      "/assets/images/case_image03.png",
      "/assets/images/case_image04.png",
    ],
  };

  return (
    <ClientProviders>
      <StructuredData page="case-study-detailed" />
      <main className="h-max w-full gap-4 overflow-hidden">
        <NavigationBar />
        <div ref={containerRef} className="relative overflow-hidden bg-black">
          {/* Hero Section */}
          <section className="relative flex min-h-screen items-center justify-center">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0"
              style={{ mixBlendMode: "screen" }}
            />

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
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 container mx-auto px-6 text-center"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
                <span>{caseData.client}</span>
                <span>•</span>
                <span>{caseData.industry}</span>
                <span>•</span>
                <span>{caseData.duration}</span>
              </motion.div>

              <motion.h1
                className="mb-6 text-5xl font-black tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-white">CASE STUDY</span>
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  PORTFOLIO
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
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -12, 0], opacity: [0.6, 0.6, 0.6] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center"
              >
                <span className="mb-1.5 text-sm uppercase tracking-widest text-white/60">
                  Scroll
                </span>
                <ArrowDown className="h-6 w-6 text-blue-400" />
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
          <ImplementationSection isMobile={isMobile} />

          {/* Gallery Section */}
          <GallerySection images={caseData.images} isMobile={isMobile} />

          {/* Results Section */}
          <ResultsSection />

          {/* Next Case Study CTA */}
          <NextCaseStudy />
        </div>
        <ContactForm />
        <Footer />
      </main>
    </ClientProviders>
  );
};

const StatsSection = ({ stats }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-black to-neutral-900 py-24"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="mb-12 text-center text-3xl font-black uppercase sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
        >
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Key Highlights
          </span>
        </motion.h2>
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
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
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

const ChallengeSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
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
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Challenge
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                Daniel needed a professional online space to showcase his IT support expertise, certifications, and career journey. His main challenges were:
              </p>
              <ul className="space-y-4">
                {[
                  "No existing portfolio website to represent his professional profile",
                  "Need for clear, structured presentation of skills and certifications",
                  "Desire for a professional yet approachable visual identity",
                  "Requirement for responsive, modern design that reflects reliability",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 right-10 h-20 w-20 rounded-full bg-blue-400/20 blur-xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 h-16 w-16 rounded-full bg-blue-600/20 blur-xl"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <span className="text-8xl opacity-70">💼</span>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">Professional Portfolio</h3>
              <p className="max-w-md text-gray-300">
                A comprehensive digital showcase designed to highlight expertise, certifications, and professional achievements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="relative order-2 h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg lg:order-1 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Floating design elements */}
            <motion.div
              className="absolute top-16 left-16 h-12 w-12 rounded-lg bg-blue-400/30"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute top-24 right-20 h-8 w-8 rounded-full bg-blue-500/30"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-16 h-16 w-16 rounded-xl bg-blue-600/20"
              animate={{
                rotate: [0, -90, -180],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <span className="text-8xl opacity-70">🎨</span>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">Modern Design</h3>
              <p className="max-w-md text-gray-300">
                Clean, minimal aesthetics with intuitive navigation and contemporary visual elements that engage users.
              </p>
            </div>
          </motion.div>

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
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Solution
              </span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-lg text-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p>
                Camino Code created a custom personal portfolio website built from the ground up with a focus on easy usage and professional branding.
              </p>
              <ul className="space-y-4">
                {[
                  "Clean, minimal design with structured content arrangement",
                  "Color palette reinforcing trust and reliability (#3970EB, #212020, #FFFFFF, #F6F6F6)",
                  "Typography (Monda + Quicksand) for a modern, tech-inspired tone",
                  "Rounded shapes, soft shadows, and gradient backgrounds for approachability",
                  "Clear sections: Hero, About, Experience, Certifications, Projects, Contact",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ImplementationSection = ({ isMobile }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const phases = [
    {
      title: "Discovery & Planning",
      duration: "1 week",
      description:
        "Client consultation on branding, goals, and objectives. Market research on IT professional portfolios.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Design (UI/UX)",
      duration: "1 week",
      description: "Wireframes and mockups in Figma. Responsive layouts for desktop and mobile.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Development",
      duration: "1 week",
      description: "Built with NextJS, HTML, CSS and JavaScript/TypeScript. Integrated content, animations, and responsive features.",
      color: "from-blue-400 to-indigo-600",
    },
    {
      title: "Testing & Deployment",
      duration: "1 week",
      description: "Browser and device compatibility checks. Load speed and performance testing. Live launch with hosting, DNS, and SSL setup.",
      color: "from-indigo-400 to-blue-600",
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
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
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
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${phase.color}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl font-bold text-white">
                    {index + 1}
                  </span>
                </motion.div>

                <h3 className="mb-2 text-xl font-bold text-white">
                  {phase.title}
                </h3>
                <p className="mb-4 text-sm text-blue-400">{phase.duration}</p>
                <p className="text-white/70">{phase.description}</p>

                {index < phases.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-4 hidden h-[2px] w-8 bg-gradient-to-r from-blue-400 to-blue-600 lg:block"
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

const GallerySection = ({ images, isMobile }) => {
  return (
    <section className="relative bg-gradient-to-b from-black to-neutral-900 py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          className="mb-16 text-center text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Project Gallery
          </span>
        </motion.h2>

        <div className="grid gap-8">
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
              alt="Hero Section with gradient background"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <p className="text-white text-xl font-semibold">Hero Section with gradient background</p>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { img: images[1], title: "Experience/Projects cards" },
              { img: images[2], title: "Contact form design" },
              { img: images[3], title: "Certifications section" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative h-[300px] overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Results & Impact
          </span>
        </motion.h2>

        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Stars */}
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
                animate={
                  hasIntersected ? { opacity: 1, rotate: 0, scale: 1 } : {}
                }
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Star className="h-8 w-8 fill-blue-400 text-blue-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.blockquote
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="absolute -top-8 -left-8 text-6xl text-blue-400/20">
              "
            </span>
            <p className="text-xl font-light text-white/90 italic sm:text-2xl mb-6">
              Collaborating with Camino Code in creating my professional website, danielavila.tech, was a phenomenal experience. From start to finish, the process was fast and remarkably convenient owing to their exceptional staff. My designer was speedy in replying and exceedingly thorough in his attentiveness, always working to explain in a clear manner and ensure that my thoughts and likes were understood to the fullest.
            </p>
            <p className="text-xl font-light text-white/90 italic sm:text-2xl mb-6">
              What impressed me most was how collaborative the process was. They always checked with me before they'd do any part of the site to get my approval and make sure I was fine with each choice they made in design. I had quite a few choices visually to select from, and what they wrote and proposed really helped to frame the overall concept in a professional and personal sort of manner.
            </p>
            <p className="text-xl font-light text-white/90 italic sm:text-2xl">
              I really appreciated how friendly and easy to work with Camino Code was, they struck that perfect balance of technical expertise and approachability. Camino Code didn't just build me a website, they helped me create an online presence that actually feels like me. I'd recommend them in a heartbeat to anyone looking for a web team that truly listens, communicates, and delivers excellent work quickly.
            </p>
            <span className="absolute -right-8 -bottom-8 rotate-180 text-6xl text-blue-400/20">
              "
            </span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            <p className="mb-2 text-xl font-semibold text-white">
              Daniel Avila
            </p>
            <p className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              IT Support Professional
            </p>
          </motion.div>

          {/* Results Achieved */}
          <motion.div
            className="mt-16 pt-16 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Results Achieved:</h3>
            <ul className="space-y-4 text-left max-w-2xl mx-auto">
              {[
                "Clear, structured showcase of skills, certifications, and experience",
                "Professional branding aligned with IT support role",
                "Mobile-friendly, fast-loading, and SEO-ready portfolio",
                "Positive feedback on ease of use and professional look",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-400" />
                  <span className="text-white/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

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
            Cloud Migration for HealthTrack
          </h3>
          <a href="/case-study/healthtrack">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
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
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DanielAvilaCaseStudy;

