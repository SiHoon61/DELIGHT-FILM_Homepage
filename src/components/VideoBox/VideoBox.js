import React from 'react';

import {
    VideoContainer,
    Thumbnail,
    InfoBox,
    Title,
 } from './style';

const VideoBox = () => {
    const videoJson = [{
        title: "J.R.C_연주곡",
        src: "https://www.youtube.com/watch?v=wWASxXZyOeQ/"
    }]
    return (
        <>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/wWASxXZyOeQ/maxresdefault.jpg" alt="YouTube Thumbnail"/>
                <InfoBox>
                    <Title>J.R.C_연주곡</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/wWASxXZyOeQ/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>J.R.C_연주곡</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/wWASxXZyOeQ/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>J.R.C_연주곡</Title>
                </InfoBox>
            </VideoContainer>
            <VideoContainer>
                <Thumbnail src="https://img.youtube.com/vi/wWASxXZyOeQ/maxresdefault.jpg" alt="YouTube Thumbnail" />
                <InfoBox>
                    <Title>J.R.C_연주곡</Title>
                </InfoBox>
            </VideoContainer>
        </>
    );
};

export default VideoBox;