import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecurity from "../../../hooks/UseAxiosSecurity";
import Loading from "../../../shared/Loading";
import { FaTrash } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecurity();
  const [roleFilter, setRoleFilter] = useState("all");
  // Fetch all users
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
      document.title = `Manage Users | ScholarLink`;
      return () => {
        document.title = "ScholarLink";
      };
    }, []);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("User role updated!");
        refetch(); // from useQuery
      }
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="mx-auto w-full px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">Manage Users</h2>
      <div className="flex justify-end mb-4">
        <select
          className="select select-bordered select-sm"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-sky-50 text-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) => roleFilter === "all" || user.role === roleFilter
              )
              .map((user, index) => (
                <tr key={user._id} className="text-xs md:text-sm">
                  <td>{index + 1}</td>
                  <td>{user.name || "Unknown"}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash></FaTrash> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
