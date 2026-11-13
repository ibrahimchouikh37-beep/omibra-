import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HiMenu, HiX } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", type: "route" },
    { label: "About", href: "/about", type: "route" },
    { label: "Collections", href: "/collections", type: "route" },
    { label: "Products", href: "/products", type: "route" },
    { label: "Services", href: "/services", type: "route" },
    { label: "Contact", href: "/contact", type: "route" },
  ];

  // Effet de scroll : navbar devient opaque
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animation GSAP d'apparition
  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
      });
    },
    { scope: navRef }
  );

  // Menu mobile : animation GSAP
  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (menuOpen) {
        gsap.to(menuRef.current, {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.from(".nav-mobile-item", {
          x: 30,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4,
          delay: 0.1,
          ease: "power3.out",
        });
      } else {
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  // Empêche le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Ferme le menu quand on change de route
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-5 md:px-8 py-4 transition-colors duration-300 ${
          scrolled ? "bg-[#181717]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Logo / brand */}
        <Link
          to="/"
          className="text-[#f4efe7] font-bold text-lg md:text-xl tracking-tight"
        >
          Capsules<span className="text-[#b1a696]">®</span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`text-sm lg:text-base transition-colors ${
                    isActive
                      ? "text-[#b1a696] font-medium"
                      : "text-[#f4efe7] hover:text-[#b1a696]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + burger mobile */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-block border border-[#f4efe7] text-[#f4efe7] text-sm px-4 py-1.5 rounded-full hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
          >
            Reserve
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-[#f4efe7] text-2xl p-1"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Menu mobile plein écran */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-dvh bg-[#181717] z-[99] flex flex-col justify-center items-center gap-6 px-6 translate-x-full md:hidden"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className={`nav-mobile-item text-2xl font-medium transition-colors ${
                isActive
                  ? "text-[#b1a696]"
                  : "text-[#f4efe7] hover:text-[#b1a696]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className="nav-mobile-item mt-4 border border-[#f4efe7] text-[#f4efe7] px-6 py-2 rounded-full hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
        >
          Reserve
        </Link>
      </div>
    </>
  );
};

export default Navbar;