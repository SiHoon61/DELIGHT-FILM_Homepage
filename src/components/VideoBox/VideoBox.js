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
    const videoJson = [
        {
            title: "2021 새만금전국장타대회",
            src: "pbtGUsU_aR4"
        },
        {
            title: "2022 인사혁신처 글로벌 공공 HR 컨퍼런스",
            src: "ty4lVQFAngM"
        },
        {
            title: "2022 골플루언서 챌린지",
            src: "HPhfkGxZfHA"
        },
        {
            title: "2022 새만금전국장타대회",
            src: "eMfDu5oeUa8"
        },
        {
            title: "2022 친환경 탄소중립 물류 컨퍼런스",
            src: "RDFZ_wB-77s"
        },
        {
            title: "2023 STEPI 루핑영상",
            src: "OS3nNFYIlv4"
        },
        {
            title: "2024 한림연예예술고등학교 실용음악과 정기공연",
            src: "38ECmHJ1YjE"
        },
        {
            title: "2024 온실가스 국제감축사업 설명회",
            src: "h80fUnLa9mY"
        },
        {
            title: "운전자를 위한 생활 플러스 앱 휘슬",
            src: "HeM_N5q3RS4"
        },
        {
            title: "걷기만해도 돈 되는 어플 발로소득",
            src: "IIRRAMGbltY"
        },
        {
            title: "010PAY 기프티콘",
            src: "2t1A4fi2TAc"
        },
        {
            title: "010PAY 기프티콘 2",
            src: "2t1A4fi2TAc"
        },
        {
            title: "또박케어",
            src: "9Ms8qrQFjHo"
        },
        {
            title: "더쎈카드",
            src: "rxuyAG0ZbDc"
        },
        {
            title: "또박케어",
            src: "9Ms8qrQFjHo"
        },
        {
            title: "드시모네 또박케어LAB 쇼츠",
            src: "MTBdi7E-JMM"
        },
        {
            title: "서울시 산불예방 공익광고",
            src: "EvE8wR8jilo"
        },
        {
            title: "게코도니아 x 삭 대형 팔루다리움",
            src: "i8fm_XyUDSE"
        },
        {
            title: "평창동 아카이브피피 갤러리 홍보영상",
            src: "iiU1aBVd0RQ"
        },
        {
            title: "라케이브 홍보영상 1",
            src: "WcTw9tDoQ6o"
        },
        {
            title: "라케이브 홍보영상 2",
            src: "WRN-g6bqZKs"
        },
        {
            title: "2024 STEPI GLOBAL SYMPOSIUM_Looping",
            src: "-Urj3ned_xE"
        },
        {
            title: "AI와 데이터 거버넌스 국제 컨퍼런스_Looping",
            src: "4ec4yDCZkBA"
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

export default VideoBox;