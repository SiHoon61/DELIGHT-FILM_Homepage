import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import VideoBox from '../../components/VideoBox/VideoBox';
import Broadcast from '../../components/Broadcast/Broadcast';
import Photo from '../../components/Photo/Photo';

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
                {selectedMenu === 'Video' && <VideoBox />}
                {selectedMenu === 'Broadcast' && <Broadcast />}
                {selectedMenu === 'Photo' && <Photo />}
            </BodyContainer>
        </>
    );
};

export default Works;