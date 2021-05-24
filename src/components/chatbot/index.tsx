import React, { FormEvent, useCallback, useState, useRef } from 'react';
import MessageCloud, { Message } from '../MessageCloud';
import TopicPanel, { Select } from '../TopicPanel';
import { FiSend, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import api from '../../services/api';
import { v4 } from 'uuid';

import { Container, Header, Content, TextInputBar, Form, Button } from './style';
import QuestionList from '../QuestionsList';

const welcomeMessage = 'Olá estudante de Engenharia de Computação! Você tem alguma dúvida sobre o curso? Eu vou te ajudar. Primeiro escolha um assunto:';
const topics = ['Atividades Complementares', 'Componentes Curriculares', 'Estágio', 'Projeto Final de Curso'];

const subtopics = [
  [],
  [],
  [],
  [
    'Obrigações do estudante',
    'Plano de trabalho',
    'Trabalho Escrito',
    'Sessão de Defesa',
    'Nota Final e Frequência'
  ],
];

const frequentQuestions = [
  [
    'Pergunta número 1.',
    'Pergunta número 2.',
    'Uma terceira pergunta.'
  ],
  [
    'Pergunta número 3.',
    'Pergunta número 4.',
    'Uma terceira pergunta.'
  ],
  [
    'O que é necessário para a matrícula na disciplina Estágio Supervisionado?',
    'Quais são as atribuições do estudante estagiário?',
    'O que é necessário para a conclusão da disciplina Estágio Supervisionado?',
    'É possível aproveitar as atividades de estágio curricular obrigatório?'
  ],
  [
    'Quais são as obrigações do estudante de Projeto Final?',
    'O que contêm o plano de trabalho relativo às atividades do Projeto Final de Curso?',
    'Uma terceira pergunta.'
  ]
];

const Chatbot: React.FC = () => {
  const [feed, setFeed] = useState<(Message | Select)[]>([{ id: v4(), type: 'topics', options: topics }, { id: v4(), header: welcomeMessage, direction: 'left' }]);
  const [question, setQuestion] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      const response = await api.post('', { question });
      const { answer, header } = response.data;

      setFeed(state => [{ id: v4(), header, text: answer, direction: 'left' }, ...state]);
      setQuestion('');
      scrollToBottom();
    }

  }, [question, scrollToBottom]);

  const handleHidden = useCallback(() => {
    setHidden(!hidden)
  }, [hidden]);

  const handleTopicChange = useCallback((value) => {
    setTopic(value);

    const index = topics.indexOf(value);

    const subtopic = subtopics[index];

    if (subtopic.length > 1) {
      setFeed([
        {
          id: v4(),
          options: subtopic,
          type: 'subtopics'
        },
        {
          id: v4(),
          direction: 'left',
          header: 'Escolha um dos tópicos abaixo:'
        }, ...feed]);
    } else {
      const questions = frequentQuestions[index];

      setFeed([
        {
          id: v4(),
          options: questions,
          type: 'questions'
        },
        {
          id: v4(),
          direction: 'left',
          header: 'Essas são as perguntas mais frequentes sobre ' +
            value +
            '. Escolha uma opção:'
        }, ...feed]);
    }

  }, [feed]);

  const handleSubTopicChange = useCallback((subtopic: string) => {
    console.log(subtopic);
  }, []);

  const handleFrequentQuestion = useCallback(async (question: string) => {
    const response = await api.post('', { question });
    const { answer, header } = response.data;

    setFeed(state => [{ id: v4(), header, text: answer, direction: 'left' }, ...state]);
    scrollToBottom();
  }, [scrollToBottom]);

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
            <div ref={messagesEndRef} />
            {feed.map(element => {
              if ('options' in element) {
                if (element.type === 'topics') return <TopicPanel key={element.id} topics={element.options} onValueChange={handleTopicChange} />;
                if (element.type === 'subtopics') return <QuestionList key={element.id} questions={element.options} onValueChange={handleSubTopicChange} />;
                else return <QuestionList key={element.id} questions={element.options} onValueChange={handleFrequentQuestion} />;
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
