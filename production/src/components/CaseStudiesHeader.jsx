import Image from "next/image";
const CaseStudiesHeader = () => {
  return (
    <section
      id="case-studies"
      className="relative flex min-h-[70vh] flex-col items-center justify-center gap-10 overflow-hidden px-8 py-32 text-center sm:px-10 md:py-40 lg:py-48"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/casestudies_background.png"
          alt="Background"
          fill
          className="object-cover scale-105 transition-transform duration-[3000ms] hover:scale-100"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-red-900/20" />
      </div>

      <h2 className="text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem] animate-fade-in-up">
        <span className="inline-block bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
          Case
        </span>{" "}
        <span className="text-white drop-shadow-2xl">Studies</span>
      </h2>

      <p className="max-w-3xl text-base font-medium leading-relaxed text-gray-100 drop-shadow-lg sm:text-lg md:text-xl lg:text-2xl animate-fade-in-up animation-delay-200">
        At <strong className="text-amber-400">Camino Code</strong>, we take pride in delivering
        high-quality, innovative solutions in <strong className="text-amber-400">data science</strong> and{" "}
        <strong className="text-amber-400">web development</strong>. Our portfolio showcases a range of
        successful projects, from <strong className="text-amber-400">custom web applications</strong> to{" "}
        <strong className="text-amber-400">data-driven platforms</strong> that enhance business efficiency
        and performance.
      </p>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-400">
        <div className="h-8 w-5 rounded-full border-2 border-white/50 p-1 animate-bounce">
          <div className="h-2 w-2 mx-auto rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesHeader;
