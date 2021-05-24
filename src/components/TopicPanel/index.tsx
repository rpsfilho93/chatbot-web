import React, { useCallback, useState } from 'react';
import ButtonTopic from './ButtonTopic';
import { v4 } from 'uuid';

import { Container } from './style';

export interface Select {
  id: string;
  options: string[];
  type: 'topics' | 'questions' | 'subtopics';
}

interface TopicPanelProps {
  topics: string[];
  onValueChange(value: string): void;
}

const TopicPanel: React.FC<TopicPanelProps> = ({ topics, onValueChange }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const onClick = useCallback((label: string) => {
    if (selectedTopic === '') {
      setSelectedTopic(label);
      onValueChange(label);
    }
  }, [selectedTopic, onValueChange]);

  return (
    <Container>
      {topics.map(topic => (<ButtonTopic key={v4()} label={topic} selected={selectedTopic === topic} selectable={selectedTopic === ''} onClick={onClick} />))}
    </Container>
  );
}

export default TopicPanel;