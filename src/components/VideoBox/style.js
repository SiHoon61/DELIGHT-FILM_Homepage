import styled from 'styled-components';

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 32%;
    margin-bottom: 30px;
    @media (max-width: 1000px){
        width: 49%;
        margin-bottom: 25px;
    }
    @media (max-width: 600px){
        width: 100%;
    }
`

export const Thumbnail = styled.img`
    width: 100%;
    cursor: pointer;
`

export const InfoBox = styled.div`
    color: white;
`

export const Title = styled.div`
    font-size: 24px;
    font-family: var(--font-sansMedium);
    @media (max-width: 600px){
        font-size: 20px;
    }
`