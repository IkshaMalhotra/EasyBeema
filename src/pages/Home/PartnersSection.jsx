import React from 'react';
import Container from '../../components/common/Container';

const PARTNERS = [
  { id: 1, image: "/images/img_gallery_img1_1.png",       alt: "LIC" },
  { id: 2, image: "/images/img_2a2c1d90075390b.png",      alt: "Star Health" },
  { id: 3, image: "/images/img_hdfc_bank_emblem.png",     alt: "HDFC Life" },
  { id: 4, image: "/images/img_download_2_1.png",         alt: "Bajaj Allianz" },
  { id: 5, image: "/images/img_icici_bank_1_1.png",       alt: "ICICI Prudential" },
  { id: 6, image: "/images/img_bsk9i8cf_400x400.png",     alt: "Reliance General" },
];

const PartnersSection = () => {
  return (
    <section className="w-full section-spacing bg-[#f8fbff]">
      <Container>
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="type-h2 font-semibold text-gray-800">
            Our Trusted{" "}
            <span className="text-[#019de3]">Partners</span>
          </h2>
          <p className="type-body text-gray-500 mt-3 max-w-md mx-auto">
            We partner with India's most trusted insurance companies to bring you the best plans at the lowest prices.
          </p>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-200"
            >
              <img
                src={partner.image}
                alt={partner.alt}
                className="w-[80px] sm:w-[100px] h-[60px] object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;
