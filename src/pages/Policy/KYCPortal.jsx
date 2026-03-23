import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * KYCPortal.jsx
 *
 * In production, KYC is handled entirely by a third-party provider
 * (e.g. Digilocker, HyperVerge, Signzy). Your app simply redirects the
 * user to their hosted page with a token, and they redirect back with
 * a success/failure status.
 *
 * This mock simulates that flow:
 * Step 1 — inform the user they will be redirected
 * Step 2 — simulate the external verification (loading state)
 * Step 3 — show success and proceed to payment
 */

const STEPS = [
  { id: 1, label: "Confirm Identity" },
  { id: 2, label: "Verification"     },
  { id: 3, label: "KYC Complete"     },
];

export default function KYCPortal() {
  const navigate = useNavigate();
  const { state = {} } = useLocation();

  const [step, setStep] = useState(1); // 1 = info, 2 = verifying, 3 = success

  // When step 2 starts, auto-advance to step 3 after 3 seconds
  // This simulates the round-trip to the third-party KYC provider
  useEffect(() => {
    if (step !== 2) return;
    const timer = setTimeout(() => setStep(3), 3000);
    return () => clearTimeout(timer);
  }, [step]);

  const handleProceedToPayment = () => {
    if (state.fromLogin) {
      navigate("/");
    } else {
      navigate("/payment-portal", { state });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center px-4 py-12">
      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s.id
                  ? "bg-[#019de3] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}>
                {step > s.id
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : s.id
                }
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? "text-[#019de3]" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 h-px mb-5 transition-colors ${step > s.id ? "bg-[#019de3]" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8">

        {/* ── Step 1 — Info & redirect ── */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#f0faff] flex items-center justify-center text-3xl">
              🔐
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">KYC Verification Required</h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                As per IRDAI regulations, identity verification is mandatory before policy issuance.
                You will be briefly redirected to our KYC partner's secure portal to complete this step.
              </p>
            </div>

            <div className="w-full bg-[#f8fbff] border border-[#e0f0fa] rounded-xl p-4 text-left flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">What happens next</p>
              {[
                "You are redirected to our KYC partner's secure page",
                "They verify your identity via Aadhaar OTP or PAN",
                "You are returned here automatically once verified",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#019de3] font-bold mt-0.5">→</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400">
              Powered by <strong className="text-gray-500">Digilocker / UIDAI</strong> · Your data is encrypted and never stored by EasyBeema
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-[#019de3] text-white rounded-xl text-sm font-semibold hover:bg-[#0289c7] transition-colors shadow-sm"
            >
              Proceed to KYC →
            </button>

            <button
              onClick={() => navigate(-1)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Go back
            </button>
          </div>
        )}

        {/* ── Step 2 — Simulated redirect / verification in progress ── */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-6 text-center py-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-[#e0f0fa] border-t-[#019de3] animate-spin" />

            <div>
              <h2 className="text-lg font-bold text-gray-800">Verifying your identity</h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Please wait while our KYC partner verifies your details. Do not close or refresh this page.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              {[
                { label: "Connecting to Digilocker",     done: true  },
                { label: "Verifying Aadhaar details",    done: true  },
                { label: "Confirming identity match",    done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
                  {item.done
                    ? <span className="text-green-500 text-sm font-bold">✓</span>
                    : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 border-t-[#019de3] animate-spin flex-shrink-0" />
                  }
                  <span className={`text-sm ${item.done ? "text-gray-500 line-through" : "text-gray-700 font-medium"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400">This usually takes under 10 seconds</p>
          </div>
        )}

        {/* ── Step 3 — Success ── */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800">KYC Verified Successfully!</h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Your identity has been verified. You can now proceed to complete your payment and activate your policy.
              </p>
            </div>

            <div className="w-full bg-green-50 border border-green-100 rounded-xl p-4 flex flex-col gap-2 text-left">
              {[
                { label: "Identity Verified",   value: "✓ Aadhaar OTP" },
                { label: "Name Match",          value: "✓ Confirmed"   },
                { label: "KYC Status",          value: "✓ Complete"    },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-green-700">{item.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full py-3 bg-[#019de3] text-white rounded-xl text-sm font-semibold hover:bg-[#0289c7] transition-colors shadow-sm"
            >
              {state.fromLogin ? "View Plans →" : "Proceed to Payment →"}
            </button>

            <p className="text-xs text-gray-400">
              KYC Reference: <strong className="text-gray-500">KYC{Date.now().toString().slice(-9)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
