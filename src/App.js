import React, { useRef } from 'react';

//pages
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Home from './pages/Home/Home';
import Works from './pages/Works/Works'
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import ChatSupport from './components/ChatSupport/ChatSupport';

import {
  BrandMark,
  BrandTransition,
  GlobalStyle,
  Page
} from './style';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');
  const pageRefs = useRef(new Map());
  if (!pageRefs.current.has(location.key)) {
    pageRefs.current.set(location.key, React.createRef());
  }
  const pageRef = pageRefs.current.get(location.key);

  return (
    <>
      <GlobalStyle />
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          nodeRef={pageRef}
          timeout={360}
          classNames="fade"
        >
          <Page ref={pageRef}>
            {!isAdminRoute && (
              <BrandTransition aria-hidden="true">
                <BrandMark />
              </BrandTransition>
            )}
            <Routes location={location}>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/About" element={<About />}></Route>
              <Route path="/Works" element={<Works />}></Route>
              <Route path="/Contact" element={<Contact />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
            </Routes>
          </Page>

        </CSSTransition>
      </TransitionGroup>
      {!isAdminRoute && <ChatSupport />}
    </>
  );
}

const AppWrapper = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </Router>
);

export default AppWrapper;
