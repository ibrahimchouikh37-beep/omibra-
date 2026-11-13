import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { feedbackH1LG, feedbackReviewLG } from "../../constants/feedback";

import review1 from "../../assets/review1.png";
import review2 from "../../assets/review2.png";
import review3 from "../../assets/review3.png";

const reviewImages = {
  review1,
  review2,
  review3,
};

const Feedback = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const total = feedbackH1LG.length;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const progressWidth = feedbackReviewLG[index][3];

  return (
    <section className="w-full min-h-dvh p-6 md:p-8 flex flex-col justify-center items-center">
      <div className="w-full text-left">
        <p className="text-[.7rem] font-bold text-[#eae5dd] activities-subtitle text-left">
          Nos clients en parlent
        </p>

        <div className="mt-4 mb-6">
          <h1 className="text-[#f4efe7] text-[1.8rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl leading-[1.1] md:leading-[1.15]">
            {feedbackH1LG[index].map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4 mt-8 md:mt-12">
          <img
            src={reviewImages[feedbackReviewLG[index][2]]}
            alt="review img"
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-full md:rounded-4xl"
          />
          <p className="text-[#aca192] text-[0.65rem] md:text-[0.7rem]">
            {feedbackReviewLG[index][0]}
            <br />({feedbackReviewLG[index][1]})
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 mt-10 md:mt-14">
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              aria-label="Avis précédent"
              className="border-[1px] p-2 border-[#aaa090] hover:bg-[#aaa090] rounded-full transition-colors"
            >
              <IoMdArrowBack className="text-[#f1ece4] w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Avis suivant"
              className="border-[1px] p-2 border-[#aaa090] hover:bg-[#aaa090] rounded-full transition-colors"
            >
              <IoMdArrowForward className="text-[#f1ece4] w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="relative w-full md:w-72 h-[0.1rem] bg-[#4f4b48]">
            <div
              className="progress-line absolute bg-[#f4efe7] h-[0.1rem] top-1/2 -translate-y-1/2 left-0 transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;