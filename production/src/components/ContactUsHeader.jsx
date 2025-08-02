import Image from "next/image";

const ContactUsHeader = () => {
  return (
    <div
      id="contactusheader"
      className="relative flex h-screen flex-col items-center justify-center gap-8 px-10 py-20 text-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <Image
          src="/assets/images/a28a3fca60fac9e1fef33d66727e7162b12c129f.png"
          alt="Background"
          fill
          className="object-cover blur-[1px] grayscale"
          quality={100}
          priority
        />
      </div>

      {/* Header Content */}
      <h1 className="text-3xl leading-tight font-bold text-black uppercase sm:text-5xl md:text-[4rem] lg:text-[6rem]">
        <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Contact
        </span>{" "}
        Us
      </h1>

      <p className="max-w-xl text-sm sm:text-base md:text-lg">
        We'd love to hear from you! Whether you have questions about our
        services or want to discuss a project, our team is ready to help. Reach
        out to us through the form below or contact us directly via phone or
        email. We'll get back to you as soon as possible.
      </p>
    </div>
  );
};

export default ContactUsHeader;
