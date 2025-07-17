import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../shared/Loading";
import axios from "axios";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecurity();
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allScholarshipsForModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  const allScholarships = scholarships;


  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this scholarship?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/scholarships/${id}`);
        Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to delete scholarship.", err);
      }
    }
  };

  const handleDetails = async (id) => {
    try {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      setSelectedScholarship(res.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      Swal.fire("Error", "Failed to load scholarship details", error);
    }
  };

  // Handle edit form submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      let universityImageUrl = editingScholarship.universityImage; // default old image

      // Check if user selected a new image file
      if (form.universityImage.files && form.universityImage.files.length > 0) {
        const image = form.universityImage.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_API_KEY
        }`;

        // Upload the image
        const res = await axios.post(imageUploadUrl, formData);
        universityImageUrl = res.data.data.url; // new uploaded image url
      }

      // Prepare updated scholarship data with new or old image URL
      const updatedData = {
        scholarshipName: form.scholarshipName.value,
        universityName: form.universityName.value,
        universityImage: universityImageUrl,
        country: form.country.value,
        city: form.city.value,
        worldRank: form.worldRank.value || null,
        subjectCategory: form.subjectCategory.value,
        scholarshipCategory: form.scholarshipCategory.value,
        degree: form.degree.value,
        tuitionFee: form.tuitionFee.value
          ? parseFloat(form.tuitionFee.value)
          : null,
        applicationFee: parseFloat(form.applicationFee.value),
        serviceCharge: parseFloat(form.serviceCharge.value),
        deadline: new Date(form.deadline.value),
        updated_at: new Date(),
      };

      await axiosSecure.put(
        `/scholarships/${editingScholarship._id}`,
        updatedData
      );

      Swal.fire("Success", "Scholarship updated successfully!", "success");
      setEditingScholarship(null);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update scholarship", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Manage Scholarships
      </h2>

      <div className="overflow-x-auto ">
        <table className="table">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>App Fee ($)</th>
              <th>Charge ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allScholarships.map((scholarship) => (
              <tr key={scholarship._id} className="text-xs md:text-sm">
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.subjectCategory}</td>
                <td>{scholarship.degree}</td>
                <td>{scholarship.applicationFee}</td>
                <td>{scholarship.serviceCharge}</td>
                <td className="flex gap-3">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => handleDetails(scholarship._id)}
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => setEditingScholarship(scholarship)}
                    className="btn btn-sm btn-warning text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(scholarship._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingScholarship && (
        <dialog open className="modal">
          <div className="modal-box">
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-emerald-600">
                Edit Scholarship
              </h3>

              <div className="grid grid-cols-2 gap-5">
                <input
                  name="scholarshipName"
                  defaultValue={editingScholarship.scholarshipName}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="universityName"
                  defaultValue={editingScholarship.universityName}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="universityImage"
                  type="file"
                  className="file-input file-input-bordered w-full"
                  // For file, handle separately (see below)
                />
                <input
                  name="country"
                  defaultValue={editingScholarship.country}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="city"
                  defaultValue={editingScholarship.city}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="worldRank"
                  defaultValue={editingScholarship.worldRank || ""}
                  className="input input-bordered w-full"
                />

                <select
                  name="subjectCategory"
                  defaultValue={editingScholarship.subjectCategory}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Agriculture">Agriculture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Doctor">Doctor</option>
                </select>

                <select
                  name="scholarshipCategory"
                  defaultValue={editingScholarship.scholarshipCategory}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Full Fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>

                <select
                  name="degree"
                  defaultValue={editingScholarship.degree}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>

                <input
                  name="tuitionFee"
                  type="number"
                  defaultValue={editingScholarship.tuitionFee || ""}
                  className="input input-bordered w-full"
                />
                <input
                  name="applicationFee"
                  type="number"
                  defaultValue={editingScholarship.applicationFee}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="serviceCharge"
                  type="number"
                  defaultValue={editingScholarship.serviceCharge}
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="deadline"
                  type="date"
                  defaultValue={
                    editingScholarship.deadline
                      ? new Date(editingScholarship.deadline)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingScholarship(null)}
                  type="button"
                  className="btn"
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
                onClick={() => setIsDetailsModalOpen(false)}
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

export default ManageScholarships;
