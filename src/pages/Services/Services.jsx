import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MdArrowOutward,
  MdOutlineLocalShipping,
  MdOutlineCardGiftcard,
  MdOutlineAutorenew,
  MdOutlineSpa,
  MdOutlineVerified,
  MdOutlineSupportAgent,
} from "react-icons/md";

import serviceImg1 from "../../assets/background1.png";
import serviceImg2 from "../../assets/background2.png";
import serviceImg3 from "../../assets/background3.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Services = () => {
  const sectionRef = useRef(null);

  // Services principaux
  const services = [
    {
      number: "01",
      title: "Conseil personnalisé",
      description:
        "Notre équipe vous accompagne pour trouver la fragrance qui révèle votre personnalité. Un diagnostic olfactif gratuit, en ligne ou en boutique.",
      image: serviceImg1,
      features: ["Diagnostic gratuit", "Conseil expert", "Sur rendez-vous"],
    },
    {
      number: "02",
      title: "Coffrets & échantillons",
      description:
        "Découvrez nos créations signature grâce à nos coffrets découverte. Chaque commande inclut deux échantillons offerts.",
      image: serviceImg2,
      features: ["3 échantillons", "Emballage cadeau", "Livraison offerte"],
    },
    {
      number: "03",
      title: "Recharges éco-responsables",
      description:
        "Prolongez l'expérience Omibra® tout en réduisant votre impact. Rechargez votre flacon avec nos formules concentrées.",
      image: serviceImg3,
      features: ["Flacon réutilisable", "Formule concentrée", "-30% de plastique"],
    },
  ];

  // Process en 4 étapes
  const steps = [
    {
      number: "01",
      title: "Choisissez votre parfum",
      description:
        "Parcourez nos trois créations signature et trouvez celle qui vous ressemble.",
    },
    {
      number: "02",
      title: "Commandez en ligne",
      description:
        "Ajoutez votre fragrance au panier et finalisez votre commande en moins de 2 minutes.",
    },
    {
      number: "03",
      title: "Recevez votre coffret",
      description:
        "Livraison soignée sous 2 à 5 jours, avec deux échantillons offerts dans chaque commande.",
    },
    {
      number: "04",
      title: "Vivez l'expérience",
      description:
        "Laissez le parfum évoluer sur votre peau et révéler votre signature tout au long de la journée.",
    },
  ];

  // Features / engagements
  const features = [
    {
      icon: MdOutlineLocalShipping,
      title: "Livraison offerte",
      description: "Dès 80 € d'achat, en France métropolitaine.",
    },
    {
      icon: MdOutlineCardGiftcard,
      title: "Emballage cadeau",
      description: "Offert sur demande, dans un écrin signature.",
    },
    {
      icon: MdOutlineAutorenew,
      title: "Retours 14 jours",
      description: "Satisfait ou remboursé, flacon non ouvert.",
    },
    {
      icon: MdOutlineSpa,
      title: "Ingrédients naturels",
      description: "Matières premières tracées et vegan.",
    },
    {
      icon: MdOutlineVerified,
      title: "Élaboré en France",
      description: "Savoir-faire de la haute parfumerie.",
    },
    {
      icon: MdOutlineSupportAgent,
      title: "Service client",
      description: "Réponse sous 24h, du lundi au samedi.",
    },
  ];

  // Témoignages rapides
  const testimonials = [
    {
      quote:
        "Le sillage le plus élégant que j'aie porté. Chaque détail est pensé — du flacon à la tenue du parfum.",
      author: "Marcus S.",
      location: "New York",
    },
    {
      quote:
        "Omibra® a redéfini ce que le luxe signifie pour moi. Moins, mais mieux — exactement ce qu'il me fallait.",
      author: "Lena M.",
      location: "Los Angeles",
    },
  ];

  // Animations
  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Hero
      gsap.from(q(".services-hero > *"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Services cards
      gsap.from(q(".service-card"), {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".services-grid")[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Steps
      gsap.from(q(".step-card"), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".steps-grid")[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Features
      gsap.from(q(".feature-card"), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".features-grid")[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax sur les images services
      q(".service-img").forEach((img) => {
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
        <div className="services-hero max-w-5xl">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">
            Services
          </p>
          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            Tout est
            <br />
            pensé pour vous.
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Du choix de votre fragrance à la réception de votre coffret, notre
            équipe soigne chaque détail — pour que vous puissiez vous concentrer
            sur l'essentiel : vous, et votre parfum.
          </p>
        </div>
      </section>

      {/* ============ SERVICES PRINCIPAUX ============ */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Ce que nous proposons
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Trois façons de vivre l'expérience Omibra®.
          </h2>
        </div>

        <div className="services-grid flex flex-col gap-6 md:gap-10">
          {services.map((service, index) => (
            <article
              key={service.number}
              className="service-card group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center"
            >
              {/* Image — alternance gauche/droite */}
              <div
                className={`relative w-full h-[40vh] md:h-[55vh] overflow-hidden rounded-2xl md:rounded-3xl ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-img w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181717]/50 via-transparent to-transparent" />
              </div>

              {/* Contenu */}
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="text-[#b1a696] text-xs font-bold tracking-widest">
                  {service.number}
                </span>
                <h3 className="text-[#f4efe7] text-2xl sm:text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
                  {service.title}
                </h3>
                <p className="text-[#b1a696] text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[#b1a696] text-xs md:text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f4efe7]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PROCESS EN 4 ÉTAPES ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Comment ça marche
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            De la commande à
            <br />
            la découverte — en 4 étapes.
          </h2>
        </div>

        <div className="steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-card p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#2a2725]/50 border border-[#b1a696]/10"
            >
              <span className="text-[#b1a696] text-xs font-bold tracking-widest">
                {step.number}
              </span>
              <h3 className="text-[#f4efe7] text-lg md:text-xl font-bold mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-[#b1a696] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Inclus
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Chaque commande inclut
            <br />
            ces engagements.
          </h2>
        </div>

        <div className="features-grid grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[#2a2725]/50 border border-[#b1a696]/10 hover:border-[#b1a696]/30 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#b1a696]/30 text-[#f4efe7] mb-4">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-[#f4efe7] text-sm md:text-base font-bold mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#b1a696] text-[0.7rem] md:text-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ TÉMOIGNAGES ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            Ce que disent nos clients
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Paroles d'amateurs de parfum.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#2a2725]/50 border border-[#b1a696]/10"
            >
              <p className="text-[#f4efe7] text-base md:text-lg leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4efe7]/10 flex items-center justify-center text-[#f4efe7] text-sm font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[#f4efe7] text-sm font-medium">
                    {t.author}
                  </p>
                  <p className="text-[#b1a696] text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Prêt à vivre
          <br />
          l'expérience Omibra® ?
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Découvrez nos parfums ou contactez-nous pour un conseil personnalisé.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
          >
            Voir les parfums
            <MdArrowOutward className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#f4efe7] text-[#181717] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#b1a696] transition-colors"
          >
            Nous contacter
            <MdArrowOutward className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;