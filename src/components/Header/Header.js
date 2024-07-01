import React from 'react';
import { useNavigate } from "react-router-dom";

import {
    MenuBar,
    IndexLI,
    IndexUL,
    GradientText,
} from './style';
const Header = () => {
    //navigation
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    }
    const goAbout = () => {
        navigate("/About");
    }
    const goWorks = () => {
        navigate("/Works");
    }
    const goContact = () => {
        navigate("/Contact");
    }
    return (
        <>
            <MenuBar>
                <IndexUL>
                    <IndexLI onClick={goHome}>
                        <GradientText data-text="Home">Home</GradientText>
                    </IndexLI>
                    <IndexLI onClick={goAbout}>
                        <GradientText data-text="About">About</GradientText>
                        
                    </IndexLI >
                    <IndexLI onClick={goWorks}>
                        <GradientText data-text="Works">Works</GradientText>
                        
                    </IndexLI>
                    <IndexLI onClick={goContact}>
                        <GradientText data-text="Contact">Contact</GradientText>
                        
                    </IndexLI>
                </IndexUL>
            </MenuBar>
        </>
    );
};

export default Header;