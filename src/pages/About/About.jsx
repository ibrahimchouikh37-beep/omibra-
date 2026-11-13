import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

import aboutImg1 from "../../assets/background1.png";
import aboutImg2 from "../../assets/background2.png";
import aboutImg3 from "../../assets/background3.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const sectionRef = useRef(null);

  // Valeurs de la marque
  const values = [
    {
      number: "01",
      title: "Naturalité",
      description:
        "Chaque fragrance est composée à partir de matières premières naturelles, sélectionnées pour leur qualité et leur traçabilité.",
    },
    {
      number: "02",
      title: "Savoir-faire",
      description:
        "Nos parfums sont élaborés en France, dans le respect des traditions de la haute parfumerie et du geste artisanal.",
    },
    {
      number: "03",
      title: "Intensité",
      description:
        "Des concentrations élevées et des notes profondes, pour une tenue longue durée et un sillage qui se remarque.",
    },
    {
      number: "04",
      title: "Singularité",
      description:
        "Chaque création raconte une histoire unique. Aucune fragrance Omibra® ne ressemble à une autre — comme vous.",
    },
  ];

  // Chiffres clés
  const stats = [
    { value: "3", label: "Créations signature" },
    { value: "12k+", label: "Clients satisfaits" },
    { value: "100%", label: "Ingrédients naturels" },
    { value: "4.9", label: "Note moyenne" },
  ];

  // Animations
  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Hero : apparition
      gsap.from(q(".about-hero > *"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Images : parallax
      q(".about-img").forEach((img) => {
        gsap.fromTo(
          img,
          { y: 60 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Valeurs : apparition au scroll
      gsap.from(q(".value-card"), {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".values-grid")[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Chiffres : compteur animé
      q(".stat-number").forEach((el) => {
        const target = el.dataset.value;
        if (!target) return;

        // Si c'est un nombre pur, on anime
        if (!isNaN(parseFloat(target))) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: parseFloat(target),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              el.textContent = target.includes("k")
                ? `${Math.round(obj.val)}k+`
                : `${Math.round(obj.val)}`;
            },
          });
        } else {
          // Sinon on affiche direct (ex: "4.9")
          gsap.from(el, {
            opacity: 0,
            y: 20,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === root)
          .forEach((st) => st.kill());
      };
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <div ref={sectionRef} className="w-full bg-[#181717]">
      {/* ============ HERO ============ */}
      <section className="w-full min-h-[80vh] md:min-h-dvh flex flex-col justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="about-hero max-w-5xl">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">À propos</p>

          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            L'art de
            <br />
            révéler votre
            <br />
            signature.
          </h1>

          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Omibra® est née d'une idée simple : et si le luxe pouvait être
            discret, naturel et profondément personnel ? Nos parfums sont un
            hommage aux matières premières — leur lumière, leur texture, leur
            beauté intemporelle.
          </p>
        </div>
      </section>

      {/* ============ IMAGE FULL WIDTH ============ */}
      <section className="w-full px-5 md:px-8 py-8 md:py-16">
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={aboutImg1}
            alt="Omibra Parfums - univers"
            className="about-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 max-w-md">
            <p className="text-[#f4efe7] text-lg md:text-2xl font-medium leading-snug">
              « Le parfum n'a pas besoin de nous. C'est nous qui avons besoin du parfum. »
            </p>
            <p className="text-[#b1a696] text-[0.7rem] md:text-xs mt-2">
              — Philosophie Omibra®
            </p>
          </div>
        </div>
      </section>

      {/* ============ NOTRE HISTOIRE ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-16">
          <div className="md:w-1/3">
            <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
              Notre histoire
            </p>
            <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight">
              Créé avec
              <br />
              intention.
            </h2>
          </div>

          <div className="md:w-2/3 md:pr-16">
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-4">
              L'idée d'Omibra® est née en 2022, lorsqu'une petite équipe de
              parfumeurs, de designers et d'amoureux de la nature a passé un an
              à explorer les matières premières les plus rares. Nous voulions
              créer des parfums qui révèlent une personnalité — sans jamais la
              trahir.
            </p>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-4">
              Chaque fragrance est composée à la main, dosée avec précision, et
              élaborée à partir d'ingrédients qui respectent la nature. Pas de
              superflu, pas de bruit, pas de tendance — juste vous, votre peau,
              et le sillage.
            </p>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed">
              Aujourd'hui, Omibra® accompagne des clients du monde entier, mais
              notre philosophie reste la même :{" "}
              <span className="text-[#f4efe7]">
                moins, mais mieux. Plus lent, mais plus profond.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ VALEURS ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Nos valeurs
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Quatre principes guident chacune de nos créations.
          </h2>
        </div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((value) => (
            <div
              key={value.number}
              className="value-card group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#2a2725]/50 border border-[#b1a696]/10 hover:border-[#b1a696]/30 transition-colors"
            >
              <span className="text-[#b1a696] text-xs font-bold tracking-widest">
                {value.number}
              </span>
              <h3 className="text-[#f4efe7] text-xl md:text-2xl font-bold mt-3 mb-2">
                {value.title}
              </h3>
              <p className="text-[#b1a696] text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CHIFFRES ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-10 md:py-16 border-y border-[#b1a696]/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start">
              <span
                className="stat-number text-[#f4efe7] text-[2.5rem] sm:text-[3rem] md:text-[4.5rem] font-medium leading-none tracking-tight"
                data-value={stat.value}
              >
                {stat.value}
              </span>
              <span className="text-[#b1a696] text-[0.7rem] md:text-sm mt-2 md:mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 2 IMAGES SIDE BY SIDE ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={aboutImg2}
              alt="Omibra Parfums - flacon"
              className="about-img w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={aboutImg3}
              alt="Omibra Parfums - détail"
              className="about-img w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Prêt à découvrir
          <br />
          votre signature ?
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Explorez nos créations et trouvez le parfum qui vous ressemble.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Découvrir nos parfums
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default About;