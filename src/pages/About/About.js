import React from 'react';

import Header from '../../components/Header/Header';
import {
    HeaderContainer,
    BigText,
 } from './style';
 
const About = () => {
    return (
        <>
            <HeaderContainer>
                <BigText>
                    About
                </BigText>
                <Header />
            </HeaderContainer>
        </>
    );
};

export default About;