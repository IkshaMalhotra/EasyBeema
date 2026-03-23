import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function PaymentCompleted() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId = state?.orderId || "PB146577838";
  const premium = state?.premium || 988;
  const name = state?.name || "Customer";
  const planTitle = state?.planTitle || "Your Insurance Plan";

  return (
    <div className="min-h-screen bg-[#f4f9ff] flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <Link to="/">
        <img src="/images/EasyBeema.png" alt="EasyBeema" className="h-14 mb-8" />
      </Link>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-md text-center">

        {/* Success icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-500 text-sm mt-2">
          Congratulations <strong>{name}</strong>, your policy has been issued successfully.
        </p>

        {/* Receipt */}
        <div className="mt-6 text-left bg-[#f0faff] rounded-xl border border-[#cceeff] p-5 flex flex-col gap-3">
          {[
            { label: "Order Number", value: orderId },
            { label: "Plan", value: planTitle },
            { label: "Total Paid", value: `₹${premium}` },
            { label: "Status", value: "Policy Activated ✓" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <button className="w-full py-3 bg-[#019de3] text-white font-medium rounded-xl hover:bg-[#0289c7] transition-colors text-sm">
            Download Policy Document
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-8">© {new Date().getFullYear()} EasyBeema. All Rights Reserved.</p>
    </div>
  );
}