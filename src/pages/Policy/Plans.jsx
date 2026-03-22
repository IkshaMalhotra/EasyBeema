import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_TITLES } from "../../constants/insurance";

// Plan data — in a real app this would come from an API
export const PLANS = [
  {
    id: "1",
    vendor: "HDFC Life",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme – Women Secure Solution",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free Add-ons", "Full Refund"],
    planDetails: [
      "Covers life risk up to ₹1 Crore",
      "Includes critical illness cover",
      "Flexible premium payment options",
      "High claim settlement ratio",
      "Tax benefits under Section 80C",
    ],
    addons: ["Accidental Death Benefit", "Waiver of Premium", "Critical Illness Rider", "Hospital Cash Rider"],
    refundPolicy: [
      "Full refund available within 30 days of purchase",
      "Premium returned if no claims are filed",
      "Cancellation charges may apply after 30 days",
      "100% digital refund processing",
    ],
    priceMonthly: 1391,
    priceYearly: 12685,
    originalprice: 1594,
  },
  {
    id: "2",
    vendor: "HDFC Life",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme – Family Protect Plan",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free Add-ons", "Full Refund"],
    planDetails: [
      "Life cover up to ₹75 Lakhs",
      "Includes cancer protection benefit",
      "Low premium for non-smokers",
      "Tax savings under 80C & 10(10D)",
    ],
    addons: ["Accidental Disability Cover", "Child Education Rider", "Terminal Illness Rider", "Premium Holiday Option"],
    refundPolicy: [
      "Free-look period: 30 days",
      "Full refund on early cancellation",
      "Instant refund to source account",
      "Pro-rata deductions after 30 days",
    ],
    priceMonthly: 1580,
    priceYearly: 12935,
    originalprice: 1810,
  },
  {
    id: "3",
    vendor: "HDFC Life",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme – Comprehensive Cover",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free Add-ons", "Full Refund"],
    planDetails: [
      "Coverage up to ₹1.5 Crore",
      "Special benefits for women",
      "Option to add maternity cover",
      "Zero paperwork digital onboarding",
      "No medical exam for eligible customers",
    ],
    addons: ["Maternity Benefit Add-on", "Cancer Care Booster", "Accidental Total Disability Cover", "Family Income Benefit"],
    refundPolicy: [
      "Full refund within 30 days of purchase",
      "Premium reversal for policy cancellation",
      "Refund processed within 3–7 working days",
      "Easy cancellation via mobile app",
    ],
    priceMonthly: 1006,
    priceYearly: 15001,
    originalprice: 1200,
  },
];

