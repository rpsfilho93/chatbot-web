import styled, { css } from 'styled-components';

interface ContainerProps {
  selected: boolean;
  selectable: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;


  border: 0;
  border-radius: 22px;

  background: #fff; 

  margin: 4px 0px;
  padding: 8px 12px;

  font-size: 14px;
  font-weight: bold;
  color: #484646;

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