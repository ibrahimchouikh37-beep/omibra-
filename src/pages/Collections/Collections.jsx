import { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

import col1 from "../../assets/background1.png";
import col2 from "../../assets/background2.png";
import col3 from "../../assets/background3.png";
import col4 from "../../assets/cap1-square.jpg";
import col5 from "../../assets/cap2-square.jpg";
import col6 from "../../assets/cap3-square.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Collections = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // 6 collections
  const collections = [
    {
      id: "ambre",
      name: "Ambre Omibra®",
      category: "ambre",
      tag: "Boisé",
      image: col1,
      description:
        "Un sillage chaleureux d'ambre et de bois précieux, enveloppant et intemporel.",
      items: 1,
      year: "2022",
    },
    {
      id: "floral",
      name: "Floral Omibra®",
      category: "floral",
      tag: "Floral",
      image: col2,
      description:
        "Un bouquet délicat de fleurs blanches et de musc, lumineux et profondément féminin.",
      items: 1,
      year: "2023",
    },
    {
      id: "oud",
      name: "Oud Omibra®",
      category: "oud",
      tag: "Oriental",
      image: col3,
      description:
        "Une signature intense d'oud et d'épices rares, pour une présence magnétique et mystérieuse.",
      items: 1,
      year: "2023",
    },
    {
      id: "coffret",
      name: "Coffret Découverte",
      category: "coffret",
      tag: "Coffret",
      image: col4,
      description:
        "Trois échantillons de nos créations signature, pour trouver votre parfum.",
      items: 3,
      year: "2024",
    },
    {
      id: "recharge",
      name: "Recharge Omibra®",
      category: "recharge",
      tag: "Éco-responsable",
      image: col5,
      description:
        "Rechargez votre flacon avec nos formules concentrées, dans un geste respectueux de l'environnement.",
      items: 3,
      year: "2024",
    },
    {
      id: "bougie",
      name: "Bougies parfumées",
      category: "bougie",
      tag: "Maison",
      image: col6,
      description:
        "Prolongez l'expérience Omibra® chez vous avec nos bougies aux notes signature.",
      items: 4,
      year: "2025",
    },
  ];

  const filters = [
    { key: "all", label: "Tout" },
    { key: "ambre", label: "Ambre" },
    { key: "floral", label: "Floral" },
    { key: "oud", label: "Oud" },
    { key: "coffret", label: "Coffrets" },
    { key: "recharge", label: "Recharges" },
    { key: "bougie", label: "Bougies" },
  ];

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? collections
        : collections.filter((c) => c.category === activeFilter),
    [activeFilter, collections]
  );

  // Animations
  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Hero
      gsap.from(q(".coll-hero > *"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Cards
      gsap.from(q(".coll-card"), {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".coll-grid")[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax sur les images
      q(".coll-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
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
      <section className="w-full min-h-[70vh] md:min-h-dvh flex flex-col justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="coll-hero max-w-5xl">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">
            Collections
          </p>
          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            Nos
            <br />
            Collections
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Explorez nos collections — des fragrances signature aux coffrets
            découverte, en passant par les recharges éco-responsables et les
            bougies parfumées. Chaque création est un chapitre de l'histoire
            Omibra®.
          </p>
        </div>
      </section>

      {/* ============ FILTRES ============ */}
      <section className="w-full px-5 md:px-8 pb-8 md:pb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm border transition-colors ${
                activeFilter === filter.key
                  ? "bg-[#f4efe7] text-[#181717] border-[#f4efe7]"
                  : "bg-transparent text-[#b1a696] border-[#b1a696] hover:border-[#f4efe7] hover:text-[#f4efe7]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* ============ GRILLE ============ */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="coll-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((collection, index) => (
            <article
              key={collection.id}
              className="coll-card group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#2a2725] cursor-pointer"
            >
              <div className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="coll-img w-full h-full object-cover will-change-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/95 via-[#181717]/30 to-transparent" />

                {/* Numéro + année */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-xs font-bold backdrop-blur-sm bg-[#181717]/30">
                    0{index + 1}
                  </div>
                  <div className="px-3 py-1 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-[0.65rem] backdrop-blur-sm bg-[#181717]/30">
                    {collection.year}
                  </div>
                </div>

                {/* Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-[0.65rem] backdrop-blur-sm bg-[#181717]/30">
                  {collection.tag}
                </div>

                {/* Contenu bas */}
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                  <h3 className="text-[#f4efe7] text-xl md:text-2xl font-bold mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-[#b1a696] text-[0.7rem] md:text-[0.8rem] leading-relaxed mb-4">
                    {collection.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[#b1a696] text-[0.65rem] md:text-[0.7rem]">
                      {collection.items}{" "}
                      {collection.items > 1 ? "articles" : "article"}
                    </span>

                    <Link
                      to={`/products`}
                      aria-label={`Explorer ${collection.name}`}
                      className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f4efe7] text-[#181717] hover:scale-110 transition-transform"
                    >
                      <MdArrowOutward className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-transparent group-hover:border-[#f4efe7]/30 transition-colors pointer-events-none" />
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#b1a696] text-lg">
              Aucune collection dans cette catégorie.
            </p>
          </div>
        )}
      </section>

      {/* ============ FEATURED ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={col1}
            alt="Collection signature Omibra"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181717]/95 via-[#181717]/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 max-w-xl">
            <span className="text-[0.7rem] font-bold text-[#eae5dd] mb-3">
              Collection signature
            </span>
            <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[0.95] font-medium tracking-tight mb-4">
              Ambre
              <br />
              Omibra®
            </h2>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Là où tout a commencé. Un sillage chaleureux d'ambre et de bois
              précieux — enveloppant, discret et inoubliable.
            </p>
            <Link
              to="/products"
              className="self-start inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 py-2.5 rounded-full text-sm hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
            >
              Découvrir
              <MdArrowOutward className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Explorez toutes
          <br />
          nos collections.
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Chaque parfum, chaque détail, chaque coffret — pensé avec intention.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Voir nos parfums
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default Collections;