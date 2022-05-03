import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = ({ darkMode }) => {

    let colorTheme = (dark) => dark ? 'light' : 'dark';
    let backgroundTheme = (dark) => !dark ? 'light' : 'dark';

    return (
        <Container
            className={`w-100 text-center py-2 text-${colorTheme(darkMode)} bg-${backgroundTheme(darkMode)}`}
            bsPrefix='footer'
        >
            © 2022 Copyright: <Link
                to="/about"
                className={`footer--link text-${colorTheme(darkMode)}`}>
                    Tsang Man Hin</Link>
        </Container >
        // <Navbar
        //     variant='dark' fixed='bottom'
        //     bg='dark' expand="lg"
        //     className='d-flex'>
        //         <NavItem>
        //             asdad
        //         </NavItem>
        // </Navbar>
    )
}

export default Footer