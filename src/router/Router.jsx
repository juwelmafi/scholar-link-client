import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../routes/PrivateRoute";
import AddScholarship from "../pages/Dashboard/AddScholarship/AddScholarship";
import Scholarships from "../pages/Scholarships/Scholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import ManageScholarships from "../pages/Dashboard/ManageScholarships/ManageScholarships";
import AllAppliedScholarships from "../pages/Dashboard/AllAppliedScholarships/AllAppliedScholarships";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "../routes/AdminModRout";
import AdminModRout from "../routes/AdminModRout";
import ForbiddenAccess from "../pages/Forbidden/Forbidden";
import NotFound from "../pages/NotFound/NotFound";
import AdminAnalytics from "../pages/Dashboard/AdminAnalytics/AdminAnalytics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-scholarships",
        element: <Scholarships />,
      },
      {
        path: "/scholarships/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage></CheckoutPage>,
      },
      {
        path: "/forbidden-access",
        element: <ForbiddenAccess></ForbiddenAccess>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminAnalytics></AdminAnalytics>,
      },
      {
        path: "add-scholarship",
        element: (
          <AdminModRout>
            <AddScholarship />
          </AdminModRout>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminModRout>
            <ManageScholarships></ManageScholarships>
          </AdminModRout>
        ),
      },
      {
        path: "all-applied-shcolarsips",
        element: (
          <AdminModRout>
            <AllAppliedScholarships></AllAppliedScholarships>
          </AdminModRout>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <AdminModRout>
            <AllReviews></AllReviews>
          </AdminModRout>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path:'forbidden-access',
        element: <ForbiddenAccess></ForbiddenAccess>
      }
    ],
  },
]);
