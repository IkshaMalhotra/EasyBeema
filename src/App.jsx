import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import PolicyDetails from "./pages/Policy/PolicyDetails";
import MainLayout from "./layouts/MainLayout";
import Plans from "./pages/Policy/Plans";
import Payments from "./pages/Policy/Payments";

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
        </Routes>
      </MainLayout>
    </Router>
  );
}