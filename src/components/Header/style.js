import styled from 'styled-components';
import whiteMenu from '../../assets/Home/whiteMenu.svg'

export const MenuBar = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6%;
    @media (max-width: 1000px) {
      height: 80px;
    }
`

export const IndexUL = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0px;
    @media (max-width: 1000px) {
        display: none;
    }
`

export const IndexLI = styled.li`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    margin: 0 20px;
    font-size: 20px;
    font-family: var(--font-sansMedium);
    color: white;
    cursor: pointer;
`

export const GradientText = styled.span`
background-image: linear-gradient(to right, #FFD700, #FF8C00);
  -webkit-background-clip: text;
  background-clip: text;
  transition: all 0.3s;
  color: white; // 기본 색상을 로고의 주황색으로 설정
  position: relative;
  z-index: 1;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-image: linear-gradient(to right, #FFD700, #FF8C00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    color: rgba(255, 165, 0, 0); // 호버 시 주황색을 투명하게
    &::before {
      opacity: 1;
    }
  }
`

export const WhiteMenu = styled.img.attrs({
  src: whiteMenu,
  alt: 'menu'
})`
    width: 35px;
    margin-right: 30px;
    display: none;
    @media (max-width: 1000px) {
        display: flex;
    }
    @media (max-width: 600px) {
        width: 30px;
        margin-right: 20px;
    }
`