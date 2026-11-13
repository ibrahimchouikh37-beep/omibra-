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
      id: "classic",
      name: "Classic Capsule®",
      category: "classic",
      tag: "Refined",
      image: col1,
      description:
        "The original capsule — refined aesthetics, modern interior, and an intimate retreat in the desert.",
      items: 1,
      year: "2022",
    },
    {
      id: "terrace",
      name: "Terrace Capsule®",
      category: "terrace",
      tag: "Panoramic",
      image: col2,
      description:
        "A spacious terrace overlooking the dunes. Wake up to the sunrise from your private deck.",
      items: 1,
      year: "2023",
    },
    {
      id: "desert",
      name: "Desert Capsule®",
      category: "desert",
      tag: "Isolated",
      image: col3,
      description:
        "The most secluded capsule, built for total immersion in the silence of the desert.",
      items: 1,
      year: "2023",
    },
    {
      id: "interior",
      name: "Interior Collection",
      category: "interior",
      tag: "Design",
      image: col4,
      description:
        "Handcrafted furniture, warm textiles, and a minimal palette inspired by the desert.",
      items: 12,
      year: "2024",
    },
    {
      id: "exterior",
      name: "Exterior Collection",
      category: "exterior",
      tag: "Architecture",
      image: col5,
      description:
        "Sculptural forms that blend into the landscape — glass, wood, and steel in dialogue.",
      items: 8,
      year: "2024",
    },
    {
      id: "experience",
      name: "Experiences",
      category: "experience",
      tag: "Immersive",
      image: col6,
      description:
        "Curated moments — sunrise hikes, stargazing dinners, and silent desert walks.",
      items: 24,
      year: "2025",
    },
  ];

  const filters = [
    { key: "all", label: "All" },
    { key: "classic", label: "Classic" },
    { key: "terrace", label: "Terrace" },
    { key: "desert", label: "Desert" },
    { key: "interior", label: "Interior" },
    { key: "exterior", label: "Exterior" },
    { key: "experience", label: "Experiences" },
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
            Our
            <br />
            Collections
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Explore our curated collections — from the architecture of our
            capsules to the experiences we design for each guest. Every
            collection is a chapter of the Capsules® story.
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
                      {collection.items > 1 ? "items" : "item"}
                    </span>

                    <Link
                      to={`/products`}
                      aria-label={`Explore ${collection.name}`}
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
            alt="Featured collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181717]/95 via-[#181717]/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 max-w-xl">
            <span className="text-[0.7rem] font-bold text-[#eae5dd] mb-3">
              Featured Collection
            </span>
            <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[0.95] font-medium tracking-tight mb-4">
              The Classic
              <br />
              Capsule®
            </h2>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Where it all started. A single capsule in the middle of the
              desert — refined, quiet, and unforgettable.
            </p>
            <Link
              to="/products"
              className="self-start inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 py-2.5 rounded-full text-sm hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
            >
              Discover
              <MdArrowOutward className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Explore all our
          <br />
          collections.
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Each capsule, each detail, each experience — curated with intention.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          View our capsules
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default Collections;