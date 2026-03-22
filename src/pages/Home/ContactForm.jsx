import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Container from '../../components/common/Container';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API here
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#019de3] focus:border-transparent transition-all";

  return (
    <section id="contact" className="w-full section-spacing bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="type-h2 font-semibold text-[#019de3] mb-2">Send us your query</h2>
            <p className="type-body text-gray-500 mb-8">
              Have a question about insurance? We're here to help. Our team typically responds within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="text-green-600 text-lg font-semibold mb-1">Message Sent! ✓</div>
                <p className="text-sm text-gray-600">We'll get back to you within 24 hours.</p>
                <button
                  className="mt-4 text-sm text-[#019de3] underline"
                  onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', message: '' }); }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[520px]">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">First Name</label>
                    <input
                      className={inputClass}
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange('firstName')}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-1/2">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Last Name</label>
                    <input
                      className={inputClass}
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange('lastName')}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Your Message</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange('message')}
                    rows={5}
                    required
                  />
                </div>

                <Button text="Submit" type="submit" variant="primary" size="medium" className="w-full mt-2" />
              </form>
            )}
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
            <img
              src="/images/img_insurancemarket_494x396.png"
              alt="Customer support illustration"
              className="w-[240px] sm:w-[300px] lg:w-[360px] h-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
