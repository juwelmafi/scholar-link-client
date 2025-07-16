import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useUserRole from "../../hooks/useUserRole";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships">All Scholarships</NavLink>
      </li>
      {!roleLoading && user  && role === "user" &&  (
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
          <NavLink to="/dashboard">Modarator Dashboard</NavLink>
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
      confirmButtonColor: "#10B981", // emerald
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
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-base-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              Scholar Link
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div>
                <div className="avatar w-10">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                      }
                    />
                  </div>
                </div>
                <button onClick={handleLogOut} className="btn ml-3">
                  Logout
                </button>
              </div>
            ) : (
              <Link to={"/login"} className="btn">
                Singin
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
