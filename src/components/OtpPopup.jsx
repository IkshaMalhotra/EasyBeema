import React, { useState } from "react";

const OtpPopup = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1 = mobile input, 2 = OTP input
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  if (!isOpen) return null; // Hide popup if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gradient-to-b from-white to-sky-50 p-6 rounded-2xl shadow-lg w-full max-w-sm">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">OTP Verification</h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your Mobile Number to receive the OTP
            </p>
            <input
              type="text"
              placeholder="Enter your number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400 mb-4"
            />
            <button
              onClick={() => setStep(2)}
              className="w-full py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              Get OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">OTP Verification</h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter the OTP sent to your mobile number
            </p>
            <div className="flex gap-2 justify-center mb-4">
              {[...Array(4)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-400"
                  onChange={(e) => {
                    let val = e.target.value;
                    setOtp((prev) => prev + val);
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mb-2">
              Didn’t receive the OTP?{" "}
              <button className="text-sky-500 hover:underline">Resend OTP</button>
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpPopup;
