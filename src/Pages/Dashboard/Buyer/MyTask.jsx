import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PiCoinsFill } from "react-icons/pi";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

function MyTasks() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form for updating task
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch user data for coin display
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  // Fetch user's tasks
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/user/${user.email}`);
      return res.data.sort(
        (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
      );
    },
  });

  // Handle task deletion
  const handleDelete = async (taskId, status, totalAmount) => {
    try {
      const res = await axiosSecure.delete(`/tasks/${taskId}`, {
        data: { user_email: user.email, status, total_amount: totalAmount },
      });
      toast.success("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      await refetchTasks(); // Refetch tasks
      if (status === "pending") {
        await refetchUser(); // Refetch user data for coin update
      }
    } catch (error) {
      console.error("Delete task error:", error);
      toast.error("Failed to delete task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Open update modal with task data
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
    reset({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  // Handle task update
  const onUpdate = async (data) => {
    try {
      const updatedTask = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        submission_info: data.submission_info,
        user_email: user.email,
      };
      const res = await axiosSecure.put(
        `/tasks/${selectedTask._id}`,
        updatedTask
      );
      toast.success("Task updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      await refetchTasks();
      setShowUpdateModal(false);
      setSelectedTask(null);
      reset();
    } catch (error) {
      console.error("Update task error:", error);
      toast.error("Failed to update task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            My Tasks
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">
              Available Coins
            </h3>
            <div className="flex items-center">
              <PiCoinsFill size={20} className="text-indigo-600" />
              <h3 className="font-bold ml-1 text-indigo-600">
                {userLoading ? "Loading..." : userData?.coin || "0"}
              </h3>
            </div>
          </div>
        </div>

        {tasksLoading ? (
          <div className="text-center text-gray-600">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-600">No tasks found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-indigo-700">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Details</th>
                  <th className="px-4 py-2 text-center">Workers</th>
                  <th className="px-4 py-2 text-center">Payable</th>
                  <th className="px-4 py-2 text-center">Total</th>
                  <th className="px-4 py-2 text-center">Completion</th>
                  <th className="px-4 py-2 text-left">Submission</th>
                  <th className="px-4 py-2 text-center">Image</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 truncate max-w-xs">
                      {task.task_title}
                    </td>
                    <td className="px-4 py-2 truncate max-w-xs">
                      {task.task_detail}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {task.required_workers}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {task.payable_amount}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {task.total_amount}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(task.completion_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 truncate max-w-xs">
                      {task.submission_info}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={task.task_image}
                        alt="Task"
                        className="h-12 w-12 object-contain mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-center capitalize">
                      {task.status}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => openUpdateModal(task)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 mr-2"
                        disabled={task.status === "completed"}
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(task._id, task.status, task.total_amount)
                        }
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">
                Update Task
              </h3>
              <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
                <div>
                  <input
                    {...register("task_title", { required: true })}
                    placeholder="Task Title"
                    defaultValue={selectedTask?.task_title}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  {errors.task_title && (
                    <span className="text-red-500 text-sm mt-1">
                      Task title is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("task_detail", { required: true })}
                    placeholder="Task Details"
                    defaultValue={selectedTask?.task_detail}
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                  {errors.task_detail && (
                    <span className="text-red-500 text-sm mt-1">
                      Task detail is required
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("submission_info", { required: true })}
                    placeholder="What to submit (e.g., Screenshot, Proof)"
                    defaultValue={selectedTask?.submission_info}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  {errors.submission_info && (
                    <span className="text-red-500 text-sm mt-1">
                      Submission info is required
                    </span>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUpdateModal(false);
                      setSelectedTask(null);
                      reset();
                    }}
                    className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;
