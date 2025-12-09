import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function PaymentCompleted() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const orderId = state?.orderId || "PB146577838";   // demo order ID
    const premium = state?.premium || 988;             // demo premium
    const name = state?.name || "Customer";

    return (
        <div className="min-h-screen bg-[#f4f9ff] px-6 py-10 flex flex-col items-center">

            {/* Header */}
            <img src="/images/EasyBeema.png" alt="EasyBeema" className="h-16 mb-8" />

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full text-center border border-gray-200">

                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800">Payment Successful</h1>
                <p className="text-gray-500 mt-2">Congratulations {name}, your policy has been issued.</p>

                {/* Receipt Summary */}
                <div className="mt-6 text-left bg-[#f1f9ff] p-5 rounded-lg border border-[#cfeaff]">
                    <p className="text-gray-700"><strong>Order Number:</strong> {orderId}</p>
                    <p className="text-gray-700 mt-2"><strong>Total Paid:</strong> ₹{premium}</p>
                    <p className="text-gray-700 mt-2"><strong>Status:</strong> Policy Activated</p>
                </div>

                {/* Download Receipt */}
                <button className="w-full mt-6 py-3 bg-[#03a9f4] text-white font-medium rounded-md">
                    Download Receipt
                </button>

                {/* Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-3 py-3 bg-white border font-medium rounded-md"
                >
                    Go to Dashboard
                </button>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-10">© 2025 EasyBeema. All Rights Reserved.</p>
        </div>
    );
}
