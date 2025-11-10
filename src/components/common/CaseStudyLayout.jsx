"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowBigRightIcon, ArrowBigRightDashIcon, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile, useReducedMotion } from "@/hooks/useIsMobile";

const CaseStudyLayout = ({
  client,
  industry,
  duration,
  team,
  title,
  subtitle,
  heroImage,
  stats,
  challenges,
  challengeVisual,
  solutions,
  solutionVisual,
  phases,
  images,
  testimonial,
  results,
  nextCaseStudy,
  prevCaseStudy,
  ctaLabel = "Visit Website",
  ctaLink,
  colorScheme = {
    primary: "245, 158, 11",
    gradient: "from-amber-400 to-red-600",
    gradientReverse: "from-red-600 to-amber-400",
  }
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, isMobile ? -50 : -200]);
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
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles = [];
    const particleCount = isMobile ? 40 : 80;

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
        ctx.fillStyle = `rgba(${colorScheme.primary}, ${this.opacity})`;
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
  }, [dimensions, colorScheme.primary, isMobile, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-black">
      <HeroSection
        client={client}
        industry={industry}
        duration={duration}
        title={title}
        subtitle={subtitle}
        canvasRef={canvasRef}
        heroParallax={heroParallax}
        heroOpacity={heroOpacity}
        ctaLabel={ctaLabel}
        ctaLink={ctaLink}
        colorScheme={colorScheme}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />
      
      <StatsSection stats={stats} colorScheme={colorScheme} />
      
      <ChallengeSection 
        challenges={challenges} 
        visual={challengeVisual}
        colorScheme={colorScheme} 
      />
      
      <SolutionSection 
        solutions={solutions} 
        visual={solutionVisual}
        colorScheme={colorScheme} 
      />
      
      <ImplementationSection 
        phases={phases} 
        colorScheme={colorScheme}
        isMobile={isMobile}
      />
      
      <ResultsSection 
        testimonial={testimonial}
        results={results}
        colorScheme={colorScheme}
      />
      
      {nextCaseStudy && (
        <NextCaseStudy 
          nextCaseStudy={nextCaseStudy}
          colorScheme={colorScheme}
          prevCaseStudy={prevCaseStudy}
        />
      )}
    </div>
  );
};

