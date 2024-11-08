import React, { useState } from 'react';
import styled from 'styled-components';

const ChatSectionWrapper = styled.section`
  background-color: var(--snow-white);
`;

const ChatContainer = styled.div`
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
`;

const ConditionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const ConditionCard = styled.div`
  background-color: var(--snow-white);
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChatBox = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--snow-white);
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
`;

const Message = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  max-width: 80%;
  ${props => props.sender === 'user' ? `
    margin-left: auto;
    background-color: var(--secondary-color);
    color: var(--snow-white);
  ` : `
    margin-right: auto;
    background-color: var(--light-gray);
    color: var(--text-color);
  `}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MountainSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  flex: 1;
`;

const ChatInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  flex: 2;
`;

const SendButton = styled.button`
  background-color: var(--accent-color);
  color: var(--snow-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

function ChatSection() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedMountain, setSelectedMountain] = useState('');

  const handleSendMessage = () => {
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
    <ChatSectionWrapper id="try-it-out">
      <div className="container">
        <h2>Mountain Conditions & Chat</h2>
        <ChatContainer>
          <ConditionsGrid>
            <ConditionCard>
              <h3>Temperature</h3>
              <p>-5°C / 23°F</p>
            </ConditionCard>
            <ConditionCard>
              <h3>Snow Depth</h3>
              <p>150 cm / 59 in</p>
            </ConditionCard>
            <ConditionCard>
              <h3>Wind Speed</h3>
              <p>10 km/h / 6 mph</p>
            </ConditionCard>
          </ConditionsGrid>
          <ChatBox>
            {chatMessages.map((msg, index) => (
              <Message key={index} sender={msg.sender}>
                {msg.text}
              </Message>
            ))}
          </ChatBox>
          <InputContainer>
            <MountainSelect
              value={selectedMountain}
              onChange={(e) => setSelectedMountain(e.target.value)}
            >
              <option value="">Select a mountain</option>
              <option value="vail">Vail</option>
              <option value="whistler">Whistler</option>
              <option value="park-city">Park City</option>
            </MountainSelect>
            <ChatInput
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about ski conditions..."
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </InputContainer>
        </ChatContainer>
      </div>
    </ChatSectionWrapper>
  );
}

export default ChatSection;
