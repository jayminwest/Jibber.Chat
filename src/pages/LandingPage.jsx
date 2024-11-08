import React from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import ChatSection from '../components/ChatSection';
import Features from '../components/Features';
import PricingSection from '../components/PricingSection';
import ContactForm from '../components/ContactForm';

const LandingPageWrapper = styled.div`
  margin-top: 4rem;
`;

const SectionSeparator = styled.div`
  height: 4rem;
  background-color: var(--background-color);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background-color: var(--snow-white);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  }
`;

function LandingPage() {
  return (
    <LandingPageWrapper>
      <Hero />
      <SectionSeparator />
      <ChatSection />
      <SectionSeparator />
      <Features />
      <SectionSeparator />
      <PricingSection />
      <SectionSeparator />
      <ContactForm />
    </LandingPageWrapper>
  );
}

export default LandingPage;
