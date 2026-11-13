import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText"; // GSAP >= 3.13 (option `mask`)
import { useGSAP } from "@gsap/react";
import colimg1 from "../../assets/cap1-square.jpg";
import colimg2 from "../../assets/cap2-square.jpg";
import "./StickyCols.css";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Évite les sauts quand la barre d'URL mobile apparaît/disparaît
ScrollTrigger.config({ ignoreMobileResize: true });

const TOTAL = 3;

// Contenu centralisé : on le modifie ici, pas dans le JSX
const SLIDES = [
  {
    title: "Enjoy the view through the wide panoramic glass window",
    text: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
  },
  {
    title: "Enjoy the view through the wide panoramic glass window",
    text: "Get closer to the desert nature than ever before and admire this unique, breathtaking landscape.",
  },
];

/* ---------- Sous-composants (hors du composant principal) ---------- */

const Counters = ({ current }) => (
  <div className="counters" role="img" aria-label={`${current} / ${TOTAL}`}>
    <span className="counter is-active">{current}</span>
    <span className="counter">{TOTAL}</span>
  </div>
);

const Panel = ({ slide, current }) => (
  <div className="panel">
    <h2 className="panel-title">{slide.title}</h2>
    <div className="panel-meta">
      <Counters current={current} />
      <p className="panel-text">{slide.text}</p>
    </div>
  </div>
);

/* ---------- Composant principal ---------- */

const StickyCols = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          compact: "(max-width: 900px)",
        },
        (mq) => {
          const { motion, compact } = mq.conditions;
          // Mouvement réduit : layout statique géré en CSS, aucune animation
          if (!motion) return;

          let cancelled = false;
          let teardown = () => {};
          let resizeTimer;
          let lastWidth = root.clientWidth;

          const build = () => {
            const splits = [];

            const ctx = gsap.context(() => {
              const splitLines = (selector) =>
                q(selector).flatMap((el) => {
                  const s = new SplitText(el, {
                    type: "lines",
                    mask: "lines",
                    linesClass: "line",
                  });
                  splits.push(s);
                  return s.lines;
                });

              const linesA = splitLines(
                ".layer-a .panel-title, .layer-a .panel-text"
              );
              const linesB = splitLines(
                ".layer-b .panel-title, .layer-b .panel-text"
              );
              const countersA = q(".layer-a .counters");
              const countersB = q(".layer-b .counters");

              /* ----- États initiaux (en JS, pas en CSS : évite les conflits de transform) ----- */
              gsap.set(q(".col-2"), { xPercent: 100 });
              gsap.set(q(".col-3"), { yPercent: 100 });
              gsap.set(q(".col-4"), { yPercent: 100 });
              gsap.set(q(".media-a img"), { scale: 1.3 });
              gsap.set(q(".media-b"), { clipPath: "inset(100% 0% 0% 0%)" });
              gsap.set(q(".media-b img"), { scale: 1.5 });
              gsap.set(q(".media-c img"), { scale: 1.25 });
              gsap.set(linesA, { yPercent: 110 });
              gsap.set(linesB, { yPercent: 110 });
              gsap.set(countersA, { autoAlpha: 0, y: 12 });
              gsap.set(countersB, { autoAlpha: 0, y: 12 });

              /* ----- Timeline ----- */
              const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                  trigger: root,
                  start: "top top",
                  end: () => `+=${root.offsetHeight * (compact ? 2.6 : 3.2)}`,
                  pin: true,
                  scrub: compact ? 0.6 : 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              // PHASE 1 — intro sort, images entrent, panneau texte monte
              tl.to(q(".col-1"), { opacity: 0, scale: 0.9, duration: 1 })
                .to(q(".col-2"), { xPercent: 0, duration: 1 }, "<")
                .to(q(".media-a img"), { scale: 1, duration: 1 }, "<")
                .to(
                  q(".media-b"),
                  { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
                  "<0.15"
                )
                .to(q(".media-b img"), { scale: 1, duration: 1 }, "<")
                .to(q(".col-3"), { yPercent: 0, duration: 1 }, "<0.1")
                .to(
                  linesA,
                  { yPercent: 0, duration: 0.6, stagger: 0.08 },
                  "<0.5"
                )
                .to(countersA, { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.3");

              // Respiration
              tl.to({}, { duration: 0.4 });

              // PHASE 2 — texte 1 → texte 2, image finale entre
              tl.to(
                linesA,
                { yPercent: -110, duration: 0.6, stagger: 0.05 },
                ">"
              )
                .to(countersA, { autoAlpha: 0, y: -12, duration: 0.4 }, "<")
                .to(q(".col-4"), { yPercent: 0, duration: 1 }, "<0.1")
                .to(q(".media-c img"), { scale: 1, duration: 1 }, "<")
                .to(
                  linesB,
                  { yPercent: 0, duration: 0.6, stagger: 0.08 },
                  "<0.5"
                )
                .to(countersB, { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.3");

              // Temps de lecture avant de libérer le scroll
              tl.to({}, { duration: 0.5 });

              root.classList.add("is-ready");
            }, root);

            // Le trigger est créé après fonts.ready : on remet tous les triggers
            // de la page dans l'ordre avant de recalculer les positions
            ScrollTrigger.sort();
            ScrollTrigger.refresh();

            return () => {
              root.classList.remove("is-ready");
              splits.forEach((s) => s.revert());
              ctx.revert();
            };
          };

          // Les retours à la ligne dépendent de la police → on attend les fonts
          const fontsReady = document.fonts?.ready ?? Promise.resolve();
          fontsReady.then(() => {
            if (!cancelled) teardown = build();
          });

          // Rebuild seulement si la LARGEUR change (pas la hauteur : barre d'URL mobile)
          const ro = new ResizeObserver(() => {
            const w = root.clientWidth;
            if (w === lastWidth) return;
            lastWidth = w;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              if (cancelled) return;
              teardown();
              teardown = build();
            }, 200);
          });
          ro.observe(root);

          return () => {
            cancelled = true;
            clearTimeout(resizeTimer);
            ro.disconnect();
            teardown();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="sticky-cols">
      <div className="sticky-cols-wrapper">
        {/* COL 1 — intro plein écran */}
        <div className="col col-1">
          <Panel slide={SLIDES[0]} current={1} />
        </div>

        {/* COL 2 — images (superposées, la 2e se révèle) */}
        <div className="col col-2">
          <div className="media media-a">
            <img src={colimg1} alt="Capsule intérieur" />
          </div>
          <div className="media media-b">
            <img src={colimg2} alt="Capsule détail" />
          </div>
        </div>

        {/* COL 3 — panneau texte (moitié droite/gauche desktop, bas sur mobile) */}
        <div className="col col-3 theme-light">
          <div className="text-layer layer-a">
            <Panel slide={SLIDES[0]} current={1} />
          </div>
          <div className="text-layer layer-b">
            <Panel slide={SLIDES[1]} current={2} />
          </div>
        </div>

        {/* COL 4 — image finale */}
        <div className="col col-4">
          <div className="media media-c">
            <img src={colimg1} alt="Capsule extérieur" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyCols;
