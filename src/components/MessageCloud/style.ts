import styled, { css } from 'styled-components';

interface ContainerProps {
  direction: 'right' | 'left';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  position: relative;
  width: 100%;


  border: 1px solid #ccc;
  border-radius: 8px;

  span {
    color: #484646;
    font-weight: bold;
    margin-bottom: 8px;
    line-height: 22px;

    text-align: justify;
    white-space: pre-line;
  }

  p {
    color: #484646;
    text-align: justify;
    line-height: 22px;
    white-space: pre-line;
  }

  margin-top: 24px;
  padding: 12px 16px;  

  box-shadow: 0px 1px 10px -4px rgba(0,0,0,0.50);

  ${props => props.direction === 'left' &&
    css`
        background: #BCF0F7;
        border-bottom-left-radius: 0px;
      `}

  ${props => props.direction === 'right' &&
    css`
        background: #fff;
        border-bottom-right-radius: 0px;
      `}


  ${props => props.direction === 'left' &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -13px;
        left: 0px;

        width: 0; 
        height: 0;

        border-left: 0px solid transparent;
        border-right: 13px solid transparent;

        border-top: 13px solid #BCF0F7;
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -16px;
        left: -1px;

        width: 0; 
        height: 0;

        border-left: 0px solid transparent;
        border-right: 15px solid transparent;

        border-top: 15px solid #ccc;
      }
    `}

  ${props => props.direction === 'right' &&
    css`
       &::after {
        content: '';
        position: absolute;
        bottom: -13px;
        right: 0px;

        width: 0; 
        height: 0;

        border-left: 13px solid transparent;
        border-right: 0px solid transparent;

        border-top: 13px solid #fff;
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -16px;
        right: -1px;

        width: 0; 
        height: 0;

        border-left: 15px solid transparent;
        border-right: 0px solid transparent;

        border-top: 15px solid #ddd;
      }
    `}
`;