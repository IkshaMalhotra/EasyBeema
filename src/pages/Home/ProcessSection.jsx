import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';

const STEPS = [
  {
    id: 1,
    step: "Step 1",
    title: "Start Your Journey",
    description: "Fill out our quick, user-friendly form to kickstart your insurance process in just minutes.",
    buttonText: "Explore Policies",
    buttonAction: "/policy/1",
    image: "/images/img_insurancemarket_434x306.png",
    imageRight: true,
  },
  {
    id: 2,
    step: "Step 2",
    title: "Compare & Choose",
    description: "Compare plans from top insurers side-by-side and get expert guidance from your personal advisor.",
    buttonText: "Talk to Expert",
    buttonAction: null,
    image: "/images/img_insurancemarket_434x306.png",
    imageRight: false,
  },
  {
    id: 3,
    step: "Step 3",
    title: "Purchase & Protect",
    description: "Complete your policy instantly with a quick payment and upload your documents. You're covered!",
    buttonText: "Get Started",
    buttonAction: "/signup",
    image: "/images/img_insurancemarket_434x306.png",
    imageRight: true,
  },
];

const ProcessSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full section-spacing bg-[#f8fbff]">
      <Container>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="type-h2 font-semibold text-gray-800">
            Get Insured in Just{" "}
            <span className="text-[#019de3]">3 Easy Steps!</span>
          </h2>
          <p className="type-body text-gray-500 mt-3 max-w-lg mx-auto">
            Our streamlined process makes buying insurance as simple as possible.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-12 max-w-3xl mx-auto">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${
                !step.imageRight ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="flex-1 flex flex-col gap-3">
                <span className="text-xs font-semibold text-[#019de3] uppercase tracking-widest">
                  {step.step}
                </span>
                <h3 className="type-h3 font-semibold text-gray-800">{step.title}</h3>
                <p className="type-body text-gray-500 leading-relaxed">{step.description}</p>
                <div className="mt-1">
                  <Button
                    text={step.buttonText}
                    variant="primary"
                    size="small"
                    onClick={() => step.buttonAction && navigate(step.buttonAction)}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={step.image}
                  alt={`Step ${step.id} illustration`}
                  className="w-[130px] sm:w-[160px] lg:w-[190px] h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
