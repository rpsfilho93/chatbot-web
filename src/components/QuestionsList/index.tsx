import React, { useCallback, useState } from 'react';
import QuestionButton from './QuestionButton';
import { Topic } from '../../types/Topic';

import { Container } from './style';

interface QuestionListProps {
  questions: Topic[];
  onValueChange(value: Topic): void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onValueChange }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  const onClick = useCallback((topic: Topic) => {
    if (selectedQuestion === '') {
      setSelectedQuestion(topic.name);
      onValueChange(topic);
    }
  }, [selectedQuestion, onValueChange]);

  return (
    <Container>
      {questions.map(question => <QuestionButton key={question.id} label={question.name} selected={selectedQuestion === question.name} selectable={selectedQuestion === ''} onClick={() => onClick(question)} />)}
    </Container>
  );
}

export default QuestionList;