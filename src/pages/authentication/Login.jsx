import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-[#e8f6fd] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden">

        {/* Left — credentials form */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 px-8 py-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Welcome back!</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className={inputClass}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" className="text-xs text-[#019de3] hover:underline mt-1">
                  Forgot password?
                </button>
              </div>
            </div>

            <Button text="Login" type="submit" variant="primary" size="medium" className="w-full mt-1" />
          </form>
        </div>

        {/* Divider */}
        <div className="hidden md:flex items-center justify-center px-2">
          <div className="h-48 w-px bg-gray-200" />
        </div>

        {/* Right — social login */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 px-8 py-10">
          <p className="text-sm font-medium text-gray-600 text-center mb-2">Or continue with</p>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <FaGoogle className="text-[#DB4437] w-4 h-4" />
            Sign in with Google
          </button>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <FaFacebook className="text-[#1877F2] w-4 h-4" />
            Sign in with Facebook
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#019de3] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
