import React from 'react';

//pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Works from './pages/Works/Works';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Works" element={<Works />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
