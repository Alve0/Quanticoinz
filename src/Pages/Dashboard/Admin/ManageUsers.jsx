import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
        toast.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosSecure.delete(`/admin/users/${userId}`);
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to delete user";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  // Handle role update
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/admin/users/${userId}/role`, { role: newRole });
      toast.success("User role updated successfully");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Error updating user role:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to update user role";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 shadow rounded-lg bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Role</th>
                <th>Coins</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.display_name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.photo_url ? (
                      <img
                        src={user.photo_url}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <select
                      className="select select-bordered"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  </td>
                  <td>{user.coin || 0}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
