import React, { FormEvent, useCallback, useState, useRef, useEffect } from 'react';
import { FiSend, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ReactLoading from 'react-loading';
import { v4 } from 'uuid';

import MessageCloud, { Message } from '../MessageCloud';
import TopicPanel, { Select } from '../TopicPanel';
import QuestionList from '../QuestionsList';
import { Topic } from '../../types/Topic';
import api from '../../services/api';

import { Container, Header, Content, TextInputBar, Form, Button, RestartButton } from './style';

const welcomeMessage = 'Olá estudante de Engenharia de Computação! Você tem alguma dúvida sobre o curso? Eu vou te ajudar. Primeiro escolha um assunto:';

const Chatbot: React.FC = () => {
  const [feed, setFeed] = useState<(Message | Select)[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(false);
  const [showRestartButton, setShowRestartButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [mainTopics, setMainTopics] = useState<string[]>([]);

  useEffect(() => {
    async function loadTopics() {
      const response = await api.get<Topic[]>('/topics');

      const topics = response.data;
      setMainTopics(topics.map(tpc => tpc.name));
      setFeed([{ id: v4(), type: 'topics', options: [...topics, { id: v4(), name: 'Outros' }] }, { id: v4(), header: welcomeMessage, direction: 'left' }]);
    }
    setLoading(true);
    loadTopics();
    setLoading(false);
  }, []);

  const handleQuestionChange = useCallback(e => {
    setQuestion(e.target.value);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messagesEndRef]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (question !== '') {

      setFeed(state => [{ id: v4(), text: question, direction: 'right' }, ...state]);

      setLoading(true);
      const response = await api.get('', { params: { topic: selectedTopic, question } });
      const { answer, header } = response.data;
      setLoading(false);

      setFeed(state => [{ id: v4(), header, text: answer, direction: 'left' }, ...state]);
      setQuestion('');
      scrollToBottom();
      setShowRestartButton(true);
    }

  }, [question, scrollToBottom, selectedTopic]);

  const handleHidden = useCallback(() => {
    setHidden(!hidden)
  }, [hidden]);

  const handleChooseTopic = useCallback(async (topic: Topic) => {
    if (mainTopics.includes(topic.name)) {
      setSelectedTopic(topic.name)
    }

    if (topic.name === 'Outros') {
      setFeed([{
        id: v4(),
        header: 'Digite a sua pergunta abaixo:',
        text: 'Use o máximo de palavras-chave possível para descrever a sua dúvida.',
        direction: 'left'
      }, ...feed])
    } else {
      setLoading(true);
      const response = await api.get('/branches', { params: { id: topic.id } });
      const subtopics = response.data;

      if (subtopics.length === 0) {
        const response = await api.get('', { params: { topic: selectedTopic, question: topic.name } });
        const { header, answer } = response.data;

        setFeed([{ id: v4(), header, text: answer, direction: 'left' }, ...feed]);
        setShowRestartButton(true);
      } else {
        setFeed([{ id: v4(), type: 'subtopics', options: subtopics }, { id: v4(), direction: 'left', header: 'Escolha uma opção abaixo:' }, ...feed])
      }
      setLoading(false);
    }
  }, [feed, selectedTopic, mainTopics]);

  const handleClickRestartButton = useCallback(async () => {
    setShowRestartButton(false);
    const response = await api.get<Topic[]>('/topics');

    const topics = response.data;

    setFeed([{ id: v4(), type: 'topics', options: [...topics, { id: v4(), name: 'Outros' }] }, { id: v4(), header: 'Escolha um assunto:', direction: 'left' }, ...feed]);
  }, [feed]);

  return (
    <Container>
      <Header>
        <Button type="button" onClick={handleHidden}>
          {hidden ? <FiChevronUp color="#fff" size={28} /> : <FiChevronDown color="#fff" size={28} />}
        </Button>
      </Header>
      {!hidden && (
        <>
          <Content>
            {loading && <ReactLoading type={'bars'} color={'#4CD8ED'} height={'10%'} width={'10%'} />}

            <div ref={messagesEndRef} />
            {showRestartButton && <RestartButton onClick={handleClickRestartButton}><span>Ver principais assuntos</span></RestartButton>}
            {feed.map(element => {
              if ('options' in element) {
                if (element.type === 'topics') return <TopicPanel key={element.id} topics={element.options} onValueChange={handleChooseTopic} />;
                else return <QuestionList key={element.id} questions={element.options} onValueChange={handleChooseTopic} />;
              } else {
                return <MessageCloud key={element.id} message={element} />;
              }
            })}
          </Content>
          <TextInputBar>
            <Form onSubmit={handleSubmit}>
              <input type='text' value={question} onChange={handleQuestionChange} />
              <Button type='submit' onClick={handleSubmit}>
                <FiSend size={24} color='#666360' />
              </Button>
            </Form>
          </TextInputBar>
        </>
      )}

    </Container>
  );
}

export default Chatbot;
