import React from 'react';

import Header from '../../components/Header/Header';
import {
    HeaderContainer,
    BigText,
} from './style';

const Contact = () => {
    return (
        <>
            <HeaderContainer>
                <BigText>
                    Contact
                </BigText>
                <Header />
            </HeaderContainer>
        </>
    );
};

export default Contact;