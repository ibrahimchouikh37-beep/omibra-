import Hero from "../../components/Hero/Hero";
import Welcome from "../../components/Welcome/Welcome";
import Choose from "../../components/Choose/Choose";
import Products from "../../components/Products/Products";
import Gallery from "../../components/Gallery/Gallery";
import MapLink from "../../components/MapLink/MapLink";
import MarqueeSticky from "../../components/Layouts/MarqueeSticky";
import StickyCols from "../../components/StickyCols/StickyCols";
import Activities from "../../components/Activities/Activities";
import Showcase from "../../components/Showcase/Showcase";
import Feedback from "../../components/Feedback/Feedback";
import FooterBanner from "../../components/FooterBanner/FooterBanner";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Welcome />
      <Products />
      <Choose />
      <Gallery />
      <MapLink />

      <MarqueeSticky />

      {/* ⬇️ Spacer : laisse MarqueeSticky finir son animation */}
      <div className="h-[30vh]" aria-hidden="true" />

      <StickyCols />

      <Activities />
      <Showcase />
      <Feedback />
      <FooterBanner />
    </div>
  );
};

export default Home;