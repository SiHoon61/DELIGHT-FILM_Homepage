import React from 'react';

import {
  ChatIcon,
  ChatLabel,
  ChatLink,
  ChatStatus,
} from './style';

const KAKAO_CHAT_URL = 'http://pf.kakao.com/_xgCxkUn/chat';

const ChatSupport = () => (
  <ChatLink
    href={KAKAO_CHAT_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="카카오톡으로 딜라이트 필름 실시간 상담 시작"
  >
    <ChatLabel>
      <ChatStatus aria-hidden="true" />
      <span>실시간 상담</span>
    </ChatLabel>
    <ChatIcon aria-hidden="true" />
  </ChatLink>
);

export default ChatSupport;
