import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-outline btn-emerald-600 flex items-center gap-2">
        <FaArrowLeft /> Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
