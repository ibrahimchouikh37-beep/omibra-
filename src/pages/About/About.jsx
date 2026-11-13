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
      title: "Sustainable",
      description:
        "Each capsule is built with eco-friendly materials and designed to minimize its footprint in the desert.",
    },
    {
      number: "02",
      title: "Nature—Care",
      description:
        "We work hand in hand with local communities and conservation programs to protect the Californian desert.",
    },
    {
      number: "03",
      title: "Smart",
      description:
        "Solar power, water recycling, and smart climate systems — luxury that respects the environment.",
    },
    {
      number: "04",
      title: "Privacy",
      description:
        "Every capsule is positioned to offer total isolation. No neighbors, no noise — just you and the desert.",
    },
  ];

  // Chiffres clés
  const stats = [
    { value: "3", label: "Unique capsules" },
    { value: "12k+", label: "Guests hosted" },
    { value: "100%", label: "Solar powered" },
    { value: "4.9", label: "Guest rating" },
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
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">About</p>

          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            A new way to
            <br />
            experience the
            <br />
            desert.
          </h1>

          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Capsules® was born from a simple idea: what if luxury could be
            silent, sustainable, and completely in tune with nature? Our
            capsules are a tribute to the Californian desert — its light, its
            silence, its timeless beauty.
          </p>
        </div>
      </section>

      {/* ============ IMAGE FULL WIDTH ============ */}
      <section className="w-full px-5 md:px-8 py-8 md:py-16">
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={aboutImg1}
            alt="Capsules in the desert"
            className="about-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 max-w-md">
            <p className="text-[#f4efe7] text-lg md:text-2xl font-medium leading-snug">
              "The desert doesn't need us. We need the desert."
            </p>
            <p className="text-[#b1a696] text-[0.7rem] md:text-xs mt-2">
              — Capsules® Philosophy
            </p>
          </div>
        </div>
      </section>

      {/* ============ NOTRE HISTOIRE ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-16">
          <div className="md:w-1/3">
            <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
              Our story
            </p>
            <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight">
              Built with
              <br />
              intention.
            </h2>
          </div>

          <div className="md:w-2/3 md:pr-16">
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-4">
              The idea for Capsules® started in 2022, when a small team of
              architects, designers, and nature lovers spent a month living in
              the Mojave desert. We wanted to create a place where people could
              disconnect — truly — without sacrificing comfort or design.
            </p>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-4">
              Each capsule is handcrafted, positioned to offer total privacy,
              and built with materials that respect the environment. No
              concrete, no noise, no crowd — just you, the dunes, and the sky.
            </p>
            <p className="text-[#b1a696] text-sm md:text-base leading-relaxed">
              Today, Capsules® welcomes guests from all over the world, but our
              philosophy remains the same:{" "}
              <span className="text-[#f4efe7]">
                less, but better. Slower, but deeper.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ============ VALEURS ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Our values
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Four principles guide everything we do.
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
              alt="Inside a Capsule"
              className="about-img w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src={aboutImg3}
              alt="Desert view from Capsule"
              className="about-img w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Ready to experience
          <br />
          the desert differently?
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Discover our capsules and find your perfect retreat.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Discover our capsules
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default About;