import React from 'react';
import { useNavigate } from "react-router-dom";

import {
    MenuBar,
    IndexLI,
    IndexUL,
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
                        Home
                    </IndexLI>
                    <IndexLI onClick={goAbout}>
                        About
                    </IndexLI >
                    <IndexLI onClick={goWorks}>
                        Works
                    </IndexLI>
                    <IndexLI onClick={goContact}>
                        Contact
                    </IndexLI>
                </IndexUL>
            </MenuBar>
        </>
    );
};

export default Header;