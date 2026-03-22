import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Dashboard / Profile page
 * Shows the user's active policies, profile info, and quick actions.
 * In a real app, data would come from an API call on mount.
 */

// Demo data — replace with API response in production
const USER = {
  name: "Rahul Mehta",
  email: "rahul.mehta@email.com",
  mobile: "+91 98765 43210",
  joined: "January 2024",
  avatar: null, // null = show initials fallback
};

const ACTIVE_POLICIES = [
  {
    id: "p1",
    type: "Term Life Insurance",
    provider: "HDFC Life",
    logo: "/images/HDFCinsurance.png",
    cover: "₹1 Crore",
    premium: "₹1,391/month",
    status: "Active",
    renewDate: "15 Mar 2026",
    policyNo: "HDFC-TL-2024-001234",
  },
  {
    id: "p2",
    type: "Health Insurance",
    provider: "HDFC Life",
    logo: "/images/HDFCinsurance.png",
    cover: "₹5 Lakh",
    premium: "₹892/month",
    status: "Active",
    renewDate: "20 Jun 2025",
    policyNo: "HDFC-HI-2024-005678",
  },
];

const QUICK_ACTIONS = [
  { label: "Renew Policy",    icon: "🔄", href: "/renew" },
  { label: "File a Claim",   icon: "📋", href: "/claims" },
  { label: "Compare Plans",  icon: "📊", href: "/compare" },
  { label: "Talk to Expert", icon: "💬", href: "/" },
];

const STATUS_COLOR = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("policies"); // policies | profile

  const initials = USER.name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your policies, profile, and claims in one place.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left sidebar ── */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-4">

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#019de3] flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">{USER.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">Member since {USER.joined}</p>
              </div>

              {/* Nav tabs */}
              <div className="w-full flex flex-col gap-1 mt-2">
                {[
                  { id: "policies", label: "My Policies", icon: "🛡️" },
                  { id: "profile",  label: "Profile",     icon: "👤" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-[#f0faff] text-[#019de3] border border-[#cceeff]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </div>

              {/* Quick actions */}
              <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium px-1 mb-1">Quick Actions</p>
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-[#019de3] transition-colors flex items-center gap-2"
                  >
                    <span>{action.icon}</span> {action.label}
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <button
                onClick={() => navigate("/login")}
                className="w-full mt-2 px-4 py-2 rounded-xl text-sm text-red-500 border border-red-100 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="lg:col-span-9 flex flex-col gap-5">

            {/* ── POLICIES TAB ── */}
            {activeTab === "policies" && (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Active Policies", value: ACTIVE_POLICIES.length, color: "text-[#019de3]" },
                    { label: "Total Coverage",  value: "₹1.05 Cr",             color: "text-green-600" },
                    { label: "Next Renewal",    value: "20 Jun 2025",           color: "text-orange-500" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
                      <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Policy cards */}
                <div className="flex flex-col gap-4">
                  {ACTIVE_POLICIES.map((policy) => (
                    <div key={policy.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
                            <img src={policy.logo} alt={policy.provider} className="max-h-full object-contain" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{policy.type}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{policy.provider} · {policy.policyNo}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLOR[policy.status]}`}>
                          {policy.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                        {[
                          { label: "Coverage",      value: policy.cover },
                          { label: "Premium",       value: policy.premium },
                          { label: "Renews On",     value: policy.renewDate },
                        ].map((d) => (
                          <div key={d.label}>
                            <p className="text-xs text-gray-400">{d.label}</p>
                            <p className="text-sm font-semibold text-gray-700 mt-0.5">{d.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 text-xs font-medium rounded-lg bg-[#019de3] text-white hover:bg-[#0289c7] transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                          Download Policy
                        </button>
                        <button className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                          File Claim
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explore more */}
                <div className="bg-gradient-to-r from-[#019de3] to-[#005f9b] rounded-2xl p-6 text-white flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">Looking for more coverage?</p>
                    <p className="text-sm opacity-80 mt-1">Compare plans and find the best one for your needs.</p>
                  </div>
                  <Link
                    to="/policy/1"
                    className="flex-shrink-0 bg-white text-[#019de3] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Explore Plans →
                  </Link>
                </div>
              </>
            )}

            {/* ── PROFILE TAB ── */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-800 mb-5">Personal Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name",     value: USER.name,   name: "name" },
                    { label: "Email Address", value: USER.email,  name: "email" },
                    { label: "Mobile Number", value: USER.mobile, name: "mobile" },
                    { label: "Member Since",  value: USER.joined, name: "joined", readOnly: true },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{field.label}</label>
                      <input
                        defaultValue={field.value}
                        readOnly={field.readOnly}
                        className={`px-4 py-3 border rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#019de3] ${
                          field.readOnly ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-200 bg-white"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="px-6 py-2.5 bg-[#019de3] text-white rounded-xl text-sm font-medium hover:bg-[#0289c7] transition-colors">
                    Save Changes
                  </button>
                  <button className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
