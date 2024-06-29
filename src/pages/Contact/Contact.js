import React, { useState, useEffect, useRef } from 'react';

import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
import {
    HeaderContainer,
    BigText,
    FormContainer,
    InputBox,
    KeyText,
    TextInput,
    SelectCost,
    CostBox,
    Triangle,
    CostOption,
    BodyTextarea,
    AreaBox,
    Submit,
} from './style';

const Contact = () => {
    const dropdownRef = useRef(null);
    const [nameValue, setNameValue] = useState('');
    const [numValue, setNumValue] = useState('');
    const [videoType, setVideoType] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [visibleCost, setVisibleCost] = useState(false);
    const [isSelectCost, setIsSelectCost] = useState(0);
    const costList = ['상담 후 결정', '~ 50', '50 ~ 100', '100 ~ 500', '500 ~ 1000', '1000 ~'];

    useEffect(() => {
        // 이벤트 리스너 설정: 바깥쪽 클릭 감지
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setVisibleCost(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const domainToggleDropdown = () => {
        setVisibleCost(!visibleCost);
    };

    return (
        <>
            <HeaderContainer>
                <BigText>
                    Contact
                </BigText>
                <Header />
            </HeaderContainer>
            <FormContainer>
                <InputBox>
                    <KeyText>
                        이름 / 직책
                    </KeyText>
                    <TextInput
                        type="text"
                        name="user_name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </InputBox>
                <InputBox>
                    <KeyText>
                        연락처
                    </KeyText>
                    <TextInput
                        type="text"
                        name="user_name"
                        value={numValue}
                        onChange={(e) => setNumValue(e.target.value)}
                    />
                </InputBox>
                <InputBox>
                    <KeyText>
                        영상 유형
                    </KeyText>
                    <TextInput
                        type="text"
                        name="user_name"
                        value={videoType}
                        onChange={(e) => setVideoType(e.target.value)}
                    />
                </InputBox>
                <InputBox>
                    <KeyText>
                        제작 예산 범위
                    </KeyText>
                    <SelectCost
                        onClick={domainToggleDropdown}
                        ref={dropdownRef}
                    >
                        {costList[isSelectCost]}
                        <Triangle $isClick={visibleCost} />
                        <CostBox $isClick={visibleCost}>
                            {costList.map((list, index) => (
                                <CostOption
                                    key={index}
                                    onClick={() => {
                                        setIsSelectCost(index);
                                    }}>
                                    {list}
                                </CostOption>
                            ))}
                        </CostBox>
                    </SelectCost>
                </InputBox>
                <AreaBox>
                    <KeyText>
                       상세 내용
                    </KeyText>
                    <BodyTextarea
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)} />
                </AreaBox>
                <Submit>전송</Submit>
            </FormContainer>
            <Bottom/>
        </>
    );
};

export default Contact;