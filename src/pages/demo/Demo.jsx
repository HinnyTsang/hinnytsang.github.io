import React from 'react'
import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Page, SPH } from '../../components'
import './Demo.css'

const Demo = ({ darkMode }) => {

    const [showSPH, setShowSPH] = useState(false);

    return (
        <Page title="Demo" darkMode={darkMode}>
            <Row>
                <Col className='d-flex description'>
                    <p className='section-title'>
                        SPH
                    </p>
                    <p className='section-paragraph'>
                        Demonstraction of a smooth particle hydrodynamics simulation in 2D.
                        We are simulating a star with SPH with a random initial conditions and a constant potential field.
                        <br></br>
                        The code is receferenced by the
                        <a
                            href='shorturl.at/vLRT1'
                            className='ref-url'
                        >
                            {' blog '}
                        </a>
                        written by Philip Mocz in 2020.
                    </p>
                    <Button
                        variant={darkMode ? 'secondary' : 'info'}
                        className='ref-btn'
                        href='https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/sph'
                    >
                        Check my code!
                    </Button>
                </Col>
                <Col>
                    {
                        showSPH ?
                            <SPH darkMode={darkMode} /> :
                            <div className={`preview--container ${darkMode ? 'black' : 'white'}`} >
                                <Button
                                    variant={darkMode ? 'dark' : 'info'}
                                    onClick={() => setShowSPH(true)}
                                >
                                    Play
                                </Button>
                            </div>
                    }
                </Col>
            </Row>
        </Page>
    )
}

export default Demo