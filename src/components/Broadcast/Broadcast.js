import React, { useState } from "react";

import { VideoContainer, Thumbnail, InfoBox, Title } from "./style";

import broadcastList from "../../workList.json";
import ModalPortal from "../../modal/ModalPortal";
import YoutubeModal from "../../modal/YoutubeModal";
const Broadcast = () => {
  const [modalState, setModalState] = useState(false);
  const [srcState, setSrcState] = useState("");
  const { broadcastJson } = broadcastList;
  const handleOpenModal = (props) => {
    setSrcState(props);
    setModalState(true);
  };
  const handleCloseModal = () => {
    setModalState(false);
  };

  return (
    <>
      {broadcastJson.map((list, index) => (
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

export default Broadcast;
