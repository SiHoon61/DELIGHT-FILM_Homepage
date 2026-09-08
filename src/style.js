import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0.9;
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

const transitionCurtain = keyframes`
  0%, 62% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const drawD = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-8px, 0, 0) scale(0.8);
  }
  18% {
    opacity: 1;
  }
  58% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(18px, 0, 0) scale(1.04);
  }
`;

const releaseLine = keyframes`
  0%, 34% {
    opacity: 0;
    transform: scaleX(0);
  }
  45% {
    opacity: 1;
  }
  78% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0;
    transform: scaleX(1.08);
  }
`;

export const BrandTransition = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  overflow: hidden;
  background: #000;
  pointer-events: none;
  animation: ${transitionCurtain} 360ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const BrandMark = styled.span`
  position: absolute;
  top: calc(50% - clamp(22px, 2vw, 30px));
  left: calc(50% - clamp(17px, 1.5vw, 23px));
  box-sizing: border-box;
  width: clamp(34px, 3vw, 46px);
  height: clamp(44px, 4vw, 60px);
  border: 2px solid #fee500;
  border-radius: 0 999px 999px 0;
  transform-origin: center;
  animation: ${drawD} 300ms cubic-bezier(0.32, 0, 0.18, 1) both;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% + 12px);
    width: clamp(90px, 22vw, 300px);
    height: 1px;
    background: #fee500;
    transform-origin: left center;
    animation: ${releaseLine} 320ms cubic-bezier(0.4, 0, 0.2, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  &.fade-enter {
    animation: ${fadeIn} 360ms forwards;
    z-index: 1;
  }
  &.fade-exit {
    animation: ${fadeOut} 220ms forwards;
  }
`;
