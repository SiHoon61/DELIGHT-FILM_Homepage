import styled from 'styled-components';

import youtube from '../../assets/Home/youtube.png'
import youtubeColor from '../../assets/Home/youtubeColor.png'
import instagram from '../../assets/Home/instagram.png'
import instagramColor from '../../assets/Home/instagramColor.png'
import kakao from '../../assets/Home/kakao.svg'
import kakaoColor from '../../assets/Home/kakaoColor.svg'

export const Container = styled.div`
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1000px) {
        height: 120px;
    }
`

export const LogoImgBox = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

export const LogoBox = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    width: 150px;
    white-space: nowrap;
    margin-left: 40px;
    text-decoration: none;
    cursor: pointer;
    @media (max-width: 1000px) {
        display: none;
    }
`

export const LogoImg = styled.img`
    height: 80px;
    width: 54px;
    margin-bottom: 10px;
    @media (max-width: 1000px) {
        display: none;
    }
`

export const InfoBox = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    @media (max-width: 1000px) {
        margin-left: 7%;
    }
`

export const NewLine = styled.div`
    display: flex;
    margin-bottom: 10px;
    font-family: var(--font-sansMedium);
    @media (max-width: 1000px) {
        font-family: var(--font-sansRegular);
        font-size: 14px;
    }
`

export const Text = styled.div`
    width: 60px;
`

export const TextInfo = styled.div`
    white-space: nowrap;
`

export const SnsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1%;
`

export const KakaoImg = styled.a`
    display: block;
    width: 36px;
    height: 36px;
    margin-right: 16px;
    background-image: url(${kakao});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover,
    &:focus-visible {
        background-image: url(${kakaoColor});
        transform: translateY(-2px);
        outline: none;
    }

    @media (max-width: 700px) {
        width: 24px;
        height: 24px;
        margin-right: 14px;
    }
`

export const InstagramImg = styled.a`
    display: block;
    width: 30px;
    height: 30px;
    margin-right: 20px;
    background-image: url(${instagram});
    background-size: cover;
    cursor: pointer;
    transition: all 0.2s;
    &:hover{
        background-image: url(${instagramColor});  
    }
    @media (max-width: 700px) {
        margin-right: 15px;
        width: 20px;
        height: 20px;
    }
`

export const YoutubeImg = styled.a`
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background-image: url(${youtube});
    background-size: cover;
    cursor: pointer;
    transition: all 0.2s;
    &:hover{
        background-image: url(${youtubeColor});  
    }
    @media (max-width: 700px) {
        width: 30px;
        height: 30px;
    }
`
