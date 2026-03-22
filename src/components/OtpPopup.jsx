import React, { useState, useRef, useEffect } from "react";

/**
 * OTP verification popup with 2 steps:
 * Step 1 — enter mobile number
 * Step 2 — enter 4-digit OTP (individual boxes with auto-focus)
 */
const OtpPopup = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setMobile("");
      setOtp(["", "", "", ""]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle OTP input with auto-advance to next box
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1); // one digit per box
    setOtp(updated);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to go to previous box
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">

        {/* Close button */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">OTP Verification</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {step === 1
                ? "Enter your mobile number to receive the OTP"
                : `OTP sent to +91 ${mobile}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#019de3]">
              <span className="px-3 py-3 bg-gray-50 text-sm text-gray-500 border-r border-gray-200">+91</span>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/, "").slice(0, 10))}
                className="flex-1 px-3 py-3 text-sm text-gray-700 focus:outline-none"
                maxLength={10}
              />
            </div>
            <button
              onClick={() => mobile.length === 10 && setStep(2)}
              disabled={mobile.length !== 10}
              className="w-full py-3 rounded-lg bg-[#019de3] text-white text-sm font-medium hover:bg-[#0289c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get OTP
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* OTP boxes */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent"
                />
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Didn't receive the OTP?{" "}
              <button
                className="text-[#019de3] hover:underline font-medium"
                onClick={() => setOtp(["", "", "", ""])}
              >
                Resend OTP
              </button>
            </p>

            <button
              onClick={onClose}
              disabled={otp.some((d) => d === "")}
              className="w-full py-3 rounded-lg bg-[#019de3] text-white text-sm font-medium hover:bg-[#0289c7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify & Sign Up
            </button>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-gray-400 text-center hover:text-gray-600"
            >
              ← Change mobile number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpPopup;
