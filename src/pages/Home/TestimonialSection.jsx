import React from 'react';
import Container from '../../components/common/Container';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "Non risus viverra enim, quis. Eget vitae arcu vivamus sit tellus, viverra turpis lorem. Varius a turpis urna id porttitor.",
      name: "Hellen Jummy",
      role: "Team Lead",
      avatar: "/images/img_user_thumb.png",
      bgColor: "linear-gradient(180deg,#ffc727 0%,#ffc727 50%, #ff8127 100%)",
      cardBg: "#f3fbff"
    },
    {
      id: 2,
      text: "Aliquet ridiculus mi porta habitant vulputate rhoncus, mattis amet enim. Sit purus venenatis velit semper lectus sed ornare quam nulla. Lacus, ut congue sagittis vel nisi integer imperdiet a vitae.",
      name: "David Oshodi",
      role: "Manager",
      avatar: "/images/img_user_thumb_64x64.png",
      bgColor: "#f3fbff",
      cardBg: "#f3fbff"
    },
    {
      id: 3,
      text: "A eget sed posuere dui risus habitasse mauris.  Pretium vehicula pretium posuere justo sed lorem cursus.",
      name: "David Oshodi",
      role: "Manager",
      avatar: "/images/img_user_thumb_1.png",
      bgColor: "#e7f7ff",
      cardBg: "#f3fbff"
    }
  ];

  return (
    <section className="w-full bg-background-main section-spacing">
      <Container className="px-4 sm:px-6 lg:px-9">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="type-h1 font-medium font-inter">
              <span className="text-text-primary">What our </span>
              <span className="text-text-accent">Customers say about us!</span>
            </h2>
          </div>

          {/* Testimonials Container */}
          <div className="w-full relative">
            {/* Background Circle removed to avoid overlay on third card */}

            {/* Testimonials Grid */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-6 px-4 sm:px-8 lg:px-[76px]">
              {testimonials?.map((testimonial, index) => (
                <div
                  key={testimonial?.id}
                  className={`w-full lg:w-[384px] rounded-md ${index === 0 ? 'mt-9 mb-9' : index === 2 ? 'mt-4 mb-4' : ''}`}
                  style={{ background: testimonial?.bgColor }}
                >
                  <div
                    className="w-full h-full rounded-md p-6 sm:p-7 lg:p-8 flex flex-col gap-6 sm:gap-7 lg:gap-8"
                    style={{ backgroundColor: testimonial?.cardBg }}
                  >
                    {/* Testimonial Text */}
                    <p className="type-body-lg font-normal leading-relaxed text-text-primary font-roboto">
                      {testimonial?.text}
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={testimonial?.avatar}
                        alt={testimonial?.name}
                        className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h4 className="type-body font-normal leading-relaxed text-text-primary font-roboto">
                          {testimonial?.name}
                        </h4>
                        <p className="type-small font-normal leading-snug text-text-primary font-roboto">
                          {testimonial?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;