"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Globe } from "lucide-react";

const ContactUsHeader = () => {
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
    
    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Generate communication particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    icon: [Mail, Phone, MessageCircle, Send][Math.floor(Math.random() * 4)],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10,
    size: Math.random() * 12 + 8,
  }));

  return (
    <div
      id="contactusheader"
      className="relative flex min-h-[90vh] flex-col items-center justify-center gap-10 overflow-hidden bg-black text-center"
    >
      {/* Enhanced background with parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <Image
          src="/assets/images/a28a3fca60fac9e1fef33d66727e7162b12c129f.png"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </motion.div>

      {/* Multiple gradient overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(251,191,36,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(239,68,68,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(249,115,22,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(251,191,36,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Futuristic grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,black_100%)]" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Floating communication icons */}
      <div className="absolute inset-0 -z-10">
        {particles.map((particle) => {
          const Icon = particle.icon;
          return (
            <motion.div
              key={particle.id}
              className="absolute opacity-10"
              initial={{
                x: `${particle.initialX}%`,
                y: `${particle.initialY}%`,
              }}
              animate={{
                x: [`${particle.initialX}%`, `${(particle.initialX + 20) % 100}%`],
                y: [`${particle.initialY}%`, `${(particle.initialY - 30 + 100) % 100}%`],
                rotate: [0, 360],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
              }}
            >
              <Icon 
                className="text-amber-400"
                style={{ width: `${particle.size}px`, height: `${particle.size}px` }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-amber-600/20 via-orange-600/10 to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
          rotate: 360,
        }}
        transition={{
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 },
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute -right-[300px] -bottom-[300px] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-red-600/20 via-orange-600/10 to-transparent blur-3xl"
        animate={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
          rotate: -360,
        }}
        transition={{
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 },
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
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
            className="absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600 rounded-full blur-xl opacity-50"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative flex items-center gap-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-6 py-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-amber-400" />
            </motion.div>
            <span className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-5 w-5 text-orange-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main heading with advanced animations */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-5xl font-black tracking-tight uppercase sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem]"
        >
          <motion.span
            className="inline-block relative"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <span 
              className="bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent"
              style={{
                transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`,
              }}
            >
              Contact
            </span>
            <motion.div
              className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.span>{" "}
          <motion.span
            className="relative inline-block"
            initial={{ scale: 0.5, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <span 
              className="text-white"
              style={{
                transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
              }}
            >
              Us
            </span>
            <motion.div
              className="absolute -bottom-4 left-0 h-2 w-full rounded-full bg-gradient-to-t from-amber-400 to-red-600"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.span>
        </motion.h1>

        {/* Enhanced description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-base font-medium leading-relaxed text-gray-200 sm:text-lg md:text-xl lg:text-2xl">
            We'd love to hear from you! Whether you have questions about our{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold text-amber-400">services</span>
            </motion.span>{" "}
            or want to discuss a{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold text-orange-400">project</span>
            </motion.span>
            , our team is ready to help. Reach out to us through the form below or contact us directly via{" "}
            <span className="font-semibold text-gray-100">phone</span> or{" "}
            <span className="font-semibold text-gray-100">email</span>. We'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact methods showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { 
              icon: Mail, 
              title: "Email Us", 
              value: "hello@caminocode.com", 
              color: "from-amber-400 to-orange-400",
              href: "mailto:hello@caminocode.com"
            },
            { 
              icon: Phone, 
              title: "Call Us", 
              value: "+1 (555) 123-4567", 
              color: "from-orange-400 to-red-600",
              href: "tel:+15551234567"
            },
            { 
              icon: MapPin, 
              title: "Visit Us", 
              value: "San Francisco, CA", 
              color: "from-amber-400 to-orange-400",
              href: "#"
            },
          ].map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${method.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
              />
              <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-white/20">
                <div className={`rounded-xl bg-gradient-to-r ${method.color} p-0.5`}>
                  <div className="rounded-xl bg-black p-3">
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">{method.title}</div>
                  <div className={`text-sm font-semibold bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                    {method.value}
                  </div>
                </div>
              </div>
            </motion.a>
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
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">Scroll to connect</span>
          <div className="relative">
            <div className="h-12 w-7 rounded-full border-2 border-white/20">
              <motion.div
                className="absolute top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-gradient-to-t from-amber-400 to-red-600"
                animate={{ 
                  y: [0, 24, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div
              className="absolute inset-0 h-12 w-7 rounded-full border-2 border-amber-400/40"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUsHeader;