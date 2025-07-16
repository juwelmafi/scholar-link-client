import React from "react";
import { FaUserGraduate, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "https://i.ibb.co/Fz1y8ZY/user-placeholder.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-emerald-500 shadow-md object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaUserGraduate className="text-emerald-500 text-lg" />
            <span className="font-medium">Name:</span>
            <span>{user?.displayName || "Not Available"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-emerald-500 text-lg" />
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>

          {!roleLoading && role !== "user" && (
            <div className="flex items-center gap-3 text-gray-700">
              <FaShieldAlt className="text-emerald-500 text-lg" />
              <span className="font-medium">Role:</span>
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
