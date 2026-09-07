import React, { useEffect, useState } from 'react';

import {
  ChatBody,
  ChatCloseButton,
  ChatComposer,
  ChatIcon,
  ChatLabel,
  ChatLauncher,
  ChatPanel,
  ChatPanelHeader,
  ChatRoot,
  ComposerInput,
  SendButton,
  ChatStatus,
} from './style';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeWithEscape);
    return () => window.removeEventListener('keydown', closeWithEscape);
  }, []);

  return (
    <ChatRoot>
      {isOpen && (
        <ChatPanel id="realtime-consultation" role="dialog" aria-labelledby="chat-title">
          <ChatPanelHeader>
            <div>
              <ChatStatus aria-hidden="true" />
              <strong id="chat-title">실시간 상담</strong>
            </div>
            <ChatCloseButton
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="상담창 닫기"
            >
              ×
            </ChatCloseButton>
          </ChatPanelHeader>
          <ChatBody aria-label="상담 메시지 영역" />
          <ChatComposer>
            <ComposerInput aria-label="메시지 입력" placeholder="메시지 입력" disabled />
            <SendButton type="button" aria-label="메시지 보내기" disabled>→</SendButton>
          </ChatComposer>
        </ChatPanel>
      )}

      <ChatLauncher
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="realtime-consultation"
      >
        <ChatLabel>
          <ChatStatus aria-hidden="true" />
          <span>실시간 상담</span>
        </ChatLabel>
        <ChatIcon aria-hidden="true" />
      </ChatLauncher>
    </ChatRoot>
  );
};

export default ChatSupport;
