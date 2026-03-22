import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import Button from '../../components/ui/Button';

const PRODUCTS = [
  { id: 1, image: "/images/img_easybeema_7_1.png", title: "Term Life Insurance" },
  { id: 2, image: "/images/img_easybeema_8_1.png", title: "Health Insurance" },
  { id: 3, image: "/images/img_easybeema_9_1.png", title: "Car Insurance" },
  { id: 4, image: "/images/img_easybeema_15_1.png", title: "Family Insurance" },
  { id: 5, image: "/images/img_easybeema_12_1.png", title: "Investment Plans" },
  { id: 6, image: "/images/img_easybeema_13_1.png", title: "Travel Insurance" },
  { id: 7, image: "/images/img_easybeema_14_1.png", title: "Term Insurance (Women)" },
  { id: 8, image: "/images/img_easybeema_16_1.png", title: "2 Wheeler Insurance" },
];

const ProductGrid = () => {
  return (
    <section id="products" className="w-full section-spacing bg-white">
      <Container>
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-[#f0faff] text-[#019de3] text-sm font-medium px-4 py-2 rounded-full mb-4">
            Our Products
          </span>
          <h2 className="type-h2 font-semibold text-gray-800">
            The easiest step towards a{" "}
            <span className="text-[#019de3]">secure future</span>
          </h2>
          <p className="type-body text-gray-500 mt-3 max-w-xl mx-auto">
            Choose from a wide range of insurance products tailored to protect what matters most to you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((product) => (
            <Link
              to={`/policy/${product.id}`}
              key={product.id}
              className="group flex flex-col gap-3 items-start"
            >
              {/* Image card */}
              <div className="w-full bg-[#f0faff] rounded-xl flex items-center justify-center p-4 h-[150px] sm:h-[166px] group-hover:bg-[#e0f4fd] transition-colors duration-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Label */}
              <div className="flex flex-col gap-0.5 px-1">
                <p className="text-xs font-medium text-[#019de3]">Lowest Price Guarantee</p>
                <h3 className="text-sm font-semibold text-gray-700 leading-snug group-hover:text-[#019de3] transition-colors">
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="flex justify-center mt-10">
          <Button text="View All Policies" variant="secondary" size="medium" />
        </div>
      </Container>
    </section>
  );
};

export default ProductGrid;
