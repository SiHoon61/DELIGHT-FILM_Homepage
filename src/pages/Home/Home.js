import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
import {
  HeaderContainer,
  Logo,
  LogoFont,
  Video,
  VideoContainer,
} from './style';

import mainVideo from '../../assets/Home/mainVideo.mp4';
import Photo from '../../components/Photo/Photo';

function useWindowSize() {

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}


const Home = () => {
  const size = useWindowSize();

  return (
    <>
      <HeaderContainer>
        <Logo>
          <LogoFont>D E L I G H T &nbsp; F I L M</LogoFont>
        </Logo>
        <Header />
      </HeaderContainer>
      <VideoContainer $height={size.height}>
        <Video muted autoPlay loop playsInline>
          <source src={mainVideo} type="video/mp4" />
        </Video>
      </VideoContainer>
      <Bottom />
    </>
  );
};

export default Home;