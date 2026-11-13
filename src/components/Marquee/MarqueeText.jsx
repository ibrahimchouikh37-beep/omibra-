import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./marqueetext.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPIES = 4; // suffisant : un item fait déjà ~90vw (desktop) à ~130vw (mobile)
const SECONDS_PER_ITEM = 18; // temps pour parcourir un item (vitesse de base)
const SMOOTHING = 5; // plus grand = changement de sens plus vif

const MarqueeText = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();

      // Mouvement réduit : aucune animation, le marquee reste statique
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const firstItem = track.firstElementChild;
        const stars = gsap.utils.toArray(".star-rotate", container);
        const setX = gsap.quickSetter(track, "x", "px");

        let itemW = 0;
        let pos = 0; // décalage dans [0, itemW)
        let direction = 1; // 1 = vers la gauche, -1 = vers la droite
        let current = 1; // vitesse lissée (évite les à-coups au changement de sens)

        // Largeur d'UN item (padding inclus) : c'est la période de la boucle
        const measure = () => {
          itemW = firstItem.getBoundingClientRect().width;
        };

        const tick = (_time, deltaTime) => {
          if (!itemW) return;
          const dt = Math.min(deltaTime, 100) / 1000; // ignore les gros sauts (onglet en arrière-plan)
          current += (direction - current) * Math.min(1, dt * SMOOTHING);
          pos += current * (itemW / SECONDS_PER_ITEM) * dt;
          pos = ((pos % itemW) + itemW) % itemW; // wrap, marche dans les deux sens
          setX(-pos);
        };

        // Un seul ScrollTrigger : direction du scroll (souris ET tactile)
        // + le ticker ne tourne que quand le marquee est visible
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            if (self.direction === direction) return;
            direction = self.direction;
            gsap.to(stars, {
              rotation: direction > 0 ? "+=110" : "-=110",
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onToggle: (self) => {
            if (self.isActive) gsap.ticker.add(tick);
            else gsap.ticker.remove(tick);
          },
        });
        if (st.isActive) gsap.ticker.add(tick); // ajout idempotent

        // Remesure si la taille change (resize, polices)
        const ro = new ResizeObserver(measure);
        ro.observe(firstItem);
        measure();
        document.fonts?.ready.then(measure);

        return () => {
          ro.disconnect();
          st.kill();
          gsap.ticker.remove(tick);
          gsap.set(track, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="marquee-text-container">
      <div ref={trackRef} className="marquee-text-move">
        {Array.from({ length: COPIES }, (_, i) => (
          <div
            key={i}
            className="marquee-text-marquee"
            aria-hidden={i > 0 ? true : undefined}
          >
            <p className="marquee-text-title">
              Why Capsules®?
              <span className="star-rotate" aria-hidden="true">
                *
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;