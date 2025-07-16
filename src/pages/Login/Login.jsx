import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin";
import { useState } from "react";
// import SocialLogIn from "./SocialLogin/SocialLogIn";

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
  const onSubmit = (data) => {
    console.log(data);
    signInUser(data?.email, data?.password)
      .then((res) => {
        console.log(res.user);
        navigate(from);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.code);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-3xl py-5">Welcome back!</h2>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
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
        <button className="btn w-[20rem] btn-primary text-black mt-4">
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
