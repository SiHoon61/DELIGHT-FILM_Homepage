import React from 'react';

import {
    Container,
    LogoBox,
    LogoImg,
    InfoBox,
    Text,
    TextInfo,
    SnsBox,
    NewLine,
    LogoImgBox,
    InstagramImg,
    YoutubeImg,
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
                            <TextInfo>
                                010-1234-5678
                            </TextInfo>
                        </NewLine>
                        <NewLine>
                            <Text>
                                Email
                            </Text>
                            <TextInfo>
                                abbcc123@gmail.com
                            </TextInfo>
                        </NewLine>
                    </InfoBox>
                </LogoImgBox>

                <SnsBox>
                    <InstagramImg
                        onClick={() => {
                        window.open("https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ")
                    }} />
                    <YoutubeImg src={youtube} alt="youtube"
                        onClick={() => {
                            window.open("https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ")
                        }} />
                </SnsBox>
            </Container>
        </>
    );
};

export default Bottom;