import React from 'react';
import GlobalStyle from './styles/global';
import Chatbot from './components/chatbot';

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Chatbot />
      <GlobalStyle />
    </div>
  );
}

export default App;
