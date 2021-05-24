import styled, { css } from 'styled-components';

interface ContainerProps {
  selected: boolean;
  selectable: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: row;

  height: 36px;

  justify-content: center;
  align-items: center;

  padding: 16px;
  margin: 4px;

  border: 0;  
  border-radius: 20px;

  font-size: 16px;
  font-weight: bold;
  color: #484646;

  background: #fff;

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  ${props => !props.selectable &&
    css`
      cursor: auto;
      &:hover {
        opacity: 1;
      }
    `};

  ${props => props.selected &&
    css`
      background: #4CD8ED;
      color: #fff; 
      cursor: auto;
    `};
`;
