import React, { useRef, useState, useEffect } from 'react';
import styled, { css, keyframes } from "styled-components";

//img
import close from '../assets/Works/close.svg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${props => props.$show ? fadeIn : fadeOut} 0.6s forwards;
`
const Content = styled.div`
    position: relative;
    width: 100%;
    max-width: 1000px;
    aspect-ratio: 16 / 9;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px 6px 0px 0px;
    background-color: black;
    animation: ${props => props.$show ? fadeIn : fadeOut} 0.5s forwards;
    @media (max-width: 1230px) {
        margin: 0 20px;
    }
    @media (max-width: 600px) {
        margin: 0 10px;
    } 
`

const CloseButton = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 5px;
    cursor: pointer;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 25px;
    border-radius: 6px 6px 0px 0px;
    background-color: #ADADAD;
`

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;



const YoutubeModal = ({ show, onClose, srcState }) => {
    const contentRef = useRef(null);
    const handleClickOutside = (event) => {
        if (contentRef.current && !contentRef.current.contains(event.target)) {
            onClose(); // 클릭된 영역이 Content 밖이라면 모달 닫기 함수 호출
        }
    };
    useEffect(() => {
        if (show) {
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
    }, [show]);

   
    return (
        <>
            <Modal onClick={handleClickOutside} $show={show}>
                <Content ref={contentRef} $show={show}>
                    <ModalHeader>
                        <CloseButton
                            src={close}
                            alt="close"
                            onClick={onClose}
                        />
                    </ModalHeader>
                    <VideoContainer >
                        <Iframe src={`https://www.youtube.com/embed/${srcState}?si=wB2VPTrNcaJYQrUJ`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></Iframe>
                    </VideoContainer>
                </Content>
            </Modal>
        </>
    );
};


export default YoutubeModal;