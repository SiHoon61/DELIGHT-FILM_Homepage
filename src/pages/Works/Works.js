import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import CategoryAccordion from '../../components/CategoryAccordion/CategoryAccordion';
import VideoBox from '../../components/VideoBox/VideoBox';
import Shorts from '../../components/Shorts/Shorts';
import Photo from '../../components/Photo/Photo';
import Bottom from '../../components/Bottom/Bottom';
import WorkGallerySkeleton from '../../components/WorkGallerySkeleton/WorkGallerySkeleton';
import {
    createFallbackWorksConfig,
    selectArrangedWorks,
} from '../../data/worksConfig';

import {
    HeaderContainer,
    BigText,
    MenuContainer,
    AnimatedDefaultContainer,
    OnlyAnimatedContainer,
} from './style';

const FALLBACK_WORKS_CONFIG = createFallbackWorksConfig();

const Works = () => {
    const [selectedMenu, setSelectedMenu] = useState('Video');
    const [selectedCategories, setSelectedCategories] = useState({
        Video: 'all',
        Shorts: 'all',
    });
    const [worksConfig, setWorksConfig] = useState(null);
    const [isWorksLoading, setIsWorksLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia
            ? window.matchMedia('(max-width: 700px)').matches
            : false
    );
    const refs = {
        Video: useRef(null),
        Shorts: useRef(null),
        Photo: useRef(null),
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        const controller = new AbortController();

        const loadWorksConfig = async () => {
            try {
                const response = await fetch('/api/works/config', {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(`Works API ${response.status}`);

                const config = await response.json();
                if (!config?.contents || !config?.layouts || !config?.categories) {
                    throw new Error('Invalid Works configuration');
                }
                setWorksConfig(config);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setWorksConfig(FALLBACK_WORKS_CONFIG);
                }
            } finally {
                if (!controller.signal.aborted) setIsWorksLoading(false);
            }
        };

        loadWorksConfig();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return undefined;

        const mediaQuery = window.matchMedia('(max-width: 700px)');
        const updateDevice = (event) => setIsMobile(event.matches);
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener?.('change', updateDevice);

        return () => mediaQuery.removeEventListener?.('change', updateDevice);
    }, []);

    const selectedSection = selectedMenu.toLowerCase();
    const selectedCategory = selectedCategories[selectedMenu] || 'all';
    const arrangedItems = useMemo(() => {
        if (selectedMenu === 'Photo' || !worksConfig) return [];
        return selectArrangedWorks({
            config: worksConfig,
            section: selectedSection,
            categoryId: selectedCategory,
            isMobile,
        });
    }, [isMobile, selectedCategory, selectedMenu, selectedSection, worksConfig]);

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'Video':
                return (
                    <CSSTransition
                        key="video"
                        timeout={200}
                        classNames="fade"
                        nodeRef={refs.Video}
                    >
                        <AnimatedDefaultContainer ref={refs.Video}>
                            {isWorksLoading
                                ? <WorkGallerySkeleton section="video" />
                                : <VideoBox items={arrangedItems} />}
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Shorts':
                return (
                    <CSSTransition
                        key="shorts"
                        timeout={200}
                        classNames="fade"
                        nodeRef={refs.Shorts}
                    >
                        <AnimatedDefaultContainer ref={refs.Shorts}>
                            {isWorksLoading
                                ? <WorkGallerySkeleton section="shorts" />
                                : <Shorts items={arrangedItems} />}
                        </AnimatedDefaultContainer>
                    </CSSTransition>
                );
            case 'Photo':
                return (
                    <CSSTransition
                        key="photo"
                        timeout={200}
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

    const displayConfig = worksConfig || FALLBACK_WORKS_CONFIG;
    const currentItems = displayConfig.contents.filter(
        (item) => item.section === selectedSection
    );
    const currentCategories = displayConfig.categories[selectedSection] || [];

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
                            selected={selectedCategory}
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
