import React from 'react';

import {
    Container,
    LogoBox,
    LogoImg,
    InfoBox,
    Text,
    SnsBox,
    NewLine,
    LogoImgBox,
    SnsImg,
    ScrollBar,
} from './style';

import logoImg from '../../assets/Home/logo.png'
import youtube from '../../assets/Home/youtube.png'
import instagram from '../../assets/Home/instagram.png'

const Bottom = () => {
    return (
        <>
            <Container>
                <LogoImgBox>
                    <LogoBox>
                        <LogoImg src={logoImg} alt="logo" />
                        D E L I G H T &nbsp; F I L M
                    </LogoBox>
                    <InfoBox>
                        <NewLine>
                            <Text>
                                Call
                            </Text>
                            <div>
                                010-1234-5678
                            </div>
                        </NewLine>
                        <NewLine>
                            <Text>
                                Email
                            </Text>
                            <div>
                                abbcc123@gmail.com
                            </div>
                        </NewLine>
                    </InfoBox>
                </LogoImgBox>

                <SnsBox>
                    <SnsImg src={instagram} alt="instagram" onClick={() => {
                        window.open("https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ")
                    }} />
                    <SnsImg src={youtube} alt="youtube" style={{ width: "40px", height: "40px" }}
                        onClick={() => {
                            window.open("https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ")
                        }} />
                </SnsBox>
            </Container>
        </>
    );
};

export default Bottom;