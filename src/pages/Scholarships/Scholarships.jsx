import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaMapMarkerAlt,
  FaUniversity,
  FaChevronLeft,
  FaChevronRight,
  FaCalendar,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";

const AllScholarshipsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6); // Default cards per page
  const { data, isLoading, isError } = useQuery({
    queryKey: ["scholarships", searchTerm, page, limit],
    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships", {
        params: { search: searchTerm, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

   useEffect(() => {
        document.title = `All Scholarsips | ScholarLink`;
        return () => {
          document.title = "ScholarLink";
        };
      }, []);


  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-28">
      {/* Controls: Search + Limit */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by Scholarship, University or Degree"
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full rounded-r-none outline-none"
          />
          <button type="submit" className="btn btn-primary py-2 shadow-none -ml-2 text-white rounded-l-none">
            Search
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-primary py-4 cursor-text shadow-none -mr-2 text-white rounded-r-none">
            Per page
          </button>
          <select
            id="limitSelect"
            className="select rounded-l-none"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
      </form>
      {/* Scholarships Grid */}
      {isLoading && <Loading></Loading>}
      {isError && (
        <p className="text-center text-red-600">Failed to load scholarships.</p>
      )}
      {!isLoading && scholarships.length === 0 && (
        <p className="text-center text-gray-500">No scholarships found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                <FaUniversity className="mr-2 text-primary" />
                {scholarship.universityName}
              </p>
              <p className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-2 text-primary" />
                {scholarship.city}, {scholarship.country}
              </p>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                <FaCalendar className="mr-2 text-primary" />
                {new Date(scholarship.deadline).toLocaleDateString()}
              </p>
              {scholarship.averageRating ? (
                <div className="text-yellow-500 flex items-center gap-2 text-sm mb-2">
                  <FaStar className="text-primary"></FaStar>{" "}
                  {scholarship.averageRating} / 5
                </div>
              ) : (
                <div className="text-gray-400 flex items-center gap-2 text-sm mb-2">
                  <FaStar className="text-primary"></FaStar> N/A
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
                <button className="btn btn-sm w-full bg-primary text-white mt-2">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          {/* Previous Button */}
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <FaChevronLeft className="mr-1" /> Prev
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`btn btn-sm ${
                  pageNumber === page ? "btn-active btn-primary" : "btn-ghost"
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <FaChevronRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarshipsPage;
