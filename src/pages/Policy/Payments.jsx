// File: src/pages/Policy/Payments.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* --- Demo constants --- */
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

const PLANS_DEMO = [
  {
    id: "1",
    vendor: "HDFC Life",
    vendorLogo: "/images/HDFCinsurance.png",
    title: "C2P Supreme - WOMEN SECURE SOLUTION",
    priceMonthly: 988,
    priceYearly: 988 * 12 - 500,
    originalMonthly: 1129,
  },
  {
    id: "2",
    vendor: "C2P",
    vendorLogo: "/images/EasyBeema.png",
    title: "Term Secure - FAMILY PROTECT",
    priceMonthly: 1391,
    priceYearly: 1391 * 12 - 800,
    originalMonthly: 1594,
  },
];

const PLAN_FEATURES = [
  "Death benefit - sum assured to nominees",
  "Terminal illness benefit",
  "Optional riders available",
  "Simple digital onboarding",
];

const FREE_BENEFITS = [
  "Free-look 30 days",
  "Instant claim support (24x7)",
  "E-policy delivery",
  "Priority customer support",
];

const LIFE_STAGE_BENEFITS = [
  "Maternity care add-on (women)",
  "Child education benefit",
  "Senior-care wellness program",
  "Health check vouchers at milestones",
];

const PAID_BENEFITS = [
  "Critical illness rider",
  "Accidental death benefit",
  "Hospital cash rider (paid)",
  "Premium waiver on disability",
];

const UPGRADE_PLANS = [
  { id: "u1", label: "Increase cover to 2 Crore", costMonthly: 350 },
  { id: "u2", label: "Add Family Income Benefit", costMonthly: 220 },
];

const ADD_ON_RIDERS = [
  { id: "r1", label: "Accidental Death Benefit (₹5L)", costMonthly: 80 },
  { id: "r2", label: "Critical Illness Rider", costMonthly: 150 },
  { id: "r3", label: "Hospital Cash Rider", costMonthly: 60 },
];

/* helper */
const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-IN") : n);

