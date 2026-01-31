import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollingText from './components/ScrollingText';
import Hero from './components/Hero';
import Quotes from './components/Quotes';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './components/Explore';
import About from './pages/About';
import Work from './pages/Work';
import ProjectsPage from './pages/ProjectsPage';

// Create a Home component to keep App.js clean
const Home = () => (
  <>
    <Hero />
    <Explore />
    {/* Removed individual sections as they are now explorable pages, except Quotes/Contact if verified? 
        The request implied splitting them. 
        "What would you like to explore? ... clicking on them take the user to their respective separat page"
        
        However, the original tasks said "Quotes Section Redesign" was done. 
        Let's keep Quotes and Contact on Home as per standard portfolio, 
        or move them? Usually Home has everything. 
        Let's keep Quotes and Contact on Home for now as footer/engagement elements.
    */}
    <Quotes />
    <Contact />
    <Footer />
  </>
);



function App() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <CustomCursor />
        {showLoading && <ScrollingText onComplete={() => setShowLoading(false)} />}
        {!showLoading && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
