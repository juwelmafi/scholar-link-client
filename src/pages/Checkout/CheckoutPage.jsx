import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loading from "../../shared/Loading";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/useAuth";
import useAxiosSecurity from "../../hooks/UseAxiosSecurity";


const CheckoutPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [formData, setFormData] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userMongoId, setUserMongoId] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/by-email?email=${user.email}`)
        .then((res) => setUserMongoId(res.data._id))
        .catch((err) => {
          console.error("Failed to fetch user ID from DB:", err);
        });
    }
  }, [user?.email, axiosSecure]);
  // Fetch scholarship data
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const { universityName, subjectCategory, scholarshipCategory, scholarshipName, deadline } =
    scholarship || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      toast.success("Proceeding to payment...");
      const imageFile = data.photo[0];
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);

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
      if (!imgbbData.success) throw new Error("Image upload failed");

      const imageUrl = imgbbData.data.url;

      // Combine all data
      const finalData = {
        ...data,
        photo: imageUrl,
        universityName,
        scholarshipName,
        scholarshipCategory,
        subjectCategory,
        deadline,
        userName: user?.displayName,
        userEmail: user?.email,
        scholarshipId: id,
        userId: userMongoId,
      };
      // Set state for Stripe payment
      setFormData(finalData);

      setAmount(scholarship.applicationFee + scholarship.serviceCharge); // total fee
      setShowModal(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    }
  };
  // console.log(user);
  // console.log(formData);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 pt-28">
      {/* Applicant Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <h3 className="text-xl font-bold text-primary mb-4">
          Applicant Information
        </h3>

        <input
          {...register("phone", { required: "Phone number is required" })}
          placeholder="Phone Number"
          className="input input-bordered w-full"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}

        {/* Photo Upload */}
        <div>
          <label className="block mb-1">Applicant Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Photo is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}
        </div>

        <textarea
          {...register("address", { required: "Address is required" })}
          placeholder="Address (village, district, country)"
          className="textarea textarea-bordered w-full"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Gender</label>
            <select
              {...register("gender", { required: true })}
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
              {...register("applyingDegree", { required: true })}
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
          {...register("sscResult", { required: "SSC Result is required" })}
          placeholder="SSC Result"
          className="input input-bordered w-full"
        />
        {errors.sscResult && (
          <p className="text-red-500 text-sm">{errors.sscResult.message}</p>
        )}

        <input
          {...register("hscResult", { required: "HSC Result is required" })}
          placeholder="HSC Result"
          className="input input-bordered w-full"
        />
        {errors.hscResult && (
          <p className="text-red-500 text-sm">{errors.hscResult.message}</p>
        )}

        <div>
          <label className="block mb-1">Study Gap (optional)</label>
          <select
            {...register("studyGap")}
            className="select select-bordered w-full"
          >
            <option value="">No gap</option>
            <option value="1 Year">1 Year</option>
            <option value="2+ Years">2+ Years</option>
          </select>
        </div>

        {/* Read-only Fields */}
        <input
          readOnly
          value={universityName}
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          readOnly
          value={scholarshipCategory}
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          readOnly
          value={subjectCategory}
          className="input input-bordered w-full bg-gray-100"
        />

        <button type="submit" className="btn btn-primary w-full mt-4">
          Pay & Apply
        </button>
      </form>

      {/* Modal */}
      <input
        type="checkbox"
        id="payment-modal"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg text-emerald-600 mb-4">
            Complete Your Payment
          </h3>

          <CheckoutForm
            applicationData={formData}
            amount={amount}
            onClose={() => setShowModal(false)} // Optional: handle close
          />

          <div className="modal-action">
            <button onClick={() => setShowModal(false)} className="btn btn-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
