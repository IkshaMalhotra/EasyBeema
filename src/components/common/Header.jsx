import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import Container from "./Container";
import { NAV_LINKS } from "../../constants/insurance";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-40">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/EasyBeema.png"
            alt="EasyBeema Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Nav */}
        <nav
          className={`
            ${menuOpen ? "flex" : "hidden"} flex-col gap-4
            lg:flex lg:flex-row lg:items-center lg:gap-8
            absolute lg:static top-[72px] left-0 w-full lg:w-auto
            bg-white lg:bg-transparent shadow-md lg:shadow-none
            px-6 pb-6 pt-4 lg:p-0
          `}
        >
          {NAV_LINKS.map((link) => {
            const isHashLink = link.href.startsWith('/#');
            const handleClick = () => {
              setMenuOpen(false);
              if (isHashLink && location.pathname === '/') {
                // If it's a hash link and we're on home page, scroll to element
                const elementId = link.href.substring(2); // Remove '/#'
                const element = document.getElementById(elementId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
            };

            return (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-700 hover:text-[#019de3] font-medium transition-colors text-sm"
                onClick={handleClick}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex flex-col lg:flex-row gap-3 lg:ml-4 mt-2 lg:mt-0">
            <Button text="Talk to Expert" variant="primary" size="small" />
            {!isLoginPage && (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button text="Sign In" variant="secondary" size="small" className="w-full lg:w-auto" />
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
