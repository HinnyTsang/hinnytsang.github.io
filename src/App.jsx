import React from 'react';
import { HashRouter, Route, Routes, Nevigate } from 'react-router-dom';
import { Footer, Header, Jumbotron } from './components';
import { Home, About, Research, Profile, Contact, Simulation, NotFound } from './pages';
import './App.css';

const App = () => {
  return (
    <>
      {/* Router for the whole pages. */}
      <HashRouter basename="/">
        <div className="app">
          <Header />
        </div>
        <Jumbotron></Jumbotron>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo">
            <Nevigate push to={"/density_isosurface.html"} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
