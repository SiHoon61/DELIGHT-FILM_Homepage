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
                                010-5513-8358
                            </TextInfo>
                        </NewLine>
                        <NewLine>
                            <Text>
                                Email
                            </Text>
                            <TextInfo>
                                delightfilm0721@gmail.com
                            </TextInfo>
                        </NewLine>
                    </InfoBox>
                </LogoImgBox>

                <SnsBox>
                    <InstagramImg
                        onClick={() => {
                            window.open("https://www.instagram.com/nasle0721/")
                    }} />
                    <YoutubeImg
                        onClick={() => {
                            window.open("https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ")
                        }} />
                </SnsBox>
            </Container>
        </>
    );
};

export default Bottom;