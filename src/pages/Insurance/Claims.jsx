import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

const CLAIM_TYPES = [
  { id: "health",   label: "Health / Hospitalisation", icon: "🏥" },
  { id: "motor",    label: "Motor Accident / Damage",  icon: "🚗" },
  { id: "life",     label: "Life Insurance Claim",     icon: "🛡️" },
  { id: "travel",   label: "Travel Insurance",         icon: "✈️" },
];

const STEPS = [
  { step: "01", title: "Intimate the Claim",   desc: "Notify EasyBeema or the insurer within 24–48 hours of the incident via phone, app, or this form." },
  { step: "02", title: "Submit Documents",     desc: "Upload the required documents (policy copy, bills, FIR if applicable). Our team reviews and guides you." },
  { step: "03", title: "Surveyor Assessment",  desc: "The insurer assigns a surveyor (for motor/health) who assesses the loss and submits a report." },
  { step: "04", title: "Claim Settlement",     desc: "Once approved, the claim amount is transferred directly to your account within 7 working days." },
];

const DOCUMENTS = {
  health: ["Original hospital bills & discharge summary", "Doctor's prescription & medical reports", "Health card / policy document", "Identity proof", "Claim form (signed by insured)"],
  motor:  ["FIR copy (for theft or third-party claims)", "RC Book & Driving Licence", "Original repair estimates / bills", "Policy document", "Photos of the damaged vehicle"],
  life:   ["Original death certificate", "Policy document (original)", "Identity & address proof of nominee", "Claimant's bank details", "Medical records (if applicable)"],
  travel: ["Boarding passes & tickets", "Original medical bills / receipts", "Loss report from airline (baggage loss)", "Policy document", "Passport copy"],
};

/**
 * Claims page.
 * Guides the user through the claim process: select type → view docs → submit.
 */
export default function Claims() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(1); // 1 = select type, 2 = form

  const [formData, setFormData] = useState({
    policyNo: "", name: "", mobile: "", email: "", incidentDate: "", description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <div className="w-full min-h-screen bg-[#f8fbff]">

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] py-12">
        <Container>
          <div className="text-center mb-4">
            <span className="inline-block bg-[#f0faff] text-[#019de3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4">
              Claim Support
            </span>
            <h1 className="type-h1 font-bold text-gray-800">
              File a <span className="text-[#019de3]">Claim</span>
            </h1>
            <p className="type-body text-gray-500 mt-3 max-w-xl mx-auto">
              We're here to make the claims process as smooth as possible. Our dedicated team has a 99.3% settlement ratio.
            </p>
          </div>

          {/* Quick helpline */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href="tel:18001234567" className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-[#019de3] transition-colors shadow-sm">
              📞 1800-123-4567 <span className="text-xs text-gray-400">(Toll-free)</span>
            </a>
            <a href="mailto:claims@easybeema.com" className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium text-gray-700 hover:border-[#019de3] transition-colors shadow-sm">
              ✉️ claims@easybeema.com
            </a>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="w-full section-spacing bg-white">
        <Container>
          <div className="text-center mb-10">
            <h2 className="type-h2 font-bold text-gray-800">
              How claims <span className="text-[#019de3]">work</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <span className="text-3xl font-black text-[#e8f6fd]">{s.step}</span>
                <h3 className="text-sm font-bold text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* File a claim */}
      <section className="w-full section-spacing">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="type-h2 font-bold text-gray-800 text-center mb-8">
              Submit Your Claim
            </h2>

            {submitted ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Claim Registered!</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Your claim has been registered. Our team will contact you within 4 working hours on{" "}
                  <strong>{formData.mobile}</strong>.
                </p>
                <p className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
                  Claim Reference: <strong>CLM{Date.now().toString().slice(-8)}</strong>
                </p>
                <Button text="Back to Home" variant="secondary" size="medium" onClick={() => navigate("/")} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">

                {/* Step 1 — select type */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Select Claim Type</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CLAIM_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                          selectedType === type.id
                            ? "border-[#019de3] bg-[#f0faff] shadow-sm"
                            : "border-gray-200 hover:border-[#019de3]"
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-xs font-medium text-gray-700 leading-tight">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Required documents */}
                {selectedType && (
                  <div className="bg-[#f0faff] border border-[#cceeff] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#019de3] uppercase tracking-wide mb-3">Documents Required</p>
                    <ul className="flex flex-col gap-1.5">
                      {DOCUMENTS[selectedType].map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#019de3] mt-0.5">✓</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Claim form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Policy Number</label>
                      <input name="policyNo" value={formData.policyNo} onChange={handleChange} placeholder="e.g. HDFC-TL-2024-001234" className={inputClass} required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                      <input name="name" value={formData.name} onChange={handleChange} placeholder="As per policy" className={inputClass} required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mobile Number</label>
                      <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} required />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date of Incident</label>
                      <input name="incidentDate" type="date" value={formData.incidentDate} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brief Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe what happened..."
                      rows={4}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>
                  <Button text="Submit Claim →" type="submit" variant="primary" size="medium" className="w-full" />
                  <p className="text-xs text-center text-gray-400">
                    Our claims team will reach out within 4 working hours of submission.
                  </p>
                </form>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
