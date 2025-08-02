"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

const partners = [
  { src: "/assets/images/partner_1.png", alt: "Partner 1" },
  { src: "/assets/images/partner_2.png", alt: "Partner 2" },
  { src: "/assets/images/partner_3.png", alt: "Partner 3" },
  { src: "/assets/images/partner_4.png", alt: "Partner 4" },
  { src: "/assets/images/partner_5.png", alt: "Partner 5" },
];

export default function Partners() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const duration = 20;

    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    const trackWidth = track.scrollWidth / 2;
    container.style.setProperty("--track-width", `${trackWidth}px`);
    container.style.setProperty("--duration", `${duration}s`);

    const handleAnimationIteration = () => {
      if (track.style.transform === `translateX(-${trackWidth}px)`) {
        track.style.transform = "translateX(0)";
        void track.offsetWidth;
        track.style.transform = `translateX(-${trackWidth}px)`;
      }
    };

    track.addEventListener("animationiteration", handleAnimationIteration);

    return () => {
      track.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);

  return (
    <section
      id="partners"
      className="relative flex flex-col items-center justify-center gap-10 overflow-hidden bg-[rgba(248,244,239,1)] px-6 pb-16 text-center sm:px-8 md:px-10"
    >
      <div className="object-fit flex h-[350px] w-full items-center justify-center overflow-clip">
        <ModelViewer url="/triangle.glb" />
      </div>
      <div className="flex w-full flex-col-reverse items-center md:flex-col">
        <h2 className="mx-auto text-center text-5xl leading-[60px] font-bold text-black uppercase md:text-[70px] md:leading-[80px] lg:text-[120px] lg:leading-[130px]">
          Our{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Partners
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className="logo-slider relative mx-auto w-full max-w-[1440px] overflow-hidden py-4"
      >
        <div
          ref={trackRef}
          className="logo-track flex w-max items-center [&>div>img]:shadow-md"
        >
          <div className="logo-set ml-8 flex items-center gap-8 sm:ml-12 sm:gap-12 md:ml-16 md:gap-16 lg:ml-20 lg:gap-20">
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="flex-shrink-0">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={160}
                  className="h-32 w-32 rounded-full border-[1px] border-black object-contain md:h-[200px] md:w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx global>{`
        .logo-slider {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        .logo-track {
          animation: scroll var(--duration) linear infinite;
          transform: translateX(0);
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--track-width)));
          }
        }
      `}</style>
    </section>
  );
}
