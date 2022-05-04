import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, Button, Container } from 'react-bootstrap'
import './Header.css'

const Header = ({ darkMode, switchMode }) => {

    let Theme = (darkMode) => !darkMode ? 'light' : 'dark';

    return (

        <Navbar
            variant={Theme(darkMode)} fixed='top'
            bg={Theme(darkMode)} expand="lg"
            className='d-flex'
        >
            <Container className='w-75'>
                <Navbar.Brand as={Link} to="/">MY<span className='very-small'>stical</span>-UNIVSRSE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/research">Research</Nav.Link>
                        <Nav.Link as={Link} to="/demo">Demo</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <div className={
                            `mode-switcher d-flex justify-content-between 
                        align-items-center text-${Theme(!darkMode)}`}>
                            dark
                            <div
                                className={`mode-bg bg-${Theme(!darkMode)} justify-content-${darkMode ? 'start' : 'end'}`}
                                onClick={() => switchMode(prev => !prev)}
                            >
                                <div className={`mode-button bg-${Theme(darkMode)}`} />
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