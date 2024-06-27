import React from 'react';
import styled from 'styled-components';

const Scrollbar = styled.div`
  /* 웹킷 기반 브라우저 */
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const CustomScrollbar = ({ children }) => {
    return <Scrollbar>{children}</Scrollbar>;
};

export default CustomScrollbar;
