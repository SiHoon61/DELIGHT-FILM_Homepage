import styled, { keyframes } from 'styled-components';

import kakao from '../../assets/Home/kakao.svg';
import kakaoColor from '../../assets/Home/kakaoColor.svg';

const statusPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(254, 229, 0, .34); }
  50% { box-shadow: 0 0 0 5px rgba(254, 229, 0, 0); }
`;

export const ChatLink = styled.a`
  position: fixed;
  right: max(26px, env(safe-area-inset-right));
  bottom: max(26px, env(safe-area-inset-bottom));
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, .42));

  &:hover,
  &:focus-visible {
    color: #111;
    outline: none;
  }

  &:focus-visible {
    border-radius: 999px;
    box-shadow: 0 0 0 3px rgba(254, 229, 0, .35);
  }

  @media (max-width: 700px) {
    right: max(14px, env(safe-area-inset-right));
    bottom: max(16px, env(safe-area-inset-bottom));
    gap: 7px;
  }
`;

export const ChatLabel = styled.span`
  display: flex;
  min-height: 50px;
  align-items: center;
  gap: 9px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, .28);
  border-radius: 999px;
  background: rgba(11, 11, 11, .9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  color: inherit;
  font-family: var(--font-sansMedium);
  font-size: 15px;
  letter-spacing: -.02em;
  white-space: nowrap;
  transition: border-color .2s, background-color .2s, color .2s, transform .2s;

  ${ChatLink}:hover &,
  ${ChatLink}:focus-visible & {
    border-color: #fee500;
    background: #fee500;
    transform: translateX(2px);
  }

  @media (max-width: 700px) {
    min-height: 44px;
    padding: 0 14px;
    font-size: 13px;
  }
`;

export const ChatStatus = styled.span`
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #fee500;
  animation: ${statusPulse} 2s ease-in-out infinite;

  ${ChatLink}:hover &,
  ${ChatLink}:focus-visible & {
    background: #171717;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ChatIcon = styled.span`
  display: block;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, .32);
  border-radius: 50%;
  background-color: #0b0b0b;
  background-image: url(${kakao});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  transition: border-color .2s, background-color .2s, background-image .2s, transform .2s;

  ${ChatLink}:hover &,
  ${ChatLink}:focus-visible & {
    border-color: #fee500;
    background-color: #19170c;
    background-image: url(${kakaoColor});
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    width: 48px;
    height: 48px;
    background-size: 31px;
  }
`;
