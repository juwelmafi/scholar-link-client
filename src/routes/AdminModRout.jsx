import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import useUserRole from "../hooks/useUserRole";
import Loading from "../shared/Loading";

const AdminModRout = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || (role !== "admin" && role !== "moderator")) {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden-access"></Navigate>
    );
  }

  return children;
};

export default AdminModRout;
