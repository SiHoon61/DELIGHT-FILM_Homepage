import styled, { keyframes } from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

export const BigText = styled.div`
    color: white;
    font-size: 90px;
    font-family: var(--font-sansMedium);
    margin:60px 0 0 80px;
    @media (max-width: 1000px){
      font-size: 62px;
      margin:20px 0 0 40px;
    }
    @media (max-width: 600px){
      font-size: 48px;
      margin:10px 0 0 20px;
    }
`

export const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70px;
    padding: 0 clamp(20px, 3vw, 52px);
    box-sizing: border-box;
    margin-top: 40px;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    z-index: 100;
    top: -10px;
    background: #000;
    @media (max-width: 1000px){
      margin-top: 20px;
    }
    @media (max-width: 700px){
      justify-content: flex-start;
      min-height: 52px;
      padding: 0 12px;
      margin-top: 10px;
      top: 0;
      border-bottom: 1px solid ${({ $mediaMode }) =>
        $mediaMode ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};
      background: ${({ $mediaMode }) =>
        $mediaMode ? 'rgba(0, 0, 0, 0.82)' : 'transparent'};
      backdrop-filter: ${({ $mediaMode }) => ($mediaMode ? 'blur(10px)' : 'none')};
      -webkit-backdrop-filter: ${({ $mediaMode }) => ($mediaMode ? 'blur(10px)' : 'none')};
    }
`

export const MeneBox = styled.div`
    border-radius: 30px;
    border: 2px solid #FFF;
    background: #000;
`

export const fadeIn = keyframes`
  from {
    opacity: 0;
    filter: brightness(1.16) contrast(0.96);
  }
  to {
    opacity: 1;
    filter: brightness(1) contrast(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    filter: brightness(1) contrast(1);
  }
  to {
    opacity: 0;
    filter: brightness(1.12) contrast(0.96);
  }
`;

export const AnimatedDefaultContainer = styled.div`
    display: block;
    color: white;
    padding: 0 clamp(20px, 3vw, 52px);
    margin-bottom: 80px;
    &.fade-enter {
        animation: ${fadeIn} 200ms ease-out forwards;
    }
    &.fade-exit {
        animation: ${fadeOut} 180ms ease-in forwards;
    }
    @media (max-width: 1000px){
      padding: 0 20px;
    }
    @media (max-width: 600px){
      padding: 0 14px;
    }
`;

export const OnlyAnimatedContainer = styled.div`
    //padding: 0 20px;
    &.fade-enter {
        animation: ${fadeIn} 200ms ease-out forwards;
    }
    &.fade-exit {
        animation: ${fadeOut} 180ms ease-in forwards;
    }
`
