import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_TITLES } from "../../constants/insurance";

export default function ConfirmationPanel() {
  const navigate = useNavigate();
  const { state = {} } = useLocation();

  const incomingForm = state.form || { fullName: "", dob: "", email: "", mobile: "" };
  const incomingPlan = state.plan || { vendorLogo: "/images/HDFCinsurance.png", title: "Insurance Plan", priceMonthly: 988 };
  const billingCycle = state.billingCycle || "Monthly";
  const price = state.price ?? (billingCycle === "Monthly" ? incomingPlan.priceMonthly : incomingPlan.priceYearly);
  const productTitle = state?.productTitle ?? incomingPlan?.title ?? PRODUCT_TITLES[state?.productId] ?? "Insurance Product";

  const [form, setForm] = useState({
    fullName: incomingForm.fullName || "",
    dob: incomingForm.dob || "",
    email: incomingForm.email || "",
    mobile: incomingForm.mobile || "",
    occupation: incomingForm.occupation || "",
    annualIncome: incomingForm.annualIncome || "",
    education: incomingForm.education || "",
  });

  const [additionalOpen, setAdditionalOpen] = useState(true);
  const [declarationsOpen, setDeclarationsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayNow = () => {
    if (!agreed) { alert("Please agree to the terms and conditions."); return; }
    if (!form.fullName || !form.mobile) { alert("Please fill in name and mobile."); return; }

    setSubmitting(true);
    setTimeout(() => {
      navigate("/payment-portal", {
        state: { ...state, form, billingCycle, price, plan: incomingPlan, productTitle },
      });
    }, 300);
  };

  const inputClass = "w-full border border-[#cceeff] rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent";

  return (
    <div className="min-h-screen bg-[#f8fbff] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <Link to="/">
            <img src="/images/EasyBeema.png" alt="logo" className="h-11" />
          </Link>
          <p className="text-xs text-gray-400">{productTitle}</p>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Plan info */}
          <div className="flex items-center gap-4 mb-2">
            <img src={incomingPlan.vendorLogo} alt="vendor" className="h-10 w-auto" />
            <h2 className="text-base font-semibold text-red-500">{incomingPlan.title}</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Please review your details carefully. These <strong>cannot be changed</strong> at a later stage.
          </p>

          {/* Primary details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
            <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className={inputClass} />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={inputClass} />
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className={inputClass} />
          </div>

          {/* Accordion — additional details */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setAdditionalOpen(!additionalOpen)}
              className="w-full text-left border border-[#cceeff] rounded-lg px-4 py-3 flex justify-between items-center hover:bg-[#f0faff] transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Additional Details</span>
              <span className="text-gray-400 text-sm">{additionalOpen ? "▾" : "▸"}</span>
            </button>
            {additionalOpen && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 px-1">
                <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className={inputClass} />
                <input name="annualIncome" value={form.annualIncome} onChange={handleChange} placeholder="Annual Income" className={inputClass} />
                <input name="education" value={form.education} onChange={handleChange} placeholder="Education" className={`${inputClass} sm:col-span-2`} />
                <div className="sm:col-span-2 text-xs text-gray-500 bg-[#f0faff] rounded-lg px-4 py-3 border border-[#cceeff]">
                  <strong>Plan:</strong> {incomingPlan.title} &nbsp;·&nbsp;
                  <strong>Billing:</strong> {billingCycle} &nbsp;·&nbsp;
                  <strong>Premium:</strong> ₹{price}
                </div>
              </div>
            )}
          </div>

          {/* Accordion — declarations */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setDeclarationsOpen(!declarationsOpen)}
              className="w-full text-left border border-[#cceeff] rounded-lg px-4 py-3 flex justify-between items-center hover:bg-[#f0faff] transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">Declarations</span>
              <span className="text-gray-400 text-sm">{declarationsOpen ? "▾" : "▸"}</span>
            </button>
            {declarationsOpen && (
              <div className="mt-3 p-4 bg-[#f8fbff] border border-[#e0f0fa] rounded-lg text-sm text-gray-600 leading-relaxed">
                I declare that the information provided above is true and accurate to the best of my knowledge.
                I accept the policy terms and authorise EasyBeema to carry out necessary verification checks.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="w-4 h-4 accent-[#019de3]"
              />
              <span className="text-sm text-gray-600">
                I agree to the <span className="underline cursor-pointer text-[#019de3]">Terms & Conditions</span>
              </span>
            </label>
            <div className="flex gap-3">
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Go Back
              </button>
              <button
                onClick={handlePayNow}
                disabled={!agreed || submitting}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  agreed ? "bg-[#019de3] text-white hover:bg-[#0289c7]" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? "Opening payment…" : "Pay Now →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