const HeroSection = ({
  client,
  industry,
  duration,
  title,
  subtitle,
  canvasRef,
  heroParallax,
  heroOpacity,
  ctaLabel,
  ctaLink,
  colorScheme,
  isHovered,
  setIsHovered
}) => {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-900 via-black to-neutral-900 overflow-visible">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ mixBlendMode: "screen" }}
      />

      <motion.div
        className="absolute inset-0 z-[1]"
        animate={{
          background: [
            `radial-gradient(ellipse at top left, rgba(${colorScheme.primary}, 0.15) 0%, transparent 40%)`,
            `radial-gradient(ellipse at bottom right, rgba(${colorScheme.primary}, 0.15) 0%, transparent 40%)`,
            `radial-gradient(ellipse at top left, rgba(${colorScheme.primary}, 0.15) 0%, transparent 40%)`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-white/60">
          <span>{client}</span>
          <span>•</span>
          <span>{industry}</span>
          <span>•</span>
          <span>{duration}</span>
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl font-black tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="block text-white">CASE STUDY</span>
          <span className={`block bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
            {client.toUpperCase()}
          </span>
        </motion.h1>

        <motion.h2
          className="mb-8 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        {ctaLink && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
              <motion.button
                className={`group text-lg font-semibold relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t ${colorScheme.gradient} px-8 py-4 text-white`}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
              >
                <span className="relative z-10">{ctaLabel}</span>
                <motion.span
                  className="relative z-10 ml-2"
                  variants={{
                    initial: { x: 0 },
                    hover: {
                      x: [0, 5, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    {!isHovered ? (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowBigRightIcon className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dash"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowBigRightDashIcon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.span>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-t ${colorScheme.gradientReverse}`}
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>

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
          <ArrowDown className={`h-6 w-6 text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400`} />
        </motion.div>
      </motion.div>
    </section>
  );
};

const StatsSection = ({ stats, colorScheme }) => {
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
          <span className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
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
                className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
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

const ChallengeSection = ({ challenges, visual, colorScheme }) => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:gap-16 grid-cols-1 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="mb-8 text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
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
              <p>{challenges.intro}</p>
              <ul className="space-y-4">
                {challenges.items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className={`h-6 w-6 flex-shrink-0 text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-500`} />
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
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(${colorScheme.primary}, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${colorScheme.primary}, 0.5) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <motion.div
              className={`absolute top-10 right-10 h-20 w-20 rounded-full bg-gradient-to-r ${colorScheme.gradient} opacity-20 blur-xl`}
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

            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <span className="text-9xl">{visual.emoji}</span>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">{visual.title}</h3>
              <p className="max-w-md text-gray-300">
                {visual.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SolutionSection = ({ solutions, visual, colorScheme }) => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:gap-16 grid-cols-1 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="relative order-2 h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg lg:order-1 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(${colorScheme.primary}, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${colorScheme.primary}, 0.5) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <motion.div
              className={`absolute top-16 left-16 h-12 w-12 rounded-lg bg-gradient-to-r ${colorScheme.gradient} opacity-30`}
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

            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6">
                <span className="text-9xl">{visual.emoji}</span>
              </div>
              <h3 className="mb-4 text-3xl font-bold text-white">{visual.title}</h3>
              <p className="max-w-md text-gray-300">
                {visual.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              <span className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
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
              <p>{solutions.intro}</p>
              <ul className="space-y-4">
                {solutions.items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className={`h-6 w-6 flex-shrink-0 text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-500`} />
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

const ImplementationSection = ({ phases, colorScheme, isMobile }) => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section ref={ref} className="relative bg-black py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          className="mb-16 text-center text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          viewport={{ once: true }}
        >
          <span className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
            Implementation
          </span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-8 backdrop-blur-sm h-full"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl font-bold text-white">
                    {index + 1}
                  </span>
                </motion.div>

                <h3 className="mb-2 text-xl font-bold text-white">
                  {phase.title}
                </h3>
                <p className={`mb-4 text-sm text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400`}>{phase.duration}</p>
                <p className="text-white/70">{phase.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultsSection = ({ testimonial, results, colorScheme }) => {
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
          <span className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
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
          {testimonial && (
            <>
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
                    <Star className={`h-8 w-8 fill-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400 text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400`} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.blockquote
                className="relative mb-8"
                initial={{ opacity: 0 }}
                animate={hasIntersected ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <span className={`absolute -top-8 -left-8 text-6xl text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400/20`}>
                  "
                </span>
                {testimonial.quotes.map((quote, index) => (
                  <p key={index} className="text-xl font-light text-white/90 italic sm:text-2xl mb-6">
                    {quote}
                  </p>
                ))}
                <span className={`absolute -right-8 -bottom-8 rotate-180 text-6xl text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400/20`}>
                  "
                </span>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <p className="mb-2 text-xl font-semibold text-white">
                  {testimonial.author}
                </p>
                <p className={`bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
                  {testimonial.role}
                </p>
              </motion.div>
            </>
          )}

          {results && (
            <motion.div
              className="mt-16 pt-16 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={hasIntersected ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">Results Achieved:</h3>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                {results.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <CheckCircle className={`h-6 w-6 flex-shrink-0 text-${colorScheme.gradient.split('-')[1].split(' ')[0]}-400`} />
                    <span className="text-white/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const NextCaseStudy = ({ nextCaseStudy, colorScheme, prevCaseStudy }) => {
  return (
    <section className="relative bg-gradient-to-b from-black to-neutral-900 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {prevCaseStudy && (
            <motion.div className="text-center md:text-right">
              <p className="mb-4 text-white/60">Previous Case Study</p>
              <h3 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
                {prevCaseStudy.title}
              </h3>
              <div className="flex justify-center md:justify-end">
                <Link href={prevCaseStudy.link}>
                  <motion.button
                    className={`group text-lg font-semibold relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t ${colorScheme.gradient} px-8 py-4 text-white`}
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                  >
                    <motion.span
                      className="relative z-10 mr-2"
                      variants={{
                        initial: { x: 0 },
                        hover: {
                          x: [-5, 0, -5],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    >
                      <ArrowBigRightIcon className="h-5 w-5 rotate-180" />
                    </motion.span>
                    <span className="relative z-10">View Case Study</span>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${colorScheme.gradientReverse}`}
                      variants={{
                        initial: { y: "100%" },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}

          {nextCaseStudy && (
            <motion.div className="text-center md:text-left">
              <p className="mb-4 text-white/60">Next Case Study</p>
              <h3 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
                {nextCaseStudy.title}
              </h3>
              <div className="flex justify-center md:justify-start">
                <Link href={nextCaseStudy.link}>
                  <motion.button
                    className={`group text-lg font-semibold relative flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gradient-to-t ${colorScheme.gradient} px-8 py-4 text-white`}
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                  >
                    <span className="relative z-10">View Case Study</span>
                    <motion.span
                      className="relative z-10 ml-2"
                      variants={{
                        initial: { x: 0 },
                        hover: {
                          x: [0, 5, 0],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    >
                      <ArrowBigRightIcon className="h-5 w-5" />
                    </motion.span>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t ${colorScheme.gradientReverse}`}
                      variants={{
                        initial: { y: "100%" },
                        hover: { y: 0 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyLayout;

