import { FaBehance, FaInstagram, FaDribbble } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

import MarqueeText from "../Marquee/MarqueeText";

const Footer = () => {
  const navLinks = [
    "Welcome",
    "Introduction",
    "Houses",
    "Why Capsules®",
    "Activites",
    "Feedback",
  ];

  const socials = [
    { Icon: FaBehance, label: "Behance" },
    { Icon: FaInstagram, label: "Instagram" },
    { Icon: CiLinkedin, label: "LinkedIn" },
    { Icon: FaDribbble, label: "Dribbble" },
  ];

  return (
    <section className="w-full min-h-dvh px-5 md:px-6 pt-10 md:mt-10 flex flex-col">
      {/* Header */}
      <p className="text-[.7rem] text-[#eae5dd] choose-subtitle">
        Interested in an amazing adventure?
        <br />
        Reserve one of our Capsules<span>®</span>
      </p>

      {/* Marquee */}
      <div className="my-8 md:my-10">
        <MarqueeText />
      </div>

      {/* Bloc texte + navigation */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-10 mt-4 md:mt-14">
        <h3 className="text-[#b1a696] text-base sm:text-lg md:text-2xl leading-relaxed max-w-xl">
          This website is just the concept
          <br />
          work done by—Moyra to showcase
          <br />
          our capabilities.
          <br />
          <br />
          If you would like to outsource a similar
          <br />
          website project—
          <a
            href="#"
            className="text-[#f4efe7] hover:text-[#c4c1b9] underline transition-colors"
          >
            {" "}
            contact us.
          </a>
        </h3>

        <div className="flex flex-col justify-start md:justify-center items-start md:items-end gap-1">
          {navLinks.map((label) => (
            <a
              key={label}
              href="#welcome"
              className="text-[#f2ede5] text-base sm:text-lg md:text-2xl hover:text-[#c4c1b9] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer bottom */}
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-6 md:gap-0 mt-10 md:mt-20 pb-8 md:pb-0">
        {/* Icônes sociales */}
        <div className="flex justify-start md:justify-center items-center gap-2 md:gap-1">
          {socials.map(({ Icon, label }) => (
            <div
              key={label}
              aria-label={label}
              className="border-[1px] border-[#c4c1b9] rounded-full p-2.5 md:p-3 text-[#f2ede5] hover:bg-[#c4c1b9]/10 transition-colors cursor-pointer"
            >
              <Icon className="text-base md:text-xl" />
            </div>
          ))}
        </div>

        {/* Mention */}
        <div>
          <p className="text-[0.75rem] md:text-[0.8rem] text-[#b1a696] text-left md:text-right leading-relaxed">
            Meet Capsules®—modern and cozy
            <br />
            houses, in the California desert.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;