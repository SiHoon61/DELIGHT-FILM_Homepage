import React, { useState } from 'react';

import {
    VideoContainer,
    Thumbnail,
    InfoBox,
    Title,
} from './style';

import ModalPortal from '../../modal/ModalPortal';
import YoutubeModal from '../../modal/YoutubeModal';
const Broadcast = () => {
    const [modalState, setModalState] = useState(false);
    const [srcState, setSrcState] = useState('');
    const handleOpenModal = (props) => {
        setSrcState(props);
        setModalState(true);
    };
    const handleCloseModal = () => {
        setModalState(false);
    };
    const videoJson = [
        {
            title: "2021 인사혁신처 글로벌 공공 HR 컨퍼런스",
            src: "UW7R-tUjTtc"
        },
        {
            title: "2021 국토교통부 안전속도 5030 실천 선포식",
            src: "tO3hHm5ftUA"
        },
        // {
        //     title: "2021 친환경 탄소중립 물류 컨퍼런스",
        //     src: "HnMV9aEgC4Q"
        // },
        {
            title: "2021 외교부 한국 OECD가입 25주년 기념 세미나",
            src: "tUPaHxhadb4"
        },
        {
            title: "2022 인사혁신처 글로벌 공공 HR 컨퍼런스",
            src: "3Q5AVsOC7r4"
        },
        {
            title: "2022 친환경 탄소중립 물류 컨퍼런스",
            src: "03gBGyYw2RA"
        },
        {
            title: "2023 고성 옥타곤 다이아몬드 게임",
            src: "8zkyF3RHE2U"
        },
        {
            title: "2023 렉서스 레이디스 롱 드라이브 챔피언십",
            src: "BfdVWX7ThPY"
        },
        {
            title: "2023 인사혁신처 글로벌 공공 HR 컨퍼런스",
            src: "liyFAqc-CL8"
        },
        {
            title: "2023 국가상징공간 컨퍼런스",
            src: "TxXstRSsmoQ"
        },
        {
            title: "2023 경기인디뮤직페스티벌",
            src: "OXniZbo82aE"
        },
        {
            title: "2023 경기양주 테크노밸리 착공식",
            src: "REsqT0_-duQ"
        },
        {
            title: "2023 청라뮤직&와인페스티벌",
            src: "rHbMz3LMIlE"
        },
        {
            title: "2023 송파구 새해맞이 카운트다운",
            src: "lixp4kN6Dx0"
        },
        {
            title: "2023 민군기술협력사업 성과발표회",
            src: "P6eyzrevRbs"
        },
        {
            title: "2024 NRC 부문별 글로벌 이슈 진단",
            src: "xEX6mB2eHAw"
        },
        {
            title: "국가상징공간 컨퍼런스_발제1",
            src: "6J5BUFMm4Ws"
        },
        {
            title: "국가상징공간 컨퍼런스_발제2",
            src: "mADhuJMH3o8"
        },
        {
            title: "국가상징공간 컨퍼런스_좌담회",
            src: "yd7fUb-NoMY"
        },
        
        ]
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

export default Broadcast;