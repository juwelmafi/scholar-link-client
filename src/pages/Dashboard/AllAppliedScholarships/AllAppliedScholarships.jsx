import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";

import {
  FaEye,
  FaCommentDots,
  FaTrashAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaGraduationCap,
  FaUniversity,
  FaBullseye,
  FaTag,
  FaBook,
  FaMoneyBillWave,
  FaReceipt,
  FaThumbtack,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSchool, MdTimer } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";
const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecurity();
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appliedScholarships", sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-scholarships?sort=${sortBy}`);
      return res.data;
    },
  });

  // Delete handler
  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${id}`);
        refetch();
        Swal.fire("Deleted!", "Application deleted successfully.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete application.", err);
      }
    }
  }

  const openFeedbackModal = (id) => {
    setSelectedAppId(id);
    setFeedbackText(""); // clear previous
    document.getElementById("feedback_modal").showModal();
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.put(`/applications/${selectedAppId}`, {
        feedback: feedbackText,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Feedback submitted successfully!", "success");
        document.getElementById("feedback_modal").close();
      } else {
        Swal.fire("Error", "No changes were made", "warning");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit feedback", "error");
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/applications/${appId}`, {
        applicationStatus: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Status updated!");
        // Optionally refetch data or update local state
        refetch(); // if using React Query
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 my-5">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        All Applied Scholarships
      </h2>

      <div className="overflow-x-auto">
        <div className="flex justify-center mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Sort By</option>
            <option value="date">Applied Date</option>
            <option value="deadline">Scholarship Deadline</option>
          </select>
        </div>
        <table className="table">
          <thead className="bg-sky-50 text-primary">
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Scholarship</th>
              <th>Degree</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id} className="text-xs md:text-sm">
                <td>{index + 1}</td>
                <td>
                  <p className="font-semibold">{app.userName}</p>
                  <p className="text-xs text-gray-500">{app.userEmail}</p>
                </td>
                <td>{app.scholarshipName}</td>
                <td>{app.applyingDegree}</td>
                <td>
                  <select
                    className="select select-xs select-bordered"
                    value={app.applicationStatus}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="flex gap-2">
                  <label
                    htmlFor="details_modal"
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-sm text-white btn-info tooltip"
                    data-tip="Details"
                  >
                    <FaEye />
                  </label>

                  <button
                    onClick={() => openFeedbackModal(app._id)}
                    className="btn btn-sm btn-success text-white tooltip"
                    data-tip="Feedback"
                  >
                    <FaCommentDots />
                  </button>

                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-sm btn-error text-white tooltip"
                    data-tip="Cancel"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* DaisyUI Modal for Application Details */}
      <input type="checkbox" id="details_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-3xl">
          <label
            htmlFor="details_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-lg font-bold text-primary mb-4">
            Application Details
          </h3>
          {selectedApp && (
            <div className="text-sm space-y-6 px-4">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <img
                  src={selectedApp.photo}
                  alt="Applicant"
                  className="w-32 h-32 object-cover rounded-full border-2 border-emerald-500 shadow"
                />
                <h2 className="text-lg font-bold mt-2">
                  {selectedApp.userName}
                </h2>
                <p className="text-gray-600">{selectedApp.userEmail}</p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaPhoneAlt />
                    </span>
                    {selectedApp.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaMapMarkerAlt />
                    </span>
                    {selectedApp.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaUser />
                    </span>
                    {selectedApp.gender}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaGraduationCap />
                    </span>
                    {selectedApp.applyingDegree}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <MdSchool />
                    </span>
                    SSC: {selectedApp.sscResult}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <MdSchool />
                    </span>
                    HSC: {selectedApp.hscResult}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <MdTimer />
                    </span>
                    Study Gap: {selectedApp.studyGap || "N/A"}
                  </p>
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaUniversity />
                    </span>
                    {selectedApp.universityName}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaBullseye />
                    </span>
                    {selectedApp.scholarshipName}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaTag />
                    </span>
                    {selectedApp.scholarshipCategory}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaBook />
                    </span>
                    {selectedApp.subjectCategory}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaMoneyBillWave />
                    </span>
                    {selectedApp.paymentStatus}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaReceipt />
                    </span>
                    Payment ID: {selectedApp.paymentId}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaThumbtack />
                    </span>
                    {selectedApp.applicationStatus}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">
                      <FaCalendarAlt />
                    </span>
                    {new Date(selectedApp.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Send Feedback</h3>
          <form onSubmit={handleSubmitFeedback}>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("feedback_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllAppliedScholarships;
