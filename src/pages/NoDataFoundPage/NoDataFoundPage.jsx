import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";

const NoDataFoundPage = () => {
  useEffect(() => {
      document.title = `No data found | ScholarLink`;
      window.scroll(0, 0)
      return () => {
        document.title = "ScholarLink";
      };
    }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-center px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">😕 Add data first!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          We couldn’t find the information you’re looking for.
        </p>
        <Link to="/">
          <button className="flex btn items-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
            <FaArrowLeft /> Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoDataFoundPage;
