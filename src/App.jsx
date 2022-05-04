import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Footer, Header, Jumbotron } from './components'
import { Home, About, Research, Profile, Contact, Demo, NotFound } from './pages'
import './App.css'
import { useState } from 'react'
// import { useEffect } from 'react'


const App = () => {
  
  const [darkMode, setDarkMode] = useState(!false);



  return (
    <>
      {/* Router for the whole pages. */}
      <HashRouter basename='/'>

        <div className='app'>
          <Header darkMode={darkMode} switchMode={setDarkMode}/>
        </div>
        <Jumbotron />

        {/* Routes to the different pages */}
        <Routes>
          <Route path='/' element={<Home darkMode={darkMode} />} />
          <Route path='/about' element={<About darkMode={darkMode} />} />
          <Route path='/research' element={<Research darkMode={darkMode} />} />
          <Route path='/demo' element={<Demo darkMode={darkMode} />} />
          <Route path='/profile' element={<Profile darkMode={darkMode} />} />
          <Route path='/contact' element={<Contact darkMode={darkMode} />} />
          <Route path='*' element={<NotFound darkMode={darkMode} />} />
        </Routes>
        <Footer  darkMode={darkMode}/>
      </HashRouter>
    </>
  )
}

export default App