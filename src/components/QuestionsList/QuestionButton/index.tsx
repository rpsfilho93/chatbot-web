import React, { useCallback } from 'react';
import { Container } from './style';

interface QuestionButtonProps {
  label: string;
  selected: boolean;
  selectable: boolean;
  onClick(label: string): void;
}

const QuestionButton: React.FC<QuestionButtonProps> = ({ label, selected, selectable, onClick }) => {

  const handleClick = useCallback(() => {
    onClick(label);
  }, [onClick, label]);

  return (
    <Container selected={selected} selectable={selectable} onClick={handleClick}>
      <span>{label}</span>
    </Container>
  );
}

export default QuestionButton;