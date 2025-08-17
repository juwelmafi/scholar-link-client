import React from "react";

const Newsletter = () => {
  return (
    <div className="px-4 py-16 mx-auto max-w-7xl md:px-8 lg:py-20">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="mb-4 text-3xl font-bold leading-none tracking-tight text-text sm:text-4xl">
          Subscribe to our <span className="text-primary">Newsletter</span>
        </h2>
        <p className="text-base text-muted md:text-lg">
          Get the latest scholarships, updates, and opportunities directly in
          your inbox. No spam, only valuable insights.
        </p>
      </div>

      {/* Newsletter Form */}
      <div className="max-w-xl mx-auto">
        <form className="flex flex-col items-center gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 text-white bg-primary rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          By subscribing, you agree to receive updates from Scholar Link.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
