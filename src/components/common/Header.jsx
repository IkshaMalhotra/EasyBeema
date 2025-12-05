import React, { useState } from "react";
import Button from "../ui/Button";
import Container from "./Container";

/* Keep header simple and safe for reuse */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnLogin = typeof window !== "undefined" && window.location.pathname === "/login";

  return (
    <header className="w-full shadow-sm bg-white">
      <Container className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <a href="/">
            <img
              src="/images/EasyBeema.png"
              alt="EasyBeema Logo"
              className="h-12 w-auto"
            />
          </a>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <nav
          className={`${menuOpen ? "flex flex-col space-y-4" : "hidden"
            } lg:flex lg:flex-row lg:items-center lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto shadow-md lg:shadow-none p-6 lg:p-0 bg-white lg:bg-transparent`}
        >
          <a href="#" className="block lg:inline-block text-gray-800 hover:text-[#007bff] font-medium">Insurance Products</a>
          <a href="#" className="block lg:inline-block text-gray-800 hover:text-[#007bff] font-medium">Renew Your Policy</a>
          <a href="#" className="block lg:inline-block text-gray-800 hover:text-[#007bff] font-medium">Claim</a>
          <a href="#" className="block lg:inline-block text-gray-800 hover:text-[#007bff] font-medium">Support</a>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:ml-8 mt-4 lg:mt-0">
            <Button text="Talk to Expert" variant="primary" className="bg-[#007bff] text-white px-5 py-2 rounded-md hover:bg-[#006ae6]" />
            {!isOnLogin && (
              <Button text="Sign in" variant="secondary" className="border border-[#007bff] text-[#007bff] px-5 py-2 rounded-md hover:bg-[#007bff] hover:text-white" onClick={() => window.location.href = "/login"} />
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
