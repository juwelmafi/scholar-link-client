import React from "react";
import { Outlet } from "react-router";
import Logo from "../shared/Logo";
import login from '../assets/login.svg'

const AuthLayout = () => {

  return (
    <div className="max-w-6xl md:px-5 lg:px-0 mx-auto mt-2 lg:mt-5 mb-5">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex justify-between flex-col md:flex-row-reverse items-center">
        <div className="lg:mr-28">
          <img src={login} alt="" />
        </div>
        <div className="w-[90%] lg:w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;