import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

const POLICY_TYPES = [
  { id: "car",    label: "Car Insurance",     icon: "🚗" },
  { id: "bike",   label: "2 Wheeler",         icon: "🏍️" },
  { id: "health", label: "Health Insurance",  icon: "🏥" },
  { id: "life",   label: "Life Insurance",    icon: "🛡️" },
];

/**
 * Renew Policy page.
 * Step 1 — enter policy number or vehicle registration.
 * Step 2 — confirm details found.
 * Step 3 — proceed to payment.
 */
export default function RenewPolicy() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [policyNumber, setPolicyNumber] = useState("");
  const [step, setStep] = useState(1); // 1 = search, 2 = confirm

  // Demo fetched policy
  const DEMO_POLICY = {
    policyNo: policyNumber || "HDFC-CAR-2023-001234",
    insurer:  "HDFC Ergo",
    logo:     "/images/HDFCinsurance.png",
    type:     POLICY_TYPES.find((t) => t.id === selectedType)?.label || "Car Insurance",
    cover:    "₹5 Lakh",
    expiry:   "14 Mar 2025",
    premium:  "₹8,200",
    holder:   "Rahul Mehta",
    vehicle:  "MH 01 AB 1234",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedType) { alert("Please select a policy type."); return; }
    if (!policyNumber.trim()) { alert("Please enter your policy number."); return; }
    setStep(2);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <div className="w-full min-h-screen bg-[#f8fbff]">
      <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] py-12">
        <Container>
          <div className="text-center mb-10">
            <h1 className="type-h1 font-bold text-gray-800">
              Renew Your <span className="text-[#019de3]">Policy</span>
            </h1>
            <p className="type-body text-gray-500 mt-3">
              Quick, paperless renewal in under 2 minutes.
            </p>
          </div>

          <div className="max-w-xl mx-auto">

            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
                {/* Step indicator */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-6 h-6 rounded-full bg-[#019de3] text-white flex items-center justify-center font-bold text-xs">1</span>
                  <span className="text-[#019de3] font-medium">Select Policy Type</span>
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">2</span>
                  <span>Confirm Details</span>
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">3</span>
                  <span>Pay & Renew</span>
                </div>

                {/* Policy type grid */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Policy Type</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {POLICY_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                          selectedType === type.id
                            ? "border-[#019de3] bg-[#f0faff] shadow-sm"
                            : "border-gray-200 bg-white hover:border-[#019de3]"
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-xs font-medium text-gray-700">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Policy number input */}
                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Policy Number / Vehicle Registration
                    </label>
                    <input
                      className={inputClass}
                      placeholder="e.g. HDFC-CAR-2023-001234 or MH01AB1234"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value.toUpperCase())}
                    />
                  </div>
                  <Button text="Find My Policy →" type="submit" variant="primary" size="medium" className="w-full" />
                </form>

                <p className="text-xs text-center text-gray-400">
                  You can find your policy number on your previous policy document or renewal notice.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <img src={DEMO_POLICY.logo} alt="insurer" className="h-10 w-auto" />
                  <div>
                    <p className="font-semibold text-gray-800">{DEMO_POLICY.type}</p>
                    <p className="text-xs text-gray-400">{DEMO_POLICY.insurer} · {DEMO_POLICY.policyNo}</p>
                  </div>
                  <span className="ml-auto text-xs bg-orange-100 text-orange-600 font-medium px-3 py-1 rounded-full">
                    Expiring Soon
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Policy Holder", value: DEMO_POLICY.holder },
                    { label: "Vehicle / Cover", value: DEMO_POLICY.vehicle },
                    { label: "Sum Insured", value: DEMO_POLICY.cover },
                    { label: "Expiry Date", value: DEMO_POLICY.expiry },
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-xs text-gray-400">{d.label}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{d.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f0faff] border border-[#cceeff] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Renewal Premium</p>
                    <p className="text-xl font-bold text-gray-800 mt-0.5">{DEMO_POLICY.premium}</p>
                  </div>
                  <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">
                    Best Price ✓
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    ← Search Again
                  </button>
                  <button
                    onClick={() => navigate("/payments", { state: { productTitle: DEMO_POLICY.type, price: 8200 } })}
                    className="flex-1 py-3 bg-[#019de3] text-white rounded-xl text-sm font-semibold hover:bg-[#0289c7] transition-colors"
                  >
                    Renew Now →
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
