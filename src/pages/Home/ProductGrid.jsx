import React from 'react';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      image: "/images/img_easybeema_7_1.png",
      title: "Term Life Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "56px"
    },
    {
      id: 2,
      image: "/images/img_easybeema_8_1.png",
      title: "Health Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "8px"
    },
    {
      id: 3,
      image: "/images/img_easybeema_9_1.png",
      title: "Car Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "12px"
    },
    {
      id: 4,
      image: "/images/img_easybeema_15_1.png",
      title: "Family Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "56px"
    },
    {
      id: 5,
      image: "/images/img_easybeema_12_1.png",
      title: "Investment Plans",
      guarantee: "Lowest Price Guarantee",
      padding: "0px"
    },
    {
      id: 6,
      image: "/images/img_easybeema_13_1.png",
      title: "Travel Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "14px"
    },
    {
      id: 7,
      image: "/images/img_easybeema_14_1.png",
      title: "Term Insurance (Women)",
      guarantee: "Lowest Price Guarantee",
      padding: "0px"
    },
    {
      id: 8,
      image: "/images/img_easybeema_16_1.png",
      title: "2 Wheeler Insurance",
      guarantee: "Lowest Price Guarantee",
      padding: "16px"
    }
  ];

  return (
    <section className="w-full section-spacing">
      <Container className="px-4 sm:px-6 lg:px-[148px]">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Section Header */}
          <div className="text-center">
            <Button
              text="The easiest step towards a secure future"
              text_font_size="18px"
              text_line_height="26px"
              text_color="#000000bf"
              text_font_family="Roboto"
              text_font_weight="400"
              fill_background_color="#f3fbff"
              border_border_radius="34px"
              effect_box_shadow="3px 3px 4px #469cd2a8"
              padding="20px 34px"
              className="mx-auto"
              layout_width="auto"
              margin="0"
              position="static"
              variant="primary"
              size="medium"
              onClick={() => { }}
            />
          </div>

          {/* Products Grid */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 auto-rows-fr">
              {products?.map((product) => (
                <Link
                  to={`/policy/${product?.id}`}
                  key={product?.id}
                  className="flex flex-col gap-4 sm:gap-5 lg:gap-6 items-start h-full"
                >                  {/* Product Image Container */}
                  <div className="w-full bg-primary-lighter rounded-sm flex items-center justify-center p-4 h-[166px] sm:h-[180px] lg:h-[166px]">
                    <img
                      src={product?.image}
                      alt={product?.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 items-start w-full mt-2">
                    <p className="type-sub font-medium leading-tight text-text-accent font-roboto">
                      {product?.guarantee}
                    </p>
                    <h3 className="type-body-lg font-medium leading-loose text-text-muted font-inter">
                      {product?.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center">
              <Button
                text="View All Policies"
                text_font_size="18px"
                text_line_height="26px"
                text_color="#000000bf"
                text_font_family="Roboto"
                text_font_weight="400"
                fill_background_color="#ffffff"
                border_border_radius="34px"
                effect_box_shadow="3px 3px 4px #469cd2a8"
                padding="20px 34px"
                layout_width="auto"
                margin="0"
                position="static"
                variant="primary"
                size="medium"
                onClick={() => { }}
                className=""
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductGrid;