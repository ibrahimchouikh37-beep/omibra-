import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import w1 from "../../assets/omik.jpg";
import w2 from "../../assets/omik0.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Welcome = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const lines = q(".clip-text-welcome");
      if (!lines.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        lines,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          stagger: 0.15,
          duration: 1,
        },
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="welcome-section w-full min-h-[120dvh] text-[#2A2725] md:px-7 px-6 py-10"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full md:w-[86%] md:text-[64px] text-[28px] sm:text-[34px] welcome-line md:pt-20">
          <div className="w-full welcome-text flex flex-col justify-center items-start gap-1">
            {welcomeLines.map((text, index) => (
              <span
                key={index}
                className="text-darkBrown md:tracking-[-0.010em] tracking-[0.015em] w-full"
              >
                <span className="block">{text}</span>
                <span className="clip-text-welcome md:tracking-[-0.010em] tracking-[0.015em]">
                  {text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between items-center md:p-4 md:mt-20 mt-10">
        <div className="flex flex-row justify-center items-center gap-1">
          <img
            src={w1}
            alt="Omibra Parfums ambiance"
            className="md:rounded-[8rem] rounded-[9rem] md:w-56 w-44"
          />
          <img
            src={w2}
            alt="Omibra Parfums flacon"
            className="md:rounded-[8rem] rounded-[9rem] md:w-56 w-44"
          />
        </div>
        <div className="md:w-1/2 w-full md:mt-0 mt-10">
          <p className="md:text-[2rem] text-[1.4rem] text-[#b1a696] md:leading-[1.1] md:pr-24 font-normal leading-[26px] tracking-[-0.2px]">
            <span>Un univers où chaque parfum devient une extension de vous-même.</span>
            <br />
            <span>Une expérience olfactive rare, entre élégance et émotion.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;