import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import VideoBox from '../../components/VideoBox/VideoBox';
import Shorts from '../../components/Shorts/Shorts';
import Photo from '../../components/Photo/Photo';
import Bottom from '../../components/Bottom/Bottom';
import workList from '../../workList.json';
import { createShortsCatalog, createVideoCatalog } from '../../data/workSections';

import {
    HeaderContainer,
    BigText,
    MenuContainer,
    WorkCount,
    AnimatedDefaultContainer,
    OnlyAnimatedContainer,
} from './style';

const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');
    const refs = {
        Video: useRef(null),
        Shorts: useRef(null),
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
            case 'Shorts':
                return (
                    <CSSTransition
                        key="shorts"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Shorts}
                    >
                        <AnimatedDefaultContainer ref={refs.Shorts}>
                            <Shorts />
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

    const sectionCounts = {
        Video: createVideoCatalog(
            workList?.videoJson || [],
            workList?.broadcastJson || []
        ).length,
        Shorts: createShortsCatalog(
            workList?.videoJson || [],
            workList?.broadcastJson || []
        ).length,
    };
    const itemCount = sectionCounts[selectedMenu];

    return (
        <>
            <HeaderContainer>
                <BigText>
                    Works
                </BigText>
                <Header />
            </HeaderContainer>
            <div>
                <MenuContainer onClick={scrollToTop}>
                    <NavBar
                        active={selectedMenu}
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
