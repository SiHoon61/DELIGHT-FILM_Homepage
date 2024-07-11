import React from 'react';

import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';

//img
import aboutImg from '../../assets/About/aboutImg.svg'

import {
    HeaderContainer,
    BigText,
    MainContainer,
    AboutImg,
    AboutText,
    BoldText,
} from './style';

const About = () => {
    return (
        <>
            <HeaderContainer>
                <BigText>
                    About
                </BigText>
                <Header />
            </HeaderContainer>
            <MainContainer>
                <AboutImg src={aboutImg} alt="aboutImg" />
                <AboutText>
                    <BoldText>
                        안녕하세요, 딜라이트 필름의 김주환 입니다.
                    </BoldText>
                    딜라이트 필름은 분야를 가리지 않고, 다양한 영상을 제작하는 영상 제작 프로덕션입니다.<br />

                    콘서트, 이벤트, 세미나 등의 라이브 중계부터 드론 촬영,
                    유튜브 예능, TVCF제작, 홈쇼핑 제작, 웹드라마와 단편영화 촬영까지
                    장르를 넘나드는 다양한 프로젝트를 진행하고 있습니다.<br />

                    딜라이트 필름은 고객과의 소통을 가장 중시하며, 항상 기대 이상의 결과를 만들어내기 위해 최선을 다하고 있습니다.<br />
                    뛰어난 결과물을 통해 고객 만족을 목표로 기억에 남는 촬영 전문 회사로 성장해 나가겠습니다.<br />

                    감사합니다.
                </AboutText>
            </MainContainer>
            <Bottom />
        </>
    );
};

export default About;