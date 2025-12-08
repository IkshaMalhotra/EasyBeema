// File: src/pages/Policy/Plans.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

const PRODUCT_TITLES = {
  "1": "Term Life Insurance",
  "2": "Health Insurance",
  "3": "Car Insurance",
  "4": "Family Insurance",
  "5": "Investment Plans",
  "6": "Travel Insurance",
  "7": "Term Insurance (Women)",
  "8": "2 Wheeler Insurance",
};

export const PLANS = [
  {
    id: "1",
    vendor: "C2P",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme - WOMEN SECURE SOLUTION",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free add-ons", "Full Refund"],

    planDetails: [
      "Covers life risk up to ₹1 Crore",
      "Includes critical illness cover",
      "Flexible premium payment options",
      "High claim settlement ratio",
      "Tax benefits under Section 80C"
    ],

    addons: [
      "Accidental Death Benefit",
      "Waiver of Premium",
      "Critical Illness Rider",
      "Hospital Cash Rider"
    ],

    refundPolicy: [
      "Full refund available within 30 days of policy purchase",
      "Premium returned if no claims are filed",
      "Cancellation charges may apply after 30 days",
      "100% digital refund processing"
    ],

    priceMonthly: 1391,
    priceYearly: 12685,
    originalprice: 1594
  },

  {
    id: "2",
    vendor: "C2P",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme - WOMEN SECURE SOLUTION",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free add-ons", "Full Refund"],

    planDetails: [
      "Life cover up to ₹75 Lakhs",
      "Includes cancer protection benefit",
      "Low premium for non-smokers",
      "Tax savings under 80C & 10(10D)"
    ],

    addons: [
      "Accidental Disability Cover",
      "Child Education Rider",
      "Terminal Illness Rider",
      "Premium Holiday Option"
    ],

    refundPolicy: [
      "Free-look period: 30 days",
      "Full refund on early cancellation",
      "Instant refund to source account",
      "Pro-rata deductions after 30 days"
    ],

    priceMonthly: 1580,
    priceYearly: 12935,
    originalprice: 1810
  },

  {
    id: "3",
    vendor: "HDFC Life",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme - WOMEN SECURE SOLUTION",
    tags: ["Cancer Cover Included"],
    planOptions: ["Plan Details", "4 Free add-ons", "Full Refund"],

    planDetails: [
      "Coverage up to ₹1.5 Crore",
      "Special benefits for women",
      "Option to add maternity cover",
      "Zero paperwork digital onboarding",
      "No medical exam for eligible customers"
    ],

    addons: [
      "Maternity Benefit Add-on",
      "Cancer Care Booster",
      "Accidental Total Disability Cover",
      "Family Income Benefit Add-on"
    ],

    refundPolicy: [
      "Full refund within 30 days of purchase",
      "Premium reversal for policy cancellation",
      "Refund processed within 3–7 working days",
      "Easy cancellation via mobile app"
    ],

    priceMonthly: 1006,
    priceYearly: 15001,
    originalprice: 1200
  }
];

