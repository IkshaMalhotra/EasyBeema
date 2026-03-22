import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import OtpPopup from "../../components/OtpPopup";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setShowOtpPopup(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-[#e8f6fd] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden">

        {/* Left — signup form */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 px-8 py-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Get Started Now</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your details to create your account</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={inputClass}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
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
                  placeholder="Create a password"
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
            </div>

            <Button text="Sign Up with OTP" type="submit" variant="primary" size="medium" className="w-full mt-1" />
          </form>

          <p className="text-sm text-gray-500 text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#019de3] font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right — illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#f0faff] px-8">
          <img
            src="/images/img_insurancemarket.png"
            alt="Insurance advisor"
            className="w-[180px] lg:w-[220px] h-auto object-contain"
          />
        </div>
      </div>

      {/* OTP Popup */}
      <OtpPopup isOpen={showOtpPopup} onClose={() => { setShowOtpPopup(false); navigate("/"); }} />
    </div>
  );
};

export default Signup;
