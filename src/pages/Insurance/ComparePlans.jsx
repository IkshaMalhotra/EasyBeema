import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import { PRODUCT_TITLES } from "../../constants/insurance";

// Demo plans for comparison — in a real app, fetched from API
const ALL_PLANS = [
  {
    id: "1", category: "1",
    vendor: "HDFC Life", logo: "/images/HDFCinsurance.png",
    title: "HDFC Life Click 2 Protect",
    cover: "₹1 Crore", premium: "₹1,391/mo", premiumVal: 1391,
    claimRatio: "99.3%", tenure: "Up to 85 yrs", medicalExam: "No",
    features: ["Critical illness cover", "Terminal illness benefit", "Waiver of premium rider", "Online discount available"],
    tag: "Best Value",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: "2", category: "1",
    vendor: "ICICI Prudential", logo: "/images/img_icici_bank_1_1.png",
    title: "ICICI Pru iProtect Smart",
    cover: "₹1 Crore", premium: "₹1,580/mo", premiumVal: 1580,
    claimRatio: "97.8%", tenure: "Up to 80 yrs", medicalExam: "No",
    features: ["Cancer cover included", "Accidental death benefit", "Return of premium option", "Flexible payout options"],
    tag: "Popular",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "3", category: "1",
    vendor: "SBI Life", logo: "/images/sbi_logo.png",
    title: "SBI Life eShield Next",
    cover: "₹1 Crore", premium: "₹1,006/mo", premiumVal: 1006,
    claimRatio: "96.4%", tenure: "Up to 75 yrs", medicalExam: "No",
    features: ["Increasing cover option", "Better half benefit", "Accidental death benefit", "Special premium for women"],
    tag: "Lowest Price",
    tagColor: "bg-orange-100 text-orange-700",
  },
];

const CATEGORIES = Object.entries(PRODUCT_TITLES).map(([id, label]) => ({ id, label }));

const COMPARE_FIELDS = [
  { key: "cover",       label: "Sum Insured" },
  { key: "premium",     label: "Starting Premium" },
  { key: "claimRatio",  label: "Claim Settlement Ratio" },
  { key: "tenure",      label: "Policy Tenure" },
  { key: "medicalExam", label: "Medical Exam Required" },
];

/**
 * Compare Plans page.
 * Lets users pick a category and compare plans side-by-side in a feature table.
 */
export default function ComparePlans() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [selectedPlans, setSelectedPlans] = useState(["1", "2", "3"]);

  const plans = ALL_PLANS.filter((p) => p.category === selectedCategory);
  const comparePlans = plans.filter((p) => selectedPlans.includes(p.id));

  const togglePlan = (id) => {
    setSelectedPlans((prev) =>
      prev.includes(id)
        ? prev.length > 2 ? prev.filter((p) => p !== id) : prev // keep min 2
        : prev.length < 3 ? [...prev, id] : prev               // max 3
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fbff]">

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] py-12">
        <Container>
          <div className="text-center">
            <span className="inline-block bg-[#f0faff] text-[#019de3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4">
              Smart Comparison
            </span>
            <h1 className="type-h1 font-bold text-gray-800">
              Compare <span className="text-[#019de3]">Plans</span>
            </h1>
            <p className="type-body text-gray-500 mt-3 max-w-lg mx-auto">
              Compare insurance plans side-by-side and pick the one that's right for you — no jargon, no confusion.
            </p>
          </div>
        </Container>
      </section>

      <section className="w-full section-spacing">
        <Container>

          {/* Category picker */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Insurance Type</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedPlans(["1", "2", "3"]); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#019de3] text-white border-[#019de3] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#019de3]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plan selector cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => togglePlan(plan.id)}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                  selectedPlans.includes(plan.id)
                    ? "border-[#019de3] shadow-md"
                    : "border-gray-100 hover:border-gray-300 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <img src={plan.logo} alt={plan.vendor} className="h-8 w-auto object-contain" />
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${plan.tagColor}`}>{plan.tag}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug">{plan.title}</p>
                <p className="text-lg font-black text-[#019de3] mt-2">{plan.premium}</p>
                <div className={`mt-3 flex items-center gap-2 text-xs font-medium ${selectedPlans.includes(plan.id) ? "text-[#019de3]" : "text-gray-400"}`}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedPlans.includes(plan.id) ? "bg-[#019de3] border-[#019de3]" : "border-gray-300"}`}>
                    {selectedPlans.includes(plan.id) && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {selectedPlans.includes(plan.id) ? "Selected for comparison" : "Click to add"}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          {comparePlans.length >= 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide w-40">Feature</th>
                    {comparePlans.map((plan) => (
                      <th key={plan.id} className="px-5 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <img src={plan.logo} alt={plan.vendor} className="h-8 object-contain" />
                          <span className="text-xs font-semibold text-gray-700 leading-snug">{plan.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plan.tagColor}`}>{plan.tag}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_FIELDS.map((field, i) => (
                    <tr key={field.key} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                      <td className="px-5 py-4 text-xs font-medium text-gray-500">{field.label}</td>
                      {comparePlans.map((plan) => (
                        <td key={plan.id} className="px-5 py-4 text-center font-semibold text-gray-800 text-sm">
                          {plan[field.key]}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Features row */}
                  <tr className="border-t border-gray-100">
                    <td className="px-5 py-4 text-xs font-medium text-gray-500 align-top">Key Features</td>
                    {comparePlans.map((plan) => (
                      <td key={plan.id} className="px-5 py-4 align-top">
                        <ul className="flex flex-col gap-1.5">
                          {plan.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <span className="text-green-500 mt-0.5 font-bold">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* CTA row */}
                  <tr className="border-t border-gray-100">
                    <td className="px-5 py-4 text-xs font-medium text-gray-400">Action</td>
                    {comparePlans.map((plan) => (
                      <td key={plan.id} className="px-5 py-5 text-center">
                        <button
                          onClick={() => navigate(`/policy/${plan.category}`)}
                          className="px-5 py-2.5 bg-[#019de3] text-white rounded-xl text-sm font-semibold hover:bg-[#0289c7] transition-colors shadow-sm"
                        >
                          Buy Now →
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {comparePlans.length < 2 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              Select at least 2 plans above to compare them side by side.
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
