import React, { useCallback, useState } from 'react';
import ButtonTopic from './ButtonTopic';
import { Topic } from '../../types/Topic';
import { Container } from './style';

export interface Select {
  id: string;
  options: Topic[];
  type: 'topics' | 'subtopics';
}

interface TopicPanelProps {
  topics: Topic[];
  onValueChange(value: Topic): void;
}

const TopicPanel: React.FC<TopicPanelProps> = ({ topics, onValueChange }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const onClick = useCallback((topic: Topic) => {
    if (selectedTopic === '') {
      setSelectedTopic(topic.name);
      onValueChange(topic);
    }
  }, [selectedTopic, onValueChange]);

  return (
    <Container>
      {topics.map(topic => (<ButtonTopic key={topic.id} label={topic.name} selected={selectedTopic === topic.name} selectable={selectedTopic === ''} onClick={() => onClick(topic)} />))}
    </Container>
  );
}

export default TopicPanel;