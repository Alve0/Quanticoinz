import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaArrowLeft, FaTasks, FaPaperPlane } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [submissionDetails, setSubmissionDetails] = useState("");

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id, user?.email],
    queryFn: async () => {
      if (!user) return null;
      const response = await axiosSecure.get(`/tasks/${id}`);
      return response.data;
    },
    enabled: !!user,
    retry: false, // Disable retries to handle 404 explicitly
  });

  const submitTaskMutation = useMutation({
    mutationFn: async () => {
      if (!submissionDetails.trim()) {
        throw new Error("Submission details are required");
      }
      const submissionData = {
        task_id: id,
        task_title: task.task_title,
        payable_amount: task.payable_amount,
        worker_email: user.email,
        worker_name: user.displayName || "Unknown Worker",
        buyer_name: task.user_email,
        buyer_email: task.user_email,
        submission_details: submissionDetails,
        submission_date: new Date().toISOString(),
        status: "pending",
      };
      const response = await axiosSecure.post("/submissions", submissionData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Submission sent successfully!");
      setSubmissionDetails("");
      navigate("/Dashboard/tasklist");
    },
    onError: (error) => {
      toast.error(
        "Error submitting task: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTaskMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">
          Error fetching task details:{" "}
          {error.response?.data?.message || error.message}
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/Dashboard/tasklist")}
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500">Please log in to view task details.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500">Task not found.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/Dashboard/tasklist")}
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        className="btn btn-ghost mb-4 flex items-center"
        onClick={() => navigate("/Dashboard/tasklist")}
      >
        <FaArrowLeft className="mr-2" /> Back to Tasks
      </button>
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold flex items-center">
            <FaTasks className="mr-2" /> {task.task_title}
          </h2>
          <p>
            <strong>Task ID:</strong> {task._id}
          </p>
          <p>
            <strong>Buyer:</strong> {task.user_email}
          </p>
          <p>
            <strong>Details:</strong> {task.task_detail}
          </p>
          <p>
            <strong>Completion Date:</strong>{" "}
            {new Date(task.completion_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Payable Amount:</strong> {task.payable_amount} Coins
          </p>
          <p>
            <strong>Total Amount:</strong> {task.total_amount} Coins
          </p>
          <p>
            <strong>Workers Needed:</strong> {task.required_workers}
          </p>
          <p>
            <strong>Submission Info:</strong> {task.submission_info}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(task.created_at).toLocaleString()}
          </p>
          {task.task_image && (
            <div className="mt-4">
              <img
                src={task.task_image}
                alt="Task"
                className="w-full max-w-md rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400"; // Fallback image
                  toast.error("Failed to load task image");
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaPaperPlane className="mr-2" /> Submit Your Work
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Submission Details</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Enter your submission details (e.g., screenshot link or description)"
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                rows={5}
                required
              ></textarea>
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  submitTaskMutation.isLoading ||
                  task.status !== "pending" ||
                  task.required_workers <= 0
                }
              >
                {submitTaskMutation.isLoading ? "Submitting..." : "Submit Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
