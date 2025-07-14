import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../Assets/standard.0638957.png";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../Provider/useAxios";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login, user, setUser, googleLogin } = use(AuthContext);
  const useaxios = useAxios();
  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);
      console.log("Login Success:", res);

      const loginUser = {
        email: data.email,
        last_login: new Date().toLocaleString(),
      };

      const response = await useaxios.post("/users", loginUser);
      console.log("User updated:", response.data);

      navigate("/");
      setUser(res.user);
    } catch (err) {
      console.error("Login Failed:", err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      console.log("Google Login Success:", res.user);

      const loginUser = {
        email: res.user.email,
        created_at: new Date().toLocaleString(),
        last_login: new Date().toLocaleString(),
        role: "user",
        coin: 50,
      };

      const response = await useaxios.post("/users", loginUser);
      console.log("users saved to DB:", response.data);
      navigate("/");
      setUser(res.user);
    } catch (error) {
      console.error("Google Login Failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="flex flex-col lg:flex-row max-w-4xl w-full bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="lg:w-1/2 w-full">
          <img
            className="w-full h-64 lg:h-full object-cover"
            src={loginImage}
            alt="Login illustration"
          />
        </div>
        <div className="lg:w-1/2 w-full  flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
          <form className="p-4 " onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label justify-center">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
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
            <div className="form-control">
              <label className="label justify-center">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
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
            <div className="flex justify-center">
              <Link to="/forgot-password" className="link link-primary text-sm">
                Forgot Password?
              </Link>
              or
              <Link
                to={"/log-reg/register"}
                className="ml-1 link link-primary text-sm"
              >
                Register
              </Link>
            </div>
            <button
              type="submit"
              className="btn mt-2 btn-primary w-full bg-lime-600 border-none"
            >
              Login
            </button>
          </form>
          <div className="divider my-6 max-w-sm mx-auto">Or continue with</div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full max-w-sm mx-auto flex items-center justify-center gap-2"
          >
            <FcGoogle size={24} />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
