import Image from "next/image";

const ContactUsHeader = () => {
  return (
    <div
      id="contactusheader"
      className="relative flex min-h-[80vh] flex-col items-center justify-center gap-10 overflow-hidden px-8 py-32 text-center sm:px-10 md:min-h-screen md:gap-12 lg:py-40"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/assets/images/a28a3fca60fac9e1fef33d66727e7162b12c129f.png"
          alt="Background"
          fill
          className="object-cover scale-105 transition-transform duration-[3000ms] hover:scale-100"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
      </div>

      {/* Header Content */}
      <h1 className="text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem] animate-fade-in-up">
        <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          Contact
        </span>{" "}
        <span className="text-white drop-shadow-2xl">Us</span>
      </h1>

      <p className="max-w-3xl text-base font-medium leading-relaxed text-gray-100 drop-shadow-lg sm:text-lg md:text-xl lg:text-2xl animate-fade-in-up animation-delay-200">
        We'd love to hear from you! Whether you have questions about our
        services or want to discuss a project, our team is ready to help. Reach
        out to us through the form below or contact us directly via phone or
        email. We'll get back to you as soon as possible.
      </p>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-400">
        <div className="h-8 w-5 rounded-full border-2 border-white/50 p-1 animate-bounce">
          <div className="h-2 w-2 mx-auto rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
};

export default ContactUsHeader;
