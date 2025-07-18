import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ComingSoonPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-emerald-50 text-center px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">🍳 Cooking in Progress...</h1>
        <p className="text-gray-600 mb-8 text-lg">
          This page is currently under development. Please check back later!
        </p>
        <Link to="/">
          <button className="flex items-center gap-2 btn bg-primary text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
            <FaArrowLeft /> Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonPage;
