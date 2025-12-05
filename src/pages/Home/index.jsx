import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import ProcessSection from './ProcessSection';
import TestimonialSection from './TestimonialSection';
import PartnersSection from './PartnersSection';
import ContactForm from './ContactForm';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EasyBeema - Simple Digital Insurance Solutions | Health, Motor & Life Insurance</title>
        <meta
          name="description"
          content="Get instant insurance quotes for health, motor, travel & life insurance. Compare policies from top insurers with EasyBeema's 3-step digital process. Trusted by thousands across Nepal."
        />
        <meta property="og:title" content="EasyBeema - Simple Digital Insurance Solutions | Health, Motor & Life Insurance" />
        <meta property="og:description" content="Get instant insurance quotes for health, motor, travel & life insurance. Compare policies from top insurers with EasyBeema's 3-step digital process. Trusted by thousands across Nepal." />
      </Helmet>

      <main className="w-full bg-background-main">
        <HeroSection />
        <ProductGrid />
        <ProcessSection />
        <TestimonialSection />
        <PartnersSection />
        <ContactForm />
      </main>
    </>
  );
};

export default Home;