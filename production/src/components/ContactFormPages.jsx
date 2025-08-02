"use client";

import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Replace with your form submission logic
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <section className="mx-auto flex h-auto max-w-[1440px] flex-col items-center justify-center gap-12 px-8 py-20 sm:gap-14 sm:px-10 sm:py-24 md:flex-row md:items-start md:gap-16 md:px-12 lg:py-32">
      {/* Left Column - Contact Info */}
      <div className="flex w-full flex-col gap-8 md:w-1/2">
        <h2 className="text-5xl leading-[60px] font-black tracking-tight text-gray-900 uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px] animate-fade-in-up">
          Get in{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-sm">
            Touch
          </span>
        </h2>

        <div className="space-y-6 animate-fade-in-up animation-delay-200">
          <p className="text-lg font-medium text-gray-700 md:text-xl lg:text-2xl">
            Let's create something amazing together
          </p>
          <a
            href="mailto:some@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 sm:text-lg md:text-xl"
          >
            some@gmail.com
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className="flex w-full flex-col gap-6 md:w-1/2 animate-fade-in-up animation-delay-400">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full">
              <div
                className={`flex items-center border-b-2 py-3 transition-all duration-300 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-amber-500 hover:border-gray-400"
                }`}
              >
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Full name *"
                  className="w-full bg-transparent p-4 text-lg font-medium text-gray-700 placeholder-gray-500 outline-none transition-all duration-300"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  This field is required
                </p>
              )}
            </div>

            <div className="w-full">
              <div
                className={`flex items-center border-b-2 py-3 transition-all duration-300 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-amber-500 hover:border-gray-400"
                }`}
              >
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-transparent p-4 text-lg font-medium text-gray-700 placeholder-gray-500 outline-none transition-all duration-300"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid email
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <div
              className={`border-b-2 py-3 transition-all duration-300 ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-amber-500 hover:border-gray-400"
              }`}
            >
              <textarea
                {...register("message", { required: true })}
                rows={4}
                placeholder="Message *"
                className="w-full bg-transparent p-4 text-lg font-medium text-gray-700 placeholder-gray-500 outline-none transition-all duration-300"
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                This field is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <span className="relative z-10 text-lg">Submit Message</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </form>
      </div>
    </section>
  );
}
