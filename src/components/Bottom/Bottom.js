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
                                010-4278-2470
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
                        href="https://www.instagram.com/nasle0721/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="딜라이트 필름 인스타그램 열기"
                    />
                    <YoutubeImg
                        href="https://www.youtube.com/channel/UCozVgv8Kn92pnhckwAHjGSQ"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="딜라이트 필름 유튜브 열기"
                    />
                </SnsBox>
            </Container>
        </>
    );
};

export default Bottom;
