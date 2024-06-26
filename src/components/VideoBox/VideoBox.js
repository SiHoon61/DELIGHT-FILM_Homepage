import React, { useState } from 'react';

import {
    VideoContainer,
    Thumbnail,
    InfoBox,
    Title,
} from './style';

import ModalPortal from '../../modal/ModalPortal';
import YoutubeModal from '../../modal/YoutubeModal';
const VideoBox = () => {
    const [modalState, setModalState] = useState(false);
    const [srcState, setSrcState] = useState('');
    const handleOpenModal = (props) => {
        setSrcState(props);
        setModalState(true);
    };
    const handleCloseModal = () => {
        setModalState(false);
    };
    const videoJson = [{
        title: "J.R.C_연주곡",
        src: "wWASxXZyOeQ"
    },]
    return (
        <>
            {videoJson.map((list, index) => (
                <VideoContainer key={index}>
                    <Thumbnail
                        src={`https://img.youtube.com/vi/${list.src}/maxresdefault.jpg`}
                        alt="YouTube Thumbnail"
                        onClick={() => {
                            handleOpenModal(list.src);
                        }}
                    />
                    <InfoBox>
                        <Title>{list.title}</Title>
                    </InfoBox>
                </VideoContainer>
            ))}
            {modalState && (
                <ModalPortal>
                    <YoutubeModal onClose={handleCloseModal} show={modalState} srcState={srcState} />
                </ModalPortal>
            )}
        </>
    );
};

export default VideoBox;