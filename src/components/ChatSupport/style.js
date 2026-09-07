import styled, { keyframes } from 'styled-components';

import chatIcon from '../../assets/Home/chat.svg';

const statusPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(254, 229, 0, .34); }
  50% { box-shadow: 0 0 0 5px rgba(254, 229, 0, 0); }
`;

export const ChatRoot = styled.div`
  position: fixed;
  right: max(26px, env(safe-area-inset-right));
  bottom: max(88px, calc(env(safe-area-inset-bottom) + 72px));
  z-index: 140;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;

  @media (max-width: 700px) {
    right: max(14px, env(safe-area-inset-right));
    bottom: max(72px, calc(env(safe-area-inset-bottom) + 56px));
  }
`;

export const ChatLauncher = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, .42));
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: #111;
    outline: none;
  }

  &:focus-visible {
    border-radius: 999px;
    box-shadow: 0 0 0 3px rgba(254, 229, 0, .35);
  }

  @media (max-width: 700px) { gap: 7px; }
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

  ${ChatLauncher}:hover &,
  ${ChatLauncher}:focus-visible & {
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

  ${ChatLauncher}:hover &,
  ${ChatLauncher}:focus-visible & { background: #171717; }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

export const ChatIcon = styled.span`
  display: block;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, .32);
  border-radius: 50%;
  background-color: #0b0b0b;
  background-image: url(${chatIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 36px;
  transition: border-color .2s, background-color .2s, transform .2s;

  ${ChatLauncher}:hover &,
  ${ChatLauncher}:focus-visible & {
    border-color: #fee500;
    background-color: #25220c;
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    width: 48px;
    height: 48px;
    background-size: 31px;
  }
`;

export const ChatPanel = styled.section`
  width: min(380px, calc(100vw - 52px));
  height: min(560px, calc(100vh - 118px));
  min-height: 380px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 18px;
  background: #f5f5f3;
  box-shadow: 0 22px 70px rgba(0, 0, 0, .5);
  animation: chat-panel-in .2s ease-out both;

  @keyframes chat-panel-in {
    from { opacity: 0; transform: translateY(10px) scale(.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 700px) {
    width: calc(100vw - 28px);
    height: min(560px, calc(100svh - 94px));
    min-height: 340px;
    border-radius: 15px;
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

export const ChatPanelHeader = styled.header`
  display: flex;
  height: 68px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #111;
  color: #fff;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  strong {
    font-family: var(--font-sansMedium);
    font-size: 17px;
    font-weight: 500;
  }
`;

export const ChatCloseButton = styled.button`
  display: grid;
  width: 36px;
  height: 36px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, .74);
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, .1);
    color: #fff;
    outline: none;
  }
`;

export const ChatBody = styled.div`
  height: calc(100% - 140px);
  background:
    linear-gradient(rgba(0, 0, 0, .025) 1px, transparent 1px),
    #f5f5f3;
  background-size: 100% 72px;
`;

export const ChatComposer = styled.div`
  display: grid;
  height: 72px;
  box-sizing: border-box;
  grid-template-columns: 1fr 44px;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #deded9;
  background: #fff;
`;

export const ComposerInput = styled.input`
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  padding: 0 15px;
  border: 1px solid #d6d6d1;
  border-radius: 12px;
  background: #f7f7f5;
  color: #777;
  font-family: var(--font-sansRegular);
  font-size: 14px;

  &::placeholder { color: #a5a5a0; }
`;

export const SendButton = styled.button`
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 12px;
  background: #e4e4df;
  color: #aaa;
  font-size: 22px;
`;
