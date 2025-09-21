import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OtpPopup from "../../components/OtpPopup";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-primary-light flex flex-col">
      <div className="flex mt-5 items-center justify-center px-6">
        <div className="w-full max-w-4xl bg-white/0 rounded-lg flex flex-col md:flex-row items-center justify-between shadow-none">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 flex flex-col gap-3 px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Get Started Now
            </h2>
            <p className="text-sm text-gray-500">
              Enter your details to create your account
            </p>

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">E-mail</label>
              <input
                type="text"
                placeholder="Enter your e-mail"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {/* Password with Show/Hide */}
            <div className="relative">
              <label className="text-sm text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* SignUp Button */}
            <Button
              text="Sign Up with OTP"
              text_font_size="16px"
              text_line_height="18px"
              text_color="#000000bf"
              text_font_family="Roboto"
              text_font_weight="400"
              fill_background_color="#f3fbff"
              border_border_radius="34px"
              effect_box_shadow="3px 3px 4px #469cd2a8"
              className="w-full"
              layout_width="100%"
              margin="0"
              position="static"
              variant="primary"
              size="medium"
              onClick={() => setShowOtpPopup(true)}
            />
          </div>

          {/* Right side - Illustration */}
          <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-8">
            <img
              src="/images/img_insurancemarket.png"
              alt="Insurance advisor character"
              className="w-[160px] h-[340px] sm:w-[180px] sm:h-[380px] lg:w-[220px] lg:h-[460px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* OTP Popup */}
      <OtpPopup isOpen={showOtpPopup} onClose={() => setShowOtpPopup(false)} />
    </div>
  );
};

export default Signup;
