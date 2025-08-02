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
    <section className="mx-auto flex h-auto max-w-[1440px] flex-col items-center justify-center gap-8 px-6 py-16 sm:gap-10 sm:px-8 sm:py-20 md:flex-row md:items-start md:gap-12 md:px-10">
      {/* Left Column - Contact Info */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        <h2 className="text-5xl leading-[60px] font-bold uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
          Get in{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <div className="space-y-4">
          <a
            href="mailto:some@gmail.com"
            className="inline-block w-min rounded-lg px-4 py-2 text-sm font-medium text-orange-500 transition-colors hover:bg-black hover:text-white hover:shadow-lg sm:text-base md:text-lg"
          >
            some@gmail.com
          </a>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="w-full">
              <div
                className={`flex items-center border-b py-2 ${
                  errors.name
                    ? "border-red-500"
                    : "border-black focus-within:border-red-500 hover:border-red-500"
                }`}
              >
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Full name *"
                  className="w-full bg-transparent p-4 text-gray-700 outline-none"
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
                    : "border-black focus-within:border-red-500 hover:border-red-500"
                }`}
              >
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-transparent p-4 text-gray-700 outline-none"
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
              className={`border-b py-2 ${
                errors.message
                  ? "border-red-500"
                  : "border-black focus-within:border-red-500 hover:border-red-500"
              }`}
            >
              <textarea
                {...register("message", { required: true })}
                rows={4}
                placeholder="Message *"
                className="w-full bg-transparent p-4 text-gray-700 outline-none"
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
            className="group flex w-min items-center rounded-full bg-gradient-to-t from-amber-400 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl sm:text-base md:text-lg"
          >
            Submit
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
}
