import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 500px;
  background-color: var(--snow-white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--snow-white);
  padding: 1rem;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const Message = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  max-width: 80%;
  ${props => props.sender === 'user' ? `
    align-self: flex-end;
    background-color: var(--secondary-color);
    color: var(--snow-white);
  ` : `
    align-self: flex-start;
    background-color: var(--light-gray);
    color: var(--text-color);
  `}
`;

const ChatForm = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid var(--light-gray);
  background-color: var(--snow-white);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 20px;
  margin-right: 0.5rem;
`;

const ChatButton = styled.button`
  background-color: var(--accent-color);
  color: var(--snow-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

function ChatBox() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prevMessages => [...prevMessages, { text: "I'm sorry, but I'm just a demo chatbot. I can't provide real ski condition information.", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>Chat with Jibber</ChatHeader>
      <ChatMessages>
        {chatMessages.map((msg, index) => (
          <Message key={index} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatForm onSubmit={handleSendMessage}>
        <ChatInput
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about ski conditions..."
        />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </ChatContainer>
  );
}

export default ChatBox;