function Modal({ open, onClose, title, items }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-fadeIn">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-gray-600 text-sm border-b pb-2 last:border-none"
            >
              • {item}
            </li>
          ))}
        </ul>

        <button
          className="mt-6 w-full bg-[#03a9f4] text-white py-2 rounded-lg hover:bg-[#0288d1]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function PaymentPopup({ open, onClose, plan, initialCycle = "monthly" }) {
  const [cycle, setCycle] = useState(initialCycle);
  const [years, setYears] = useState(33); // demo age selector
  const ref = useRef(null);

  // compute demo totals
  const monthly = plan.priceMonthly;
  const yearly = plan.priceYearly;
  const totalPay = cycle === "monthly" ? (monthly * 12).toLocaleString() : yearly.toLocaleString();

  useEffect(() => {
    if (open) {
      // focus popup
      setTimeout(() => ref.current?.focus(), 50);
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        ref={ref}
        tabIndex={-1}
        className="relative z-50 w-[320px] bg-white rounded-2xl shadow-2xl border p-6 mx-4"
        aria-label="Pay now"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Pay Now!</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-2 p-1 rounded"
            aria-label="Close payment"
          >
            ✕
          </button>
        </div>

        {/* Price pill */}
        <div className="mt-4 flex justify-center">
          <div className="bg-[#f43f6b] text-white rounded-md px-4 py-2 text-lg font-semibold">
            Rs. {cycle === "monthly" ? monthly : yearly} <span className="text-xs font-normal">{cycle === "monthly" ? "/month" : "/year"}</span>
          </div>
        </div>

        {/* cycle toggle + months */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center bg-white rounded-full border p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setCycle("monthly")}
              className={`px-2 py-1 text-sm rounded-full ${cycle === "monthly" ? "bg-[#03a9f4] text-white" : "text-[#03a9f4]"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setCycle("yearly")}
              className={`px-3 py-1 text-sm rounded-full ${cycle === "yearly" ? "bg-[#03a9f4] text-white" : "text-[#03a9f4]"}`}
            >
              Yearly
            </button>
          </div>

          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border rounded px-3 py-1 text-sm"
            aria-label="Years to cover till"
          >
            {[22, 25, 30, 33, 38, 45].map((a) => (
              <option key={a} value={a}>{a} years</option>
            ))}
          </select>

          {cycle === "monthly" && <div className="text-sm text-gray-600">x 12 Months</div>}
        </div>

        <hr className="my-4" />

        {/* Total pay */}
        <div className="text-center">
          <div className="text-sm text-gray-600">Total Pay</div>
          <div className="mt-3 bg-[#f43f6b] text-white rounded-md px-4 py-2 text-lg font-semibold inline-block">
            Rs. {totalPay}
          </div>
        </div>

        {/* footer actions */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="bg-[#03a9f4] text-white px-4 py-2 rounded-md">Rs. {cycle === "monthly" ? monthly : yearly}/{cycle === "monthly" ? "month" : "year"}</div>
          <button
            type="button"
            onClick={() => { alert("Proceeding to payment (demo)"); onClose(); }}
            className="px-4 py-2 rounded-md bg-white border"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

/* PlanCard component */
function PlanCard({ plan, billingCycle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalItems, setModalItems] = useState([]);
  const [showPay, setShowPay] = useState(false); // FIXED: added missing showPay state

  const openSection = (label) => {
    if (label === "Plan Details") {
      setModalTitle("Plan Details");
      setModalItems(plan.planDetails);
    } else if (label.includes("Free add-ons")) {
      setModalTitle("Free Add-ons Included");
      setModalItems(plan.addons);
    } else if (label === "Full Refund") {
      setModalTitle("Refund Policy");
      setModalItems(plan.refundPolicy);
    } else {
      setModalTitle(label);
      setModalItems([]);
    }
    setModalOpen(true);
  };

  const price =
    billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
  const originalprice = plan.originalprice;

  const cycleLabel = billingCycle === "monthly" ? "/month" : "/year";

  return (
    <>
      {/* CARD UI */}
      <article className="relative bg-white rounded-2xl border border-[#11111120] p-6 mb-6 shadow-sm">

        {/* Arrow (opens payment popup) */}
        <button
          type="button"
          aria-label="Pay now"
          onClick={() => setShowPay(true)}
          className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-white/90"
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </button>

        <div className="flex items-center gap-6">

          {/* Logo */}
          <div className="flex-shrink-0 w-28 h-20 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-3">
            <img src={plan.vendorLogo} alt={`${plan.vendor} logo`} className="max-h-full max-w-full object-contain" />
          </div>

          {/* Middle */}
          <div className="min-w-0 flex-1">
            <h3 className="text-xl text-gray-700 font-medium leading-tight truncate">
              {plan.title}
            </h3>

            <div className="mt-3 flex items-center gap-3 flex-wrap">
              {plan.planOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openSection(opt)}
                  className="px-3 py-2 border border-[#9ed7f5] rounded-md text-sm text-gray-600 bg-white hover:bg-[#f8fbff]"
                >
                  {opt} ▾
                </button>
              ))}
            </div>

            <div className="mt-3">
              <span className="text-sm text-purple-600">{plan.tags.join(" • ")}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end justify-between ml-4">
            <div className="mb-2">
              <div className="bg-[#f43f6b] text-white rounded-md px-4 py-3 text-sm font-semibold shadow-md">
                Rs. {price} <span className="text-xs">{cycleLabel}</span>
              </div>
              <div className="w-24 h-[3px] bg-[#11182710] mt-2 rounded" />
            </div>
            <div className="text-xs text-gray-400 line-through">
              Rs. {originalprice} incl. GST
            </div>
          </div>
        </div>
      </article>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setModalOpen(false)} />
          <div className="relative z-50 w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{modalTitle}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-500">✕</button>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {modalItems.map((it, i) => <li key={i}>• {it}</li>)}
            </ul>
            <div className="mt-6">
              <button onClick={() => setModalOpen(false)} className="w-full bg-[#03a9f4] text-white py-2 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* payment popup */}
      <PaymentPopup open={showPay} onClose={() => setShowPay(false)} plan={plan} initialCycle={billingCycle} />
    </>
  );
}

/* Plans page */
export default function Plans() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const visiblePlans = PLANS;
  const [billingCycle, setBillingCycle] = useState("monthly");
  const incomingProductId = state?.productId || id;
  const productTitle = state?.productTitle || (incomingProductId ? PRODUCT_TITLES[incomingProductId] : null) || "Insurance Product";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-6">
            <img src="/images/EasyBeema.png" alt="Easy Beema" className="h-12" />
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Best Plans <span className="text-[#03a9f4]">for you!</span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">Recommended plans based on your selection</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white">
              <button type="button" className="px-4 py-2 text-sm text-gray-600">Life Cover ▾</button>
              <button type="button" className="px-4 py-2 text-sm text-gray-600">Age to cover till ▾</button>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500 mr-2 hidden md:block">
                {productTitle}
              </div>

              {/* Toggle Container */}
              <div className="flex items-center bg-white rounded-full border p-1 shadow-sm">

                {/* Monthly */}
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${billingCycle === "monthly" ? "bg-[#03a9f4] text-white shadow" : "text-[#03a9f4]"}`}
                >
                  Monthly
                </button>

                {/* Yearly */}
                <button
                  type="button"
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${billingCycle === "yearly" ? "bg-[#03a9f4] text-white shadow" : "text-[#03a9f4]"}`}
                >
                  Yearly
                </button>

              </div>
            </div>
          </div>
        </header>

        {/* Cards list */}
        <section>
          {visiblePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} />
          ))}
        </section>


        {/* Floating chat buttons */}
        <div className="fixed right-6 bottom-24 flex flex-col gap-4">
          <button className="bg-[#03a9f4] text-white px-5 py-3 rounded-md shadow-xl">Chat with us now!</button>
          <button className="bg-[#03a9f4] text-white px-5 py-3 rounded-md shadow-xl">Schedule a call with us!</button>
        </div>
      </div>
    </div>
  );
}
