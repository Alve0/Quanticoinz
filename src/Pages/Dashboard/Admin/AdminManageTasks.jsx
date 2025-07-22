import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const AdminManageTasks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const res = await axiosSecure.get("/admin/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks");
        toast.error("Failed to fetch tasks");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [axiosSecure]);

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axiosSecure.delete(`/admin/tasks/${taskId}`);
        toast.success("Task deleted successfully");
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (err) {
        console.error("Error deleting task:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to delete task";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 shadow rounded-lg bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
      {isLoading ? (
        <Loading />
      ) : tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Required Workers</th>
                <th>Payable Amount</th>
                <th>Total Amount</th>
                <th>Completion Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>{task.required_workers}</td>
                  <td>${task.payable_amount}</td>
                  <td>${task.total_amount}</td>
                  <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete Task
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

export default AdminManageTasks;
