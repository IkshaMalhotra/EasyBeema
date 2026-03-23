import React from "react";
import Button from "./ui/Button";

/**
 * KYC Popup that appears after login, offering to complete KYC or skip.
 */
const KYCPopup = ({ isOpen, onClose, onCompleteKYC }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Your KYC</h2>
          <p className="text-sm text-gray-600 mb-6">
            To access all features and ensure compliance, please complete your Know Your Customer (KYC) verification.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              text="Complete KYC Now"
              onClick={onCompleteKYC}
              variant="primary"
              size="medium"
              className="w-full"
            />
            <Button
              text="Skip for Now"
              onClick={onClose}
              variant="secondary"
              size="medium"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPopup;