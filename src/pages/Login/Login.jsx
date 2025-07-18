import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const onSubmit = (data) => {
    // console.log(data);
    signInUser(data?.email, data?.password)
      .then(() => {
        // console.log(res.user);
        navigate(from);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.code);
      });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-3xl py-5">Welcome back!</h2>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-full lg:w-[20rem]"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <div className="relative w-full lg:w-[20rem]">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
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
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be minimum 6 charecter</p>
          )}
          <p className="text-red-500">{errorMessage}</p>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
        </fieldset>
        <button className="btn w-full lg:w-[20rem] btn-primary text-white mt-4">
          Login
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to={"/register"} className="-mt-2 btn btn-link p-0">
            {" "}
            Register
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
