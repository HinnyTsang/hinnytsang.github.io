import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <Container
            className="footer-copyright text-center py-3"
            bg='light'
            variant='light'
        >
            © 2022 Copyright:
            <Link to="/about" className='link'>Tsang Man Hin</Link>
        </Container>
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