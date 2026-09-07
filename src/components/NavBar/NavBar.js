import React from 'react';
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
    @media (max-width: 700px) {
        gap: 4px;
        margin: 14px 8px;
        border: 0;
        background: transparent;
    }
`;

const NavLink = styled.div`
    padding: 10px 20px;
    margin: 0 5px;
    font-size: 20px;
    font-family: var(--font-sansBold);
    cursor: pointer;
    position: relative;
    color: ${({ $active }) => ($active ? '#000' : '#9D9D9D')};
    border-radius: 30px;
    background: ${({ $active }) => ($active ? '#eee' : 'transparent')};
    transition: color 0.3s, background-color 0.3s;
    &:hover{
        color: ${({ $active }) => ($active ? '#000' : '#fff')};
    }
    @media (max-width: 700px) {
        margin: 0;
        padding: 8px 10px;
        border-radius: 22px;
        background: ${({ $active }) => ($active ? '#eee' : '#202025')};
        font-size: 13px;
    }
`;

const NavBar = ({ active, onMenuClick }) => {
    const handleClick = (name) => {
        if (onMenuClick) {
            onMenuClick(name);
        }
    };

    return (
        <Nav>
            <NavLink
                $active={active === 'Video'}
                onClick={() => handleClick('Video')}
            >
                Video
            </NavLink>
            <NavLink
                $active={active === 'Broadcast'}
                onClick={() => handleClick('Broadcast')}
            >
                Broadcast
            </NavLink>
            <NavLink
                $active={active === 'Shorts'}
                onClick={() => handleClick('Shorts')}
            >
                Shorts
            </NavLink>
            <NavLink
                $active={active === 'Photo'}
                onClick={() => handleClick('Photo')}
            >
                Photo
            </NavLink>
        </Nav>
    );
};

export default NavBar;
