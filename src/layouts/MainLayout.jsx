import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

/**
 * MainLayout wraps every page.
 * Hides the shared Header/Footer on pages that have their own internal header
 * (the policy purchase flow pages).
 */

const HIDE_HEADER_ROUTES = ["/policy", "/plans", "/payments", "/confirm", "/payment-portal", "/payment-completed"];
const HIDE_FOOTER_ROUTES = ["/payments", "/confirm", "/payment-portal", "/payment-completed"];

export default function MainLayout({ children }) {
  const location = useLocation();

  const hideHeader = HIDE_HEADER_ROUTES.some((r) => location.pathname.startsWith(r));
  const hideFooter = HIDE_FOOTER_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <>
      {!hideHeader && <Header />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
