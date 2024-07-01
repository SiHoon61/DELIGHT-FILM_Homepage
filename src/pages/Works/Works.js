import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import VideoBox from '../../components/VideoBox/VideoBox';
import Broadcast from '../../components/Broadcast/Broadcast';
import Photo from '../../components/Photo/Photo';
import Bottom from '../../components/Bottom/Bottom';

import {
    HeaderContainer,
    BigText,
    MenuContainer,
    AnimatedDefaultContainer,
    OnlyAnimatedContainer,
} from './style';
const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'Video':
                return (
                    <AnimatedDefaultContainer>
                        <VideoBox />
                    </AnimatedDefaultContainer>
                );
            case 'Broadcast':
                return (
                    <AnimatedDefaultContainer>
                        <Broadcast />
                    </AnimatedDefaultContainer>
                );
            case 'Photo':
                return (
                    <OnlyAnimatedContainer>
                        <Photo />
                    </OnlyAnimatedContainer>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <HeaderContainer>
                <BigText>
                    Works
                </BigText>
                <Header />
            </HeaderContainer>
            <MenuContainer>
                <NavBar onMenuClick={handleMenuClick} />
            </MenuContainer>

            <TransitionGroup>
                <CSSTransition
                    key={selectedMenu}
                    timeout={300}
                    classNames="fade"
                >
                    {renderComponent()}
                </CSSTransition>
            </TransitionGroup>
            <Bottom />
        </>
    );
};

export default Works;