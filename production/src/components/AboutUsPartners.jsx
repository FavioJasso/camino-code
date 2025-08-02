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
      className="flex flex-col items-center justify-center px-6 pb-16 text-center sm:px-8 md:px-10 gap-10 bg-[rgba(248,244,239,1)] relative overflow-hidden"
    >
      <div className="w-full h-[350px] object-fit flex items-center justify-center overflow-clip">
        <ModelViewer url="/triangle.glb" />
      </div>
      <div className="w-full flex flex-col-reverse md:flex-col items-center">
        <h2 className="font-bold uppercase text-black text-5xl md:text-[70px] lg:text-[120px] mx-auto lg:leading-[130px] md:leading-[80px] text-center leading-[60px]">
          Our{" "}
          <span className="inline-block bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text text-transparent">
            Partners
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className="logo-slider w-full overflow-hidden py-4 relative max-w-[1440px] mx-auto"
      >
        <div
          ref={trackRef}
          className="logo-track flex w-max items-center [&>div>img]:shadow-md"
        >
          <div className="logo-set flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 lg:ml-20 md:ml-16 sm:ml-12 ml-8">
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="flex-shrink-0">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={160}
                  className="h-32 w-32 object-contain md:h-[200px] md:w-[200px] rounded-full border-[1px] border-black"
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
