import React from 'react';

//pages
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from './pages/Home/Home';
import Works from './pages/Works/Works'
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import ChatSupport from './components/ChatSupport/ChatSupport';

import { GlobalStyle } from './style';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <>
      <GlobalStyle />
      <Routes location={location}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Works" element={<Works />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
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
