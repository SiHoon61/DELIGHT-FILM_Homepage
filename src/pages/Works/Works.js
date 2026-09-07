import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import VideoBox from '../../components/VideoBox/VideoBox';
import Broadcast from '../../components/Broadcast/Broadcast';
import Photo from '../../components/Photo/Photo';
import Bottom from '../../components/Bottom/Bottom';
import workList from '../../workList.json';

import {
    HeaderContainer,
    BigText,
    TitleBlock,
    TitleSubtitle,
    MenuContainer,
    WorkCount,
    AnimatedDefaultContainer,
    OnlyAnimatedContainer,
} from './style';

const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');
    const refs = {
        Video: useRef(null),
        Broadcast: useRef(null),
        Photo: useRef(null),
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'Video':
                return (
                    <CSSTransition
                        key="video"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Video}
                    >
                        <AnimatedDefaultContainer ref={refs.Video}>
                            <VideoBox />
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Broadcast':
                return (
                    <CSSTransition
                        key="broadcast"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Broadcast}
                    >
                        <AnimatedDefaultContainer ref={refs.Broadcast}>
                            <Broadcast />
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Photo':
                return (
                    <CSSTransition
                        key="photo"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Photo}
                    >
                        <OnlyAnimatedContainer ref={refs.Photo}>
                            <Photo />
                        </OnlyAnimatedContainer>
                    </CSSTransition>
                );
            default:
                return null;
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const itemCount = selectedMenu === 'Video'
        ? workList?.videoJson?.length
        : workList?.broadcastJson?.length;

    return (
        <>
            <HeaderContainer>
                <TitleBlock>
                    <BigText>
                        Works
                    </BigText>
                    <TitleSubtitle>
                        Stories we capture.<br />People we remember.
                    </TitleSubtitle>
                </TitleBlock>
                <Header />
            </HeaderContainer>
            <div>
                <MenuContainer onClick={scrollToTop}>
                    <NavBar
                        onMenuClick={handleMenuClick}
                    />
                    {selectedMenu !== 'Photo' && (
                        <WorkCount>All <strong>{itemCount}</strong></WorkCount>
                    )}
                </MenuContainer>
                <TransitionGroup>
                    {renderComponent()}
                </TransitionGroup>
            </div>
            <Bottom />
        </>
    );
};

export default Works;
