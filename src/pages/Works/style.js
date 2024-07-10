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
    margin-top: 40px;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: -10px;
    @media (max-width: 1000px){
      margin-top: 20px;
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
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const AnimatedDefaultContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    color: white;
    gap: 2%;
    padding: 0 20px;
    margin-bottom: 80px;
    &.fade-enter {
        animation: ${fadeIn} 300ms forwards;
    }
    &.fade-exit {
        animation: ${fadeOut} 300ms forwards;
    }
    @media (max-width: 1000px){
      padding: 0 10px;
    }
    @media (max-width: 600px){
      padding: 0 5px;
    }
`;

export const OnlyAnimatedContainer = styled.div`
    //padding: 0 20px;
    &.fade-enter {
        animation: ${fadeIn} 300ms forwards;
    }
    &.fade-exit {
        animation: ${fadeOut} 300ms forwards;
    }
`