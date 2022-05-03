import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Header, Jumbotron } from './components'
import { Home, About, Research, Profile, Contact, NotFound } from './pages'
import './App.css'
// import { useEffect } from 'react'


const App = () => {



  return (
    <>
      {/* Router for the whole pages. */}
      <BrowserRouter basename='/'>

        <div className='app'>
          <Header />
        </div>
        <Jumbotron />

        {/* Routes to the different pages */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/research' element={<Research />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App