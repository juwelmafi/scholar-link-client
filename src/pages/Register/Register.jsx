import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaArrowUp, FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserPrfile } = useAuth();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data?.email, data?.password)
      .then(async () => {
        // console.log(result.user);

        //update user info in database
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user", //detault role
          created_at: new Date().toISOString(),
          last_logged_in: new Date().toISOString(),
        };

         await axiosPublic.post("/users", userInfo);
        // console.log(userRes);

        //update user profile in firebase

        const updatedData = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserPrfile(updatedData)
          .then(() => {
            console.log("name and image updated");
          })
          .catch((error) => {
            console.log(error);
          });

        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setImagePreview(imageUrl);
    }
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_API_KEY
    }`;

    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-3xl py-5">Create an account!</h2>
        <fieldset className="fieldset">
          {/* image field  */}
          <div className="flex flex-col items-start gap-2">
            <label className="label font-medium">Your Profile Picture</label>

            <div className="relative w-24 h-24">
              {/* Image or Icon Preview */}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-6xl">
                  <FaUserCircle />
                </div>
              )}

              {/* Upload icon overlay */}
              <label className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center cursor-pointer">
                <FaArrowUp className="text-primary text-xs" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* name field  */}
          <label className="label">Your name</label>
          <input
            type="name"
            className="input w-full lg:w-[20rem]"
            {...register("name", { required: true })}
            placeholder="Your name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name required</p>
          )}

          {/* email field  */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full lg:w-[20rem]"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email required</p>
          )}

          {/* password field */}
          <label className="label">Password</label>
          <div className="relative w-full lg:w-[20rem]">
            <input
              type={showPass ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasCapital: (value) =>
                    /[A-Z]/.test(value) ||
                    "Must include at least one capital letter",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Must include at least one special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3 right-3"
            >
              {showPass ? (
                <FaEyeSlash size={18} className="text-gray-500" />
              ) : (
                <FaEye size={18} className="text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </fieldset>
        <button className="btn btn-primary text-white w-full lg:w-[20rem] mt-4">
          Register
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="-mt-2 btn btn-link p-0">
            {" "}
            Login
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
