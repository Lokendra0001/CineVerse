import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import { FiFilm, FiGift, FiLock } from "react-icons/fi";
import { handleErrorMsg, handleSuccessMsg } from "../config/toast";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../store/slices/userSlice";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/user/signup", data, {
        withCredentials: true,
      });
      console.log(res);
      handleSuccessMsg(res.data.message);
      dispatch(addUser(res.data.user));
      navigate(-1);
    } catch (err) {
      handleErrorMsg(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl flex overflow-hidden">
        {/* Left Side - Minimal Branding */}
        <div className="hidden md:flex flex-col bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-12 w-2/5 justify-center space-y-6">
          <h1 className="text-3xl font-semibold text-center tracking-wide">
            CineVerse
          </h1>

          <div className="flex items-center space-x-3 text-sm opacity-85 mt-5">
            <FiFilm className="text-xl" />
            <span>Real-time seat selection</span>
          </div>

          <div className="flex items-center space-x-3 text-sm opacity-85">
            <FiGift className="text-xl" />
            <span>Exclusive offers & discounts</span>
          </div>

          <div className="flex items-center space-x-3 text-sm opacity-85">
            <FiLock className="text-xl" />
            <span>Secure payments</span>
          </div>

          <NavLink
            to={"/login"}
            className="mt-auto cursor-pointer bg-white text-blue-700 py-3 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center space-x-2"
          >
            <FaSignInAlt />
            <span> Sign In</span>
          </NavLink>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-10 w-full md:w-3/5 text-gray-800">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Create Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700"
              >
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4.5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.name && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-4.5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-4.5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4.5 text-gray-500 hover:text-blue-600"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-10 cursor-pointer rounded-lg text-white font-semibold ${
                isLoading
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90"
              } transition`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
