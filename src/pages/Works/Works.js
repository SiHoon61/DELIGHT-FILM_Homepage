import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import CategoryAccordion from '../../components/CategoryAccordion/CategoryAccordion';
import VideoBox from '../../components/VideoBox/VideoBox';
import Shorts from '../../components/Shorts/Shorts';
import Photo from '../../components/Photo/Photo';
import Bottom from '../../components/Bottom/Bottom';
import workList from '../../workList.json';
import {
    createShortsCatalog,
    createVideoCatalog,
    SHORTS_CATEGORIES,
    VIDEO_CATEGORIES,
} from '../../data/workSections';

import {
    HeaderContainer,
    BigText,
    MenuContainer,
    AnimatedDefaultContainer,
    OnlyAnimatedContainer,
} from './style';

const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');
    const [selectedCategories, setSelectedCategories] = useState({
        Video: 'All',
        Shorts: 'All',
    });
    const refs = {
        Video: useRef(null),
        Shorts: useRef(null),
        Photo: useRef(null),
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'Video':
                return (
                    <CSSTransition
                        key="video"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Video}
                    >
                        <AnimatedDefaultContainer ref={refs.Video}>
                            <VideoBox selectedCategory={selectedCategories.Video} />
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Shorts':
                return (
                    <CSSTransition
                        key="shorts"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Shorts}
                    >
                        <AnimatedDefaultContainer ref={refs.Shorts}>
                            <Shorts selectedCategory={selectedCategories.Shorts} />
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Photo':
                return (
                    <CSSTransition
                        key="photo"
                        timeout={300}
                        classNames="fade"
                        nodeRef={refs.Photo}
                    >
                        <OnlyAnimatedContainer ref={refs.Photo}>
                            <Photo />
                        </OnlyAnimatedContainer>
                    </CSSTransition>
                );
            default:
                return null;
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const sectionItems = {
        Video: createVideoCatalog(
            workList?.videoJson || [],
            workList?.broadcastJson || []
        ),
        Shorts: createShortsCatalog(
            workList?.videoJson || [],
            workList?.broadcastJson || []
        ),
    };
    const categoryDefinitions = {
        Video: VIDEO_CATEGORIES,
        Shorts: SHORTS_CATEGORIES,
    };
    const currentItems = sectionItems[selectedMenu] || [];
    const currentCategories = (categoryDefinitions[selectedMenu] || []).filter(
        (category) =>
            category === 'All' || currentItems.some((item) => item.category === category)
    );

    const handleCategorySelect = (category) => {
        setSelectedCategories((current) => ({
            ...current,
            [selectedMenu]: category,
        }));
    };

    return (
        <>
            <HeaderContainer>
                <BigText>
                    Works
                </BigText>
                <Header />
            </HeaderContainer>
            <div>
                <MenuContainer
                    $mediaMode={selectedMenu !== 'Photo'}
                    onClick={scrollToTop}
                >
                    <NavBar
                        active={selectedMenu}
                        onMenuClick={handleMenuClick}
                    />
                    {selectedMenu !== 'Photo' && (
                        <CategoryAccordion
                            categories={currentCategories}
                            selected={selectedCategories[selectedMenu]}
                            onSelect={handleCategorySelect}
                            items={currentItems}
                        />
                    )}
                </MenuContainer>
                <TransitionGroup>
                    {renderComponent()}
                </TransitionGroup>
            </div>
            <Bottom />
        </>
    );
};

export default Works;
