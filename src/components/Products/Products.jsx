import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { MdArrowOutward } from "react-icons/md";

import product1 from "../../assets/background1.png";
import product2 from "../../assets/background2.png";
import product3 from "../../assets/background3.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Products = () => {
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const products = [
    {
      id: "classic",
      name: "Classic Capsule®",
      tag: "Refined",
      image: product1,
      description:
        "Refined aesthetics and a modern interior, creating an intimate retreat in a desert landscape.",
      price: "From $340 / night",
    },
    {
      id: "terrace",
      name: "Terrace Capsule®",
      tag: "Panoramic",
      image: product2,
      description:
        "Spacious terrace overlooking the desert dunes. Wake up to the sunrise from your private deck.",
      price: "From $420 / night",
    },
    {
      id: "desert",
      name: "Desert Capsule®",
      tag: "Isolated",
      image: product3,
      description:
        "The most secluded capsule, built for total immersion in the silence and beauty of the desert.",
      price: "From $510 / night",
    },
  ];

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const cards = q(".product-card");
      if (!cards.length) return;

      // Animation d'apparition des cards
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax subtile sur les images
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
    <section
      ref={sectionRef}
      className="products-section w-full min-h-dvh px-5 md:px-8 py-16 md:py-24 bg-[#181717]"
    >
      {/* Header */}
      <div className="w-full mb-10 md:mb-16">
        <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
          Available Capsules
        </p>
        <h2 className="text-[#f4efe7] text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[0.95] font-medium tracking-tighter">
          Choose the one
          <br />
          you like best
        </h2>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, index) => (
          <article
            key={product.id}
            className="product-card group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#2a2725] cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="product-img w-full h-full object-cover will-change-transform"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/90 via-[#181717]/20 to-transparent" />

              {/* Numéro en haut à gauche */}
              <div className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-xs font-bold backdrop-blur-sm bg-[#181717]/30">
                0{index + 1}
              </div>

              {/* Tag en haut à droite */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-[#f4efe7]/40 text-[#f4efe7] text-[0.65rem] backdrop-blur-sm bg-[#181717]/30">
                {product.tag}
              </div>

              {/* Contenu en bas */}
              <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                <h3 className="text-[#f4efe7] text-xl md:text-2xl font-bold mb-1">
                  {product.name}
                </h3>
                <p className="text-[#b1a696] text-[0.7rem] md:text-[0.8rem] leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[#f4efe7] text-xs md:text-sm font-medium">
                    {product.price}
                  </span>

                  <button
                    className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f4efe7] text-[#181717] hover:scale-110 transition-transform"
                    aria-label={`Discover ${product.name}`}
                  >
                    <MdArrowOutward className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hover effect : bordure qui brille */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-transparent group-hover:border-[#f4efe7]/30 transition-colors pointer-events-none" />
          </article>
        ))}
      </div>

      {/* CTA fin de section */}
      <div className="w-full mt-12 md:mt-20 flex justify-center">
        <a
          href="#reserve"
          className="inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Reserve your capsule
          <MdArrowOutward className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default Products;