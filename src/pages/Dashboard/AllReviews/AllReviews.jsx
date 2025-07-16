import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";
import { FaTrash, FaStar } from "react-icons/fa";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";

const AllReviews = () => {
  const axiosSecure = useAxiosSecurity();

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${id}`);
        refetch();
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete review.", error);
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-6 py-10 mt-16">
      <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">All Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded shadow border p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p>
              <strong>University:</strong> {review.universityName}
            </p>
            <p>
              <strong>Scholarship:</strong> {review.scholarshipName}
            </p>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" />
              <span>{review.rating}</span>
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>

            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-xs btn-error mt-2 flex items-center gap-1"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
