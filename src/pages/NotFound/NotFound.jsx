import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="w-full min-h-dvh bg-[#181717] flex flex-col justify-center items-center px-5 md:px-8 text-center">
      <p className="text-[.7rem] font-bold text-[#eae5dd] mb-4">404</p>
      <h1 className="text-[#f4efe7] text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.95] font-medium tracking-tighter">
        Page not found
      </h1>
      <p className="mt-6 text-[#b1a696] max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-[#f4efe7] text-[#f4efe7] px-6 py-2.5 rounded-full text-sm hover:bg-[#f4efe7] hover:text-[#181717] transition-colors"
      >
        <MdArrowBack className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;