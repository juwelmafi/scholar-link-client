import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [profilePic, setProfilePic] = useState("");
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  
      // Step 1: Upload image to imgbb
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_API_KEY
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    try {

      // Step 2: Prepare final data
      const scholarship = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityImage: profilePic,
        country: data.country,
        city: data.city,
        worldRank: data.worldRank,
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFee: data.tuitionFee,
        applicationFee: parseFloat(data.applicationFee),
        serviceCharge: parseFloat(data.serviceCharge),
        deadline: new Date(data.deadline),
        postDate: new Date(),
        postedBy: user?.email,
      };

      // Step 3: Save to database
      const res = await axiosSecure.post("/scholarships", scholarship);

      if (res.data.insertedId) {
        reset();
        Swal.fire("Success!", "Scholarship added successfully", "success");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-10">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-500">
        Add Scholarship
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          {...register("scholarshipName", { required: true })}
          placeholder="Scholarship Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("universityName", { required: true })}
          placeholder="University Name"
          className="input input-bordered w-full"
        />
        <input
          type="file"
          {...register("universityImage", { required: true })}
          className="file-input file-input-bordered w-full"
          onChange={handleImageUpload}
        />
        <input
          {...register("country", { required: true })}
          placeholder="Country"
          className="input input-bordered w-full"
        />
        <input
          {...register("city", { required: true })}
          placeholder="City"
          className="input input-bordered w-full"
        />
        <input
          {...register("worldRank")}
          placeholder="World Rank (optional)"
          className="input input-bordered w-full"
        />

        <select
          {...register("subjectCategory")}
          className="select select-bordered w-full"
        >
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
          <option value="Arts">Arts</option>
          <option value="Commerce">Commerce</option>
          <option value="Science">Sceince</option>
        </select>
        <select
          {...register("scholarshipCategory")}
          className="select select-bordered w-full"
        >
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select
          {...register("degree")}
          className="select select-bordered w-full"
        >
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <input
          {...register("tuitionFee")}
          placeholder="Tuition Fee (optional)"
          type="number"
          className="input input-bordered w-full"
        />
        <input
          {...register("applicationFee", { required: true })}
          placeholder="Application Fee"
          type="number"
          className="input input-bordered w-full"
        />
        <input
          {...register("serviceCharge", { required: true })}
          placeholder="Service Charge"
          type="number"
          className="input input-bordered w-full"
        />
        <input
          {...register("deadline", { required: true })}
          type="date"
          className="input input-bordered w-full"
        />

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="btn bg-emerald-500 hover:bg-emerald-600 text-white w-full"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
