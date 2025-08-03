"use client";

import {
  ArrowRight,
  Mail,
  User,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Zap,
  Globe,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@caminocode.com",
    link: "mailto:hello@caminocode.com",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    link: "#",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    link: "#",
    color: "from-green-400 to-emerald-500",
  },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document
        .getElementById("contact-form")
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isHovering]);

  const onSubmit = async (_data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Replace with your actual form submission logic
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      */

      setSubmitSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (_error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="relative mx-auto flex flex-col items-center justify-center gap-12 bg-white px-8 py-20 sm:gap-14 sm:px-10 sm:py-24 md:flex-row md:items-start md:gap-16 md:px-12 lg:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600 opacity-5">
        <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>
      </div>

      {/* Dynamic Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(251, 146, 60, 0.15), transparent 50%)`,
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="animate-float absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-amber-400 to-red-600 opacity-15 blur-3xl"></div>
      <div className="animate-float-delayed absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-15 blur-3xl"></div>

      {/* Floating Icons */}
      <Globe className="animate-bounce-slow absolute top-20 right-20 h-8 w-8 text-amber-500/30" />
      <Zap className="animate-bounce-slow animation-delay-200 absolute bottom-20 left-20 h-6 w-6 text-orange-500/30" />

      {/* Particle Effects */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <div className="container flex w-full gap-4">
        {/* Left Column - Contact Info */}
        <div className="relative z-10 flex w-full flex-col gap-8 md:w-1/2">
          {/* Badge */}
          <div className="animate-fade-in-down mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Let's Connect
              </span>
            </div>
          </div>

          <h2 className="animate-fade-in-up text-5xl leading-[60px] font-black tracking-tight uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Get in
            </span>{" "}
            <span className="drop-shadow-glow animate-gradient-x inline-block bg-gradient-to-t from-amber-400 to-red-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <div className="animate-fade-in-up animation-delay-200 space-y-6">
            <p className="text-lg font-medium text-gray-700 md:text-xl lg:text-2xl">
              Let's create something{" "}
              <span className="text-orange-600">amazing</span> together
            </p>

            {/* Contact Info Cards */}
            <div className="mt-8 grid gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className={`group animate-fade-in-up relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white/80 to-gray-50/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-300 hover:shadow-lg`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  ></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${info.color} p-1`}
                    >
                      <div className="rounded-xl bg-white/80 p-3 backdrop-blur-md shadow-sm">
                        <info.icon className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">{info.label}</p>
                      <p
                        className={`text-lg font-semibold text-gray-800 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent ${info.color}`}
                      >
                        {info.value}
                      </p>
                    </div>

                    <ArrowRight className="ml-auto h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="animate-fade-in-up animation-delay-400 relative z-10 flex w-full flex-col justify-center gap-6 md:w-1/2">
          <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white/90 to-gray-50/90 p-8 backdrop-blur-md shadow-xl">
            {/* Form Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/10 to-red-600/10 opacity-0 transition-opacity duration-500 hover:opacity-100"></div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="animate-fade-in-down absolute inset-x-8 top-8 z-20 rounded-2xl border border-green-500/20 bg-green-950/90 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <p className="font-medium text-green-400">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10 space-y-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Name Field */}
                <div className="w-full">
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-white/60 p-1 transition-all duration-300 ${
                      errors.name
                        ? "border-red-500"
                        : focusedField === "name"
                          ? "border-orange-500"
                          : "border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 opacity-0 transition-opacity duration-300 ${focusedField === "name" ? "opacity-100" : ""}`}
                    ></div>

                    <div className="relative flex items-center gap-3 px-4 py-3">
                      <User
                        className={`h-5 w-5 transition-colors duration-300 ${focusedField === "name" ? "text-orange-600" : "text-gray-600"}`}
                      />
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Full name *"
                        className="w-full bg-transparent text-lg font-medium text-gray-800 placeholder-gray-500 transition-all duration-300 outline-none"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                  {errors.name && (
                    <p className="animate-fade-in mt-2 text-sm text-red-400">
                      This field is required
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="w-full">
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-white/60 p-1 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500"
                        : focusedField === "email"
                          ? "border-orange-500"
                          : "border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 opacity-0 transition-opacity duration-300 ${focusedField === "email" ? "opacity-100" : ""}`}
                    ></div>

                    <div className="relative flex items-center gap-3 px-4 py-3">
                      <Mail
                        className={`h-5 w-5 transition-colors duration-300 ${focusedField === "email" ? "text-orange-600" : "text-gray-600"}`}
                      />
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        type="email"
                        placeholder="Email *"
                        className="w-full bg-transparent text-lg font-medium text-gray-800 placeholder-gray-500 transition-all duration-300 outline-none"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="animate-fade-in mt-2 text-sm text-red-400">
                      Please enter a valid email
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="w-full">
                <div
                  className={`group relative overflow-hidden rounded-2xl border bg-white/60 p-1 transition-all duration-300 ${
                    errors.message
                      ? "border-red-500"
                      : focusedField === "message"
                        ? "border-orange-500"
                        : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 opacity-0 transition-opacity duration-300 ${focusedField === "message" ? "opacity-100" : ""}`}
                  ></div>

                  <div className="relative flex items-start gap-3 px-4 py-3">
                    <MessageSquare
                      className={`mt-1 h-5 w-5 transition-colors duration-300 ${focusedField === "message" ? "text-orange-600" : "text-gray-600"}`}
                    />
                    <textarea
                      {...register("message", { required: true })}
                      rows={4}
                      placeholder="Message *"
                      className="w-full resize-none bg-transparent text-lg font-medium text-gray-200 placeholder-gray-500 transition-all duration-300 outline-none"
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
                {errors.message && (
                  <p className="animate-fade-in mt-2 text-sm text-red-400">
                    This field is required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group hover:shadow-neon relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-500 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Animated background */}
                <div className="animate-gradient-x absolute inset-0 bg-gradient-to-t from-amber-400 to-red-600"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-red-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                {/* Content */}
                <span className="relative z-10 text-lg">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                {isSubmitting ? (
                  <div className="relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <Send className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
