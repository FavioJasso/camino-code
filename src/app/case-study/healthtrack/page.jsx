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
  Cloud,
  Shield,
  Zap,
  DollarSign,
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile } from "@/hooks/useIsMobile";

const HealthTrackCaseStudy = () => {
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
        ctx.fillStyle = `rgba(251, 146, 60, ${this.opacity})`;
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
    client: "HealthTrack Medical",
    industry: "Healthcare",
    duration: "7 months",
    team: "15 members",
    title: "Cloud Infrastructure Transformation",
    subtitle:
      "Seamless transition to cloud infrastructure improving system reliability",
    heroImage: "/assets/images/services_work04.png",
    stats: [
      {
        value: "99.99%",
        label: "Uptime Achieved",
        icon: <Shield className="h-6 w-6" />,
      },
      {
        value: "60%",
        label: "Cost Reduction",
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        value: "5x",
        label: "Faster Deployment",
        icon: <Zap className="h-6 w-6" />,
      },
      {
        value: "100%",
        label: "HIPAA Compliant",
        icon: <Cloud className="h-6 w-6" />,
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
              </div>
            </motion.div>

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
                className="mb-6 text-5xl font-black tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-white">HEALTHTRACK</span>
                <span className="block bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                  CLOUD
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
                  <span className="mb-2 text-xs tracking-widest text-white/60 uppercase">
                    Scroll
                  </span>
                  <motion.div
                    className="h-16 w-[1px] bg-gradient-to-b from-orange-400 to-transparent"
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
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-600"
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
              <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
                HealthTrack's legacy on-premise infrastructure was costly to
                maintain, difficult to scale, and posed compliance risks. System
                downtime affected patient care, while outdated hardware limited
                their ability to implement modern healthcare solutions.
              </p>
              <ul className="space-y-4">
                {[
                  "Frequent downtime impacting critical patient services",
                  "High maintenance costs for aging server infrastructure",
                  "Limited scalability preventing growth and innovation",
                  "Compliance concerns with data security and HIPAA requirements",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-orange-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 shadow-lg lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-2xl font-bold text-gray-800">Healthcare IT</p>
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
            className="relative order-2 flex h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 shadow-lg lg:order-1 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-8">
              <div className="text-6xl mb-4">☁️</div>
              <p className="text-2xl font-bold text-gray-800">Cloud Platform</p>
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
              <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
                We orchestrated a comprehensive cloud migration strategy using
                AWS, implementing HIPAA-compliant infrastructure with automated
                backups, disaster recovery, and advanced security measures. The
                new cloud architecture provides unmatched reliability and
                scalability.
              </p>
              <ul className="space-y-4">
                {[
                  "HIPAA-compliant AWS cloud infrastructure",
                  "Automated backup and disaster recovery systems",
                  "Zero-downtime migration strategy",
                  "Advanced security with encryption and access controls",
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
    </section>
  );
};

const ImplementationSection = ({ isMobile }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const phases = [
    {
      title: "Assessment & Planning",
      duration: "6 weeks",
      description:
        "Infrastructure audit and cloud migration roadmap development",
      color: "from-orange-400 to-red-600",
    },
    {
      title: "Cloud Setup",
      duration: "10 weeks",
      description: "Building HIPAA-compliant AWS infrastructure and security",
      color: "from-red-400 to-orange-600",
    },
    {
      title: "Migration",
      duration: "12 weeks",
      description: "Phased data migration with zero downtime approach",
      color: "from-orange-400 to-amber-600",
    },
    {
      title: "Optimization",
      duration: "4 weeks",
      description: "Performance tuning and staff training on new systems",
      color: "from-amber-400 to-red-600",
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
          <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
                <p className="mb-4 text-sm text-orange-400">{phase.duration}</p>
                <p className="text-white/70">{phase.description}</p>

                {index < phases.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-4 hidden h-[2px] w-8 bg-gradient-to-r from-orange-400 to-red-600 lg:block"
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
          <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
              alt="Project gallery main"
              fill
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {images.slice(1).map((image, index) => (
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
          <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
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
                <Star className="h-8 w-8 fill-orange-400 text-orange-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <span className="absolute -top-8 -left-8 text-6xl text-orange-400/20">
              "
            </span>
            <p className="text-2xl font-light text-white/90 italic sm:text-3xl">
              The cloud migration was transformative. We achieved 99.99% uptime,
              reduced IT costs by 60%, and gained the flexibility to scale our
              services as needed. Patient care has improved dramatically with
              zero system downtime.
            </p>
            <span className="absolute -right-8 -bottom-8 rotate-180 text-6xl text-orange-400/20">
              "
            </span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="mb-2 text-xl font-semibold text-white">
              Dr. Emily Rodriguez
            </p>
            <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              CIO of HealthTrack Medical
            </p>
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
          <p className="mb-4 text-white/60">Explore More Work</p>
          <h3 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            View All Case Studies
          </h3>
          <a href="/#work">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-400 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Back to Portfolio</span>
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
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-400"
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

export default HealthTrackCaseStudy;
