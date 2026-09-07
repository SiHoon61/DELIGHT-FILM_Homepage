import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const tabs = ['Video', 'Shorts', 'Photo'];

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
    z-index: 1;
    color: ${({ $highlighted }) => ($highlighted ? '#000' : '#9D9D9D')};
    border-radius: 30px;
    background: transparent;
    transition: color 0.3s;
    &:hover{
        color: #000;
    }
    @media (max-width: 700px) {
        margin: 0;
        padding: 8px 10px;
        box-sizing: border-box;
        border: 1px solid transparent;
        border-radius: 22px;
        color: ${({ $active }) => ($active ? '#000' : '#9D9D9D')};
        background: ${({ $active }) =>
            ($active
                ? `linear-gradient(#eeeeec, #eeeeec) padding-box,
                   linear-gradient(to right, #FFD700, #FF8C00) border-box`
                : '#202025')};
        box-shadow: ${({ $active }) =>
            ($active ? '0 3px 12px rgba(255, 166, 0, 0.16)' : 'none')};
        font-size: 13px;

        &:hover {
            color: ${({ $active }) => ($active ? '#000' : '#fff')};
        }
    }
`;

const Background = styled.div`
    position: absolute;
    top: 50%;
    left: ${({ $position }) => $position}px;
    width: ${({ $width }) => $width}px;
    height: 40px;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 30px;
    background:
        linear-gradient(#eeeeec, #eeeeec) padding-box,
        linear-gradient(to right, #FFD700, #FF8C00) border-box;
    box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.08),
        0 4px 14px rgba(255, 166, 0, 0.16);
    opacity: ${({ $ready }) => ($ready ? 1 : 0)};
    transform: translateY(-50%);
    transition: left 0.3s ease, width 0.3s ease, opacity 0.15s ease;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    @media (max-width: 700px) {
        display: none;
    }
`;

const NavBar = ({ active, onMenuClick }) => {
    const navRef = useRef(null);
    const tabRefs = useRef({});
    const [hovered, setHovered] = useState(null);
    const [indicator, setIndicator] = useState({ position: 0, width: 0 });
    const highlighted = hovered || active;

    const updateIndicator = useCallback((name) => {
        const tab = tabRefs.current[name];
        if (!tab) return;

        setIndicator({
            position: tab.offsetLeft,
            width: tab.offsetWidth,
        });
    }, []);

    useLayoutEffect(() => {
        updateIndicator(highlighted);
    }, [highlighted, updateIndicator]);

    useEffect(() => {
        const handleResize = () => updateIndicator(highlighted);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [highlighted, updateIndicator]);

    const handleClick = (name) => {
        if (onMenuClick) {
            onMenuClick(name);
        }
    };

    return (
        <Nav ref={navRef} onMouseLeave={() => setHovered(null)}>
            <Background
                aria-hidden="true"
                $position={indicator.position}
                $width={indicator.width}
                $ready={indicator.width > 0}
            />
            {tabs.map((name) => (
                <NavLink
                    key={name}
                    ref={(node) => { tabRefs.current[name] = node; }}
                    $active={active === name}
                    $highlighted={highlighted === name}
                    onClick={() => handleClick(name)}
                    onMouseEnter={() => setHovered(name)}
                    onFocus={() => setHovered(name)}
                    onBlur={() => setHovered(null)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active === name}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleClick(name);
                        }
                    }}
                >
                    {name}
                </NavLink>
            ))}
        </Nav>
    );
};

export default NavBar;
