import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import "./footertitle.css";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

const FooterTitle = () => {
  const ftConRef = useRef(null);

  useGSAP(
    () => {
      const root = ftConRef.current;
      if (!root) return;

      const h1 = root.querySelector(".footer-title h1");
      if (!h1) return;

      const build = () => {
        const sub = h1.querySelector("sub");
        const subHTML = sub ? sub.outerHTML : "";
        if (sub) sub.remove();

        const split = new SplitText(h1, {
          type: "chars",
          charsClass: "ftChar",
        });

        split.chars.forEach((char) => {
          char.innerHTML = `<span>${char.innerHTML}</span>`;
        });

        if (subHTML) {
          h1.insertAdjacentHTML("beforeend", subHTML);
        }

        const innerChars = Array.from(h1.querySelectorAll(".ftChar > span"));
        if (subHTML) {
          const subSpan = h1.querySelector("sub > span");
          if (subSpan) innerChars.push(subSpan);
        }

        gsap.set(innerChars, { x: "-120%" });

        const tween = gsap.to(innerChars, {
          x: "0%",
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top 80%",
            scrub: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          split.revert();
        };
      };

      let cleanup;
      const start = () => {
        cleanup = build();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => requestAnimationFrame(start));
      } else {
        requestAnimationFrame(start);
      }

      return () => {
        if (cleanup) cleanup();
      };
    },
    { scope: ftConRef, revertOnUpdate: true }
  );

  return (
    <section
      ref={ftConRef}
      className="relative z-1 w-full min-h-[40vh] md:h-[40vh] border-t border-[#c4c1b9] flex flex-col"
    >
      {/* Header mentions */}
      <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-0 px-5 md:px-6 pt-6 md:pt-8">
        <p className="text-[#b1a696] text-[0.65rem] md:text-[0.7rem]">
          Site réalisé par—{" "}
          <a
            href="https://ibrahimchouikh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2ede5] hover:underline"
          >
            Ibrahim Chouikh
          </a>
        </p>
        <p className="text-[#b1a696] text-[0.65rem] md:text-[0.7rem]">
          Ce site utilise des{" "}
          <a href="#" className="text-[#f2ede5] hover:underline">
            cookies
          </a>
        </p>
        <p className="text-[#b1a696] text-[0.65rem] md:text-[0.7rem]">
          Tous droits réservés ©{" "}
          <a href="#" className="text-[#f2ede5] hover:underline">
            2026
          </a>
        </p>
      </div>

      {/* Titre géant */}
      <div className="footer-title">
        <h1 className="text-[22vw] sm:text-[20vw] md:text-[18vw] font-bold">
          Omibra<sub>®</sub>
        </h1>
      </div>
    </section>
  );
};

export default FooterTitle;