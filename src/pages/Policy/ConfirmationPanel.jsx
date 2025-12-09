
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function ConfirmationPanel() {
    const navigate = useNavigate();
    const { state = {} } = useLocation();
    const incomingForm = state.form || { name: "", dob: "", email: "", mobile: "" };
    const incomingPlan = state.plan || { title: "Selected Plan", vendorLogo: "/images/HDFCinsurance.png", priceMonthly: 988, priceYearly: 988 * 12 };
    const billingCycle = state.billingCycle || "Monthly";
    const price = state.price ?? (billingCycle === "Monthly" ? incomingPlan.priceMonthly : incomingPlan.priceYearly);

    const incomingProductId = state?.productId ?? state?.planId ?? state?.plan?.id ?? null;

    // activePlan: prefer full plan object in state; else use incomingPlan (already derived from state)
    const activePlan = state?.plan ?? incomingPlan;

    // productTitle: compute early so handlers can use it safely
    const productTitle =
        state?.productTitle ?? activePlan?.title ?? (incomingProductId ? PRODUCT_TITLES[String(incomingProductId)] : null) ?? "Insurance Product";

    const [form, setForm] = useState({
        name: incomingForm.name || "",
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

    useEffect(() => {
        // if location state changes (unlikely) keep in sync
        setForm({
            name: incomingForm.name || "",
            dob: incomingForm.dob || "",
            email: incomingForm.email || "",
            mobile: incomingForm.mobile || "",
            occupation: incomingForm.occupation || "",
            annualIncome: incomingForm.annualIncome || "",
            education: incomingForm.education || "",
        });
    }, [incomingForm]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handlePayNow = () => {
        if (!agreed) {
            alert("Please agree to the terms and conditions to proceed.");
            return;
        }
        if (!form.name || !form.mobile) {
            alert("Please ensure name and mobile are filled.");
            return;
        }

        // build payload and navigate
        const payload = {
            form,
            gender: state.gender,
            smoke: state.smoke,
            survey: state.survey,
            productId: state.productId,
            productTitle: state.productTitle || incomingPlan.title,
            plan: incomingPlan,
            billingCycle,
            price,
            selectedUpgrades: state.selectedUpgrades || {},
            selectedRiders: state.selectedRiders || {},
            // include any other flags the downstream page needs
        };
        setSubmitting(true);
        // small UX delay (optional)
        setTimeout(() => {
            navigate("/payment-portal", { state: payload });
        }, 300);
    };

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <img src="/images/EasyBeema.png" alt="logo" className="h-12" />
                    <div className="text-right">
                        <div className="text-xs text-gray-500">{productTitle}</div>
                    </div>
                </header>

                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={incomingPlan.vendorLogo} alt="vendor" className="h-10" />
                        <h2 className="text-lg font-semibold text-[#d23434]">{incomingPlan.title}</h2>
                    </div>

                    <p className="text-gray-600 mb-6">Review below details before proceeding. These cannot be changed at a later stage.</p>

                    {/* top inputs */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name -"
                            className="border border-[#bfe7ff] rounded px-3 py-3"
                        />
                        <input
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            placeholder="Date of Birth -"
                            className="border border-[#bfe7ff] rounded px-3 py-3"
                        />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email -"
                            className="border border-[#bfe7ff] rounded px-3 py-3"
                        />
                        <input
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number -"
                            className="border border-[#bfe7ff] rounded px-3 py-3"
                        />
                    </div>

                    {/* Additional Details (prefilled from Payments.jsx) */}
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() => setAdditionalOpen(!additionalOpen)}
                            className="w-full text-left border border-[#bfe7ff] rounded px-3 py-3 flex justify-between items-center"
                        >
                            <span className="font-medium">Additional Details</span>
                            <span className="text-gray-500">{additionalOpen ? "▾" : "▸"}</span>
                        </button>

                        {additionalOpen && (
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <label className="block">
                                    <div className="text-xs text-gray-500 mb-1">Occupation</div>
                                    <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="w-full border rounded px-3 py-2" />
                                </label>

                                <label className="block">
                                    <div className="text-xs text-gray-500 mb-1">Annual Income</div>
                                    <input name="annualIncome" value={form.annualIncome} onChange={handleChange} placeholder="Annual Income" className="w-full border rounded px-3 py-2" />
                                </label>

                                <label className="block col-span-2">
                                    <div className="text-xs text-gray-500 mb-1">Education</div>
                                    <input name="education" value={form.education} onChange={handleChange} placeholder="Education" className="w-full border rounded px-3 py-2" />
                                </label>

                                {/* show a quick summary read-only area (optional) */}
                                <div className="col-span-2 text-sm text-gray-600">
                                    <strong>Plan:</strong> {incomingPlan.title} • <strong>Billing:</strong> {billingCycle} • <strong>Price:</strong> Rs. {price}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Declarations */}
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() => setDeclarationsOpen(!declarationsOpen)}
                            className="w-full text-left border border-[#bfe7ff] rounded px-3 py-3 flex justify-between items-center"
                        >
                            <span className="font-medium">Declarations</span>
                            <span className="text-gray-500">{declarationsOpen ? "▾" : "▸"}</span>
                        </button>

                        {declarationsOpen && (
                            <div className="mt-3 p-3 bg-[#f8fbff] border border-[#e6f6ff] rounded text-sm text-gray-700">
                                I declare that the information provided is true and accurate. I accept the policy terms and authorize EasyBeema to carry out necessary checks.
                            </div>
                        )}
                    </div>

                    {/* footer actions */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <label className="flex items-center gap-2 mr-auto text-gray-600">
                            I Agree to the <u className="text-gray-700">terms and conditions</u>
                            <input type="checkbox" className="ml-3 border" checked={agreed} onChange={() => setAgreed(!agreed)} />
                        </label>

                        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md bg-white border">Go Back</button>
                        <button
                            onClick={handlePayNow}
                            className={`px-4 py-2 rounded-md ${agreed ? "bg-[#03a9f4] text-white" : "bg-gray-100 text-gray-500"}`}
                            disabled={!agreed || submitting}
                        >
                            {submitting ? "Opening payment..." : "Pay Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
