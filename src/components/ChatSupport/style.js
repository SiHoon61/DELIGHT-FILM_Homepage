import styled, { keyframes } from 'styled-components';

const panelIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const ChatRoot = styled.div`
  position: fixed;
  right: max(26px, env(safe-area-inset-right));
  bottom: max(26px, calc(env(safe-area-inset-bottom) + 10px));
  z-index: 140;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;

  @media (max-width: 700px) {
    right: max(14px, env(safe-area-inset-right));
    bottom: max(16px, env(safe-area-inset-bottom));
  }
`;

export const ChatComposer = styled.div`
  display: flex;
  align-items: center;
`;

export const ChatLauncher = styled.button`
  min-height: 50px;
  padding: 0 21px;
  border: 1px solid rgba(255, 255, 255, .3);
  border-radius: 999px;
  background: rgba(11, 11, 11, .92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  color: #fff;
  font-family: var(--font-sansMedium);
  font-size: 15px;
  letter-spacing: -.02em;
  box-shadow: 0 10px 28px rgba(0, 0, 0, .42);
  cursor: pointer;
  transition: border-color .2s, background-color .2s, color .2s, transform .2s;

  &:hover,
  &:focus-visible,
  &[aria-expanded='true'] {
    border-color: #fee500;
    background: #fee500;
    color: #111;
    outline: none;
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    min-height: 44px;
    padding: 0 15px;
    font-size: 13px;
  }
`;

export const ChatPanel = styled.section`
  width: min(390px, calc(100vw - 52px));
  height: min(610px, calc(100vh - 104px));
  min-height: 470px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 18px;
  background: #f5f5f3;
  box-shadow: 0 22px 70px rgba(0, 0, 0, .52);
  animation: ${panelIn} .2s ease-out both;

  @media (max-width: 700px) {
    width: calc(100vw - 28px);
    height: min(610px, calc(100svh - 82px));
    min-height: 430px;
    border-radius: 15px;
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

export const ChatPanelHeader = styled.header`
  display: flex;
  height: 68px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #111;
  color: #fff;

  > div { display: flex; align-items: center; gap: 10px; }
  > div > span { width: 7px; height: 7px; border-radius: 50%; background: #fee500; }
  strong { font-family: var(--font-sansMedium); font-size: 17px; font-weight: 500; }
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
  line-height: 1;
  cursor: pointer;

  &:hover,
  &:focus-visible { background: rgba(255, 255, 255, .1); color: #fff; outline: none; }
`;

export const ChatBody = styled.div`
  position: relative;
  height: calc(100% - 68px);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 25px 22px 74px;
  background: #f5f5f3;
  color: #171717;
`;

export const PanelProgress = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
`;

export const StepCounter = styled.span`
  color: #777;
  font-size: 12px;
`;

export const PanelProgressBar = styled.span`
  height: 3px;
  overflow: hidden;
  border-radius: 99px;
  background: #ddd;

  &::after {
    content: '';
    display: block;
    width: ${({ $progress }) => `${$progress}%`};
    height: 100%;
    border-radius: inherit;
    background: #171717;
    transition: width .25s ease;
  }
`;

export const StepTitle = styled.h2`
  margin: 0 0 22px;
  font-family: var(--font-sansMedium);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -.035em;
`;

export const AnswerGrid = styled.div`
  display: grid;
  gap: 9px;
`;

export const AnswerButton = styled.button`
  display: flex;
  min-height: 54px;
  align-items: center;
  justify-content: space-between;
  padding: 0 17px;
  border: 1px solid #d7d7d2;
  border-radius: 12px;
  background: #fff;
  color: #222;
  font-family: var(--font-sansRegular);
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: border-color .18s, background-color .18s, transform .18s;

  span { color: #999; }
  &:hover,
  &:focus-visible { border-color: #171717; background: #fafae9; outline: none; transform: translateX(2px); }
`;

export const ContactFields = styled.div`
  display: grid;
  gap: 14px;
`;

export const ContactField = styled.label`
  display: grid;
  gap: 7px;
  color: #555;
  font-size: 13px;

  input {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 14px;
    border: 1px solid #d2d2cd;
    border-radius: 11px;
    background: #fff;
    color: #171717;
    font-family: var(--font-sansRegular);
    font-size: 15px;
  }

  input:focus { border-color: #171717; outline: none; box-shadow: 0 0 0 3px rgba(0, 0, 0, .07); }
`;

export const ConsentLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-top: 3px;
  color: #666;
  font-size: 12px;
  line-height: 1.45;
  cursor: pointer;

  input { margin-top: 2px; accent-color: #171717; }
`;

export const SendButton = styled.button`
  width: 100%;
  min-height: 52px;
  margin-top: 20px;
  border: 0;
  border-radius: 12px;
  background: #171717;
  color: #fff;
  font-family: var(--font-sansMedium);
  font-size: 15px;
  cursor: pointer;

  &:disabled { background: #d9d9d4; color: #999; cursor: default; }
`;

export const BackButton = styled.button`
  position: absolute;
  bottom: 22px;
  left: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #777;
  font-size: 13px;
  cursor: pointer;
`;

export const FormError = styled.p`
  margin: 12px 0 0;
  color: #b3261e;
  font-size: 13px;
`;

export const SuccessState = styled.div`
  display: flex;
  height: calc(100% - 68px);
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  color: #171717;

  strong { font-family: var(--font-sansMedium); font-size: 21px; }
  span { margin-top: 10px; color: #666; font-size: 14px; line-height: 1.6; }
  button { margin-top: 28px; padding: 12px 17px; border: 1px solid #ccc; border-radius: 10px; background: #fff; cursor: pointer; }
`;
