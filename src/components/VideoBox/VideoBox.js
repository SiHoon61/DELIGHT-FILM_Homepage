import React, { useState } from "react";

import { VideoContainer, Thumbnail, InfoBox, Title } from "./style";

import videoList from "../../videoList.json";
import ModalPortal from "../../modal/ModalPortal";
import YoutubeModal from "../../modal/YoutubeModal";
const VideoBox = () => {
  const [modalState, setModalState] = useState(false);
  const [srcState, setSrcState] = useState("");
  const { videoJson } = videoList;
  const handleOpenModal = (props) => {
    setSrcState(props);
    setModalState(true);
  };
  const handleCloseModal = () => {
    setModalState(false);
  };

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
          <YoutubeModal
            onClose={handleCloseModal}
            show={modalState}
            srcState={srcState}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default VideoBox;
