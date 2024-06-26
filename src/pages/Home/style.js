import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.40) 0%, rgba(102, 102, 102, 0.00) 106.45%);
    position: absolute;
    z-index: 10;
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
`

export const LogoFont = styled.div`
    font-size: 20px;
    font-family: var(--font-sansMedium);
    color: white;
`

export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${props => props.$height}px;
    z-index: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 6px;
    }
    &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #A4A4A4;
    }
`;

export const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;