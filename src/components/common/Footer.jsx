import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { FOOTER_LINKS } from '../../constants/insurance';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-10">
      <Container>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link to="/">
              <img
                src="/images/EasyBeema.png"
                alt="EasyBeema Logo"
                className="w-[140px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">
              India's trusted digital insurance marketplace. Compare, choose, and buy the right coverage anytime, anywhere.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { label: "Twitter", icon: "/images/img_buttons_icon.svg" },
                { label: "LinkedIn", icon: "/images/img_buttons_icon_gray_600.svg" },
                { label: "Facebook", icon: "/images/img_buttons_icon_gray_600_40x40.svg" },
                { label: "Instagram", icon: "/images/img_buttons_icon_40x40.svg" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
                >
                  <img src={social.icon} alt={social.label} className="w-full h-full object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-10">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 hover:text-[#019de3] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} EasyBeema. All rights reserved.</p>
          <p className="text-xs text-gray-400">Made for a secure future</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
