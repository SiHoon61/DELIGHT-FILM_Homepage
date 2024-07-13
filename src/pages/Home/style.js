import styled from 'styled-components';

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6%;
`

export const LogoFont = styled.div`
    font-size: 22px;
    font-family: var(--font-sansMedium);
    color: white;
    white-space: nowrap;
    @media (max-width: 600px) {
        font-size: 18px;
    }
`

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.00) 100%);
    position: absolute;
    z-index: 10;
    @media (max-width: 700px) {
        position: static;
    }
`

export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${props => props.$height}px;
    z-index: 0;
    @media (max-width: 700px) {
        height: auto;
    }
`;

export const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;