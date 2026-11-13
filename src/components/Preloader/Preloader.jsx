import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

const Preloader = () => {
  const preloaderRef = useRef(null);
  const preloaderLogoRef = useRef(null);

  useGSAP(
    () => {
      const root = preloaderRef.current;
      const logoEl = preloaderLogoRef.current;
      if (!root || !logoEl) return;

      const q = gsap.utils.selector(root);

      const build = () => {
        const footerEl = q(".preloader-footer p")[0];
        if (!footerEl) return;

        // 1️⃣ Créer les splits
        const logoSplit = new SplitText(logoEl, {
          type: "chars",
          charsClass: "char2",
        });
        logoSplit.chars.forEach((char) => {
          char.style.overflow = "hidden";
          char.style.display = "inline-block";
        });

        const footerSplit = new SplitText(footerEl, {
          type: "lines",
          linesClass: "line",
        });

        // 2️⃣ États initiaux
        gsap.set(logoSplit.chars, { xPercent: 100, force3D: true });
        gsap.set(footerSplit.lines, { yPercent: 100, force3D: true });
        gsap.set(q(".preloader-progress-bar"), { scaleX: 0 });

        // 3️⃣ Progress bar
        function animateProgress(duration = 4) {
          const tl = gsap.timeline();
          const steps = 3;
          let current = 0;
          for (let i = 0; i < steps; i++) {
            const finalStep = i === steps - 1;
            const target = finalStep
              ? 1
              : Math.min(current + Math.random() * 0.3, 0.2);
            current = target;
            tl.to(
              q(".preloader-progress-bar"),
              {
                scaleX: target,
                duration: duration / steps,
                ease: "power2.out",
              }
            );
          }
          return tl;
        }

        // 4️⃣ Timeline
        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(logoSplit.chars, {
          xPercent: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.inOut",
        })
          .add(animateProgress(), "<")
          .to(
            footerSplit.lines,
            {
              yPercent: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power4.out",
            },
            "0.25"
          )
          .set(q(".preloader-progress"), { backgroundColor: "var(--base-300)" })
          .to(
            logoSplit.chars,
            {
              xPercent: -100,
              stagger: 0.05,
              duration: 1,
              ease: "power4.inOut",
            },
            "-=0.5"
          )
          .to(
            footerSplit.lines,
            {
              yPercent: -100,
              stagger: 0.1,
              duration: 0.8,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            q(".preloader-progress"),
            { opacity: 0, duration: 0.5, ease: "power3.out" },
            "-=0.25"
          )
          .to(
            q(".preloader-mask"),
            { scale: 5, duration: 2.5, ease: "power3.out" },
            "<"
          )
          .to(
            footerSplit.lines,
            { opacity: 0, duration: 0.3, ease: "power2.out" },
            "+=0.2"
          )
          .set(root, { display: "none" });

        return () => {
          tl.kill();
          logoSplit.revert();
          footerSplit.revert();
        };
      };

      // ⬇️ Attend fonts + 1 frame
      let cleanup;
      const start = () => {
        cleanup = build();
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
    { scope: preloaderRef, revertOnUpdate: true }
  );

  return (
    <div ref={preloaderRef} className="preloader relative z-51">
      <div className="preloader-progress">
        <div className="preloader-progress-bar" />
        <div className="preloader-logo">
          <h1 ref={preloaderLogoRef} className="logo-text">
            Omibra
          </h1>
        </div>
      </div>

      <div className="preloader-mask" />

      <div className="preloader-content">
        <div className="preloader-footer">
          <p>
            Chaque fragrance raconte une histoire, où les notes se dévoilent
            dans la lumière, et le temps suspend son cours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;