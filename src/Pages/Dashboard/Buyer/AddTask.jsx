import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { PiCoinsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";

function AddTaskForm() {
  const { user, signout } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [submissionError, setSubmissionError] = useState(null);

  // Watch required_workers for real-time validation
  const requiredWorkers = watch("required_workers");

  // Fetch user data to get available coins
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setSubmissionError(null); // Clear previous errors
    data.required_workers = parseInt(data.required_workers);
    data.payable_amount = parseInt(data.payable_amount);
    const calculatedTotal = data.required_workers * data.payable_amount;

    // Check if user has enough coins
    if (calculatedTotal > (userData?.coin || 0)) {
      setTotalAmount(calculatedTotal);
      setShowPopup(true);
      return;
    }

    // Image upload to ImgBB
    try {
      const imageFile = data.task_image[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_apiKey_imagebb
        }`,
        formData
      );
      if (!res.data.success) {
        throw new Error("Image upload failed");
      }
      data.task_image = res.data.data.url; // Store the image URL
    } catch (err) {
      console.error("Image upload error:", err);
      setSubmissionError("Failed to upload image. Please try again.");
      toast.error("Failed to upload image. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Submit task to backend
    try {
      const taskData = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        required_workers: data.required_workers,
        payable_amount: data.payable_amount,
        total_amount: calculatedTotal,
        completion_date: data.completion_date,
        submission_info: data.submission_info,
        task_image: data.task_image,
        user_email: user.email,
      };
      const res = await axiosSecure.post("/tasks", taskData);
      console.log("Task created:", res.data);
      reset(); // Reset form after successful submission
      setImagePreview(null); // Clear image preview
      toast.success("Task created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      await refetch(); // Refetch user data to update coin balance
    } catch (error) {
      console.error("Task submission error:", error);
      setSubmissionError("Failed to create task. Please try again.");
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/log-reg/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700">
            Add New Task
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-700">
              Available Coins
            </h3>
            <div className="flex items-center">
              <PiCoinsFill size={20} className="text-indigo-600" />
              <h3 className="font-bold ml-1 text-indigo-600">
                {isLoading ? "Loading..." : userData?.coin || "0"}
              </h3>
            </div>
          </div>
        </div>

        {submissionError && (
          <div className="text-red-500 text-sm mb-4">{submissionError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("task_title", { required: true })}
              placeholder="Task Title"
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
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
            />
            {errors.task_detail && (
              <span className="text-red-500 text-sm mt-1">
                Task detail is required
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                id="required_workers"
                type="number"
                {...register("required_workers", { required: true, min: 1 })}
                placeholder="Required Workers"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              {errors.required_workers && (
                <span className="text-red-500 text-sm mt-1">
                  Must be a positive number
                </span>
              )}
            </div>
            <div>
              <input
                type="number"
                {...register("payable_amount", {
                  required: true,
                  min: 1,
                  validate: (value) =>
                    isLoading ||
                    parseInt(value) * parseInt(requiredWorkers || 1) <=
                      (userData?.coin || 0) ||
                    `Cannot exceed available coins (${userData?.coin || 0})`,
                })}
                placeholder="Payable Amount"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              {errors.payable_amount?.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Payable amount is required
                </span>
              )}
              {errors.payable_amount?.type === "min" && (
                <span className="text-red-500 text-sm mt-1">
                  Must be a positive number
                </span>
              )}
              {errors.payable_amount?.type === "validate" && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.payable_amount.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <input
              type="date"
              {...register("completion_date", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {errors.completion_date && (
              <span className="text-red-500 text-sm mt-1">
                Completion date is required
              </span>
            )}
          </div>

          <div>
            <input
              {...register("submission_info", { required: true })}
              placeholder="What to submit (e.g., Screenshot, Proof)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            {errors.submission_info && (
              <span className="text-red-500 text-sm mt-1">
                Submission info is required
              </span>
            )}
          </div>

          <div>
            <input
              type="file"
              {...register("task_image", { required: true })}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            />
            {errors.task_image && (
              <span className="text-red-500 text-sm mt-1">
                Please upload an image
              </span>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Add Task"}
          </button>
        </form>

        {/* Popup for insufficient funds */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-red-600 mb-4">
                Insufficient Funds
              </h3>
              <p className="text-gray-700 mb-2">
                You don't have enough coins to create this task.
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Required Coins:</span>{" "}
                {totalAmount}
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Available Coins:</span>{" "}
                {userData?.coin || 0}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Edit Form
                </button>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Change User
                </button>
                <button
                  onClick={() => navigate("/purchase-coins")}
                  className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Purchase Coins
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTaskForm;
