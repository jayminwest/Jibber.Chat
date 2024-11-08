import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  padding: 6rem 0;
  background-color: var(--background-color);
`;

const HeroCard = styled.div`
  background-image: url('https://source.unsplash.com/1600x900/?mountains,snow');
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;
`;

const HeroContent = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--snow-white);
  padding: 4rem 2rem;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subheadline = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: var(--accent-color);
  color: var(--snow-white);
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
  }
`;

function Hero() {
  return (
    <HeroSection>
      <div className="container">
        <HeroCard>
          <HeroContent>
            <Headline>Conquer the Slopes with Jibber.chat</Headline>
            <Subheadline>Your AI-powered ski buddy for real-time mountain intel</Subheadline>
            <CTAButton href="#try-it-out">Start Chatting</CTAButton>
          </HeroContent>
        </HeroCard>
      </div>
    </HeroSection>
  );
}

export default Hero;
