import { Outlet } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "../components/Navbar/Navbar";
import PreloaderII from "../components/Preloader/PreloaderII";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";
import FooterTitle from "../components/Footer/FooterTitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MainLayout = () => {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      // Attendre que tout soit chargé AVANT de refresh
      const handleLoad = () => {
        // Délai pour laisser le Preloader finir
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
      }

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    },
    { scope: wrapperRef, revertOnUpdate: true }
  );

  return (
    <>
      <PreloaderII />
      <Logo />
      <Navbar />

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content">
          <main>
            <Outlet />
            <Footer />
            <FooterTitle />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;