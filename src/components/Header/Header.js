import React from 'react';

import {
    Container,
    MenuBar,
    IndexLI,
    IndexUL,
} from './style';
const Header = () => {
    return (
        <>
            <MenuBar>
                <IndexUL>
                    <IndexLI>
                        Home
                    </IndexLI>
                    <IndexLI>
                        About
                    </IndexLI>
                    <IndexLI>
                        Works
                    </IndexLI>
                    <IndexLI>
                        Contact
                    </IndexLI>
                </IndexUL>
            </MenuBar>
        </>
    );
};

export default Header;