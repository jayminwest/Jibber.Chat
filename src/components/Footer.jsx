import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: var(--primary-color);
  color: var(--snow-white);
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1.5rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: var(--snow-white);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: var(--snow-white);
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Jibber.chat</FooterTitle>
          <p>Your AI-powered ski buddy for real-time mountain intel.</p>
          <SocialIcons>
            <SocialIcon href="#" aria-label="Facebook">📘</SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">🐦</SocialIcon>
            <SocialIcon href="#" aria-label="Instagram">📷</SocialIcon>
          </SocialIcons>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Email: info@jibber.chat</p>
          <p>Phone: (555) 123-4567</p>
        </FooterSection>
      </FooterContent>
      <Copyright>&copy; 2023 Jibber.chat. All rights reserved.</Copyright>
    </FooterWrapper>
  );
}

export default Footer;
