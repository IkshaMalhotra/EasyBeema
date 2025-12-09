import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPortal() {
    const navigate = useNavigate();
    const { state = {} } = useLocation();
    const form = state.form || { name: "", dob: "", email: "", mobile: "" };
    const plan = state.plan || { title: "C2P Supreme - WOMEN SECURE SOLUTION", vendorLogo: "/images/HDFCinsurance.png", priceMonthly: 988, originalMonthly: 1129 };
    const billingCycle = state.billingCycle || "Monthly";
    const basePrice = state.price ?? (billingCycle === "Monthly" ? plan.priceMonthly : plan.priceYearly || plan.priceMonthly * 12);

    const [method, setMethod] = useState("netbanking"); // netbanking | upi | card | debit
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectOther, setSelectOther] = useState("");
    const [processing, setProcessing] = useState(false);

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

    const bankTiles = [
        { id: "hdfc", label: "HDFC" },
        { id: "icici", label: "ICICI" },
        { id: "sbi", label: "SBI" },
        { id: "kotak", label: "Kotak Mahindra" },
        { id: "pnb", label: "Punjab National Bank" },
        { id: "bob", label: "Bank of Baroda" },
    ];

    const startPayment = () => {
        if (method === "netbanking" && !selectedBank && !selectOther) {
            alert("Please select a bank or choose another bank.");
            return;
        }

        setProcessing(true);
        setTimeout(() => {
            const orderId = "PB" + Date.now().toString().slice(-9);
            // navigate to completed page with order details
            navigate("/payment-completed", {
                state: {
                    orderId,
                    premium: basePrice,
                    name: form.name,
                    planTitle: plan.title,
                },
            });
        }, 1200);
    };

    const productTitle = state?.productTitle || state?.plan?.title || (state?.productId ? PRODUCT_TITLES[state.productId] : null) || "TERM Life Product";

    const handleproceed = () => {
        navigate("/payment-completed", {
            state: {
                orderId: "PB146577838",
                premium: 988,
                name: form.name
            }
        });

    }

    return (
        <div className="min-h-screen bg-[#f4f8ff] px-6 py-8">
            <div className="max-w-[1200px] mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <img src="/images/EasyBeema.png" alt="logo" className="h-12" />
                    <div className="text-right">
                        <div className="text-xs text-gray-500">{productTitle}</div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left: payment nav + chooser */}
                    <div className="col-span-8">
                        <div className="bg-white rounded-2xl p-5 shadow">
                            {/* progress */}
                            <div className="mb-4 p-3 bg-white rounded shadow-sm border">
                                <div className="flex items-center gap-6 justify-between text-sm text-gray-600">
                                    <div className="flex-1 text-center">Payment Mode</div>
                                    <div className="flex-1 text-center">Payment Complete</div>
                                    <div className="flex-1 text-center">Setup Autopay</div>
                                </div>
                            </div>

                            <div className="flex">
                                {/* left nav */}
                                <nav className="w-52 bg-transparent pr-4">
                                    <ul className="space-y-1">
                                        <li>
                                            <button className={`w-full text-left px-4 py-3 rounded ${method === "netbanking" ? "bg-white shadow" : ""}`} onClick={() => setMethod("netbanking")}>
                                                <strong className="text-blue-600">NetBanking</strong>
                                            </button>
                                        </li>
                                        <li>
                                            <button className={`w-full text-left px-4 py-3 rounded ${method === "upi" ? "bg-white shadow" : ""}`} onClick={() => setMethod("upi")}>
                                                UPI Emandate
                                            </button>
                                        </li>
                                        <li>
                                            <button className={`w-full text-left px-4 py-3 rounded ${method === "card" ? "bg-white shadow" : ""}`} onClick={() => setMethod("card")}>
                                                Credit Card
                                            </button>
                                        </li>
                                        <li>
                                            <button className={`w-full text-left px-4 py-3 rounded ${method === "debit" ? "bg-white shadow" : ""}`} onClick={() => setMethod("debit")}>
                                                Debit Card
                                            </button>
                                        </li>
                                    </ul>
                                </nav>

                                {/* main chooser */}
                                <div className="flex-1 bg-white rounded p-6">
                                    <h3 className="text-lg font-medium mb-4">Select your Bank</h3>

                                    {method === "netbanking" && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                {bankTiles.map((b) => (
                                                    <button
                                                        key={b.id}
                                                        onClick={() => setSelectedBank(b.id)}
                                                        className={`p-4 border rounded text-left flex items-center gap-3 ${selectedBank === b.id ? "border-[#03a9f4] shadow" : ""}`}
                                                    >
                                                        <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-xs">{b.label[0]}</div>
                                                        <div>{b.label}</div>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="mb-4">
                                                <select value={selectOther} onChange={(e) => setSelectOther(e.target.value)} className="w-full border px-3 py-2 rounded">
                                                    <option value="">Select Another Bank</option>
                                                    <option value="axis">Axis Bank</option>
                                                    <option value="indusind">IndusInd</option>
                                                    <option value="idbi">IDBI</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {method === "upi" && (
                                        <div className="mb-4">
                                            <p className="mb-2 text-sm text-gray-600">UPI Emandate: You'll be redirected to the bank/UPI app to approve recurring mandate.</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="p-4 border rounded">PhonePe</button>
                                                <button className="p-4 border rounded">Google Pay</button>
                                            </div>
                                        </div>
                                    )}

                                    {(method === "card" || method === "debit") && (
                                        <div className="space-y-3">
                                            <input className="w-full border rounded px-3 py-2" placeholder="Card Number" />
                                            <div className="flex gap-2">
                                                <input className="flex-1 border rounded px-3 py-2" placeholder="MM/YY" />
                                                <input className="w-28 border rounded px-3 py-2" placeholder="CVV" />
                                            </div>
                                            <input className="w-full border rounded px-3 py-2" placeholder="Name on Card" />
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <button disabled={processing} onClick={handleproceed} className="w-full bg-[#03a9f4] text-white py-3 rounded-md text-lg">
                                            {processing ? "Processing..." : "Pay Now"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right summary */}
                    <aside className="col-span-4">
                        <div className="bg-white rounded-2xl border p-4 shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <img src={plan.vendorLogo} alt="logo" className="h-10" />
                                <div>
                                    <div className="text-sm text-gray-500">Order Number</div>
                                    <div className="text-sm font-medium">PB{Date.now().toString().slice(-8)}</div>
                                </div>
                            </div>

                            <div className="mb-3 border-t pt-3">
                                <div className="flex justify-between items-center">
                                    <div>Total Premium</div>
                                    <div className="font-semibold">₹{basePrice}</div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                                    <div>Max Recurring Amount</div>
                                    <div>₹{Math.round(basePrice * 1.15)}</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="p-3 bg-[#f8fbff] rounded">Pay frequency<br /><strong className="block mt-2">{billingCycle.toUpperCase()}</strong></div>
                            </div>

                            <div className="mb-3">
                                <div className="text-sm font-semibold mb-2">Plan Details</div>
                                <div className="text-sm text-gray-600 bg-green-50 p-3 rounded">
                                    Your premium is ₹{basePrice} for the first year. From 2nd year onwards your premium will be ₹{Math.round(basePrice * 1.14)}.
                                    <div className="text-green-700 mt-2">You save ₹{Math.round(basePrice * 0.12)} (12.00%)</div>
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-semibold mb-2">Proposer Details</div>
                                <div className="text-sm text-gray-700">
                                    {form.name || "—"} <br />
                                    {form.mobile || "—"} <br />
                                    {form.email || "—"}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
