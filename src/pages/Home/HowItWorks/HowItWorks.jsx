import React from "react";
import { FaBookOpen, FaRegFileAlt, FaCreditCard, FaGraduationCap } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Scholarships",
      desc: "Explore a wide range of scholarships from top universities worldwide.",
      icon: <FaBookOpen className="w-10 h-10 text-primary" />,
    },
    {
      id: 2,
      title: "Submit Application",
      desc: "Fill out your details and submit an application in just a few clicks.",
      icon: <FaRegFileAlt className="w-10 h-10 text-primary" />,
    },
    {
      id: 3,
      title: "Secure Payment",
      desc: "Pay securely through Stripe and confirm your scholarship application.",
      icon: <FaCreditCard className="w-10 h-10 text-primary" />,
    },
    {
      id: 4,
      title: "Achieve Success",
      desc: "Get closer to your dream by securing scholarships with ease.",
      icon: <FaGraduationCap className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <section className="px-4 py-16 mx-auto max-w-7xl md:px-8 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It <span className="text-primary">Works</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Applying for scholarships has never been this easy. Follow these simple steps and start your journey with Scholar Link.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-emerald-50 rounded-full">{step.icon}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
