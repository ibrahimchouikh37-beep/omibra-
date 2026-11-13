import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { chooseLinesSM as activitiesLinesSM } from "../../constants/welcome";
import { activitiesLinesLG } from "../../constants/activites";
import "./activities.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Activities = () => {
  const sectionRef = useRef(null);
  const isMobD = useMediaQuery({ query: "(max-width: 768px)" });
  const activitiesLines = isMobD ? activitiesLinesSM : activitiesLinesLG;

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const lines = q(".activities-title-clip");
      const progressLines = q(".progress-line");
      if (!lines.length || progressLines.length < 3) return;

      const activitiesTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      activitiesTl.from(q(".activities-subtitle"), {
        yPercent: 100,
        opacity: 0,
        ease: "power1.inOut",
      });

      if (!isMobD) {
        activitiesTl.fromTo(
          q(".activities-part"),
          { height: "10vh" },
          { height: "50vh", ease: "none" },
          "<"
        );
      }

      activitiesTl.to(
        lines,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          stagger: 0.2,
          duration: 1,
        },
        "<"
      );

      if (!isMobD) {
        activitiesTl.from(
          q(".activities-sec"),
          { yPercent: 100, duration: 1 },
          "<"
        );
      }

      activitiesTl.fromTo(
        progressLines[0],
        { width: "0%" },
        { width: "40%", duration: 0.5, ease: "power2.in" }
      );

      activitiesTl.fromTo(
        progressLines[1],
        { width: "0%" },
        { width: "80%", duration: 0.5, ease: "power2.in" },
        "<"
      );

      activitiesTl.fromTo(
        progressLines[2],
        { width: "0%" },
        { width: "60%", duration: 0.5, ease: "power2.in" },
        "<"
      );

      return () => {
        activitiesTl.scrollTrigger?.kill();
        activitiesTl.kill();
      };
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <section
      ref={sectionRef}
      className="activities-section w-full min-h-[120vh] p-8 mt-16"
    >
      <p className="text-[.7rem] font-bold text-[#eae5dd] activities-subtitle">
        Ready for an advanture?
      </p>

      <div className="lg:mt-10 mt-7 activities-part origin-bottom">
        {activitiesLines.map((line, index) => (
          <h1
            key={index}
            className="activities-heading text-[#f4efe7] lg:text-[9.5rem] text-[3rem] leading-[0.9] font-medium tracking-tighter"
          >
            <span
              className={`activities-title-break ${index === 1 ? "lg:pb-3 pb-2" : ""}`}
            >
              {line}
              <span
                className={`activities-title-clip ${index === 1 ? "lg:pb-3 pb-2" : ""}`}
              >
                {line}
              </span>
            </span>
          </h1>
        ))}
      </div>

      <div className="activities-sec w-full flex lg:flex-row flex-col justify-center items-start gap-10 lg:mt-0">
        <div className="lg:w-1/2 w-full">
          <div className="lg:w-[30%] w-[60%]">
            <p className="text-[.7rem] text-[#eae5dd]">
              Offered Capsules® activities have different levels of difficulty:
            </p>
          </div>

          <div className="flex flex-col justify-start items-start gap-5 mt-8 mr-14">
            {/* Easy */}
            <div className="w-full mr-14">
              <div className="flex justify-between w-full mb-4">
                <h1 className="text-[#b1a696] text-xl">Easy</h1>
                <p className="text-[#b1a696] text-[0.7rem]">3-5h duration</p>
              </div>
              <div className="relative z-9 w-full h-[0.1rem] bg-[#4f4b48]">
                <div className="progress-line absolute z-10 bg-[#f4efe7] w-[40%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
              </div>
            </div>

            {/* Medium */}
            <div className="w-full mr-14">
              <div className="flex justify-between w-full mb-4">
                <h1 className="text-[#b1a696] text-xl">Medium</h1>
                <p className="text-[#b1a696] text-[0.7rem]">8-12h duration</p>
              </div>
              <div className="relative z-9 w-full h-[0.1rem] bg-[#4f4b48]">
                <div className="progress-line absolute z-10 bg-[#f4efe7] w-[80%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
              </div>
            </div>

            {/* Hard */}
            <div className="w-full mr-14">
              <div className="flex justify-between w-full mb-4">
                <h1 className="text-[#b1a696] text-xl">Hard</h1>
                <p className="text-[#b1a696] text-[0.7rem]">24h duration</p>
              </div>
              <div className="relative z-9 w-full h-[0.1rem] bg-[#4f4b48]">
                <div className="progress-line absolute z-10 bg-[#f4efe7] w-[60%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full text-[#b1a696] lg:text-[2rem] text-[1rem] md:leading-[1.1] lg:mt-0 mt-8 lg:pr-0">
          <p>
            We want to make sure your stay is exciting and enjoyable. That’s why
            we offer a variety of activities with different levels of engagement.
            Whether you seek thrills or tranquility, there’s something for
            everyone to make your desert stay truly memorable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Activities;