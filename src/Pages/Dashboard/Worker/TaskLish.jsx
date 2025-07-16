import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaTasks } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const TaskList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get("/tasks/worker");
      return response.data.filter((task) => task.required_workers > 0);
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(
        `Error fetching tasks: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <FaTasks className="mr-2" /> Available Tasks
        </h1>
        <p className="text-gray-500">Please log in to view available tasks.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleClick = (task) => {
    navigate(`/Dashboard/task/${task._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaTasks className="mr-2" /> Available Tasks
      </h1>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">
                  {task.task_title}
                </h2>
                <p>
                  <strong>Buyer:</strong> {task.user_email}
                </p>
                <p>
                  <strong>Completion Date:</strong>{" "}
                  {new Date(task.completion_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Payable Amount:</strong> {task.payable_amount} Coins
                </p>
                <p>
                  <strong>Workers Needed:</strong> {task.required_workers}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClick(task)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
