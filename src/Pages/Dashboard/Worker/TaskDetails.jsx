import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaArrowLeft, FaTasks, FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import Loading from "../../Loading/Loading";

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
    retry: false,
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

  if (isLoading) return <Loading />;

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
      {/* Back Button */}
      <button
        className="btn btn-outline mb-6 flex items-center gap-2"
        onClick={() => navigate("/Dashboard/tasklist")}
      >
        <FaArrowLeft /> Back to Task List
      </button>

      {/* Task Details */}
      <div className="card bg-white shadow-2xl rounded-xl mb-8 p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <FaTasks /> Task Details
        </h2>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Title:</span> {task.task_title}
            </p>
            <p>
              <span className="font-semibold">Buyer:</span> {task.user_email}
            </p>
            <p>
              <span className="font-semibold">Task ID:</span> {task._id}
            </p>
            <p>
              <span className="font-semibold">Completion Date:</span>{" "}
              {new Date(task.completion_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(task.created_at).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Payable Amount:</span>{" "}
              <span className="badge badge-success">
                💰 {task.payable_amount} Coins
              </span>
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span>{" "}
              <span className="badge badge-info">
                💰 {task.total_amount} Coins
              </span>
            </p>
            <p>
              <span className="font-semibold">Workers Needed:</span>{" "}
              <span className="badge badge-warning">
                👥 {task.required_workers}
              </span>
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ${
                  task.status === "pending" ? "badge-warning" : "badge-success"
                }`}
              >
                {task.status}
              </span>
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="divider mt-6 mb-4">Task Description</div>
        <p className="mb-4 text-gray-700">{task.task_detail}</p>

        {/* Submission Instructions */}
        {task.submission_info && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
            <h4 className="font-semibold mb-2 text-blue-700">
              📌 Submission Instructions
            </h4>
            <p className="text-gray-800">{task.submission_info}</p>
          </div>
        )}

        {/* Task Image */}
        {task.task_image && (
          <div className="mt-6 flex justify-center">
            <img
              src={task.task_image}
              alt="Task"
              className="w-full max-w-md rounded-lg border shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Submission Form */}
      <div className="card bg-white shadow-xl rounded-xl p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaPaperPlane className="text-primary" /> Submit Your Work
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label font-semibold">Submission Details</label>
            <textarea
              className="textarea textarea-bordered h-28 rounded-lg"
              placeholder="Enter your submission details (e.g., screenshot link, description)"
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="btn btn-primary px-6 rounded-full shadow-md hover:shadow-lg"
              disabled={
                submitTaskMutation.isLoading ||
                task.status !== "pending" ||
                task.required_workers <= 0
              }
            >
              {submitTaskMutation.isLoading
                ? "Submitting..."
                : "🚀 Submit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
