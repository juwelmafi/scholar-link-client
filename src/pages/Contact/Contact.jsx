import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="px-4 py-20 mx-auto max-w-7xl md:px-8 lg:py-28">
      {/* Header */}
      <div className="max-w-xl mb-12 md:mx-auto text-center lg:max-w-2xl">
        <h2 className="mb-6 text-3xl font-bold leading-none tracking-tight text-text sm:text-4xl">
          Get in Touch with <span className="text-primary">Scholar Link</span>
        </h2>
        <p className="text-base text-muted md:text-lg">
          Have questions, feedback, or partnership inquiries? We’d love to hear
          from you. Reach out through the form or use our contact details below.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Contact Form */}
        <div className="p-8 bg-base-100 shadow-xl rounded-2xl">
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-muted">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-muted">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-muted">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-muted">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-primary rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <ContactCard
            icon={<FaMapMarkerAlt className="w-6 h-6 text-primary" />}
            title="Our Office"
            desc="123 Scholar Street, Dhaka, Bangladesh"
          />
          <ContactCard
            icon={<FaEnvelope className="w-6 h-6 text-primary" />}
            title="Email Us"
            desc="support@scholarlink.com"
          />
          <ContactCard
            icon={<FaPhoneAlt className="w-6 h-6 text-primary" />}
            title="Call Us"
            desc="+880 1234-567890"
          />
        </div>
      </div>
    </div>
  );
};

// Contact Card Component
const ContactCard = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4 p-5 bg-base-100 shadow-md rounded-xl hover:shadow-lg transition">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
      {icon}
    </div>
    <div>
      <h6 className="mb-1 text-lg font-bold text-text">{title}</h6>
      <p className="text-muted">{desc}</p>
    </div>
  </div>
);

export default Contact;
