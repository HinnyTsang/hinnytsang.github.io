import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useTheme } from '../themeProvider/ThemeProvider'
import SpaceTravel from 'space-travel'
import './Header.css'
import { useEffect } from 'react'
import { useState } from 'react'

const Header = () => {

    // for theme setting
    const { theme, setTheme } = useTheme();

    // theme modification
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // speed of the stars
    const [speed, setSpeed] = useState(theme === 'light'? -0.02: 0.2);

    // background space travel theme
    let scene = new SpaceTravel({
        canvas: document.getElementById("space-travel"),
        backgroundColor: theme === "light" ? '#B2FFFF' : '#01001F',
        throttle: speed,
        starfield: {count: 50}
    });

    useEffect(() => {
        setSpeed(theme === 'light'? 0.2: -0.02);
        scene.start();
    }, [theme])

    // update for the background
    window.addEventListener("resize", () => {
        scene.resize();
    });


    return (
        
        <Navbar expand="lg" variant={theme}>
            <Container className='w-75'>
                <Navbar.Brand as={Link} to="/">
                    MY<span className='very-small'>stical</span>-UNIVSRSE
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/simulation">Simulation</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <div className={
                            `mode-switcher d-flex justify-content-between align-items-center`}>
                            dark
                            <div
                                className={`mode-bg justify-content-${theme === 'light' ? 'end' : 'start'}`}
                                onClick={toggleTheme}>
                                <div className={`mode-button`} />
                            </div>
                            light
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header