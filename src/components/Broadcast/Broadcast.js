
import React from 'react';

import {
    VideoContainer,
    Thumbnail,
    InfoBox,
    Title,
} from './style';

const Broadcast = () => {
    const videoJson = [{
        title: "J.R.C_연주곡",
        src: "https://www.youtube.com/watch?v=wWASxXZyOeQ/"
    }]
    return (
        <>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/i8fm_XyUDSE/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>홍보영상</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/i8fm_XyUDSE/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>홍보영상</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/i8fm_XyUDSE/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>홍보영상</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/i8fm_XyUDSE/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>홍보영상</Title>
                </InfoBox>
            </VideoContainer>
        </>
    );
};

export default Broadcast;