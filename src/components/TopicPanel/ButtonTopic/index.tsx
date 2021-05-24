import React, { useCallback } from 'react';
import { Container } from './style';

interface ButtonTopicProps {
  label: string;
  selected: boolean;
  selectable: boolean;
  onClick(label: string): void;
}

const ButtonTopic: React.FC<ButtonTopicProps> = ({ label, selected, selectable, onClick }) => {

  const handleClick = useCallback(() => {
    onClick(label);
  }, [onClick, label]);

  return (
    <Container selected={selected} selectable={selectable} onClick={handleClick} >
      <span>{label}</span>
    </Container>
  );
}

export default ButtonTopic;