/* ── Modal for plan details, add-ons, refund policy ── */
function InfoModal({ open, onClose, title, items }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 bg-white w-full max-w-md rounded-2xl p-6 shadow-xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className="text-[#019de3] mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-[#019de3] text-white py-2.5 rounded-lg hover:bg-[#0289c7] text-sm font-medium" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ── Payment popup shown when user clicks the arrow on a plan card ── */
function PaymentPopup({ open, onClose, plan, initialCycle = "monthly" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cycle, setCycle] = useState(initialCycle);
  const [years, setYears] = useState(33);
  const ref = useRef(null);

  const incomingState = location.state || {};

  const monthly = plan?.priceMonthly ?? 0;
  const yearly = plan?.priceYearly ?? monthly * 12;
  const totalPay = cycle === "monthly" ? (monthly * 12).toLocaleString() : yearly.toLocaleString();

  useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current?.focus(), 50);
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const handleContinue = () => {
    navigate("/payments", {
      state: {
        ...incomingState,
        plan,
        planId: plan?.id,
        billingCycle: cycle,
        yearsToCover: years,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        ref={ref}
        tabIndex={-1}
        className="relative z-10 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 mx-4 focus:outline-none"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Pay Now</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Price pill */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#f43f6b] text-white rounded-lg px-5 py-2 text-lg font-semibold">
            ₹{cycle === "monthly" ? monthly : yearly}
            <span className="text-xs font-normal ml-1">{cycle === "monthly" ? "/month" : "/year"}</span>
          </div>
        </div>

        {/* Cycle toggle + years */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            {["monthly", "yearly"].map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`px-3 py-1.5 text-sm rounded-full capitalize transition-all ${
                  cycle === c ? "bg-[#019de3] text-white shadow-sm" : "text-gray-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
          >
            {[22, 25, 30, 33, 38, 45].map((a) => <option key={a} value={a}>{a} yrs</option>)}
          </select>
        </div>

        <hr className="my-4 border-gray-100" />

        <div className="text-center mb-5">
          <p className="text-xs text-gray-500 mb-1">Total Pay (1 year)</p>
          <div className="bg-[#f43f6b] text-white rounded-lg px-5 py-2 text-lg font-semibold inline-block">
            ₹{totalPay}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-[#019de3] text-white rounded-lg px-3 py-2 text-sm text-center font-medium">
            ₹{cycle === "monthly" ? monthly : yearly}/{cycle === "monthly" ? "mo" : "yr"}
          </div>
          <button
            onClick={handleContinue}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Proceed →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Individual plan card ── */
function PlanCard({ plan, billingCycle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalItems, setModalItems] = useState([]);
  const [showPay, setShowPay] = useState(false);

  const openSection = (label) => {
    if (label === "Plan Details") {
      setModalTitle("Plan Details"); setModalItems(plan.planDetails);
    } else if (label.toLowerCase().includes("add-on")) {
      setModalTitle("Free Add-ons Included"); setModalItems(plan.addons);
    } else if (label === "Full Refund") {
      setModalTitle("Refund Policy"); setModalItems(plan.refundPolicy);
    }
    setModalOpen(true);
  };

  const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
  const cycleLabel = billingCycle === "monthly" ? "/month" : "/year";

  return (
    <>
      <article className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">

        {/* Arrow button */}
        <button
          type="button"
          aria-label="Proceed to payment"
          onClick={() => setShowPay(true)}
          className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-[#f0faff] hover:border-[#019de3] transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0 w-28 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3">
            <img src={plan.vendorLogo} alt={`${plan.vendor} logo`} className="max-h-full max-w-full object-contain" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-700 leading-snug truncate pr-10">{plan.title}</h3>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {plan.planOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => openSection(opt)}
                  className="px-3 py-1.5 border border-[#cceeff] rounded-lg text-xs text-gray-600 bg-white hover:bg-[#f0faff] transition-colors"
                >
                  {opt} ▾
                </button>
              ))}
            </div>
            <div className="mt-2">
              <span className="text-xs text-purple-500 font-medium">{plan.tags.join(" • ")}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex-shrink-0 flex flex-col items-end">
            <div className="bg-[#f43f6b] text-white rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm">
              ₹{price} <span className="text-xs font-normal">{cycleLabel}</span>
            </div>
            <p className="text-xs text-gray-400 line-through mt-1">₹{plan.originalprice} incl. GST</p>
          </div>
        </div>
      </article>

      <InfoModal open={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} items={modalItems} />
      <PaymentPopup open={showPay} onClose={() => setShowPay(false)} plan={plan} initialCycle={billingCycle} />
    </>
  );
}

/* ── Plans page ── */
export default function Plans() {
  const location = useLocation();
  const state = location.state || {};
  const [billingCycle, setBillingCycle] = useState("monthly");

  const incomingProductId = state?.productId;
  const productTitle = PRODUCT_TITLES[incomingProductId] || "Insurance Plans";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f6fd] to-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-5">
            <Link to="/">
              <img src="/images/EasyBeema.png" alt="EasyBeema" className="h-11" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Best Plans <span className="text-[#019de3]">for you!</span>
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Recommended based on your selection</p>
            </div>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{productTitle}</span>
            <div className="flex items-center bg-white rounded-full border border-gray-200 p-1 shadow-sm">
              {["monthly", "yearly"].map((c) => (
                <button
                  key={c}
                  onClick={() => setBillingCycle(c)}
                  className={`px-4 py-2 text-sm rounded-full capitalize transition-all ${
                    billingCycle === c ? "bg-[#019de3] text-white shadow-sm" : "text-gray-600 hover:text-[#019de3]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Plan cards */}
        <section className="flex flex-col gap-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} />
          ))}
        </section>

        {/* Floating support buttons */}
        <div className="fixed right-6 bottom-8 flex flex-col gap-3">
          <button className="bg-[#019de3] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium hover:bg-[#0289c7] transition-colors">
            💬 Chat with us
          </button>
          <button className="bg-white border border-[#019de3] text-[#019de3] px-5 py-3 rounded-xl shadow-lg text-sm font-medium hover:bg-[#f0faff] transition-colors">
            📞 Schedule a call
          </button>
        </div>
      </div>
    </div>
  );
}
