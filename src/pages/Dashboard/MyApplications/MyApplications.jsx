import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../shared/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";
const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // here fetch scholship for showing details modal
  const { data: selectedScholarship } = useQuery({
    queryKey: ["scholarship", selectedApp?.scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships/${selectedApp.scholarshipId}`
      );
      return res.data;
    },
    enabled: !!selectedApp?.scholarshipId, // only fetch if scholarshipId exists
  });

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?userEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email, // Only run query when email exists
  });

  if (isLoading) return <Loading />;

  // handle submit
  const handelFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    let imageUrl = selectedApp.photo; // fallback to previous image

    const imageFile = form.photo.files[0];
    if (imageFile) {
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);

      try {
        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_API_KEY
          }`,
          {
            method: "POST",
            body: formDataImage,
          }
        );
        const imgbbData = await imgbbRes.json();
        if (imgbbData.success) {
          imageUrl = imgbbData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        console.error("Image Upload Error:", err);
        return Swal.fire("Error", "Failed to upload photo", "error");
      }
    }

    const updatedApplication = {
      phone: form.phone.value,
      address: form.address.value,
      gender: form.gender.value,
      applyingDegree: form.applyingDegree.value,
      sscResult: form.sscResult.value,
      hscResult: form.hscResult.value,
      studyGap: form.studyGap.value,
      photo: imageUrl,
    };

    try {
      const res = await axiosSecure.put(
        `/applications/${selectedApp._id}`,
        updatedApplication
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Application updated!", "success");
        setIsModalOpen(false);
        setSelectedApp(null);
        refetch();
      } else {
        Swal.fire("Warning", "No changes detected", "warning");
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire("Error", "Failed to update application", "error");
    }
  };

  // handle cancel

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire(
            "Cancelled!",
            "Your application has been deleted.",
            "success"
          );
          refetch();
        } else {
          Swal.fire("Error", "Something went wrong. Try again.", "error");
        }
      } catch (err) {
        console.error("Cancel Error:", err);
        Swal.fire("Error", "Failed to delete application", "error");
      }
    }
  };

  // handle revew submit //

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = {
      scholarshipId: reviewTarget.scholarshipId,
      scholarshipName: reviewTarget.scholarshipName || "Unknown",
      universityName: reviewTarget.universityName || "Unknown", 
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL || "",
      rating: parseFloat(form.rating.value),
      comment: form.comment.value,
      date: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted!", "success");
        setIsReviewModalOpen(false);
        setReviewTarget(null);
      }
    } catch (error) {
      console.error("Review Error:", error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
        My Applications
      </h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>University Name</th>
            <th>Subj. Category</th>
            <th>Degree</th>
            <th>Appl. Fees</th>
            <th>Charge</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id} className="text-xs md:text-sm">
              <td>{index + 1}</td>
              <td className="line-clamp-2">{app.universityName}</td>
              <td>{app.subjectCategory}</td>
              <td>{app.applyingDegree}</td>
              <td>৳100</td> {/* Assuming fixed fees */}
              <td>৳50</td> {/* Assuming fixed service charge */}
              <td>
                <span
                  className={`badge text-white ${
                    app.applicationStatus === "Rejected"
                      ? "badge-error"
                      : app.applicationStatus === "completed"
                      ? "badge-success"
                      : app.applicationStatus === "processing"
                      ? "badge-warning"
                      : "badge-info"
                  }`}
                >
                  {app.applicationStatus || "pending"}
                </span>
              </td>
              <td>{app.feedback || "N/A"}</td>
              <td className="space-x-1 flex gap-1 items-center justify-center">
                <button
                  className="btn btn-sm btn-info text-white"
                  onClick={() => {
                    setIsDetailsModalOpen(true);
                    setSelectedApp(app);
                  }}
                >
                  <FaEye />
                </button>

                <button
                  className="btn btn-sm btn-warning text-white"
                  onClick={() => {
                    if (app.applicationStatus === "pending") {
                      setSelectedApp(app);
                      setIsModalOpen(true);
                    } else {
                      Swal.fire({
                        icon: "warning",
                        title: "Cannot Edit",
                        text: "You cannot edit this application. It is already processing or completed.",
                      });
                    }
                  }}
                >
                  <FaEdit />
                </button>

                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => handleCancel(app._id)}
                >
                  <FaTrash />
                </button>

                <button
                  className="btn btn-sm btn-success text-white"
                  onClick={() => {
                    setReviewTarget(app);
                    setIsReviewModalOpen(true);
                  }}
                >
                  <FaStar />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedApp && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Application</h3>

            <form className="space-y-3" onSubmit={handelFormSubmit}>
              <input
                name="phone"
                defaultValue={selectedApp.phone}
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />

              <div>
                <label className="block mb-1">Applicant Photo</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <textarea
                name="address"
                defaultValue={selectedApp.address}
                placeholder="Address (village, district, country)"
                className="textarea textarea-bordered w-full"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Gender</label>
                  <select
                    name="gender"
                    defaultValue={selectedApp.gender || ""}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Applying Degree</label>
                  <select
                    name="applyingDegree"
                    defaultValue={selectedApp.applyingDegree || ""}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>
              </div>

              <input
                name="sscResult"
                defaultValue={selectedApp.sscResult}
                placeholder="SSC Result"
                className="input input-bordered w-full"
              />

              <input
                name="hscResult"
                defaultValue={selectedApp.hscResult}
                placeholder="HSC Result"
                className="input input-bordered w-full"
              />

              <div>
                <label className="block mb-1">Study Gap (optional)</label>
                <select
                  name="studyGap"
                  defaultValue={selectedApp.studyGap || ""}
                  className="select select-bordered w-full"
                >
                  <option value="">No gap</option>
                  <option value="1 Year">1 Year</option>
                  <option value="2+ Years">2+ Years</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary text-white">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedApp(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {isReviewModalOpen && reviewTarget && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <label className="block mb-1">Rating</label>
              <select
                name="rating"
                required
                className="select select-bordered w-full"
              >
                <option value="">Select Rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Bad</option>
              </select>

              <textarea
                name="comment"
                required
                className="textarea textarea-bordered w-full"
                placeholder="Write your review"
              ></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsReviewModalOpen(false);
                    setReviewTarget(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {isDetailsModalOpen && selectedScholarship && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg text-center mb-4 text-emerald-600">
              {selectedScholarship.scholarshipName}
            </h3>

            <img
              src={selectedScholarship.universityImage}
              alt="University"
              className="w-full h-40 object-cover rounded mb-4"
            />

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>University:</strong>{" "}
                {selectedScholarship.universityName}
              </p>
              <p>
                <strong>Country:</strong> {selectedScholarship.country}
              </p>
              <p>
                <strong>City:</strong> {selectedScholarship.city}
              </p>
              <p>
                <strong>World Rank:</strong> {selectedScholarship.worldRank}
              </p>
              <p>
                <strong>Subject:</strong> {selectedScholarship.subjectCategory}
              </p>
              <p>
                <strong>Scholarship Type:</strong>{" "}
                {selectedScholarship.scholarshipCategory}
              </p>
              <p>
                <strong>Degree:</strong> {selectedScholarship.degree}
              </p>
              <p>
                <strong>Tuition Fee:</strong> {selectedScholarship.tuitionFee}
              </p>
              <p>
                <strong>Application Fee:</strong> ৳
                {selectedScholarship.applicationFee}
              </p>
              <p>
                <strong>Service Charge:</strong> ৳
                {selectedScholarship.serviceCharge}
              </p>
              <p>
                <strong>Deadline:</strong> {selectedScholarship.deadline}
              </p>
              <p>
                <strong>Posted Date:</strong>{" "}
                {new Date(selectedScholarship.postDate).toLocaleDateString()}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setIsDetailsModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
