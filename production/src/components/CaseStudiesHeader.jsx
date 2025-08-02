import Image from "next/image";
const CaseStudiesHeader = () => {
  return (
    <section
      id="case-studies"
      className="relative flex flex-col items-center justify-center gap-8 px-10 py-32 text-center text-black"
    >
      <Image
        src="/assets/images/casestudies_background.png"
        alt="Background"
        fill
        className="absolute inset-0 -z-10 object-cover blur-[3px] grayscale-100"
        quality={100}
      />

      <h2 className="text-4xl font-bold uppercase sm:text-5xl md:text-[5rem] lg:text-[6rem]">
        <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
          Case
        </span>{" "}
        Studies
      </h2>

      <p className="max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl">
        At <strong>Camino Code</strong>, we take pride in delivering
        high-quality, innovative solutions in <strong>data science</strong> and
        <strong>web development</strong>. Our portfolio showcases a range of
        successful projects, from <strong>custom web applications</strong> to{" "}
        <strong>data-driven platforms</strong> that enhance business efficiency
        and performance.
      </p>
    </section>
  );
};

export default CaseStudiesHeader;
