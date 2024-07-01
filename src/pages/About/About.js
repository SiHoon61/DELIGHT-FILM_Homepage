import React from 'react';

import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';

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
            //<Bottom/>
        </>
    );
};

export default About;