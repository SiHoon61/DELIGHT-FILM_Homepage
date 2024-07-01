import styled from 'styled-components';

import youtube from '../../assets/Home/youtube.png'
import youtubeColor from '../../assets/Home/youtubeColor.png'
import instagram from '../../assets/Home/instagram.png'
import instagramColor from '../../assets/Home/instagramColor.png'

export const Container = styled.div`
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LogoBox = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    width: 150px;
    margin-left: 50px;
    white-space: nowrap;
`

export const LogoImg = styled.img`
    height: 80px;
    width: 54px;
    margin-bottom: 10px;
`

export const InfoBox = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
`

export const NewLine = styled.div`
    display: flex;
    margin-bottom: 10px;
    font-family: var(--font-sansMedium);

`

export const Text = styled.div`
    width: 60px;
`

export const TextInfo = styled.div`
    white-space: nowrap;
`

export const LogoImgBox = styled.div`
    display: flex;
    align-items: center;
`

export const SnsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
`

export const InstagramImg = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 20px;
    background-image: url(${instagram});
    cursor: pointer;
    transition: all 0.2s;
    &:hover{
        background-image: url(${instagramColor});  
    }
`

export const YoutubeImg = styled.div`
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
`