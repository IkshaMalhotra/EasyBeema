import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Home
import HomePage from "./pages/Home";

// Auth
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";

// Policy flow
import PolicyDetails from "./pages/Policy/PolicyDetails";
import Plans from "./pages/Policy/Plans";
import Payments from "./pages/Policy/Payments";
import ConfirmationPanel from "./pages/Policy/ConfirmationPanel";
import PaymentPortal from "./pages/Policy/PaymentPortal";
import PaymentCompleted from "./pages/Policy/Paymentcompleted";

// Insurance tools
import RenewPolicy from "./pages/Insurance/RenewPolicy";
import Claims from "./pages/Insurance/Claims";
import ComparePlans from "./pages/Insurance/ComparePlans";

// Static pages
import AboutUs from "./pages/Static/AboutUs";
import TermsAndPrivacy from "./pages/Static/TermsAndPrivacy";
import NotFound from "./pages/Static/NotFound";
import ScrollToTop from "./components/common/Scrolleffect";

// Dashboard
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <ScrollToTop />
        <Routes>
          {/* Main */}
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Policy purchase flow */}
          <Route path="/policy/:id" element={<PolicyDetails />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/confirm" element={<ConfirmationPanel />} />
          <Route path="/payment-portal" element={<PaymentPortal />} />
          <Route path="/payment-completed" element={<PaymentCompleted />} />

          {/* Insurance tools */}
          <Route path="/renew" element={<RenewPolicy />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/compare" element={<ComparePlans />} />

          {/* User */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Static */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsAndPrivacy />} />

          {/* 404 — must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
