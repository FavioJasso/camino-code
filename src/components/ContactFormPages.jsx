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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <section className="container mx-auto h-[750px] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 px-6 md:px-10 py-16 md:py-20 max-w-[1440px] mx-auto border-y border-black">
        {/* Left Column - Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="font-bold uppercase text-5xl md:text-7xl lg:text-[120px] leading-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <a
            href="mailto:some@gmail.com"
            className="w-min rounded-lg px-4 py-2 text-orange-500 font-medium transition-colors hover:bg-black hover:text-white"
          >
            some@gmail.com
          </a>
        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full">
                <div
                  className={`flex items-center border-b py-2 ${
                    errors.name
                      ? "border-red-500"
                      : "border-black focus-within:border-red-500"
                  }`}
                >
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Full name *"
                    className="w-full bg-transparent text-gray-700 outline-none"
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
                  className={`flex items-center border-b py-2 ${
                    errors.email
                      ? "border-red-500"
                      : "border-black focus-within:border-red-500"
                  }`}
                >
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    type="email"
                    placeholder="Email *"
                    className="w-full bg-transparent text-gray-700 outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enter a valid email
                  </p>
                )}
              </div>
            </div>
            <div>
              <div
                className={`border-b py-2 ${
                  errors.message
                    ? "border-red-500"
                    : "border-black focus-within:border-red-500"
                }`}
              >
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  placeholder="Message *"
                  className="w-full bg-transparent text-gray-700 outline-none"
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
              className="group flex items-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-white font-medium shadow-lg transition hover:shadow-xl"
            >
              Submit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
