import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_TITLES } from "../../constants/insurance";

const BANKS = [
  { id: "hdfc", label: "HDFC Bank" },
  { id: "icici", label: "ICICI Bank" },
  { id: "sbi", label: "SBI" },
  { id: "kotak", label: "Kotak Mahindra" },
  { id: "pnb", label: "Punjab National Bank" },
  { id: "bob", label: "Bank of Baroda" },
];

export default function PaymentPortal() {
  const navigate = useNavigate();
  const { state = {} } = useLocation();

  const form = state.form || { fullName: "", email: "", mobile: "" };
  const plan = state.plan || { vendorLogo: "/images/HDFCinsurance.png", priceMonthly: 988 };
  const billingCycle = state.billingCycle || "Monthly";
  const basePrice = state.price ?? (billingCycle === "Monthly" ? plan.priceMonthly : plan.priceYearly || plan.priceMonthly * 12);
  const productTitle = state?.productTitle || plan?.title || PRODUCT_TITLES[state?.productId] || "Insurance";

  const [method, setMethod] = useState("netbanking");
  const [selectedBank, setSelectedBank] = useState(null);
  const [otherBank, setOtherBank] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    if (method === "netbanking" && !selectedBank && !otherBank) {
      alert("Please select a bank to continue.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      navigate("/payment-completed", {
        state: {
          orderId: "PB" + Date.now().toString().slice(-9),
          premium: basePrice,
          name: form.fullName,
          planTitle: plan.title,
        },
      });
    }, 1200);
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent";

  const navMethods = [
    { id: "netbanking", label: "Net Banking" },
    { id: "upi", label: "UPI Emandate" },
    { id: "card", label: "Credit Card" },
    { id: "debit", label: "Debit Card" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f8ff] px-4 py-8">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Link to="/">
            <img src="/images/EasyBeema.png" alt="logo" className="h-11" />
          </Link>
          <p className="text-xs text-gray-400">{productTitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left — payment chooser */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

              {/* Progress bar */}
              <div className="mb-5 flex items-center gap-2 text-xs text-center">
                {["Payment Mode", "Payment Complete", "Setup Autopay"].map((step, i) => (
                  <React.Fragment key={step}>
                    <div className={`flex-1 py-2 rounded-lg font-medium ${i === 0 ? "bg-[#019de3] text-white" : "bg-gray-100 text-gray-400"}`}>
                      {step}
                    </div>
                    {i < 2 && <span className="text-gray-300">›</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex gap-4">
                {/* Method nav */}
                <nav className="w-44 flex-shrink-0">
                  <ul className="flex flex-col gap-1">
                    {navMethods.map((m) => (
                      <li key={m.id}>
                        <button
                          onClick={() => setMethod(m.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                            method === m.id
                              ? "bg-[#f0faff] text-[#019de3] font-semibold border border-[#cceeff]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {m.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Payment form */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-700 mb-4">
                    {method === "netbanking" && "Select your Bank"}
                    {method === "upi" && "UPI Emandate"}
                    {method === "card" && "Credit Card Details"}
                    {method === "debit" && "Debit Card Details"}
                  </h3>

                  {method === "netbanking" && (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {BANKS.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => { setSelectedBank(b.id); setOtherBank(""); }}
                            className={`p-3 border rounded-xl text-left text-sm flex items-center gap-3 transition-all ${
                              selectedBank === b.id
                                ? "border-[#019de3] bg-[#f0faff] shadow-sm"
                                : "border-gray-200 hover:border-[#019de3]"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                              {b.label[0]}
                            </div>
                            <span className="text-gray-700">{b.label}</span>
                          </button>
                        ))}
                      </div>
                      <select
                        value={otherBank}
                        onChange={(e) => { setOtherBank(e.target.value); setSelectedBank(null); }}
                        className={inputClass}
                      >
                        <option value="">Select Another Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="indusind">IndusInd Bank</option>
                        <option value="idbi">IDBI Bank</option>
                      </select>
                    </>
                  )}

                  {method === "upi" && (
                    <div>
                      <p className="text-sm text-gray-500 mb-4">You'll be redirected to your UPI app to approve the recurring mandate.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {["PhonePe", "Google Pay", "Paytm", "BHIM"].map((app) => (
                          <button key={app} className="p-4 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#019de3] hover:bg-[#f0faff] transition-colors">
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {(method === "card" || method === "debit") && (
                    <div className="flex flex-col gap-3">
                      <input className={inputClass} placeholder="Card Number" maxLength={19} />
                      <div className="flex gap-3">
                        <input className={inputClass} placeholder="MM / YY" />
                        <input className={`${inputClass} w-28`} placeholder="CVV" maxLength={3} />
                      </div>
                      <input className={inputClass} placeholder="Name on Card" />
                    </div>
                  )}

                  <button
                    disabled={processing}
                    onClick={handlePay}
                    className="w-full mt-5 bg-[#019de3] text-white py-3 rounded-xl text-base font-semibold hover:bg-[#0289c7] transition-colors disabled:opacity-60"
                  >
                    {processing ? "Processing…" : `Pay ₹${basePrice}`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right — order summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={plan.vendorLogo} alt="logo" className="h-10 w-auto" />
                <div>
                  <p className="text-xs text-gray-400">Order Number</p>
                  <p className="text-sm font-medium text-gray-700">PB{Date.now().toString().slice(-8)}</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Premium</span>
                <span className="text-base font-bold text-gray-800">₹{basePrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Max Recurring Amount</span>
                <span>₹{Math.round(basePrice * 1.15)}</span>
              </div>

              <div className="bg-[#f8fbff] rounded-lg p-3 text-sm text-gray-600 border border-[#e0f0fa]">
                <span className="font-medium">Pay Frequency:</span>
                <span className="block mt-1 font-bold text-gray-800">{billingCycle.toUpperCase()}</span>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-sm border border-green-100">
                <p className="text-gray-600">
                  Your 1st year premium is <strong>₹{basePrice}</strong>. From 2nd year: <strong>₹{Math.round(basePrice * 1.14)}</strong>.
                </p>
                <p className="text-green-600 mt-1 font-medium">You save ₹{Math.round(basePrice * 0.12)} (12%)</p>
              </div>

              <hr className="border-gray-100" />

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Proposer Details</p>
                <div className="text-sm text-gray-700 flex flex-col gap-1">
                  <span>{form.fullName || "—"}</span>
                  <span>{form.mobile || "—"}</span>
                  <span>{form.email || "—"}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
