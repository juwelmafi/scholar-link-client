import React, { useEffect } from "react";
import {
  FaEnvelope,
  FaGraduationCap,
  FaShieldAlt,
  FaUserGraduate,
  FaPhoneAlt,
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
      const res = await axiosSecure.get(`/applications?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
      document.title = `My Profile | ScholarLink`;
      window.scroll(0, 0)
      return () => {
        document.title = "ScholarLink";
      };
    }, []);


  if (isLoading) return <Loading />;

  return (
    <div className="w-full mx-auto p-4 md:p-10 mt-6">
      {/* Header */}
      <div className="relative bg-gray-100 rounded-2xl shadow overflow-hidden">
        <div className="h-40 md:h-60 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://i.ibb.co/zhDGPNHr/bg.jpg)' }}>
          <div className="absolute top-24 left-4 md:top-42 md:left-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/Fz1y8ZY/user-placeholder.jpg"}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-md object-cover"
            />
          </div>
        </div>

        <div className="p-4 md:p-8 pt-10 md:pt-20 bg-base-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-text">
                {user?.displayName || "Not Available"}
              </h2>
              <p className="text-sm text-muted">Student</p>
              <p className="text-sm text-muted">Aspiring for scholarship in aborad.</p>
            </div>
            <div className="md:text-right mt-2 md:mt-0">
              <p className="text-sm text-muted">{user?.email}</p>
              <p className="text-sm text-muted">+91 000 000 0000</p>
              <div className="mt-2 flex flex-col items-start md:items-end">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary rounded-full" style={{ width: "80%" }}>

                  </div>
                </div>
                <p className="text-xs text-muted mt-1">Profile Strength: 80%</p>
              </div>
            </div>
          </div>

          {/* Applications and Role */}
          <div className="mt-8 space-y-2">
            {applications.length > 0 && (
              <div className="flex items-center gap-2 text-text">
                <FaGraduationCap className="text-primary text-lg" />
                <span>You applied in <strong className="text-primary">{applications.length}</strong> scholarships.</span>
              </div>
            )}

            {!roleLoading && role !== "user" && (
              <div className="flex items-center gap-2 text-text">
                <FaShieldAlt className="text-primary text-lg" />
                <span className="capitalize">{role}</span>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-10">
            Welcome to Scholar Link — Empowering your global education journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
