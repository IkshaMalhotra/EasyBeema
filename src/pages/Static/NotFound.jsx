import React from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * 404 Not Found page.
 * Shown when user navigates to a route that doesn't exist.
 * Add <Route path="*" element={<NotFound />} /> in App.jsx to wire it up.
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center px-4 text-center">

      {/* Logo */}
      <Link to="/">
        <img src="/images/EasyBeema.png" alt="EasyBeema" className="h-12 mb-10" />
      </Link>

      {/* Illustration — big 404 text */}
      <div className="relative mb-6 select-none">
        <span className="text-[120px] sm:text-[160px] font-black text-[#e8f6fd] leading-none">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-4xl">
          🔍
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Go Back
        </button>
        <Link
          to="/"
          className="px-6 py-3 bg-[#019de3] text-white rounded-xl text-sm font-medium hover:bg-[#0289c7] transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Helpful links */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        <Link to="/policy/2" className="hover:text-[#019de3] transition-colors">Health Insurance</Link>
        <Link to="/policy/3" className="hover:text-[#019de3] transition-colors">Car Insurance</Link>
        <Link to="/policy/1" className="hover:text-[#019de3] transition-colors">Life Insurance</Link>
        <Link to="/login"    className="hover:text-[#019de3] transition-colors">Login</Link>
      </div>
    </div>
  );
}
