import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {

  return (
    <div className="p-12">
      <div>
        {/* <Logo></Logo> */}
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;