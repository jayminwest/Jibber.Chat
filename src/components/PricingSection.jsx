import React from 'react';
import styled from 'styled-components';

const PricingSectionWrapper = styled.section`
  background-color: var(--snow-white);
`;

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PricingCard = styled.div`
  background-color: var(--background-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  flex: 1;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanName = styled.h3`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const Feature = styled.li`
  margin-bottom: 0.5rem;
`;

const PricingButton = styled.a`
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--snow-white);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

function PricingSection() {
  return (
    <PricingSectionWrapper id="pricing">
      <div className="container">
        <h2>Choose Your Plan</h2>
        <PricingContainer>
          <PricingCard>
            <PlanName>Beginner</PlanName>
            <Price>$9.99/mo</Price>
            <FeatureList>
              <Feature>Basic ski conditions</Feature>
              <Feature>5 chats per day</Feature>
              <Feature>1 favorite mountain</Feature>
            </FeatureList>
            <PricingButton href="#">Get Started</PricingButton>
          </PricingCard>
          <PricingCard>
            <PlanName>Intermediate</PlanName>
            <Price>$19.99/mo</Price>
            <FeatureList>
              <Feature>Detailed ski conditions</Feature>
              <Feature>Unlimited chats</Feature>
              <Feature>3 favorite mountains</Feature>
              <Feature>Personalized recommendations</Feature>
            </FeatureList>
            <PricingButton href="#">Get Started</PricingButton>
          </PricingCard>
          <PricingCard>
            <PlanName>Pro</PlanName>
            <Price>$29.99/mo</Price>
            <FeatureList>
              <Feature>Advanced ski conditions</Feature>
              <Feature>Unlimited chats</Feature>
              <Feature>Unlimited favorite mountains</Feature>
              <Feature>Personalized recommendations</Feature>
              <Feature>Priority support</Feature>
            </FeatureList>
            <PricingButton href="#">Get Started</PricingButton>
          </PricingCard>
        </PricingContainer>
      </div>
    </PricingSectionWrapper>
  );
}

export default PricingSection;
