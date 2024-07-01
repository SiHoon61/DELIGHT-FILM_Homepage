import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    position: relative;
    border-radius: 30px;
    border: 2px solid #FFF;
    background: #343434;
`;

const NavLink = styled.div`
    padding: 10px 20px;
    margin: 0 5px;
    font-size: 20px;
    font-family: var(--font-sansBold);
    cursor: pointer;
    position: relative;
    color: ${({ $active }) => ($active ? '#000' : '#9D9D9D')};
    transition: color 0.4s;
    &:hover{
        color: black;
    }
`;

const Background = styled.div`
    position: absolute;
    top: 50%;
    left: ${({ $position }) => $position}px;
    transform: translateY(-50%);
    width: ${({ width }) => width}px;
    height: 40px;
    background-color: #eee;
    border-radius: 30px;
    transition: left 0.3s, width 0.3s;
`;

const NavBar = ({ onMenuClick }) => {
    const [active, setActive] = useState('Video');
    const [hoverPosition, setHoverPosition] = useState(null);
    const [clickPosition, setClickPosition] = useState(0);
    const [backgroundWidth, setBackgroundWidth] = useState(100);

    const videoRef = useRef(null);
    const broadcastRef = useRef(null);
    const photoRef = useRef(null);

    useEffect(() => {
        const initialRef = videoRef.current;
        setClickPosition(initialRef.offsetLeft);
        setBackgroundWidth(initialRef.offsetWidth);
    }, []);

    const handleMouseEnter = (position, ref) => {
        setHoverPosition(position);
        setBackgroundWidth(ref.current.offsetWidth);
    };

    const handleMouseLeave = () => {
        setHoverPosition(null);
        const activeRef = getActiveRef();
        setBackgroundWidth(activeRef.current.offsetWidth);
    };

    const handleClick = (position, name, ref) => {
        setClickPosition(position);
        setActive(name);
        setBackgroundWidth(ref.current.offsetWidth);
        if (onMenuClick) {
            onMenuClick(name);
        }
    };

    const getPosition = () => {
        return hoverPosition !== null ? hoverPosition : clickPosition;
    };

    const getActiveRef = () => {
        switch (active) {
            case 'Video':
                return videoRef;
            case 'Broadcast':
                return broadcastRef;
            case 'Photo':
                return photoRef;
            default:
                return videoRef;
        }
    };

    return (
        <Nav>
            <Background $position={getPosition()} width={backgroundWidth} />
            <NavLink
                $active={active === 'Video'}
                ref={videoRef}
                onClick={() => handleClick(videoRef.current.offsetLeft, 'Video', videoRef)}
                onMouseEnter={() => handleMouseEnter(videoRef.current.offsetLeft, videoRef, 'Video')}
                onMouseLeave={handleMouseLeave}
            >
                Video
            </NavLink>
            <NavLink
                $active={active === 'Broadcast'}
                ref={broadcastRef}
                onClick={() => handleClick(broadcastRef.current.offsetLeft, 'Broadcast', broadcastRef)}
                onMouseEnter={() => handleMouseEnter(broadcastRef.current.offsetLeft, broadcastRef, 'Broadcast')}
                onMouseLeave={handleMouseLeave}
            >
                Broadcast
            </NavLink>
            <NavLink
                $active={active === 'Photo'}
                ref={photoRef}
                onClick={() => handleClick(photoRef.current.offsetLeft, 'Photo', photoRef)}
                onMouseEnter={() => handleMouseEnter(photoRef.current.offsetLeft, photoRef, 'Photo')}
                onMouseLeave={handleMouseLeave}
            >
                Photo
            </NavLink>
        </Nav>
    );
};

export default NavBar;
