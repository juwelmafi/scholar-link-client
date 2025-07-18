import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
// import Logo from "../../Pages/shared/Logo/Logo";
import {
  FaHome,
  FaUser,
  FaPlus,
  FaList,
  FaStar,
  FaTasks,
  FaClipboardList,
  FaFileAlt,
  FaComments,
  FaUserCog,
  FaChartBar,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import Logo from "../shared/Logo";

const DashLayout = () => {
  const { role, roleLoading } = useUserRole();
  useEffect(() => {
    document.title = `Dashboard | ScholarLink`;
    return () => {
      document.title = "ScholarLink";
    };
  }, []);
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar for small screen */}
          <div className="navbar bg-primary lg:hidden">
            <div className="flex-none">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1 text-white font-bold text-2xl text-center">Dashboard</div>
          </div>

          {/* Page Content */}
          <Outlet></Outlet>
        </div>

        {/* Sidebar (left) */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 md:w-72 w-54 min-h-full bg-base-200 text-base-content">
            {/* Sidebar Items */}
            <li>
              <Logo></Logo>
            </li>

            {!roleLoading && role === "user" && (
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "moderator" && (
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaUser /> Admin Profile
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaChartBar /> Analytics
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/add-scholarship"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaPlus /> Add Scholarship
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "moderator" && (
              <li>
                <NavLink
                  to="/dashboard/add-scholarship"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaPlus /> Add Scholarship
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/my-applications"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaList /> My Applications
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "user" && (
              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaStar /> My Reviews
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/manage-scholarships"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaClipboardList /> Manage Scholarships
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "moderator" && (
              <li>
                <NavLink
                  to="/dashboard/manage-scholarships"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaClipboardList /> Manage Scholarships
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "moderator" && (
              <li>
                <NavLink
                  to="/dashboard/all-applied-shcolarsips"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaFileAlt /> All Applied Scholarships
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/all-applied-shcolarsips"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaFileAlt /> Manage Applied Scholarships
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "moderator" && (
              <li>
                <NavLink
                  to="/dashboard/all-reviews"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaComments /> All Reviews
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/all-reviews"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaComments /> Manage Reviews
                </NavLink>
              </li>
            )}
            {!roleLoading && role === "admin" && (
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <FaUserCog /> Manage Users
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
