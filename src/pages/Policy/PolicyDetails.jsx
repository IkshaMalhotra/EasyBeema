import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PRODUCT_TITLES } from "../../constants/insurance";

export default function PolicyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gender, setGender] = useState("MALE");
  const [smoke, setSmoke] = useState(null);
  const [form, setForm] = useState({ name: "", dob: "", mobile: "" });
  const [errors, setErrors] = useState({ name: "", dob: "", mobile: "" });
  const [showSurvey, setShowSurvey] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };

  const validateDOB = (dob) => {
    if (!dob) return "Date of birth is required";
    
    // Check format DD/MM/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dob.match(dateRegex);
    if (!match) return "Please enter date in DD/MM/YYYY format";
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    
    // Check valid date
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return "Please enter a valid date";
    }
    
    // Check age (18-80 years)
    const today = new Date();
    const age = today.getFullYear() - year - (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day) ? 1 : 0);
    
    if (age < 18) return "You must be at least 18 years old";
    if (age > 80) return "Age must be 80 years or less";
    
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile) return "Mobile number is required";
    
    // Remove any spaces or special characters
    const cleanMobile = mobile.replace(/\s+/g, '');
    
    // Check if it's a valid 10-digit number
    if (!/^\d{10}$/.test(cleanMobile)) return "Mobile number must be exactly 10 digits";
    
    // Check if it starts with valid Indian mobile prefixes
    const validPrefixes = ['6', '7', '8', '9'];
    if (!validPrefixes.includes(cleanMobile.charAt(0))) {
      return "Mobile number must start with 6, 7, 8, or 9";
    }
    
    return "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;
    
    // Apply field-specific validation and formatting
    if (name === 'name') {
      // Allow only letters, spaces, hyphens, apostrophes
      validatedValue = value.replace(/[^a-zA-Z\s\-']/g, '');
      setErrors({ ...errors, name: validateName(validatedValue) });
    } else if (name === 'dob') {
      // Format date input
      let formatted = value.replace(/\D/g, '');
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
      }
      if (formatted.length >= 5) {
        formatted = formatted.slice(0, 5) + '/' + formatted.slice(5, 9);
      }
      validatedValue = formatted.slice(0, 10);
      setErrors({ ...errors, dob: validateDOB(validatedValue) });
    } else if (name === 'mobile') {
      // Allow only digits and limit to 10 characters
      validatedValue = value.replace(/\D/g, '').slice(0, 10);
      setErrors({ ...errors, mobile: validateMobile(validatedValue) });
    }
    
    setForm({ ...form, [name]: validatedValue });
  };

  const handleOpenSurvey = (e) => {
    e.preventDefault();
    
    // Validate all fields before proceeding
    const nameError = validateName(form.name);
    const dobError = validateDOB(form.dob);
    const mobileError = validateMobile(form.mobile);
    
    setErrors({ name: nameError, dob: dobError, mobile: mobileError });
    
    if (nameError || dobError || mobileError) {
      return;
    }
    
    setShowSurvey(true);
  };

  const productTitle = PRODUCT_TITLES[id] || "Insurance";

  const inputClass =
    "w-full rounded-xl border border-[#cceeff] px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f6fd] to-white">
      <div className="w-full max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <header className="flex items-center justify-between mb-8">
          <Link to="/">
            <img src="/images/EasyBeema.png" alt="EasyBeema Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#019de3] text-white text-sm font-medium hover:bg-[#0289c7] transition-colors">
              Talk to Expert
            </button>
            <button className="px-4 py-2 rounded-lg border border-[#019de3] text-[#019de3] text-sm font-medium hover:bg-[#f0faff] transition-colors">
              Claim Assistance
            </button>
          </div>
        </header>

        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
          Rs. 1 Crore <span className="text-[#019de3]">life cover</span> starting from ₹400/month
        </h1>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Illustration */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <img
              src="/images/img_insurancemarket.png"
              alt="Insurance advisor"
              className="max-h-[480px] object-contain"
            />
          </div>

          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            <div className="max-w-xl mx-auto">

              {/* Gender selector */}
              <div className="flex justify-center gap-4 mb-6">
                {["MALE", "FEMALE", "OTHER"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all focus:outline-none ${
                      gender === g
                        ? "bg-[#019de3] text-white shadow-md"
                        : "bg-white border border-[#019de3] text-[#019de3] hover:bg-[#f0faff]"
                    }`}
                    aria-pressed={gender === g}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Details form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <form className="flex flex-col gap-4" onSubmit={handleOpenSurvey}>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={onChange} 
                      placeholder="Enter your full name" 
                      className={`${inputClass} ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      required 
                    />
                    {errors.name && <span className="text-xs text-red-600 mt-1">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date of Birth</label>
                    <input 
                      name="dob" 
                      value={form.dob} 
                      onChange={onChange} 
                      placeholder="DD/MM/YYYY" 
                      className={`${inputClass} ${errors.dob ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      maxLength="10"
                      required 
                    />
                    {errors.dob && <span className="text-xs text-red-600 mt-1">{errors.dob}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="mobile" 
                      value={form.mobile} 
                      onChange={onChange} 
                      placeholder="Enter 10-digit mobile number" 
                      className={`${inputClass} ${errors.mobile ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                      maxLength="10"
                      required 
                    />
                    {errors.mobile && <span className="text-xs text-red-600 mt-1">{errors.mobile}</span>}
                  </div>

                  {/* Smoker question */}
                  <div className="flex items-center gap-6 py-2">
                    <span className="text-sm text-gray-600">Do You Smoke?</span>
                    <div className="flex gap-4">
                      {[{ label: "Yes", value: true }, { label: "No", value: false }].map((opt) => (
                        <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="smoke"
                            checked={smoke === opt.value}
                            onChange={() => setSmoke(opt.value)}
                            className="w-4 h-4 accent-[#019de3]"
                          />
                          <span className="text-sm text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-base font-semibold bg-gradient-to-b from-white to-[#e6f6ff] border border-[#cceeff] shadow-md hover:shadow-lg transition-shadow mt-2"
                  >
                    VIEW PLANS →
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By clicking, you agree to our{" "}
                    <span className="underline cursor-pointer">Terms & Conditions</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Survey overlay */}
      <SurveyPanel
        open={showSurvey}
        onClose={() => setShowSurvey(false)}
        navigate={navigate}
        formData={form}
        gender={gender}
        smoke={smoke}
        productId={id}
      />
    </div>
  );
}

/* Survey panel — shown as an overlay after form submit */
function SurveyPanel({ open, onClose, navigate, formData, gender, smoke, productId }) {
  const [occupation, setOccupation] = useState(null);
  const [income, setIncome] = useState(null);
  const [education, setEducation] = useState(null);
  const firstBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => firstBtnRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleContinue = () => {
    navigate("/plans", {
      state: { form: formData, gender, smoke, survey: { occupation, income, education }, productId },
    });
  };

  const optionBtn = (selected, value, label, setter) => (
    <button
      key={value}
      type="button"
      onClick={() => setter(value)}
      className={`px-5 py-2 rounded-lg border text-sm transition-colors ${
        selected === value
          ? "bg-[#e8f6fd] border-[#019de3] text-[#019de3] shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-[#019de3]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl mx-4 mt-20 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Answer 3 quick questions to continue</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Occupation Type</p>
            <div className="flex flex-wrap gap-3">
              {optionBtn(occupation, "SELF-EMPLOYED", "Self–Employed", setOccupation)}
              {optionBtn(occupation, "SALARIED", "Salaried Employee", setOccupation)}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Annual Income</p>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "LESS5", label: "Less than ₹5L" },
                { key: "5-9.9", label: "₹5L – ₹9.9L" },
                { key: "10-14.9", label: "₹10L – ₹14.9L" },
                { key: "ABOVE15", label: "Above ₹15L" },
              ].map((opt) => optionBtn(income, opt.key, opt.label, setIncome))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Educational Qualification</p>
            <div className="flex flex-wrap gap-3">
              {[
                { key: "GRAD", label: "Graduate" },
                { key: "12TH", label: "12th Pass" },
                { key: "10TH", label: "10th Pass" },
              ].map((opt) => optionBtn(education, opt.key, opt.label, setEducation))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!occupation || !income || !education}
            className="px-6 py-2 rounded-lg bg-[#019de3] text-white text-sm font-medium hover:bg-[#0289c7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}