import React from "react";
import { Link } from "react-router"; // should be react-router-dom, not react-router

const PromotionalSection = () => {
  return (
    <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
      <div className="bg-primary rounded-3xl shadow-lg text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-2/3 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Unlock Your Future with{" "}
            <span className="text-white">Scholar Link</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto lg:mx-0">
            Find scholarships worldwide, apply with ease, and take a step closer 
            to achieving your academic dreams. Your opportunity starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/all-scholarships"
              className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow hover:opacity-90 transition text-center"
            >
              Browse Scholarships
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image/Illustration */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <img
            src="https://i.ibb.co.com/WpyF6DRm/promote.jpg"
            alt="Scholarship Promotion"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionalSection;
