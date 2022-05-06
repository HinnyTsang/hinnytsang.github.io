import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TelephoneInbound, EnvelopeOpen, Github, Linkedin } from 'react-bootstrap-icons';
import './Footer.css'

const Footer = ({ darkMode }) => {

    let colorTheme = (dark) => dark ? 'light' : 'dark';
    let backgroundTheme = (dark) => !dark ? 'light' : 'dark';

    return (
        <Container
            className={`w-100 text-center text-${colorTheme(darkMode)} bg-${backgroundTheme(darkMode)}`}
            bsPrefix='footer'
        >
            <div className='footer--info'>

                <a role="button" href="mailto:hinnytsang@link.cuhk.edu.hk" className={`ml-3 text-${darkMode ? 'light' : 'dark'}`}>
                    <EnvelopeOpen style={{ fontSize: "30px" }} />
                </a>
                <a role="button" href="https://github.com/hinnytsang" className={`ml-3 text-${darkMode ? 'light' : 'dark'}`}>
                    <Github style={{ fontSize: "30px" }} role="button" href="https://github.com/hinnytsang" />
                </a>
                <a role="button" href="https://www.linkedin.com/in/hinnytsang/" className={`ml-3 text-${darkMode ? 'light' : 'dark'}`}>
                    <Linkedin style={{ fontSize: "30px" }} />
                </a>
            </div>
            <div>
                © 2022 Copyright: <Link
                    to="/about"
                    className={`footer--link text-${colorTheme(darkMode)}`}>
                    Tsang Man Hin</Link>
            </div>
        </Container >
    )
}

export default Footer