/* --- Payments component (full) --- */
export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  // Profile & navigation state
  const profile = state.form || { name: "", dob: "", mobile: "" };
  const gender = state.gender || profile.gender || "";
  const smoke = state.smoke !== undefined ? state.smoke : null;
  const survey = state.survey || {};

  // Accept product id from multiple possible places
  const incomingProductId = state?.productId ?? state?.planId ?? state?.plan?.id ?? null;

  // activePlan: prefer full plan object in state; else find by id; else fallback to first demo
  const activePlan =
    state?.plan ??
    (incomingProductId ? PLANS_DEMO.find((p) => String(p.id) === String(incomingProductId)) : null) ??
    PLANS_DEMO[0];

  // productTitle: compute early so handlers can use it safely
  const productTitle =
    state?.productTitle ?? activePlan?.title ?? (incomingProductId ? PRODUCT_TITLES[String(incomingProductId)] : null) ?? "Insurance Product";

  // UI state
  const [lifeCover, setLifeCover] = useState("₹1 Crore");
  const [coverTill, setCoverTill] = useState("60 Years");
  const [payFor, setPayFor] = useState("33 Years");
  const [mode, setMode] = useState(state?.billingCycle || "Monthly"); // Monthly / Yearly

  const [tab, setTab] = useState("features"); // features | free | life-stage | paid
  const [selectedUpgrades, setSelectedUpgrades] = useState(state?.selectedUpgrades || {});
  const [selectedRiders, setSelectedRiders] = useState(state?.selectedRiders || {});
  const [userForm, setUserForm] = useState({
    fullName: profile.name || "",
    email: profile.email || "",
    occupation: survey?.occupation || "",
    annualIncome: survey?.income || "",
    education: survey?.education || "",
    dob: profile.dob || "",
    mobile: profile.mobile || "",
  });

  // Payment flow state
  const [isPaying, setIsPaying] = useState(false);
  const mainRef = useRef(null);

  // price computation
  const baseMonthly = activePlan?.priceMonthly || 0;
  const baseYearly = activePlan?.priceYearly || baseMonthly * 12;
  const upgradesMonthly = Object.keys(selectedUpgrades).reduce((sum, k) => sum + (selectedUpgrades[k] ? UPGRADE_PLANS.find(u => u.id === k)?.costMonthly || 0 : 0), 0);
  const ridersMonthly = Object.keys(selectedRiders).reduce((sum, k) => sum + (selectedRiders[k] ? ADD_ON_RIDERS.find(r => r.id === k)?.costMonthly || 0 : 0), 0);

  const effectiveMonthly = baseMonthly + upgradesMonthly + ridersMonthly;
  const effectiveYearly = baseYearly + (upgradesMonthly + ridersMonthly) * 12;

  const displayedPrice = mode === "Monthly" ? effectiveMonthly : effectiveYearly;
  const displayedCycleLabel = mode === "Monthly" ? "/month" : "/year";

  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  function toggleUpgrade(id) {
    setSelectedUpgrades(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function toggleRider(id) {
    setSelectedRiders(prev => ({ ...prev, [id]: !prev[id] }));
  }

  // Proceed: validate & navigate to confirmation page
  function handleProceed() {
    if (!userForm.fullName || !userForm.mobile) {
      alert("Please fill your name and mobile before proceeding.");
      return;
    }

    const payload = {
      form: {
        name: userForm.fullName,
        email: userForm.email,
        mobile: userForm.mobile,
        dob: userForm.dob,
        occupation: userForm.occupation,
        annualIncome: userForm.annualIncome,
        education: userForm.education,
      },
      gender,
      smoke,
      survey,
      productId: incomingProductId,
      productTitle,
      plan: activePlan,
      billingCycle: mode,
      price: displayedPrice,
      selectedUpgrades,
      selectedRiders,
    };

    // navigate to confirmation UI (create a /confirm route to receive this)
    navigate("/confirm", { state: payload });
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] px-6 py-8">
      <div className="max-w-[1200px] mx-auto" ref={mainRef} tabIndex={-1}>
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/images/EasyBeema.png" alt="logo" className="h-12" />
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-medium">{gender === "FEMALE" ? "Female" : gender === "MALE" ? "Male" : "Other"}</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm">DOB: {userForm.dob || "—"}</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm">{smoke === true ? "Smoker" : smoke === false ? "Non Smoker" : "—"}</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm">******{(userForm.mobile || "").slice(-4) || "----"}</span>
                <button className="ml-3 text-sm text-blue-600 underline" onClick={() => navigate(-1)}>Edit</button>
              </div>
            </div>
          </div>

          <div className="text-right">
            {/* product title shown on all sizes for easier debug/visibility */}
            <div className="text-sm text-gray-500 mr-2">{productTitle}</div>
            <button className="mt-2 bg-[#03a9f4] text-white px-4 py-2 rounded-md shadow" onClick={() => alert("Talk to expert (demo)")}>Talk to Expert</button>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left summary */}
          <aside className="col-span-4">
            <div className="bg-white rounded-2xl border p-5 shadow min-h-[360px]">
              <div className="flex items-start gap-3 mb-4">
                <img src={activePlan?.vendorLogo || "/images/HDFCinsurance.png"} alt="vendor" className="h-10 w-auto" />
                <div>
                  <div className="text-gray-700 text-lg font-semibold">{activePlan?.title}</div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <SelectRow label="Life Cover" value={lifeCover} onChangeValue={setLifeCover} options={["₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore", "₹2 Crore"]} />
                <SelectRow label="Cover till Age" value={coverTill} onChangeValue={setCoverTill} options={["60 Years", "65 Years", "70 Years", "75 Years"]} />
                <SelectRow label="Pay for" value={payFor} onChangeValue={setPayFor} options={["20 Years", "25 Years", "30 Years", "33 Years"]} />
                <SelectRow label="Mode of Premium Payment" value={mode} onChangeValue={setMode} options={["Monthly", "Yearly"]} />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-3 border rounded text-xs">
                  <div className="text-lg font-semibold text-gray-800">99.3%</div>
                  <div className="text-xs text-gray-500">claim settlement ratio</div>
                </div>
                <div className="p-3 border rounded text-xs">
                  <div className="text-lg font-semibold text-gray-800">30 Days</div>
                  <div className="text-xs text-gray-500">Easy Refund Policy</div>
                </div>
                <div className="p-3 border rounded text-xs">
                  <div className="text-lg font-semibold text-gray-800">Insta</div>
                  <div className="text-xs text-gray-500">Claim Settlement</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center tabs */}
          <section className="col-span-4">
            <div className="bg-white rounded-2xl border p-5 shadow min-h-[360px] flex flex-col">
              <nav className="flex items-center gap-6 border-b pb-3 mb-3 text-sm text-gray-600">
                <Tab label="Plan Features" active={tab === "features"} onClick={() => setTab("features")} />
                <Tab label="Free Benefits" active={tab === "free"} onClick={() => setTab("free")} />
                <Tab label="Life Stage Benefits" active={tab === "life"} onClick={() => setTab("life")} />
                <Tab label="Paid Benefits" active={tab === "paid"} onClick={() => setTab("paid")} />
              </nav>

              <div className="flex-1 overflow-auto">
                {tab === "features" && <ListSection title="Plan Features" items={PLAN_FEATURES} />}
                {tab === "free" && <ListSection title="Free Benefits" items={FREE_BENEFITS} />}
                {tab === "life" && <ListSection title="Life Stage Benefits" items={LIFE_STAGE_BENEFITS} />}
                {tab === "paid" && <ListSection title="Paid Benefits" items={PAID_BENEFITS} />}
              </div>

              <div className="mt-4 text-right">
                <button onClick={() => setTab("paid")} className="bg-[#03a9f4] text-white px-4 py-2 rounded-md">Next</button>
              </div>
            </div>
          </section>

          {/* Right form / upgrades */}
          <aside className="col-span-4 mb-20">
            <div className="bg-white rounded-2xl border p-5 shadow min-h-[360px] flex flex-col gap-3">
              <h4 className="text-lg font-medium">Your Details</h4>

              <label className="block">
                <input className="w-full border rounded px-3 py-2" placeholder="Full Name as Per ID Proof" value={userForm.fullName} onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })} />
              </label>

              <label className="block">
                <input className="w-full border rounded px-3 py-2" placeholder="E-mail Address" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
              </label>

              <label className="block">
                <input className="w-full border rounded px-3 py-2" placeholder="Occupation" value={userForm.occupation} onChange={(e) => setUserForm({ ...userForm, occupation: e.target.value })} />
              </label>

              <label className="block">
                <input className="w-full border rounded px-3 py-2" placeholder="Annual Income" value={userForm.annualIncome} onChange={(e) => setUserForm({ ...userForm, annualIncome: e.target.value })} />
              </label>

              <label className="block">
                <input className="w-full border rounded px-3 py-2" placeholder="Education" value={userForm.education} onChange={(e) => setUserForm({ ...userForm, education: e.target.value })} />
              </label>

              <hr className="my-2" />

              <h4 className="text-lg font-medium">Upgrade Plan</h4>
              <div className="space-y-2">
                {UPGRADE_PLANS.map(u => (
                  <label key={u.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!selectedUpgrades[u.id]} onChange={() => toggleUpgrade(u.id)} />
                    <span className="flex-1">{u.label}</span>
                    <span className="text-sm text-gray-600">+ ₹{u.costMonthly}/mo</span>
                  </label>
                ))}
              </div>

              <hr className="my-2" />
              <h4 className="text-lg font-medium">Add-On Riders</h4>
              <div className="space-y-2">
                {ADD_ON_RIDERS.map(r => (
                  <label key={r.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!selectedRiders[r.id]} onChange={() => toggleRider(r.id)} />
                    <span className="flex-1">{r.label}</span>
                    <span className="text-sm text-gray-600">+ ₹{r.costMonthly}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Sticky footer */}
        <div className="fixed left-0 right-0 bottom-0 bg-[#03a9f4] text-white p-4 shadow-lg">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div>
              <div className="text-sm">Premium for 1st Year</div>
              <div className="text-lg font-semibold">Rs. {fmt(displayedPrice)} {displayedCycleLabel}</div>
              <div className="text-xs opacity-90">Premium for 2nd Year onwards Rs. {fmt(activePlan?.originalMonthly || Math.round(activePlan?.priceMonthly * 1.15))}/Monthly</div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="bg-white text-[#03a9f4] px-4 py-2 rounded-md font-medium">Go Back</button>
              <div className="bg-white rounded-md px-4 py-1 flex items-center gap-3">
                <div className="bg-[#03a9f4] px-3 py-2 rounded-md font-medium">Rs. {fmt(displayedPrice)}{displayedCycleLabel}</div>
                <button onClick={handleProceed} className="px-4 py-2 text-black bg-white border rounded-md" disabled={isPaying}>
                  {isPaying ? "Processing..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =================
   Small subcomponents
   ================= */
function SelectRow({ label, value, onChangeValue, options = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2 border rounded flex items-center justify-between text-sm"
      >
        <span className="text-xs text-red-500 mr-2">{label}</span>
        <span className="text-sm text-gray-700">{value} <span className="text-gray-300">▾</span></span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded shadow z-30">
          {options.map(o => (
            <div key={o} onClick={() => { onChangeValue(o); setOpen(false); }} className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm">
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`py-2 ${active ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
      {label}
    </button>
  );
}

function ListSection({ title, items = [] }) {
  return (
    <div>
      <h4 className="text-md font-medium mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((it, i) => <li key={i} className="flex items-start gap-3"><span className="text-[#03a9f4] mt-1">•</span><span>{it}</span></li>)}
      </ul>
    </div>
  );
}
