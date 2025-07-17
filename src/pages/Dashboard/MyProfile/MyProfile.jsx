import React from "react";
import {
  FaUserGraduate,
  FaEnvelope,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../shared/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecurity();
  const { data: applications = [], isLoading } = useQuery({
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

  return (
    <div className="max-w-7xl mx-2 md:mx-auto mt-10 lg:mt-44 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Profile</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-shrink-0">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/Fz1y8ZY/user-placeholder.jpg"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary shadow-md object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUserGraduate className="text-primary text-lg" />

            <span>{user?.displayName || "Not Available"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-primary text-lg" />
            <span>{user?.email}</span>
          </div>
          {applications.length > 0 && (
            <div className="flex gap-3 items-center text-gray-700">
              <FaGraduationCap className="text-primary text-lg"></FaGraduationCap>
              <p>
                You applied in{" "}
                <span className="text-primary font-bold">
                  {applications.length}
                </span>{" "}
                scholarships.
              </p>
            </div>
          )}

          {!roleLoading && role !== "user" && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaShieldAlt className="text-primary text-lg" />
              <span className="capitalize">{role}</span>
            </div>
          )}
        </div>
      </div>

      {/* Optional: Footer Section */}
      <div className="mt-8 text-sm text-center text-gray-400">
        Welcome to Scholar Link — Empowering your global education journey.
      </div>
    </div>
  );
};

export default MyProfile;
