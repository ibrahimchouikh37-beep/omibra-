import { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

// ⚠️ Deux niveaux en arrière car Products.jsx est dans src/pages/Products/
import product1 from "../../assets/omi03.jpg";
import product2 from "../../assets/omi04.jpg";
import product3 from "../../assets/omi05.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Products = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const products = [
    {
      id: "ambre",
      name: "Ambre Omibra®",
      tag: "Boisé",
      category: "ambre",
      image: product1,
      description:
        "Un sillage chaleureux d'ambre et de bois précieux, enveloppant et intemporel.",
      price: "120 €",
      capacity: "50 ml",
      size: "Eau de Parfum",
    },
    {
      id: "floral",
      name: "Floral Omibra®",
      tag: "Floral",
      category: "floral",
      image: product2,
      description:
        "Un bouquet délicat de fleurs blanches et de musc, lumineux et profondément féminin.",
      price: "135 €",
      capacity: "50 ml",
      size: "Eau de Parfum",
    },
    {
      id: "oud",
      name: "Oud Omibra®",
      tag: "Oriental",
      category: "oud",
      image: product3,
      description:
        "Une signature intense d'oud et d'épices rares, pour une présence magnétique et mystérieuse.",
      price: "160 €",
      capacity: "50 ml",
      size: "Extrait de Parfum",
    },
  ];

  const filters = [
    { key: "all", label: "Tout" },
    { key: "ambre", label: "Ambre" },
    { key: "floral", label: "Floral" },
    { key: "oud", label: "Oud" },
  ];

  const filteredProducts = useMemo(
    () =>
      activeFilter === "all"
        ? products
        : products.filter((p) => p.category === activeFilter),
    [activeFilter, products]
  );

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const cards = q(".product-card");

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cards.forEach((card) => {
        const img = card.querySelector(".product-img");
        if (!img) return;

        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
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
      {/* HERO */}
      <section className="w-full min-h-[70vh] md:min-h-dvh flex flex-col justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-5xl">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">
            Nos parfums
          </p>
          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            Choisissez
            <br />
            votre fragrance
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Trois créations uniques, chacune conçue pour révéler une facette
            différente de votre personnalité. Boisée, florale ou orientale —
            choisissez celle qui vous ressemble.
          </p>
        </div>
      </section>

      {/* Filtres */}
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

      {/* Grille */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <article
              key={product.id}
              className="product-card group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#2a2725] cursor-pointer"
            >
              <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/95 via-[#181717]/30 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-xs font-bold backdrop-blur-sm bg-[#181717]/30">
                  0{index + 1}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-[0.65rem] backdrop-blur-sm bg-[#181717]/30">
                  {product.tag}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                  <h3 className="text-[#f4efe7] text-xl md:text-2xl font-bold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#b1a696] text-[0.7rem] md:text-[0.8rem] leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 text-[0.65rem] md:text-[0.7rem] text-[#b1a696]">
                    <span>{product.capacity}</span>
                    <span className="w-1 h-1 bg-[#b1a696] rounded-full" />
                    <span>{product.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#f4efe7] text-sm md:text-base font-medium">
                        {product.price}
                      </span>
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      aria-label={`Découvrir ${product.name}`}
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
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#b1a696] text-lg">Aucun parfum dans cette catégorie.</p>
          </div>
        )}
      </section>

      {/* CTA final */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] leading-tight font-medium tracking-tight max-w-3xl">
          Vous hésitez encore ?
        </h2>
        <p className="text-[#b1a696] text-sm md:text-base max-w-xl">
          Notre équipe vous aide à trouver la fragrance qui vous correspond.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Nous contacter
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default Products;