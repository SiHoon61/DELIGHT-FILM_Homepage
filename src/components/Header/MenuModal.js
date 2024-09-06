import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//img
import close from '../../assets/Home/whiteClose.svg';


const MenuModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.cssText = `
                position: fixed; 
                top: -${scrollY}px;
                overflow-y: scroll;
                width: 100%;`;

            return () => {
                document.body.style.cssText = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    //navigation
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    }
    const goAbout = () => {
        navigate("/About");
    }
    const goWorks = () => {
        navigate("/Works");
    }
    const goContact = () => {
        navigate("/Contact");
    }
    return (
        <>
            <MenuContainer $isOpen={isOpen}>
                <ModalHeader>
                    <Logo>
                        <LogoFont>D E L I G H T &nbsp; F I L M</LogoFont>
                    </Logo>
                    <CloseButton src={close} alt='close' onClick={onClose} />
                </ModalHeader>
                
                <MainContainer>
                    <MenuUl>
                        <MenuLi onClick={goHome}>
                            <GradientText data-text="Home">Home</GradientText>
                        </MenuLi>
                        <MenuLi onClick={goAbout}>
                            <GradientText data-text="About">About</GradientText>
                        </MenuLi>
                        <MenuLi onClick={goWorks}>
                            <GradientText data-text="Works">Works</GradientText>
                        </MenuLi>
                        <MenuLi onClick={goContact}>
                            <GradientText data-text="Contact">Contact</GradientText>
                        </MenuLi>
                    </MenuUl>
                </MainContainer>
            </MenuContainer>
        </>
    );
};

export default MenuModal;



const MenuContainer = styled.div`
    background-color: black;
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s, visibility 0.3s;
`

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    height: 80px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6%;
`

const LogoFont = styled.div`
    font-size: 20px;
    font-family: var(--font-sansMedium);
    color: white;
    white-space: nowrap;
    @media (max-width: 600px) {
        font-size: 18px;
    }
`

const CloseButton = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-right: 10px;
`

const MainContainer = styled.div`
    font-family: var(--font-sansMedium);
`

const MenuUl = styled.ul`
    color: white;
    font-size: 36px;
    margin-top: 50px;
    list-style-type: none;
    padding: 0px;

`

const MenuLi = styled.li`
    margin: 40px 40px;
`

const GradientText = styled.span`
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
