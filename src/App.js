import React from 'react';

//pages
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './pages/Home/Home';

import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import {
  GlobalStyle,
  Page
} from './style';

function App() {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
        >
          <Page>
            <Routes location={location}>
              <Route exact path="/" element={<Home />}></Route>

              <Route path="/About" element={<About />}></Route>
              <Route path="/Contact" element={<Contact />}></Route>
            </Routes>
          </Page>
          
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
