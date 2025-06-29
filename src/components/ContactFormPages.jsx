"use client";

import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useAnimations";
import { createRipple } from "@/utils/animations";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const buttonRef = useRef(null);
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e) => {
    createRipple(e, buttonRef.current);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const titleWords = "Get in Touch".split(" ");

  return (
    <motion.section 
      ref={sectionRef}
      className="container mx-auto min-h-[750px] flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-red-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-red-600/10 to-amber-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div 
        className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 px-6 md:px-10 py-16 md:py-20 max-w-[1440px] mx-auto border-y border-black relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
      >
        {/* Left Column - Contact Info */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col gap-6"
          variants={itemVariants}
        >
          <motion.h2 
            className="font-bold uppercase text-5xl md:text-7xl lg:text-[120px] leading-tight"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className={`inline-block mr-4 ${
                  word === "Touch" 
                    ? "bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent" 
                    : ""
                }`}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={word === "Touch" ? {
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
                  transition: { duration: 0.3 }
                } : {}}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.a
            href="mailto:some@gmail.com"
            className="relative inline-flex items-center w-min rounded-lg px-4 py-2 text-orange-500 font-medium overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">some@gmail.com</span>
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-600 opacity-0 group-hover:opacity-20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div 
          className="w-full md:w-1/2"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.div 
                className="w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`relative flex items-center border-b-2 py-2 transition-all duration-300 ${
                    errors.name
                      ? "border-red-500"
                      : "border-black focus-within:border-amber-500"
                  }`}
                >
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Full name *"
                    className="w-full bg-transparent text-gray-700 outline-none peer"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"
                    initial={{ width: "0%" }}
                    whileFocus={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      This field is required
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                className="w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`relative flex items-center border-b-2 py-2 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500"
                      : "border-black focus-within:border-amber-500"
                  }`}
                >
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    type="email"
                    placeholder="Email *"
                    className="w-full bg-transparent text-gray-700 outline-none peer"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"
                    initial={{ width: "0%" }}
                    whileFocus={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      Please enter a valid email
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`relative border-b-2 py-2 transition-all duration-300 ${
                  errors.message
                    ? "border-red-500"
                    : "border-black focus-within:border-amber-500"
                }`}
              >
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  placeholder="Message *"
                  className="w-full bg-transparent text-gray-700 outline-none resize-none peer"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-red-600"
                  initial={{ width: "0%" }}
                  whileFocus={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    This field is required
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden group flex items-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-8 py-4 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
            >
              <span className="relative z-10">
                {isSubmitting ? "Sending..." : "Submit"}
              </span>
              <motion.span
                className="ml-2 relative z-10"
                animate={isSubmitting ? { rotate: 360 } : { x: [0, 5, 0] }}
                transition={
                  isSubmitting
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
              
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-red-600 to-amber-400"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          </form>
          
          {/* Status messages */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-4 p-4 rounded-lg text-center ${
                  submitStatus === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus === "success"
                  ? "Message sent successfully!"
                  : "Error sending message. Please try again."}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
