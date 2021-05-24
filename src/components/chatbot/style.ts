import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  right: 0px;
  bottom: 0px;

  width: 400px;

  border-top-left-radius: 24px;
  box-shadow: -2px -1px 12px -4px rgba(0,0,0,0.50)
`;

export const Header = styled.div`
  background: #48CCE1;
  width: 100%;
  height: 64px;

  border-top-left-radius: 24px;
  border-bottom: 1px solid #ccc;

  display: flex;
  align-items: center;

  padding-left: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;

  height: 400px;

  background: #E2EAFD;
  border-left: 1px solid #ccc;

  padding: 28px 16px;

  overflow: scroll;
  overflow-x: hidden;
`;

export const TextInputBar = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;

  width: 100%;
  height: 120px;

  background: #ededed;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 350px;
  height: 40px;

  background: white;

  border: 1px solid #ccc;
  border-radius: 8px;

  padding: 5px;

  input {
    flex: 1;
    background: transparent;
    border: 0;

    color: #484646;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  background: transparent;
  border: 0px;

  margin-left: 4px;
`;
