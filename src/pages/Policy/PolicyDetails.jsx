import React, { useState, useRef, useEffect } from "react";

export default function PolicyDetails() {
    const [gender, setGender] = useState("MALE");
    const [smoke, setSmoke] = useState(null);
    const [form, setForm] = useState({ name: "", dob: "", mobile: "" });
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleOpenSurvey = (e) => {
        e.preventDefault();
        // Optionally validate form here before showing survey
        setShowSurvey(true);
    };

    return (

        <div className="min-h-screen bg-gradient-to-b from-primary-light to-white flex items-start">
            <div className="w-full max-w-6xl mx-auto px-6 py-10">
                {/* Header area inside page (site header is handled by MainLayout) */}
                <header className="w-full shadow-sm flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <a href="/">
                            <img
                                src="/images/EasyBeema.png"
                                alt="EasyBeema Logo"
                                className="h-12 w-auto"
                            />
                        </a>
                    </div>

                    <button
                        className="lg:hidden p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <nav
                        className={`${menuOpen ? "flex flex-col space-y-4" : "hidden"
                            } lg:flex lg:flex-row lg:items-center lg:space-x-8 absolute lg:static top-28 left-0 w-full lg:w-auto shadow-md lg:shadow-none p-6 lg:p-0 bg-white lg:bg-transparent`}
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:ml-8 mt-4 lg:mt-0">
                            <button className="px-4 py-2 rounded-sm bg-[#03a9f4] text-white font-medium shadow-sm">Talk to Expert</button>
                            <button className="px-4 py-2 rounded-sm bg-[#03a9f4] text-white font-medium shadow-sm">Claim Assistance</button>
                        </div>
                    </nav>

                </header>

                <h1 className="text-3xl font-semibold text-center mb-6">
                    Rs. 1 Crore <span className="text-[#03a9f4]">life cover</span> starting from RS.400/month
                </h1>

                <main className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-5 flex justify-end">
                        {/* Using the public images directory */}
                        <img
                            src="/images/img_insurancemarket.png"
                            alt="hero"
                            className="max-h-[520px] object-contain"
                            style={{ transform: "translateY(8px)" }}
                        />
                    </div>

                    <div className="col-span-7">
                        <div className="max-w-xl mx-auto">
                            <div className="flex flex-wrap justify-center gap-6 ">
                                {["MALE", "FEMALE", "OTHER"].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setGender(g)}
                                        className={`px-8 py-3 rounded-sm font-semibold transition-shadow focus:outline-none ${gender === g
                                            ? "bg-[#059be8] text-white shadow-lg"
                                            : "bg-[#09a6e7]/90 text-white/90"
                                            }`}
                                        aria-pressed={gender === g} required
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>

                            <div className="backdrop-blur-sm rounded-3xl p-8 shadow-soft-pill border border-white/40">
                                <form className="space-y-5" onSubmit={handleOpenSurvey}>
                                    <label className="block">
                                        <div className="text-gray-500 text-sm mb-2">Name</div>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={onChange}
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-[#0ea5e9]/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03a9f4]" required
                                        />
                                    </label>

                                    <label className="block">
                                        <div className="text-gray-500 text-sm mb-2">Date of Birth</div>
                                        <input
                                            name="dob"
                                            value={form.dob}
                                            onChange={onChange}
                                            placeholder="DD/MM/YYYY"
                                            className="w-full rounded-xl border border-[#0ea5e9]/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03a9f4]" required
                                        />
                                    </label>

                                    <label className="block">
                                        <div className="text-gray-500 text-sm mb-2">Mobile Number</div>
                                        <input
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={onChange}
                                            placeholder="Enter your mobile number"
                                            className="w-full rounded-xl border border-[#0ea5e9]/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03a9f4]" required
                                        />
                                    </label>

                                    <div className="flex items-center gap-4 text-gray-600 text-sm">
                                        <div>Do You Smoke?</div>
                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="smoke"
                                                    checked={smoke === true}
                                                    onChange={() => setSmoke(true)}
                                                    className="w-4 h-4 text-[#03a9f4]"
                                                />
                                                <span className="text-sm">YES</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="smoke"
                                                    checked={smoke === false}
                                                    onChange={() => setSmoke(false)}
                                                    className="w-4 h-4 text-[#03a9f4]"
                                                />
                                                <span className="text-sm">NO</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full rounded-full py-4 text-lg font-medium bg-gradient-to-b from-white to-[#e6f6ff] shadow-xl border border-[#d0efff] hover:shadow-2xl"
                                        >
                                            VIEW PLANS
                                        </button>
                                    </div>

                                    <p className="text-center text-xs text-gray-400 mt-3">
                                        By Clicking, you agree to our Terms & Conditions, Privacy Policy
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                        </div>

                        {/* SurveyPanel overlay */}
                        <SurveyPanel open={showSurvey} onClose={() => setShowSurvey(false)} />
                </div>
        );
}

function SurveyPanel({ open, onClose }) {
    if (!open) return null;
    const [occupation, setOccupation] = useState(null);
    const [income, setIncome] = useState(null);
    const [education, setEducation] = useState(null);
    const firstBtnRef = useRef(null);

    // Escape key + focus + body scroll lock
    useEffect(() => {
        function handleKey(e) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", handleKey);
            // focus first control after a tick for transition
            setTimeout(() => firstBtnRef.current?.focus(), 80);
            document.body.style.overflow = "hidden";
        } else {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        }
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    const handleContinue = () => {
        // Replace with actual submit logic
        console.log("Survey result:", { occupation, income, education });
        onClose();
    };

    // Keep DOM in place for smooth animation; use pointer-events to control interactability
    return (
        <div
            aria-hidden={!open}
            className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0"
                }`}
            />

            {/* Panel */}
            <div className="relative pointer-events-none max-w-3xl w-full mx-4 mt-24">
                <div
                    role="dialog"
                    aria-modal="true"
                    className={`transform transition-all duration-300 pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ${
                        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b">
                        <div className="flex items-center gap-3">
                            {/* use the uploaded graphic - path provided by you */}
                            <h2 className="text-xl">Answer 3 simple Questions to move forward!</h2>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Close survey"
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-md focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {/* Occupation */}
                        <div className="text-center mb-6">
                            <p className="text-gray-500 tracking-wider uppercase">Choose your occupation type</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    ref={firstBtnRef}
                                    type="button"
                                    onClick={() => setOccupation("SELF-EMPLOYED")}
                                    className={`px-6 py-2 rounded-md border transition-colors ${
                                        occupation === "SELF-EMPLOYED"
                                            ? "bg-[#e9f7ff] border-[#0ea5e9] text-[#0ea5e9] shadow"
                                            : "bg-white border-[#bfe7ff] text-gray-700"
                                    }`}
                                >
                                    SELF–EMPLOYED
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOccupation("SALARIED")}
                                    className={`px-6 py-2 rounded-md border transition-colors ${
                                        occupation === "SALARIED"
                                            ? "bg-[#e9f7ff] border-[#0ea5e9] text-[#0ea5e9] shadow"
                                            : "bg-white border-[#bfe7ff] text-gray-700"
                                    }`}
                                >
                                    SALARIED EMPLOYEE
                                </button>
                            </div>
                        </div>

                        <hr className="my-6 border-t border-gray-300" />

                        {/* Income */}
                        <div className="text-center mb-6">
                            <p className="text-gray-500 tracking-wider uppercase">Choose your annual income</p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                {[
                                    { key: "LESS5", label: "Less than 5Lac" },
                                    { key: "5-9.9", label: "5 Lac to 9.9 Lac" },
                                    { key: "10-14.9", label: "10 Lac to 14.9 Lac" },
                                    { key: "ABOVE15", label: "Above 15 Lac" },
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setIncome(opt.key)}
                                        className={`px-5 py-2 rounded-md border transition-colors ${
                                            income === opt.key
                                                ? "bg-[#e9f7ff] border-[#0ea5e9] text-[#0ea5e9] shadow"
                                                : "bg-white border-[#bfe7ff] text-gray-700"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className="my-6 border-t border-gray-300" />

                        {/* Education */}
                        <div className="text-center mb-2">
                            <p className="text-gray-500 tracking-wider uppercase">Choose your educational qualification</p>
                            <div className="flex justify-center gap-4 mt-4">
                                {[
                                    { key: "GRAD", label: "GRADUATE" },
                                    { key: "12TH", label: "12th PASS" },
                                    { key: "10TH", label: "10th PASS" },
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setEducation(opt.key)}
                                        className={`px-6 py-2 rounded-md border transition-colors ${
                                            education === opt.key
                                                ? "bg-[#e9f7ff] border-[#0ea5e9] text-[#0ea5e9] shadow"
                                                : "bg-white border-[#bfe7ff] text-gray-700"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="mt-8 flex items-center justify-between gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-50"
                            >
                                Back
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleContinue}
                                    disabled={!occupation || !income || !education}
                                    className={`px-6 py-2 rounded-full font-medium transition disabled:opacity-50 ${
                                        occupation && income && education
                                            ? "bg-[#0ea5e9] text-white"
                                            : "bg-[#e6f6ff] text-gray-400"
                                    }`}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


