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
            title: "2021 한국과 OECD 25년의 동행",
            src: "wxkzZ24VDVs"
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
            title: "또박케어",
            src: "9Ms8qrQFjHo"
        },
        {
            title: "더쎈카드",
            src: "rxuyAG0ZbDc"
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
        {
            title: "Bukseong Port_Insert",
            src: "EkQq3wIpX-c"
        },
        {
            title: "Star Trajectory_Anbandegi Village(1)",
            src: "xByoVwZjE20"
        },
        {
            title: "Star Trajectory_Jeondeungsa Temple",
            src: "ZmbYIMpSdm0"
        },
        {
            title: "Drone_Daebudo Island",
            src: "gAupQxtajTA"
        },
        {
            title: "SunSet Timelaps_Tiara Melaka Golf & Country Club",
            src: "bCErE_Nx9v0"
        },
        // {
        //     title: "Timelaps_Tiara Melaka Golf & Country Club",
        //     src: "_PqFf_KgFXw"
        // },
        {
            title: "Star Trajectory_Anbandegi Village(2)",
            src: "ReNUicnl-OU"
        },
        {
            title: "Star Trajectory_Tiara Melaka Golf & Country Club",
            src: "Qy4dP8A1sr4"
        },
        {
            title: "SunSet Timelaps_Byeolmaro Observatory(1)",
            src: "m0K0Jc0J4do"
        },
        {
            title: "SunSet Timelaps_Byeolmaro Observatory(2)",
            src: "YA55PfDSuQE"
        },
        {
            title: "한림예고 하이라이트",
            src: "oi16vzc8TtU"
        },
        {
            title: "Jazzyfact_Always Awake",
            src: "tMwlK0-TrMg"
        },
        {
            title: "박지윤_환상",
            src: "vmpr4p5hZ2M"
        },
        {
            title: "TOUCHED_Love is Dangerous",
            src: "TfYdz5tcZOw"
        },
        {
            title: "BIG Naughty_Joker",
            src: "claNnIsVQVo"
        },
        {
            title: "유재하_사랑하기 때문에",
            src: "vixuRbgHjgM"
        },
        // {
        //     title: "김건모_첫인상",
        //     src: "tc-nH3hoysQ"
        // },
        {
            title: "Shawn Mendes_Youth",
            src: "fJ3_Vrce8sQ"
        },
        {
            title: "John Mayer_Neon",
            src: "9WNSqgRnUJA"
        },
        {
            title: "데이먼스 이어_AI",
            src: "sndbGWrkdL4"
        },
        {
            title: "J.R.C_연주곡",
            src: "wWASxXZyOeQ"
        },
        {
            title: "The Volunteers_Radio",
            src: "afurj9kzxk4"
        },
        {
            title: "KISS OF LIFE_Sugarcoat",
            src: "EvaxAgxwlsU"
        },
        {
            title: "이문세_빗속에서",
            src: "iJYVoTyCQJo"
        },
        {
            title: "SAAY_ROCKY",
            src: "ihYpxSS6xJY"
        },
        {
            title: "아소토유니온_Think about' Chu",
            src: "R-z6vKcVn8c"
        },
        {
            title: "혁오_TOMBOY",
            src: "Nn0PiDfIpPc"
        },
        {
            title: "Concrete_연주곡",
            src: "2_893049VHo"
        },
        {
            title: "Candy Dulfer_Hold Up",
            src: "0m01vWMoI8w"
        },
        {
            title: "The Weeknd_Out of Time",
            src: "ViTwHDGvDDk"
        },
        {
            title: "The Chicken_연주곡",
            src: "Wy_f-MCd-L8"
        },
        {
            title: "카더가든_나무",
            src: "sKllhUl7NBY"
        },
        {
            title: "못_날개",
            src: "lj7gZYUCVpA"
        },
        {
            title: "이적_하늘을 달리다",
            src: "-b44yOkLCmw"
        },
        {
            title: "결혼식 식전영상",
            src: "ieagSN3JdfY"
        },
        {
            title: "네오메딕스 덴티포뮬러_숏폼",
            src: "1Dye1rQk1Bo"
        },
        {
            title: "라케이브 홍보영상_Short Form (1)",
            src: "WcTw9tDoQ6o"
        },
        {
            title: "라케이브 홍보영상_Short Form (2)",
            src: "WRN-g6bqZKs"
        },
        {
            title: "베스트필_홍보영상",
            src: "stXr-gd3_VI"
        },
        {
            title: "2023 제 1회 알럽 바이크 페스타 문경 스케치",
            src: "mwAjJ0npG60"
        },
        {
            title: "TWIN_단편영화",
            src: "O_i4CMXxed0"
        },
        {
            title: "동쪽으로_단편영화",
            src: "1x0RbFqT8j0"
        },
        {
            title: "여름날의 봄_단편영화",
            src: "18AhualK5hI"
        }
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