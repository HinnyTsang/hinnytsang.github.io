import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TelephoneInbound, EnvelopeOpen, Github, Linkedin } from 'react-bootstrap-icons';
import './Footer.css'

const Footer = () => {


    return (
        <Container
            className='w-100 text-center'
            bsPrefix='footer'
        >
            <div className='footer--info'>
                <div style={{ fontSize: '10px', textShadow: 'none', }}>
                    space-travel theme from <a href='https://www.npmjs.com/package/space-travel'>frequin</a>
                </div>
                <div>
                    <a role="button" href="mailto:hinnytsang@link.cuhk.edu.hk" className='ml-3'>
                        <EnvelopeOpen style={{ fontSize: "20px" }} />
                    </a>
                    <a role="button" href="https://github.com/hinnytsang" className='ml-3'>
                        <Github style={{ fontSize: "20px" }} role="button" href="https://github.com/hinnytsang" />
                    </a>
                    <a role="button" href="https://www.linkedin.com/in/hinnytsang/" className='ml-3'>
                        <Linkedin style={{ fontSize: "20px" }} />
                    </a>
                </div>
            </div>
            <div className='footer--copyright'>
                <div style={{ fontSize: '12px', textShadow: 'none' }}>
                    © 2022 Copyright: <Link
                        to="/about"
                        className='footer--link'
                        style={{ textShadow: 'none' }}>
                        Tsang Man Hin</Link>
                </div>

            </div>

        </Container >
    )
}

export default Footer