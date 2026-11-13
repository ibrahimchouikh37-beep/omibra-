import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import "./preloaderII.css";

gsap.registerPlugin(SplitText, useGSAP);

export default function PreloaderII() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      const build = () => {
        const logoEl = q(".preloader-logo h1")[0];
        const footerEl = q(".preloader-footer p")[0];
        if (!logoEl || !footerEl) return;

        // ⬇️ Splits APRÈS fonts chargées
        const logoChars = new SplitText(logoEl, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });
        const footerLines = new SplitText(footerEl, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        gsap.set(logoChars.chars, { x: "100%" });
        gsap.set(footerLines.lines, { y: "100%" });

        function animateProgress(duration = 3.5) {
          const tl = gsap.timeline();
          const steps = 3;
          let current = 0;
          for (let i = 0; i < steps; i++) {
            const finalStep = i === steps - 1;
            const target = finalStep
              ? 1
              : Math.min(current + Math.random() * 0.3 + 0.1, 0.9);
            current = target;
            tl.to(q(".preloader-progress-bar"), {
              scaleX: target,
              duration: duration / steps,
              ease: "power3.out",
            });
          }
          return tl;
        }

        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(logoChars.chars, {
          x: "0%",
          stagger: 0.05,
          duration: 1,
          ease: "power4.inOut",
        })
          .to(
            footerLines.lines,
            { y: "0%", stagger: 0.1, duration: 1, ease: "power4.inOut" },
            "0.25"
          )
          .add(animateProgress(), "<")
          .set(q(".preloader-progress"), { backgroundColor: "var(--base-300)" })
          .to(
            logoChars.chars,
            {
              x: "-100%",
              stagger: 0.05,
              duration: 1,
              ease: "power4.inOut",
            },
            "+=0.15"
          )
          .to(
            footerLines.lines,
            {
              y: "-100%",
              stagger: 0.1,
              duration: 0.5,
              ease: "power4.inOut",
            },
            "-=0.1"
          )
          .to(
            q(".preloader-progress"),
            { opacity: 0, duration: 0.7, ease: "power3.out" },
            "<"
          )
          .to(
            q(".preloader-mask"),
            { scale: 6, duration: 4, ease: "power3.out" },
            "<"
          )
          .to(
            q(".preloader-mask"),
            {
              delay: 1,
              opacity: 0,
              duration: 0.5,
              onComplete: () => gsap.set(root, { display: "none" }),
            },
            "<"
          );

        return () => {
          tl.kill();
          logoChars.revert();
          footerLines.revert();
        };
      };

      // ⬇️ LA CLÉ : attendre fonts avant de split
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
    { scope: rootRef, revertOnUpdate: true }
  );

  return (
    <div
      ref={rootRef}
      className="size-full fixed z-51 overflow-hidden pointer-events-none"
    >
      <div className="preloader-progress">
        <div className="preloader-progress-bar" />
        <div className="preloader-logo">
          <h1>Capsule</h1>
        </div>
      </div>

      <div className="preloader-mask" />

      <div className="preloader-content">
        <div className="preloader-footer">
          <p className="text-sm">
            Meet Capsules®—modern and cozy
            <br />
            houses, in the California desert.
          </p>
        </div>
      </div>
    </div>
  );
}