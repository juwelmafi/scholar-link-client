import React, { useEffect } from "react";
import { FeatureItem } from "./FeaturedItem";

const AboutUs = () => {

  useEffect(() => {
      document.title = `About Us | ScholarLink`;
      return () => {
        document.title = "ScholarLink";
      };
    }, []);

  return (
    <div className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-28">
      {/* Header Section */}
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-text sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-200 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="dot-pattern"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect fill="url(#dot-pattern)" width="52" height="24" />
            </svg>
            <span className="relative text-primary">Scholar Link</span>
          </span>{" "}
          – Connecting Students to Opportunities
        </h2>
        <p className="text-base text-muted md:text-lg">
          Scholar Link is a scholarship management platform dedicated to helping 
          students achieve their academic dreams by connecting them with global 
          opportunities, financial support, and resources.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid max-w-screen-lg mx-auto space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x">
        {/* Left Column */}
        <div className="space-y-6 sm:px-16">
          <FeatureItem
            title="Our Mission"
            desc="We aim to break financial barriers by providing a transparent, easy-to-use scholarship platform for students worldwide."
          />
          <FeatureItem
            title="Student Empowerment"
            desc="Every student deserves access to quality education. We empower them to apply, track, and succeed through our platform."
          />
          <FeatureItem
            title="Global Opportunities"
            desc="From local grants to international scholarships, Scholar Link brings all opportunities under one roof."
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:px-16">
          <FeatureItem
            title="Trusted Platform"
            desc="With verified listings and secure processes, students and institutions can rely on Scholar Link with confidence."
          />
          <FeatureItem
            title="Community & Reviews"
            desc="Students share experiences, reviews, and feedback, making it easier for others to choose the right scholarship."
          />
          <FeatureItem
            title="Our Vision"
            desc="To become the leading global hub for scholarships, ensuring no deserving student is left behind."
          />
        </div>
      </div>
    </div>
  );
};


export default AboutUs;
