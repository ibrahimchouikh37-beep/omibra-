import { useState } from "react";
import ClickIndicator from "./ClickIndicator";

const MapLink = () => {
  const [active, setActive] = useState(false);

  return (
    <section className="w-screen min-h-[90dvh] bg-[#181717] flex flex-col justify-center items-center text-center px-6">
      <div>
        <p className="text-[0.7rem] font-bold text-[#a79c8d] choose-subtitle">
          Closer than you think
        </p>

        <h1 className="text-[8vw] sm:text-[6vw] md:text-[5vw] leading-tight tracking-tight mt-5 text-[#f4efe7]">
          Our Capsules® are located
          <br />
          near Los Angeles with easy
        </h1>
      </div>

      <ClickIndicator active={active} />

      <a
        href="#"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={(e) => {
          // Sur mobile : toggle au tap
          if (window.matchMedia("(hover: none)").matches) {
            e.preventDefault();
            setActive((v) => !v);
          }
        }}
        className="text-[#b1a696] text-[8vw] sm:text-[6vw] md:text-[5vw] underline hover:text-[#f4efe7] mt-2"
      >
        access by road.
      </a>
    </section>
  );
};

export default MapLink;