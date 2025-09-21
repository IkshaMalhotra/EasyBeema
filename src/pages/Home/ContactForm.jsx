import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import TextArea from '../../components/ui/TextArea';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e?.target?.value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section className="w-full bg-white section-spacing">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            {/* Section Header */}
            <h2 className="mb-6 text-xl sm:text-2xl lg:text-3xl font-medium text-text-accent font-inter">
              Send us your query
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-[550px] space-y-5">
              {/* Name Fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <label className="text-sm font-medium text-text-primary mb-1">First name</label>
                  <EditText
                    placeholder="Jane"
                    value={formData?.firstName}
                    onChange={handleInputChange('firstName')}
                    layout_width="100%"
                    padding="20px"
                    margin="16px 0"
                    variant="default"
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <label className="text-sm font-medium text-text-primary mb-1">Last name</label>
                  <EditText
                    placeholder="Smitherton"
                    value={formData?.lastName}
                    onChange={handleInputChange('lastName')}
                    layout_width="100%"
                    padding="20px"
                    margin="16px 0"
                    variant="default"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-text-primary mb-1">Email address</label>
                <EditText
                  placeholder="email@janesfakedomain.net"
                  type="email"
                  value={formData?.email}
                  onChange={handleInputChange('email')}
                  layout_width="100%"
                  padding="20px"
                  margin="16px 0"
                  variant="default"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-text-primary mb-1">Your message</label>
                <TextArea
                  placeholder="Enter your question or message"
                  value={formData?.message}
                  onChange={handleInputChange('message')}
                  rows={5}
                  layout_width="100%"
                  padding="20px"
                  margin="16px 0"
                  variant="default"
                />
              </div>


              {/* Submit Button */}
              <Button
                text="Submit"
                text_font_size="18px"
                text_line_height="22px"
                padding="14px"
                type="submit"
                className="w-full"
                layout_width="100%"
                variant="primary"
              />
            </form>
          </div>

          {/* Illustration Image */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
            <img
              src="/images/img_insurancemarket_494x396.png"
              alt="Contact support illustration"
              className="w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] lg:w-[360px] lg:h-[460px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>

  );
};

export default ContactForm;