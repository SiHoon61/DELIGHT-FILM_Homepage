import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  &.fade-enter {
    animation: ${fadeIn} 300ms forwards;
    z-index: 1;
  }
  &.fade-exit {
    animation: ${fadeOut} 300ms forwards;
  }
`;
