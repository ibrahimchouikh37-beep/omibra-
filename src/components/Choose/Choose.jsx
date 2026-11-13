import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { chooseLinesLG, chooseLinesSM } from "../../constants/welcome";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Choose = () => {
  const sectionRef = useRef(null);
  const isMobD = useMediaQuery({ query: "(max-width: 768px)" });
  const chooseLines = isMobD ? chooseLinesSM : chooseLinesLG;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const lines = q(".choose-title-clip");
      if (!lines.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: isMobD ? "bottom 80%" : "bottom 100%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.from(q(".choose-subtitle"), {
        yPercent: 100,
        opacity: 0,
        ease: "power1.inOut",
      });

      if (!isMobD) {
        tl.fromTo(
          q(".title-part"),
          { height: "10vh" },
          { height: "50vh", ease: "none" },
          "<"
        );
      }

      tl.to(
        lines,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          stagger: 0.15,
          duration: 1,
        },
        "<"
      );

      if (!isMobD) {
        tl.from(q(".choose-sec"), { yPercent: 100, duration: 1 }, "<");
      }

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
      className="choose-section w-full min-h-dvh p-6 md:p-8 pt-10"
    >
      <p className="text-[.7rem] text-[#eae5dd] choose-subtitle">
        Discover Available Capsule<span>®</span>
      </p>

      <div className="lg:mt-10 mt-7 title-part origin-bottom">
        {chooseLines.map((line, index) => (
          <h1
            key={index}
            className="choose-heading text-[#f4efe7] text-[2rem] sm:text-[2.8rem] md:text-[3rem] lg:text-[9.5rem] leading-[0.95] lg:leading-[0.9] font-medium tracking-tighter"
          >
            <span className="choose-title-break">{line}</span>
            <span className="choose-title-clip">{line}</span>
          </h1>
        ))}
      </div>

      <div className="choose-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0 mt-8">
        <div className="lg:w-1/2 w-full text-[#b1a696] lg:text-[2rem] text-[1rem] md:leading-[1.1] lg:pr-16">
          <p>
            You can choose one of three premium capsule houses in our offer.
            Each of our capsules provides the highest quality and meets the
            standards adjusted to your needs. Choose the one you like.
          </p>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="lg:w-[30%] w-[60%]">
            <p className="text-[.7rem] text-[#eae5dd]">
              All Capsules® houses—has built based on the same rules:
            </p>
          </div>

          <div className="flex flex-1 flex-wrap justify-start items-start gap-2 mt-8">
            {[
              { label: "Sustainable", color: "b1a696" },
              { label: "Nature—Care", color: "f4efe7" },
              { label: "Smart", color: "b1a696" },
              { label: "Privacy", color: "f4efe7" },
              { label: "Spacious", color: "b1a696" },
              { label: "Glassed-in", color: "f4efe7" },
            ].map(({ label, color }) => (
              <div
                key={label}
                className={`border-[1px] border-[#${color}] text-[#${color}] lg:text-[2rem] text-sm px-[20px] py-[4px] rounded-full`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;