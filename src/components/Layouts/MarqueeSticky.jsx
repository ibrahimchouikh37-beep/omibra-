import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeText from "../Marquee/MarqueeText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MarqueeSticky = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      // Pas de fade scrubbé si l'utilisateur préfère moins de mouvement
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".marquee-fade",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".pin-con",
              start: "top 80%",
              end: "bottom 40%",
              scrub: 1,
              refreshPriority: -1,
              // pas de pin ici : c'est StickyCols qui épingle plus bas
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* min-h : donne de la place au marquee ; plus bas sur mobile */}
      <div className="pin-con relative pb-10 md:pb-16 min-h-[45svh] md:min-h-[60svh]">
        <p className="choose-subtitle px-4 pt-6 md:pl-8 md:pt-8 text-xs md:text-[0.7rem] leading-relaxed text-[#eae5dd]">
          Want to learn more about
          <br />
          the benefits of—Capsules<span>®</span>?
        </p>

        {/* Marquee dans le flux (plus de position absolute) :
            plus de chevauchement avec le paragraphe, quelle que soit la taille d'écran */}
        <div className="marquee-fade mt-2 md:mt-4">
          <MarqueeText />
        </div>
      </div>
    </section>
  );
};

export default MarqueeSticky;