import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [editReview, setEditReview] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews-by-email?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data.success) {
          console.log('deleted', res.data)
          Swal.fire("Deleted!", "Your review has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      rating: form.rating.value,
      comment: form.comment.value,
      updated_at: new Date(), // auto updated
    };

    try {
      const res = await axiosSecure.put(`/reviews/${editReview._id}`, updated);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Review updated!", "success");
        setEditReview(null);
        refetch();
      } else {
        Swal.fire("Info", "No changes made", "info");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">My Reviews</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Scholarship</th>
            <th>University</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id} className="text-xs md:text-sm">
              <td>{index + 1}</td>
              <td>{review.scholarshipName}</td>
              <td>{review.universityName}</td>
              <td className="line-clamp-2">{review.comment}</td>
              <td>{review.date}</td>
              <td className="space-x-1 flex gap-1 items-center">
                <button
                  onClick={() => setEditReview(review)}
                  className="btn btn-xs btn-warning text-white"
                >
                  <FaEdit></FaEdit>
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-xs btn-error text-white"
                >
                  <FaTrash></FaTrash>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editReview && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Review</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="number"
                name="rating"
                defaultValue={editReview.rating}
                min="1"
                max="5"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="comment"
                defaultValue={editReview.comment}
                className="textarea textarea-bordered w-full"
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary text-white">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditReview(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
