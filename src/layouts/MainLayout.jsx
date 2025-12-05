import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

/* Why: Layout that hides header on specific routes */
export default function MainLayout({ children }) {
    const location = useLocation();

    // Pages where header should NOT show
    const hideHeaderRoutes = ["/policy"];

    const hideHeader = hideHeaderRoutes.some((r) =>
        location.pathname.startsWith(r)
    );

    return (
        <>
            {!hideHeader && <Header />}
            <main>{children}</main>
            <Footer />
        </>
    );
}
