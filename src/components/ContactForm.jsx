import React, { useState } from 'react';
import styled from 'styled-components';

const ContactFormWrapper = styled.section`
  background-color: var(--background-color);
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--snow-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: var(--accent-color);
  color: var(--snow-white);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactFormWrapper id="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></TextArea>
          </FormGroup>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </div>
    </ContactFormWrapper>
  );
}

export default ContactForm;
