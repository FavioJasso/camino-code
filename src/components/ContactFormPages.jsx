"use client";

import { ArrowRight, Send, SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isMobile = useIsMobile();
  const [hoveredWord, setHoveredWord] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleWordHoverStart = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredWord(index);
  };

  const handleWordHoverEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredWord(null);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const { ref: observerRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const formY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -45,
      filter: "blur(10px)",
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

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative min-h-screen overflow-hidden border-t border-neutral-200 bg-white py-24 sm:py-32"
    >
      {/* Animated mesh gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 0% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)",
            "radial-gradient(ellipse at 100% 100%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)",
            "radial-gradient(ellipse at 0% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245, 158, 11, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.08) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div
        ref={observerRef}
        className="relative z-10 container mx-auto px-6 sm:px-8"
      >
        {/* Section Title */}
        <motion.div className="perspective-1000 mb-16 text-center">
          <motion.h2
            className="text-5xl font-black tracking-tighter text-neutral-900 uppercase sm:text-6xl md:text-7xl lg:text-8xl"
            variants={titleVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
          >
            <motion.span
              className="block"
              animate={
                hoveredWord === 0 && !isMobile
                  ? {
                      scale: 1.05,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
                  : {
                      scale: 1,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
              }
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
              onHoverStart={() => handleWordHoverStart(0)}
              onHoverEnd={handleWordHoverEnd}
            >
              LET'S
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent"
              animate={
                hoveredWord === 1 && !isMobile
                  ? {
                      scale: 1.05,
                      textShadow: "0 0 50px rgba(245, 158, 11, 0.2)",
                    }
                  : {
                      scale: 1,
                      textShadow: "0 0 0px rgba(0, 0, 0, 0)",
                    }
              }
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
              onHoverStart={() => handleWordHoverStart(1)}
              onHoverEnd={handleWordHoverEnd}
            >
              CONNECT
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column - 3D Model and Info */}
          <motion.div
            className="relative"
            style={{ y: formY }}
            initial={{ opacity: 0 }}
            animate={hasIntersected ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xl text-neutral-700">
                Ready to transform your ideas into reality? Send us a message
                and let's start building something amazing together.
              </p>

              <div className="space-y-3">
                {/* Email Card */}
                <motion.a
                  href="mailto:hello@caminocode.com"
                  className="group relative block overflow-hidden rounded-lg bg-white border border-neutral-200 p-4 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-600/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">
                        hello@caminocode.com
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                    </motion.div>
                  </div>
                </motion.a>

                {/* Phone Card */}
                <motion.a
                  href="tel:+15551234567"
                  className="group relative block overflow-hidden rounded-lg bg-white border border-neutral-200 p-4 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-600/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-0.5">Phone</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">
                        +1 (555) 123-4567
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                    </motion.div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Desktop Only - Feature Cards */}
            <motion.div
              className="mt-12 space-y-4 hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                {
                  icon: "🎯",
                  title: "Tailored Solutions",
                  description: "Custom strategies designed for your goals"
                },
                {
                  icon: "🚀",
                  title: "Expert Team",
                  description: "AI specialists ready to bring your vision to life"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={!isMobile ? { scale: 1.02, x: 5 } : {}}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-red-600/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            ref={formRef}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 opacity-0 ${isMobile ? "blur-lg" : "blur-xl"}`}
                animate={{
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative space-y-6"
              >
                {/* Name Field */}
                <motion.div
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate={hasIntersected ? "visible" : "hidden"}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-900 placeholder-neutral-400 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                      placeholder="John Doe"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400 to-red-600"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate={hasIntersected ? "visible" : "hidden"}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email",
                        },
                      })}
                      type="email"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-900 placeholder-neutral-400 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                      placeholder="john@example.com"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400 to-red-600"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate={hasIntersected ? "visible" : "hidden"}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      type="text"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-900 placeholder-neutral-400 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                      placeholder="Project Inquiry"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400 to-red-600"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  custom={3}
                  variants={inputVariants}
                  initial="hidden"
                  animate={hasIntersected ? "visible" : "hidden"}
                >
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-900 placeholder-neutral-400 backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-amber-400/50 focus:outline-none"
                      placeholder="Tell us about your project..."
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400 to-red-600"
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-500"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-t from-amber-600 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center"
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
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="mr-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          className="ml-4 relative z-10"
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
                                key="send"
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Send className="h-5 w-5" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="send-horizontal"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                              >
                                <SendHorizontal className="h-5 w-5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.span>
                      </>
                    )}
                  </span>

                  {/* Animated background con degradado igual al botón 2 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-600"
                    variants={{
                      initial: { y: "100%" },
                      hover: { y: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.button>

              </form>

              {/* Status messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className={`mt-6 rounded-xl p-4 text-center backdrop-blur-sm ${submitStatus === "success"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-red-500/10 text-red-600"
                      }`}
                  >
                    {submitStatus === "success"
                      ? "✨ Message sent successfully! We'll get back to you soon."
                      : "❌ Something went wrong. Please try again."}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/3 left-10 h-64 w-64 rounded-full bg-gradient-to-r from-amber-400/10 to-red-600/10 blur-3xl"
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
        className="absolute right-10 bottom-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-orange-400/10 to-amber-600/10 blur-3xl"
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
