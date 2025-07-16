import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaArrowRight,
  FaStar,
  FaCalendar,
} from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../shared/Loading";

const TopScholarshipSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-scholarships");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-emerald-600 text-center">
        Top Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topScholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                {scholarship.scholarshipName}
              </h3>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FaUniversity className="mr-2 text-emerald-500" />
                {scholarship.universityName}
              </p>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                {scholarship.city}, {scholarship.country}
              </p>

              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FaCalendar className="mr-2 text-emerald-500" />
                {new Date(scholarship.deadline).toLocaleDateString()}
              </p>

              {scholarship.averageRating ? (
                <div className="text-yellow-500 flex items-center gap-2 text-sm mb-2">
                  <FaStar className="text-emerald-500"></FaStar>{" "}
                  {scholarship.averageRating} / 5
                </div>
              ) : (
                <div className="text-gray-400 flex items-center gap-2 text-sm mb-2">
                  <FaStar className="text-emerald-500"></FaStar> N/A
                </div>
              )}

              <div className="flex flex-wrap text-xs gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded">
                  {scholarship.degree}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded">
                  {scholarship.subjectCategory}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  {scholarship.scholarshipCategory}
                </span>
              </div>

              <Link to={`/scholarships/${scholarship._id}`}>
                <button className="btn btn-sm w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-2">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="text-center mt-10 flex justify-center">
        <Link to="/all-scholarships">
          <button className="btn btn-outline btn-primary hover:text-white flex items-center justify-center gap-2">
            View All Scholarships <FaArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default TopScholarshipSection;
