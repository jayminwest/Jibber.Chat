import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  background-color: var(--background-color);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: var(--snow-white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

function Features() {
  return (
    <FeaturesSection id="features">
      <div className="container">
        <h2>Features</h2>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🌨️</FeatureIcon>
            <FeatureTitle>Real-Time Updates</FeatureTitle>
            <p>Get the latest information on snow conditions, lift status, and weather forecasts.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Personalized Recommendations</FeatureTitle>
            <p>Receive tailored advice based on your skill level and preferences.</p>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🏔️</FeatureIcon>
            <FeatureTitle>Multi-Mountain Support</FeatureTitle>
            <p>Access information for various ski resorts across the country.</p>
          </FeatureCard>
        </FeatureGrid>
      </div>
    </FeaturesSection>
  );
}

export default Features;
