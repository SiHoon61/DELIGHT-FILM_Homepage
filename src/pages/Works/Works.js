import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';

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
                <h1>화면 출력: {selectedMenu}</h1>
            </BodyContainer>
        </>
    );
};

export default Works;