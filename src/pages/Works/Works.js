import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import VideoBox from '../../components/VideoBox/VideoBox';

import {
    HeaderContainer,
    BigText,
    MenuContainer,
    BodyContainer,
} from './style';
const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        console.log(`Selected menu: ${menu}`);
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
            <BodyContainer>
                <VideoBox/>
            </BodyContainer>
        </>
    );
};

export default Works;