import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

import smoke from "../../assets/smoke_final.mp4";
import mobileHeroBg from "../../assets/xdf.jpg";
import desktopHeroBg from "../../assets/arua.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
  const sectionRef = useRef(null);
  const isMobHero = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(
    () => {
      // On ne se fie PAS à isMobHero via la dépendance (bug react-responsive)
      // On lit la valeur au moment du callback
      if (window.matchMedia("(max-width: 768px)").matches) return;

      gsap.to(".hero-img", {
        yPercent: -5,
        scale: 1.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef, revertOnUpdate: true } // ⬅️ plus de dependencies
  );

  return (
    <section
      ref={sectionRef}
      className="hero-section w-full h-dvh p-2 md:p-2.5 mb-20"
    >
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
        {/* ==== DESKTOP: image de fond ==== */}
        <div
          className="hero-img absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${desktopHeroBg})` }}
        />

        {/* ==== MOBILE: image statique ==== */}
        <div className="md:hidden absolute inset-0 z-0">
          <img
            src={mobileHeroBg}
            alt="Capsules mobile background"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>

        {/* ==== Vidéo fumée ==== */}
        <video
          src={smoke}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={isMobHero ? mobileHeroBg : undefined}
          className="absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none mix-blend-hard-light opacity-50"
        />

        {/* ==== Contenu ==== */}
        <div className="relative z-20 h-full p-4 md:p-6 flex flex-col">
          <h1
            className="text-[#f4efe7] text-5xl sm:text-6xl md:text-9xl font-bold tracking-wider"
            style={{ textShadow: "2px 2px 4px #aaa" }}
          >
            Capsules®
          </h1>

          <div className="mt-auto flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-6 md:pb-0">
            <h2
              className="text-[#f4efe7] text-2xl font-bold tracking-wide leading-snug flex flex-col gap-0.5"
              style={{ textShadow: "2px 2px 4px #000" }}
            >
              <span>Closer to</span>
              <span>Nature—Closer</span>
              <span>to Yourself</span>
            </h2>

            <p
              className="md:w-[22%] w-full text-[#f4efe7] text-xs md:text-sm font-medium tracking-wide md:text-end text-justify leading-relaxed"
              style={{ textShadow: "2px 2px 4px #000" }}
            >
              Spend unforgettable and remarkable time in the Californian
              desert with—Capsules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;