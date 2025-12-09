import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home"; // ensure this file exists in your project
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import PolicyDetails from "./pages/Policy/PolicyDetails";
import Plans from "./pages/Policy/Plans";
import MainLayout from "./layouts/MainLayout";
import Payments from "./pages/Policy/Payments";
import ConfirmationPanel from "./pages/Policy/Confirmationpanel";
import PaymentPortal from "./pages/Policy/PaymentPortal";
import PaymentCompleted from "./pages/Policy/Paymentcompleted";

/* Why: App routes with layout */
export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/policy/:id" element={<PolicyDetails />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/confirm" element={<ConfirmationPanel />} />
          <Route path="/payment-portal" element={<PaymentPortal />} />
          <Route path="/payment-completed" element={<PaymentCompleted />} />

        </Routes>
      </MainLayout>
    </Router>
  );
}
