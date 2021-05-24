import React from 'react';
import { Container } from './style';

export interface Message {
  id: string;
  header?: string;
  text?: string;
  direction: 'left' | 'right';
}

interface MessageProps {
  message: Message;
}

const MessageCloud: React.FC<MessageProps> = ({ message }) => (
  <Container direction={message.direction}>
    {message.header && <span>{message.header}</span>}
    <p>{message.text}</p>
  </Container>
);

export default MessageCloud;