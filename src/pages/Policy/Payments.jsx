import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_TITLES } from "../../constants/insurance";

/* ── Static data ── */
const PLAN_FEATURES = [
  "Death benefit — sum assured paid to nominees",
  "Terminal illness benefit included",
  "Optional riders available at low cost",
  "Simple 100% digital onboarding",
];

const FREE_BENEFITS = [
  "Free-look period: 30 days",
  "Instant claim support (24×7)",
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
  "Hospital cash rider",
  "Premium waiver on disability",
];

const UPGRADE_PLANS = [
  { id: "u1", label: "Increase cover to ₹2 Crore", costMonthly: 350 },
  { id: "u2", label: "Add Family Income Benefit", costMonthly: 220 },
];

const ADD_ON_RIDERS = [
  { id: "r1", label: "Accidental Death Benefit (₹5L)", costMonthly: 80 },
  { id: "r2", label: "Critical Illness Rider", costMonthly: 150 },
  { id: "r3", label: "Hospital Cash Rider", costMonthly: 60 },
];

const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-IN") : n);

/* ── Small reusable components ── */
function SelectRow({ label, value, onChangeValue, options = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2.5 border border-gray-200 rounded-lg flex items-center justify-between text-sm hover:border-[#019de3] transition-colors"
      >
        <span className="text-xs text-[#019de3] font-medium mr-2">{label}</span>
        <span className="text-gray-700">{value} <span className="text-gray-400 text-xs">▾</span></span>
      </button>
      {open && (
        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-30">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => { onChangeValue(o); setOpen(false); }}
              className="px-3 py-2 hover:bg-[#f0faff] cursor-pointer text-sm text-gray-700"
            >
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
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-1 text-sm transition-colors border-b-2 ${
        active ? "text-gray-900 font-semibold border-[#019de3]" : "text-gray-500 border-transparent hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}

function ListSection({ items = [] }) {
  return (
    <ul className="space-y-2 text-sm text-gray-600">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[#019de3] mt-0.5 font-bold">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Main Payments component ── */
export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const mainRef = useRef(null);

  const profile = state.form || { name: "", dob: "", mobile: "" };
  const gender = state.gender || "";
  const smoke = state.smoke !== undefined ? state.smoke : null;
  const survey = state.survey || {};

  const incomingProductId = state?.productId ?? state?.planId ?? state?.plan?.id ?? null;
  const activePlan = state?.plan ?? { title: "Insurance Plan", priceMonthly: 988, priceYearly: 10000, vendorLogo: "/images/HDFCinsurance.png" };
  const productTitle = state?.productTitle ?? activePlan?.title ?? (incomingProductId ? PRODUCT_TITLES[String(incomingProductId)] : null) ?? "Insurance Product";

  // UI state
  const [lifeCover, setLifeCover] = useState("₹1 Crore");
  const [coverTill, setCoverTill] = useState("60 Years");
  const [payFor, setPayFor] = useState("33 Years");
  const [mode, setMode] = useState(state?.billingCycle || "Monthly");
  const [tab, setTab] = useState("features");
  const [selectedUpgrades, setSelectedUpgrades] = useState({});
  const [selectedRiders, setSelectedRiders] = useState({});
  const [userForm, setUserForm] = useState({
    fullName: profile.name || "",
    email: profile.email || "",
    occupation: survey?.occupation || "",
    annualIncome: survey?.income || "",
    education: survey?.education || "",
    dob: profile.dob || "",
    mobile: profile.mobile || "",
  });

  useEffect(() => { mainRef.current?.focus(); }, []);

  // Price computation
  const base = mode === "Monthly" ? activePlan?.priceMonthly || 0 : activePlan?.priceYearly || 0;
  const upgradesTotal = Object.keys(selectedUpgrades).reduce(
    (sum, k) => sum + (selectedUpgrades[k] ? (UPGRADE_PLANS.find((u) => u.id === k)?.costMonthly || 0) : 0), 0
  );
  const ridersTotal = Object.keys(selectedRiders).reduce(
    (sum, k) => sum + (selectedRiders[k] ? (ADD_ON_RIDERS.find((r) => r.id === k)?.costMonthly || 0) : 0), 0
  );
  const displayedPrice = base + (mode === "Monthly" ? upgradesTotal + ridersTotal : (upgradesTotal + ridersTotal) * 12);

  const toggleUpgrade = (id) => setSelectedUpgrades((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleRider = (id) => setSelectedRiders((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleProceed = () => {
    if (!userForm.fullName || !userForm.mobile) {
      alert("Please fill in your name and mobile number.");
      return;
    }
    navigate("/confirm", {
      state: {
        form: userForm,
        gender, smoke, survey,
        productId: incomingProductId,
        productTitle,
        plan: activePlan,
        billingCycle: mode,
        price: displayedPrice,
        selectedUpgrades,
        selectedRiders,
      },
    });
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent";

  return (
    <div className="min-h-screen bg-[#f8fbff] px-4 py-8 pb-28">
      <div className="max-w-[1100px] mx-auto" ref={mainRef} tabIndex={-1}>

        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="/images/EasyBeema.png" alt="logo" className="h-11" />
            </Link>
            <div className="text-sm text-gray-600 flex items-center gap-3">
              <span className="font-medium">{gender || "—"}</span>
              <span className="text-gray-300">|</span>
              <span>DOB: {userForm.dob || "—"}</span>
              <span className="text-gray-300">|</span>
              <span>{smoke === true ? "Smoker" : smoke === false ? "Non-Smoker" : "—"}</span>
              <button className="ml-2 text-xs text-[#019de3] underline" onClick={() => navigate(-1)}>Edit</button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{productTitle}</p>
            <button
              className="mt-1 bg-[#019de3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0289c7] transition-colors"
              onClick={() => alert("Talk to expert (demo)")}
            >
              Talk to Expert
            </button>
          </div>
        </header>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left — plan summary */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <img src={activePlan?.vendorLogo || "/images/HDFCinsurance.png"} alt="vendor" className="h-10 w-auto" />
                <p className="text-sm font-semibold text-gray-700 leading-snug">{activePlan?.title}</p>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                <SelectRow label="Life Cover" value={lifeCover} onChangeValue={setLifeCover} options={["₹5 Lakh", "₹10 Lakh", "₹25 Lakh", "₹50 Lakh", "₹1 Crore", "₹2 Crore"]} />
                <SelectRow label="Cover Till Age" value={coverTill} onChangeValue={setCoverTill} options={["60 Years", "65 Years", "70 Years", "75 Years"]} />
                <SelectRow label="Pay For" value={payFor} onChangeValue={setPayFor} options={["20 Years", "25 Years", "30 Years", "33 Years"]} />
                <SelectRow label="Premium Mode" value={mode} onChangeValue={setMode} options={["Monthly", "Yearly"]} />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { value: "99.3%", label: "Claim Settlement" },
                  { value: "30 Days", label: "Easy Refund" },
                  { value: "Instant", label: "Claim Process" },
                ].map((s) => (
                  <div key={s.label} className="p-2 border border-gray-100 rounded-lg">
                    <div className="text-sm font-bold text-gray-800">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Center — plan tabs */}
          <section className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col">
              <nav className="flex gap-4 border-b border-gray-100 pb-2 mb-4 overflow-x-auto">
                <Tab label="Plan Features" active={tab === "features"} onClick={() => setTab("features")} />
                <Tab label="Free Benefits" active={tab === "free"} onClick={() => setTab("free")} />
                <Tab label="Life Stage" active={tab === "life"} onClick={() => setTab("life")} />
                <Tab label="Paid Benefits" active={tab === "paid"} onClick={() => setTab("paid")} />
              </nav>
              <div className="flex-1">
                {tab === "features" && <ListSection items={PLAN_FEATURES} />}
                {tab === "free" && <ListSection items={FREE_BENEFITS} />}
                {tab === "life" && <ListSection items={LIFE_STAGE_BENEFITS} />}
                {tab === "paid" && <ListSection items={PAID_BENEFITS} />}
              </div>
            </div>
          </section>

          {/* Right — user details + add-ons */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Your Details</h4>
              <input className={inputClass} placeholder="Full Name (as per ID)" value={userForm.fullName} onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })} />
              <input className={inputClass} placeholder="Email Address" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
              <input className={inputClass} placeholder="Occupation" value={userForm.occupation} onChange={(e) => setUserForm({ ...userForm, occupation: e.target.value })} />
              <input className={inputClass} placeholder="Annual Income" value={userForm.annualIncome} onChange={(e) => setUserForm({ ...userForm, annualIncome: e.target.value })} />

              <hr className="border-gray-100" />

              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Upgrade Plan</h4>
              {UPGRADE_PLANS.map((u) => (
                <label key={u.id} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!selectedUpgrades[u.id]} onChange={() => toggleUpgrade(u.id)} className="accent-[#019de3] w-4 h-4" />
                  <span className="flex-1 text-gray-600">{u.label}</span>
                  <span className="text-gray-400 text-xs">+₹{u.costMonthly}/mo</span>
                </label>
              ))}

              <hr className="border-gray-100" />

              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Add-On Riders</h4>
              {ADD_ON_RIDERS.map((r) => (
                <label key={r.id} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!selectedRiders[r.id]} onChange={() => toggleRider(r.id)} className="accent-[#019de3] w-4 h-4" />
                  <span className="flex-1 text-gray-600">{r.label}</span>
                  <span className="text-gray-400 text-xs">+₹{r.costMonthly}/mo</span>
                </label>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky footer bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#019de3] text-white shadow-xl z-40">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs opacity-80">Premium for 1st Year</p>
            <p className="text-lg font-bold">₹{fmt(displayedPrice)} <span className="text-sm font-normal">{mode === "Monthly" ? "/month" : "/year"}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="bg-white text-[#019de3] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Go Back
            </button>
            <button onClick={handleProceed} className="bg-white text-[#019de3] px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
              Proceed →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}