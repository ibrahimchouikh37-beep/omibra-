import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MdArrowOutward,
  MdOutlineWbSunny,
  MdOutlineRestaurant,
  MdOutlineDirectionsCar,
  MdOutlineSelfImprovement,
  MdOutlineSpa,
  MdOutlineCameraAlt,
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
      title: "Private stays",
      description:
        "Fully private capsules, designed for one or two guests. No neighbors, no noise — just you and the desert.",
      image: serviceImg1,
      features: ["2 guests max", "Panoramic views", "Solar powered"],
    },
    {
      number: "02",
      title: "Curated experiences",
      description:
        "Sunrise hikes, stargazing dinners, silent desert walks — each experience is designed by our team.",
      image: serviceImg2,
      features: ["Daily activities", "Local guides", "Custom programs"],
    },
    {
      number: "03",
      title: "Full concierge",
      description:
        "From airport pickup to private chef, our concierge team takes care of every detail of your stay.",
      image: serviceImg3,
      features: ["24/7 support", "Private chef", "Airport transfer"],
    },
  ];

  // Process en 4 étapes
  const steps = [
    {
      number: "01",
      title: "Choose your capsule",
      description:
        "Browse our three capsule styles and pick the one that fits your stay.",
    },
    {
      number: "02",
      title: "Book your dates",
      description:
        "Select your dates, add experiences, and confirm your reservation online.",
    },
    {
      number: "03",
      title: "Plan your stay",
      description:
        "Our concierge team contacts you to personalize every detail of your visit.",
    },
    {
      number: "04",
      title: "Arrive & disconnect",
      description:
        "We handle everything on-site. You just arrive and let the desert do the rest.",
    },
  ];

  // Features / équipements
  const features = [
    {
      icon: MdOutlineWbSunny,
      title: "Solar powered",
      description: "100% renewable energy, off the grid.",
    },
    {
      icon: MdOutlineRestaurant,
      title: "Private chef",
      description: "Locally sourced meals, on demand.",
    },
    {
      icon: MdOutlineDirectionsCar,
      title: "Airport transfer",
      description: "Pickup from LAX in a private car.",
    },
    {
      icon: MdOutlineSelfImprovement,
      title: "Wellness",
      description: "Yoga, meditation, and spa treatments.",
    },
    {
      icon: MdOutlineSpa,
      title: "Spa & massage",
      description: "In-capsule spa services on request.",
    },
    {
      icon: MdOutlineCameraAlt,
      title: "Photography",
      description: "Professional photo sessions available.",
    },
  ];

  // Témoignages rapides
  const testimonials = [
    {
      quote:
        "The most peaceful stay of my life. Every detail was perfect — from the silent mornings to the stargazing dinners.",
      author: "Marcus S.",
      location: "New York",
    },
    {
      quote:
        "Capsules® redefined what luxury means to me. Less, but better — exactly what I needed.",
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
            Everything,
            <br />
            taken care of.
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            From the moment you book to the moment you leave, our team handles
            every detail — so you can focus on what matters: the desert, the
            silence, and yourself.
          </p>
        </div>
      </section>

      {/* ============ SERVICES PRINCIPAUX ============ */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="mb-10 md:mb-16">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
            What we offer
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Three ways to experience Capsules®.
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
            How it works
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            From booking to
            <br />
            check-out — in 4 steps.
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
            Included
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Every stay comes with
            <br />
            these services.
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
            What guests say
          </p>
          <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight max-w-3xl">
            Words from the desert.
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
          Ready to be
          <br />
          taken care of?
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Book your capsule and let our team handle the rest.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
          >
            View capsules
            <MdArrowOutward className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#f4efe7] text-[#181717] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#b1a696] transition-colors"
          >
            Contact us
            <MdArrowOutward className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;