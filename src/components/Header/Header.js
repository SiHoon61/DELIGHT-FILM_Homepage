import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
    MenuBar,
    IndexLI,
    IndexUL,
    GradientText,
    WhiteMenu,
} from './style';

//modal
import ModalPortal from '../../modal/ModalPortal';
import MenuModal from './MenuModal';

const Header = () => {
    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                         <GradientText data-text="Works"></GradientText>
                     </IndexLI>
                    <IndexLI onClick={goContact}>
                        <GradientText data-text="Contact">Contact</GradientText>
                    </IndexLI>
                </IndexUL>
            </MenuBar>
            <WhiteMenu onClick={openModal}></WhiteMenu>
            <ModalPortal>
                <MenuModal isOpen={isModalOpen} onClose={closeModal} />
            </ModalPortal>
        </>
    );
};

export default Header;
