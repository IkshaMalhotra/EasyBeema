import React from 'react';
import Container from '../../components/common/Container';

const PartnersSection = () => {
  const partners = [
    {
      id: 1,
      image: "/images/img_gallery_img1_1.png",
      alt: "Partner 1"
    },
    {
      id: 2,
      image: "/images/img_2a2c1d90075390b.png",
      alt: "Partner 2"
    },
    {
      id: 3,
      image: "/images/img_hdfc_bank_emblem.png",
      alt: "HDFC Bank"
    },
    {
      id: 4,
      image: "/images/img_download_2_1.png",
      alt: "Partner 4"
    },
    {
      id: 5,
      image: "/images/img_icici_bank_1_1.png",
      alt: "ICICI Bank"
    },
    {
      id: 6,
      image: "/images/img_bsk9i8cf_400x400.png",
      alt: "Partner 6"
    }
  ];

  return (
  <section className="w-full bg-background-main section-spacing">
      <Container>
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center mt-8">
          {/* Section Header */}
          <div className="text-center max-w-4xl">
            <h2 className="type-h1 font-medium text-center font-inter">
              <span className="text-text-primary">Our </span>
              <span className="text-text-accent">Partner's</span>
            </h2>
            <p className="type-body-lg font-normal leading-relaxed text-center text-text-tertiary font-montserrat">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            </p>
          </div>

          {/* Partners Grid */}
          <div className="w-full">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
              {partners?.map((partner, index) => (
                <div key={partner?.id} className="flex items-center justify-center">
                  {index === 2 ? (
                    // Special handling for HDFC Bank with background
                    (<div className="relative">
                      <img
                        src={partner?.image}
                        alt={partner?.alt}
                        className="w-[90px] h-[90px] sm:w-[140px] sm:h-[140px] lg:w-[150px] lg:h-[150px] object-contain"
                      />
                    </div>)
                  ) : index === 3 ? (
                    // Special handling for partner 4 with different styling
                    (<img
                      src={partner?.image}
                      alt={partner?.alt}
                      className="w-[90px] h-[90px]  object-contain"
                    />)
                  ) : (
                    <img
                      src={partner?.image}
                      alt={partner?.alt}
                      className="w-[90px] h-[90px]  object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;