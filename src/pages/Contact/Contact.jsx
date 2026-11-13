import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MdArrowOutward,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdCheckCircle,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contact = () => {
  const sectionRef = useRef(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "information",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Coordonnées
  const contactInfo = [
    {
      icon: MdEmail,
      label: "Email",
      value: "hello@omibra.com",
      href: "mailto:hello@omibra.com",
    },
    {
      icon: MdPhone,
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: MdLocationOn,
      label: "Adresse",
      value: "Paris, France",
      href: null,
    },
    {
      icon: MdAccessTime,
      label: "Horaires",
      value: "Lun–Sam · 10h–19h",
      href: null,
    },
  ];

  // FAQ
  const faqs = [
    {
      q: "Comment choisir mon parfum ?",
      a: "Parcourez nos créations sur la page Parfums ou commandez un coffret découverte pour tester nos trois signatures. Notre équipe peut aussi vous conseiller par email ou téléphone.",
    },
    {
      q: "Puis-je retourner un parfum ?",
      a: "Oui, vous disposez de 14 jours après réception pour retourner un flacon non ouvert et non utilisé, dans son emballage d'origine. Les frais de retour sont à votre charge.",
    },
    {
      q: "Livrez-vous à l'international ?",
      a: "Oui, nous livrons dans toute l'Europe et à l'international. Les délais et frais varient selon la destination, calculés au moment de la commande.",
    },
    {
      q: "Vos parfums sont-ils vegan et cruelty-free ?",
      a: "Toutes nos créations sont vegan, non testées sur les animaux, et composées d'ingrédients naturels tracés. Nous sommes engagés dans une parfumerie responsable.",
    },
    {
      q: "Proposez-vous des échantillons ?",
      a: "Oui, chaque commande inclut deux échantillons offerts. Vous pouvez également commander un coffret découverte de nos trois créations signature.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  // Gestion du formulaire
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux envoyer à une API, mailto, etc.
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "information",
      message: "",
    });
  };

  // Animations
  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // Hero
      gsap.from(q(".contact-hero > *"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Contact info cards
      gsap.from(q(".info-card"), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".info-grid")[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Form
      gsap.from(q(".form-field"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".contact-form")[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // FAQ
      gsap.from(q(".faq-item"), {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".faq-list")[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
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
      <section className="w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="contact-hero max-w-5xl">
          <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">
            Contact
          </p>
          <h1 className="text-[#f4efe7] text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.95] font-medium tracking-tighter">
            Prenons
            <br />
            contact.
          </h1>
          <p className="mt-6 md:mt-8 text-[#b1a696] text-sm md:text-base max-w-2xl leading-relaxed">
            Une question sur une fragrance, une commande personnalisée ou un
            partenariat ? Écrivez-nous — nous répondons sous 24 heures.
          </p>
        </div>
      </section>

      {/* ============ INFOS + FORMULAIRE ============ */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Infos gauche (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-[.7rem] font-bold text-[#eae5dd] mb-6">
              Coordonnées
            </p>

            <div className="info-grid flex flex-col gap-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const content = (
                  <>
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#b1a696]/30 text-[#f4efe7] shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[#b1a696] text-[0.65rem] md:text-xs mb-1">
                        {info.label}
                      </p>
                      <p className="text-[#f4efe7] text-sm md:text-base font-medium">
                        {info.value}
                      </p>
                    </div>
                  </>
                );

                return info.href ? (
                  <a
                    key={info.label}
                    href={info.href}
                    className="info-card flex items-center gap-4 p-4 rounded-2xl bg-[#2a2725]/50 border border-[#b1a696]/10 hover:border-[#b1a696]/30 transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={info.label}
                    className="info-card flex items-center gap-4 p-4 rounded-2xl bg-[#2a2725]/50 border border-[#b1a696]/10"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">
                Suivez-nous
              </p>
              <div className="flex gap-2">
                {["Instagram", "Behance", "LinkedIn", "Dribbble"].map(
                  (network) => (
                    <a
                      key={network}
                      href="#"
                      className="px-4 py-2 rounded-full border border-[#b1a696]/30 text-[#b1a696] text-xs hover:border-[#f4efe7] hover:text-[#f4efe7] transition-colors"
                    >
                      {network}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Formulaire droite (3 cols) */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="contact-form p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#2a2725]/50 border border-[#b1a696]/10"
            >
              <p className="text-[.7rem] font-bold text-[#eae5dd] mb-6">
                Envoyez-nous un message
              </p>

              {/* Nom + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="block text-[#b1a696] text-xs mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-[#181717] border border-[#b1a696]/20 text-[#f4efe7] text-sm placeholder:text-[#b1a696]/50 focus:outline-none focus:border-[#f4efe7]/50 transition-colors"
                  />
                </div>
                <div className="form-field">
                  <label className="block text-[#b1a696] text-xs mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="vous@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#181717] border border-[#b1a696]/20 text-[#f4efe7] text-sm placeholder:text-[#b1a696]/50 focus:outline-none focus:border-[#f4efe7]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Téléphone + Sujet */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="block text-[#b1a696] text-xs mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 0 00 00 00 00"
                    className="w-full px-4 py-3 rounded-xl bg-[#181717] border border-[#b1a696]/20 text-[#f4efe7] text-sm placeholder:text-[#b1a696]/50 focus:outline-none focus:border-[#f4efe7]/50 transition-colors"
                  />
                </div>
                <div className="form-field">
                  <label className="block text-[#b1a696] text-xs mb-2">
                    Sujet
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181717] border border-[#b1a696]/20 text-[#f4efe7] text-sm focus:outline-none focus:border-[#f4efe7]/50 transition-colors"
                  >
                    <option value="information">Information</option>
                    <option value="commande">Commande</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="presse">Presse</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="form-field mb-6">
                <label className="block text-[#b1a696] text-xs mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Parlez-nous de votre projet..."
                  className="w-full px-4 py-3 rounded-xl bg-[#181717] border border-[#b1a696]/20 text-[#f4efe7] text-sm placeholder:text-[#b1a696]/50 focus:outline-none focus:border-[#f4efe7]/50 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="form-field w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#f4efe7] text-[#181717] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#b1a696] transition-colors"
              >
                Envoyer le message
                <MdArrowOutward className="w-4 h-4" />
              </button>

              {/* Message de succès */}
              {submitted && (
                <div className="form-field mt-4 flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  <MdCheckCircle className="w-5 h-5 shrink-0" />
                  Merci ! Votre message a bien été envoyé.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ============ CARTE ============ */}
      <section className="w-full px-5 md:px-8 pb-16 md:pb-24">
        <div className="relative w-full h-[40vh] md:h-[55vh] rounded-2xl md:rounded-3xl overflow-hidden bg-[#2a2725]">
          {/* Placeholder carte — remplace par un iframe Google Maps si besoin */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
            <MdLocationOn className="w-10 h-10 md:w-14 md:h-14 text-[#f4efe7]" />
            <p className="text-[#f4efe7] text-lg md:text-2xl font-medium">
              Paris, France
            </p>
            <p className="text-[#b1a696] text-sm">
              48°51'24.0"N 2°21'03.0"E
            </p>
            <a
              href="https://maps.google.com/?q=Paris+France"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-5 py-2 rounded-full text-xs md:text-sm hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
            >
              Ouvrir dans Google Maps
              <MdArrowOutward className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tu peux remplacer par une vraie carte : */}
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=..."
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          /> */}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 md:mb-14">
            <p className="text-[.7rem] font-bold text-[#eae5dd] mb-3">FAQ</p>
            <h2 className="text-[#f4efe7] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-medium tracking-tight">
              Questions fréquentes.
            </h2>
          </div>

          <div className="faq-list flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="faq-item rounded-2xl bg-[#2a2725]/50 border border-[#b1a696]/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  >
                    <span className="text-[#f4efe7] text-sm md:text-base font-medium">
                      {faq.q}
                    </span>
                    <span
                      className={`text-[#f4efe7] text-xl transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-[#b1a696] text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="w-full px-5 md:px-8 py-16 md:py-32 flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#f4efe7] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] font-medium tracking-tight max-w-4xl">
          Ou simplement
          <br />
          commandez en ligne.
        </h2>
        <p className="mt-2 text-[#b1a696] text-sm md:text-base max-w-xl">
          Choisissez votre fragrance et commandez en moins de 2 minutes.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 bg-[#f4efe7] text-[#181717] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base hover:bg-[#b1a696] transition-colors"
        >
          Voir les parfums
          <MdArrowOutward className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default Contact;