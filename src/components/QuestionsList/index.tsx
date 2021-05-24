import React, { useCallback, useState } from 'react';
import QuestionButton from './QuestionButton';
import { v4 } from 'uuid';

import { Container } from './style';

interface QuestionListProps {
  questions: string[];
  onValueChange(value: string): void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onValueChange }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  const onClick = useCallback((label: string) => {
    if (selectedQuestion === '') {
      setSelectedQuestion(label);
      onValueChange(label);
    }
  }, [selectedQuestion, onValueChange]);

  return (
    <Container>
      {questions.map(question => <QuestionButton key={v4()} label={question} selected={selectedQuestion === question} selectable={selectedQuestion === ''} onClick={onClick} />)}
    </Container>
  );
}

export default QuestionList;