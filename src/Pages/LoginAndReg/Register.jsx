import React, { use } from "react";
import regImage from "../../Assets/standard.0638957.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

import useAxios from "../../Provider/useAxios";

function Register() {
  const useaxios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, profileUpdate, user, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // 1. Upload image to imgbb
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_apiKey_imagebb
        }`,
        formData
      );
      const imageURL = res.data.data.display_url;

      // 2. Register user with Firebase
      const firebaseRes = await createUser(data.email, data.password);
      setUser(firebaseRes.user);

      // 3. Update Firebase profile
      await profileUpdate(data.name, imageURL);

      // 4. Save to your backend database
      const userDoc = {
        name: data.name,
        email: data.email,
        role: data.role,
        photoURL: imageURL, // ✅ Save image URL here
        created_at: new Date().toLocaleString(),
        last_login: new Date().toLocaleString(),
        coin: data.role === "worker" ? 10 : 50,
      };

      const dbRes = await useaxios.post("/users", userDoc);
      console.log("User saved to DB:", dbRes.data);

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  if (user !== null) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={regImage}
            className="w-full h-full object-cover"
            alt="Registration"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h3>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                name="name"
                placeholder="Enter your name"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`input mb-2 input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-error text-sm mt-1 text-center">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Profile Picture
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Image is required",
                })}
                accept="image/*"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`input mb-2 input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-error text-sm mt-1 text-center">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                {...register("role", {
                  required: "User role is required",
                })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="Select a role" disabled selected>
                  Select a role
                </option>
                <option value="worker">Worker</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-lime-600 text-white py-2 rounded-md hover:bg-lime-700 transition-colors"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/log-reg/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
