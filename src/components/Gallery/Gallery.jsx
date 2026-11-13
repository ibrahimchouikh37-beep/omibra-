import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { BsFillPlusCircleFill } from "react-icons/bs";

import "./gallery.css";
import gbg1 from "../../assets/background1.png";
import gbg2 from "../../assets/background2.png";
import gbg3 from "../../assets/background3.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Gallery = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Vérifier que les éléments essentiels existent
      const bg = q(".gallery-background")[0];
      const second = q("#gallery-second")[0];
      const third = q("#gallery-third")[0];
      if (!bg || !second || !third) return;

      const build = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: isMobile ? "+=200%" : "+=300%",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Fond passe du marron clair au noir
        tl.to(root, { backgroundColor: "#181717", duration: 0.1 }, 0);

        // Reset état initial
        gsap.set(
          q(".gallery-topText h4, .gallery-topText h3, .gallery-bottomText h3"),
          { opacity: 1, x: 0 }
        );

        // PHASE 1 — Capsule #1 s'agrandit plein écran
        tl.to(q(".gallery-box h3"), { opacity: 0, duration: 0.4 }, 0)
          .to(
            bg,
            {
              width: "calc(100vw - 1rem)",
              height: "calc(100dvh - 1rem)",
              borderRadius: isMobile ? "2rem" : "3.5rem",
              y: 0,
              duration: 1,
            },
            0
          )
          .to(
            q(".gallery-background img"),
            { scale: 1, duration: 1 },
            0
          )
          .from(
            q(".gallery-background .gallery-topText h4, .gallery-background .gallery-topText h3, .gallery-background .gallery-bottomText h3"),
            { opacity: 0, x: 50, duration: 0.5 },
            0.5
          );

        // Pause
        tl.to({}, { duration: 0.3 });

        // PHASE 2 — Capsule #2 arrive
        tl.to(
          second,
          {
            yPercent: isMobile ? -50 : -56,
            xPercent: -50,
            duration: 1,
          },
          "b"
        )
          .to(q("#gallery-second img"), { scale: 1, duration: 1 }, "b")
          .to(
            bg,
            { scale: 0.9, opacity: 0, y: -50, duration: 1 },
            "b"
          )
          .from(
            q("#gallery-second .gallery-topText h4, #gallery-second .gallery-topText h3, #gallery-second .gallery-bottomText h3"),
            { opacity: 0, x: 50, duration: 0.5 },
            "b+=0.5"
          );

        // Pause
        tl.to({}, { duration: 0.3 });

        // PHASE 3 — Capsule #3 arrive
        tl.to(
          third,
          {
            yPercent: isMobile ? -50 : -56,
            xPercent: -50,
            duration: 1,
          },
          "c"
        )
          .to(q("#gallery-third img"), { scale: 1, duration: 1 }, "c")
          .to(second, { scale: 0.9, opacity: 0, duration: 1 }, "c")
          .from(
            q("#gallery-third .gallery-topText h4, #gallery-third .gallery-topText h3, #gallery-third .gallery-bottomText h3"),
            { opacity: 0, x: 50, duration: 0.5 },
            "c+=0.5"
          );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      // SplitText n'est pas utilisé ici, pas besoin d'attendre fonts,
      // mais on attend 1 frame pour StrictMode
      let cleanup;
      const start = () => {
        cleanup = build();
      };
      requestAnimationFrame(start);

      return () => {
        if (cleanup) cleanup();
      };
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  const generateCapsules = (quantity = 6) =>
    Array.from({ length: quantity }, (_, i) => (
      <h3 key={i + 1} style={{ "--index": i + 1 }} className="tracking-tighter">
        Capsules®
      </h3>
    ));

  return (
    <section className="gallery-page4" ref={sectionRef}>
      <div className="gallery-slider">
        <div
          className="gallery-box"
          style={{ "--time": "40s", "--quantity": 6 }}
        >
          {generateCapsules(6)}
        </div>
      </div>

      <div className="gallery-background">
        <img src={gbg1} alt="Classic Capsule" />
        <div className="gallery-topText">
          <h4>ClassicCapsule®</h4>
          <h3>(Scroll)</h3>
        </div>
        <div className="gallery-bottomText">
          <div className="w-full flex justify-center items-center gap-0">
            <BsFillPlusCircleFill className="w-8 h-8 text-[#b1a696] shrink-0" />
            <h3>
              Classic Capsule® boasts refined aesthetics and a modern interior,
              creating an intimate retreat in a desert landscape
            </h3>
          </div>
          <div className="relative z-9 w-full max-w-[12.5rem] h-[0.1rem] bg-[#4f4b48]">
            <div className="progress-line absolute z-10 bg-[#f4efe7] w-[33%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
          </div>
        </div>
      </div>

      <div id="gallery-second" className="gallery-background2">
        <img src={gbg2} alt="Terrace Capsule" />
        <div className="gallery-topText">
          <h4>Terrace Capsule®</h4>
          <h3>(Scroll)</h3>
        </div>
        <div className="gallery-bottomText">
          <div className="w-full flex justify-center items-center gap-0">
            <BsFillPlusCircleFill className="w-8 h-8 text-[#b1a696] shrink-0" />
            <h3>
              Classic Capsule® boasts refined aesthetics and a modern interior,
              creating an intimate retreat in a desert landscape
            </h3>
          </div>
          <div className="relative z-9 w-full max-w-[12.5rem] h-[0.1rem] bg-[#4f4b48]">
            <div className="progress-line absolute z-10 bg-[#f4efe7] w-[67%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
          </div>
        </div>
      </div>

      <div id="gallery-third" className="gallery-background2">
        <img src={gbg3} alt="Desert Capsule" />
        <div className="gallery-topText">
          <h4>Desert Capsule®</h4>
          <h3>(Scroll)</h3>
        </div>
        <div className="gallery-bottomText">
          <div className="w-full flex justify-center items-center gap-0">
            <BsFillPlusCircleFill className="w-8 h-8 text-[#b1a696] shrink-0" />
            <h3>
              Classic Capsule® boasts refined aesthetics and a modern interior,
              creating an intimate retreat in a desert landscape
            </h3>
          </div>
          <div className="relative z-9 w-full max-w-[12.5rem] h-[0.1rem] bg-[#4f4b48]">
            <div className="progress-line absolute z-10 bg-[#f4efe7] w-[100%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;