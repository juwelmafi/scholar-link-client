import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Logo from "../../shared/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // You can adjust 50px as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);
  // Scroll listener to update navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // adjust scroll position as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = isHome
    ? scrolled
      ? "bg-white text-black shadow"
      : "bg-transparent text-white"
    : "bg-white text-black shadow";

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships">All Scholarships</NavLink>
      </li>
      {!roleLoading && user && role === "user" && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      {!roleLoading && role === "admin" && (
        <li>
          <NavLink to="/dashboard">Admin Dashboard</NavLink>
        </li>
      )}
      {!roleLoading && role === "moderator" && (
        <li>
          <NavLink to="/dashboard">Moderator Dashboard</NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged Out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error", "Logout failed. Try again.", "error");
          });
      }
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${navbarClass}`}
    >
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow text-black"
            >
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              
              <div className="avatar tooltip w-10 tooltip-left" data-tip={user?.displayName}>
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img
                    src={
                      user?.photoURL
                        ? user?.photoURL
                        : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                    }
                    alt="user"
                  />
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="btn btn-outline shadow-none hover:bg-primary hover:text-white rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"} className="btn btn-outline shadow-none hover:bg-primary hover:text-white rounded-full">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
