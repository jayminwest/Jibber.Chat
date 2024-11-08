import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PricingSection from '../components/PricingSection';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <PricingSection />
      <ContactForm />
    </div>
  );
};

export default HomePage; 