import React, { useState } from "react";
import Container from "../../components/common/Container";

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using EasyBeema's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. These terms apply to all visitors, users, and others who access or use the service.",
  },
  {
    title: "2. Use of Our Services",
    content:
      "EasyBeema is a licensed insurance broking platform (IRDAI License No. DEMO-2019-001). We provide information, comparison, and facilitation services for insurance products. We do not underwrite or issue insurance policies directly. All policies are issued by the respective IRDAI-registered insurance companies.",
  },
  {
    title: "3. User Accounts",
    content:
      "When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account. EasyBeema will not be liable for any loss resulting from unauthorized use of your account.",
  },
  {
    title: "4. Premium Payments",
    content:
      "All premium payments are processed securely through RBI-approved payment gateways. EasyBeema does not store your card or bank details. In case of payment failure, please contact our support team. Refund policies are subject to the terms of the respective insurance company and IRDAI regulations.",
  },
  {
    title: "5. Disclaimer of Warranties",
    content:
      "EasyBeema provides the platform 'as is' and 'as available' without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free. Insurance coverage is subject to the terms and conditions of the individual policy documents issued by the insurer.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "EasyBeema shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you paid to us in the three months preceding the event giving rise to the claim.",
  },
  {
    title: "7. Changes to Terms",
    content:
      "We reserve the right to update these terms at any time. We will notify you of significant changes via email or a notice on our website. Your continued use of EasyBeema after changes constitutes your acceptance of the new terms.",
  },
];

const PRIVACY_SECTIONS = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly (name, email, date of birth, mobile number, health details), information from your use of our services (browsing behavior, search history, policy selections), and technical information (IP address, browser type, device information) for security and analytics.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use your information to provide and improve our services, to generate insurance quotes and compare plans, to communicate with you about your account and policies, to comply with legal obligations, and to send you relevant offers (only with your consent).",
  },
  {
    title: "3. Information Sharing",
    content:
      "We share your information with insurance companies to generate quotes and issue policies you select. We do not sell your personal data to third parties for marketing. We may share anonymized, aggregated data for research purposes. We share data with service providers who help us operate our platform under strict confidentiality agreements.",
  },
  {
    title: "4. Data Security",
    content:
      "We use industry-standard encryption (SSL/TLS) to protect data in transit. Sensitive information is encrypted at rest. We conduct regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Cookies",
    content:
      "We use cookies to remember your preferences, analyze site traffic, and improve your experience. You can control cookie settings through your browser. Disabling cookies may limit some functionality of our platform.",
  },
  {
    title: "6. Your Rights",
    content:
      "Under applicable Indian data protection laws, you have the right to access your personal data, request corrections, request deletion (subject to legal obligations), and opt-out of marketing communications. To exercise these rights, contact us at privacy@easybeema.com.",
  },
  {
    title: "7. Data Retention",
    content:
      "We retain your data for as long as your account is active or as needed to provide services. We retain certain data for up to 7 years to comply with IRDAI regulations and applicable laws. You may request deletion of non-mandatory data at any time.",
  },
];

/**
 * Terms of Service & Privacy Policy page.
 * Tab-based — switches between Terms and Privacy.
 */
export default function TermsAndPrivacy() {
  const [activeTab, setActiveTab] = useState("terms");
  const [openSection, setOpenSection] = useState(null);

  const sections = activeTab === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="type-h1 font-bold text-gray-800">Legal</h1>
            <p className="type-body text-gray-500 mt-3">
              Last updated: January 2025 &nbsp;·&nbsp; EasyBeema Insurance Broking Pvt. Ltd.
            </p>
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <div className="w-full border-b border-gray-200 sticky top-[72px] bg-white z-30">
        <Container>
          <div className="flex gap-6">
            {[
              { id: "terms",   label: "Terms of Service" },
              { id: "privacy", label: "Privacy Policy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setOpenSection(null); }}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#019de3] text-[#019de3]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <section className="w-full section-spacing">
        <Container>
          <div className="max-w-3xl mx-auto">

            {/* Intro */}
            <div className="mb-8 p-5 bg-[#f0faff] border border-[#cceeff] rounded-2xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeTab === "terms"
                  ? "These Terms of Service govern your use of EasyBeema's platform and services. Please read them carefully before using our services."
                  : "This Privacy Policy explains how EasyBeema collects, uses, and protects your personal information when you use our services."}
              </p>
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-3">
              {sections.map((section, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-800">{section.title}</span>
                    <span className={`text-gray-400 text-lg transition-transform ${openSection === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {openSection === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 p-6 bg-[#f8fbff] border border-gray-100 rounded-2xl text-center">
              <p className="text-sm font-semibold text-gray-800 mb-1">Questions about our policies?</p>
              <p className="text-sm text-gray-500">
                Email us at{" "}
                <a href="mailto:legal@easybeema.com" className="text-[#019de3] hover:underline">
                  legal@easybeema.com
                </a>{" "}
                or call{" "}
                <a href="tel:18001234567" className="text-[#019de3] hover:underline">
                  1800-123-4567
                </a>{" "}
                (toll-free, Mon–Sat 9am–6pm)
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
