import React from 'react';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-light flex items-center justify-center px-6">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center p-8 sm:p-12 lg:p-16 gap-6 lg:gap-4">
          {/* Character Image - Mobile First */}
          <div className="w-full lg:w-[20%] flex justify-start mb-6 lg:mb-0 order-1 lg:order-1">
            <img
              src="/images/img_insurancemarket.png"
              alt="Insurance advisor character"
              className="w-[160px] h-[340px] sm:w-[180px] sm:h-[380px] lg:w-[220px] lg:h-[460px] object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-[74%] flex flex-col gap-6 sm:gap-8 lg:gap-10 order-2 lg:order-2 lg:ml-3">
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 items-start text-left">
              {/* Main Heading */}
              <h1 className="type-h1 font-medium leading-tight font-inter">
                <span className="text-text-primary">Finding the right</span>
                <br />
                <span className="text-text-accent">Insurance</span>
                <span className="text-[#005f9b]"> made simple</span>
              </h1>

              {/* Description */}
              <p className="type-body font-normal leading-relaxed text-text-secondary font-inter max-w-full">
                EasyBeema is Nepal's trusted digital insurance marketplace, making it simple for you to compare, choose, and buy the right coverage anytime, anywhere.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-start">
              <Button
                text="Explore More"
                text_font_size="18px"
                text_line_height="30px"
                padding="10px 32px 10px 26px"
                className="text-center"
                layout_width="auto"
                margin="0"
                position="static"
                variant="primary"
                size="medium"
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;