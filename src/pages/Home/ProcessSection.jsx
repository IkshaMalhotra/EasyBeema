import React from 'react';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';

const ProcessSection = () => {
  const steps = [
    {
      id: 1, title: "Start Your Journey", description: "Fill out our quick, user-friendly form to kickstart your insurance process in minutes.", buttonText: "Explore Policies", image: "/images/img_insurancemarket_434x306.png", imagePosition: "right"
    },
    {
      id: 2, title: "Compare & Choose", description: "Get expert guidance from your personal insurance advisor whenever you need it.", buttonText: "Talk to Expert", image: "/images/img_insurancemarket_434x306.png", imagePosition: "left"
    },
    {
      id: 3, title: "Purchase & Protect", description: "Complete your policy instantly by making a quick payment and uploading your documents.", buttonText: "Sign In", image: "/images/img_insurancemarket_434x306.png", imagePosition: "right"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 flex justify-center">
      <Container>
        <div className="flex flex-col items-center gap-12">
          {/* Section Header */}
          <h2 className="text-center text-2xl sm:text-3xl font-semibold font-inter">
            <span className="text-text-primary">Get Insured in Just </span>
            <span className="text-text-accent">3 easy steps!</span>
          </h2>

          {/* Steps */}
          <div className="flex flex-col gap-12 w-full">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-between w-full max-w-3xl mx-auto gap-6
                ${index === 1 ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Text */}
                <div
                  className={`flex flex-col gap-3 w-2/3 ${index === 1 ? "text-left items-start" : "text-left items-start"
                    }`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                  <div className={`mt-2 ${index === 1 ? "self-start" : "self-start"}`}>
                    <Button
                      text={step.buttonText}
                      variant="primary"
                      size="small"
                      className="px-4 py-2 text-sm"
                      onClick={() => { }}
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="flex justify-center w-1/3">
                  <img
                    src={step.image}
                    alt={`Step ${step.id} illustration`}
                    className="w-[120px] sm:w-[150px] lg:w-[180px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;
