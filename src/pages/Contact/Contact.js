import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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
    const [isFilled, setIsFilled] = useState(false);

    //드롭다운
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

    const costToggleDropdown = () => {
        setVisibleCost(!visibleCost);
    };

    //유효성 검사
    const isEmpty = (value) => {
        if (typeof value === 'string') {
            return value.trim() !== '';
        }
        else if (typeof value === 'boolean') {
            return value === true;
        }
        return !value;
    };
    useEffect(() => {
        if ([nameValue, numValue, videoType, bodyText].every(isEmpty)) {
            setIsFilled(true);
        }
        else {
            setIsFilled(false);
        }
    }, [nameValue, numValue, videoType, bodyText])

    //emailjs
    const sendEmail = () => {
        const templateParams = {
            to_Email: 'jhpodong@naver.com',
            user_name: nameValue,
            user_num: numValue,
            video_type: videoType,
            user_cost: costList[isSelectCost],
            user_bodyText: bodyText,
        };
        emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`, templateParams, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`).then(
            result => {
                alert("문의사항이 접수되었습니다. 감사합니다.");
                setNameValue('');
                setNumValue('');
                setVideoType('');
                setIsSelectCost(0);
                setBodyText('');
            },
            error => {
                console.log(error.text);
                alert("문의 접수에 실패했습니다.전화 주시면 감사드리겠습니다.");
            },
        );
    }
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
                        onClick={costToggleDropdown}
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
                <Submit
                    $isFilled={isFilled}
                    onClick={() => {
                        sendEmail()
                    }}
                >
                    전송
                </Submit>
            </FormContainer>
            <Bottom/>
        </>
    );
};

export default Contact;