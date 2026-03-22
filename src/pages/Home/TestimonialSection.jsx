import React from 'react';
import Container from '../../components/common/Container';

const TESTIMONIALS = [
  {
    id: 1,
    text: "EasyBeema made buying health insurance so simple. I compared 5 plans in minutes and got covered the same day. Highly recommend!",
    name: "Priya Sharma",
    role: "Software Engineer",
    avatar: "/images/img_user_thumb.png",
  },
  {
    id: 2,
    text: "I was confused about term insurance for years. EasyBeema's advisor walked me through everything clearly and helped me choose the best plan for my family.",
    name: "Rahul Mehta",
    role: "Business Owner",
    avatar: "/images/img_user_thumb_64x64.png",
  },
  {
    id: 3,
    text: "The claim settlement was incredibly fast. EasyBeema's support team was with me at every step. I feel truly secure now.",
    name: "Anjali Verma",
    role: "Teacher",
    avatar: "/images/img_user_thumb_1.png",
  },
];

/**
 * Star rating component — purely decorative, shows 5 stars.
 */
const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="w-full section-spacing bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="type-h2 font-semibold text-gray-800">
            What our{" "}
            <span className="text-[#019de3]">Customers say</span>
          </h2>
          <p className="type-body text-gray-500 mt-3">
            Thousands of happy customers trust EasyBeema for their insurance needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#f8fbff] border border-[#e0f0fa] rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <StarRating />
              <p className="type-body text-gray-600 leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
