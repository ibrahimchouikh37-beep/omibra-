import { useRef } from "react";
import banner from "../../assets/omi.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FooterBanner = () => {
  const fbConRef = useRef(null);
  const fbImgRef = useRef(null);

  useGSAP(
    () => {
      if (!fbConRef.current || !fbImgRef.current) return;

      gsap.fromTo(
        fbImgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: fbConRef.current,
            start: "top bottom-=20%",
            end: "bottom top+=20%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === fbConRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: fbConRef, revertOnUpdate: true }
  );

  return (
    <div
      ref={fbConRef}
      className="w-full min-h-dvh p-2 overflow-hidden flex items-center"
    >
      <div className="w-full relative overflow-hidden rounded-[1.5rem] md:rounded-4xl">
        <img
          ref={fbImgRef}
          src={banner}
          alt="Bannière Omibra Parfums"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />

        {/* Titre central */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold text-[#f4efe7] whitespace-nowrap">
          Omibra
          <sub className="text-[7vw] sm:text-[6vw] md:text-[5vw] align-baseline">
            ®
          </sub>
        </h1>

        {/* Texte en bas */}
        <div className="absolute bottom-4 md:bottom-5 px-4 w-full">
          <div className="w-full h-auto flex md:flex-row flex-col md:justify-between md:items-end gap-3 md:gap-0">
            <h2
              className="text-start md:text-[#f4efe7] text-[#b1a696] text-lg sm:text-xl md:text-2xl font-bold md:tracking-wider leading-snug flex flex-col gap-0.5 md:gap-1"
              style={{ textShadow: "2px 2px 4px #000" }}
            >
              <span>L'Art du</span>
              <span>Parfum—</span>
              <span>l'Émotion</span>
            </h2>

            <p
              className="md:w-[20%] w-full text-[#f4efe7] text-[0.65rem] sm:text-[0.7rem] font-medium tracking-wide md:text-end text-justify leading-relaxed"
              style={{ textShadow: "2px 2px 4px #000" }}
            >
              Découvrez des fragrances d'exception, conçues pour révéler votre
              personnalité et laisser une empreinte inoubliable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;