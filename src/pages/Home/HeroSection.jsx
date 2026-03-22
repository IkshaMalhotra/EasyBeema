import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] flex items-center justify-center">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 lg:py-20 gap-8 lg:gap-6">

          {/* Character image */}
          <div className="w-full lg:w-[22%] flex justify-center lg:justify-start order-2 lg:order-1">
            <img
              src="/images/img_insurancemarket.png"
              alt="Insurance advisor"
              className="w-[160px] sm:w-[200px] lg:w-[240px] h-auto object-contain"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-[72%] flex flex-col gap-6 order-1 lg:order-2 text-left">
            <h1 className="type-h1 font-semibold leading-tight text-gray-800">
              Finding the right{" "}
              <span className="text-[#019de3]">Insurance</span>{" "}
              <span className="text-[#005f9b]">made simple</span>
            </h1>

            <p className="type-body leading-relaxed text-gray-500 max-w-xl">
              EasyBeema is India's trusted digital insurance marketplace, making it simple for you to
              compare, choose, and buy the right coverage anytime, anywhere.
            </p>

            {/* Stats row — adds social proof, great talking point in interviews */}
            <div className="flex flex-wrap gap-6 mt-2">
              {[
                { value: "50L+", label: "Lives Insured" },
                { value: "30+", label: "Insurer Partners" },
                { value: "99.3%", label: "Claim Settlement" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#019de3]">{stat.value}</span>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap mt-2">
              <Button
                text="Explore Plans"
                variant="primary"
                size="medium"
                onClick={() => navigate("/policy/1")}
              />
              <Button
                text="Talk to Expert"
                variant="secondary"
                size="medium"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
