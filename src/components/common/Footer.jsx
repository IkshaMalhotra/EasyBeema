import React from 'react';
import Container from './Container';

const Footer = () => {
  const footerLinks = [
    {
      title: "Topic",
      links: ["Page", "Page", "Page", "Page"]
    },
    {
      title: "Topic",
      links: ["Page", "Page", "Page", "Page"]
    },
    {
      title: "Topic",
      links: ["Page", "Page", "Page", "Page"]
    }
  ];

  const socialIcons = [
    "/images/img_buttons_icon.svg",
    "/images/img_buttons_icon_gray_600.svg",
    "/images/img_buttons_icon_gray_600_40x40.svg",
    "/images/img_buttons_icon_40x40.svg"
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-10">
      <Container className="px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">

          {/* Logo + Social */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            {/* Logo */}
            <img
              src="/images/EasyBeema.png"
              alt="EasyBeema Logo"
              className="w-[140px] h-auto object-contain"
            />

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              {socialIcons?.map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={icon}
                    alt={`Social icon ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row gap-10 text-center sm:text-left">
            {footerLinks?.map((section, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3 className="text-base font-semibold text-gray-800">
                  {section?.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section?.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-[#007bff] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
