import React from 'react'
import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Page, SPH, SubTitle, Slime } from '../../components'
import './Simulation.css'


const Simulation = () => {

    const [showSPH, setShowSPH] = useState(false);
    const [showSlime, setShowSlime] = useState(false);

    return (
        <Page title="Simulation" id="demo">
            <Row className='w-100'>
                <Col className='d-flex description'>
                    <SubTitle>SPH</SubTitle>
                    <p className='section-paragraph'>
                        Demonstraction of a smooth particle hydrodynamics (SPH) simulation in 2D.
                        We are simulating a toy star with SPH with a random initial conditions and a constant potential field.
                        <br></br>
                        The code is receferenced by the
                        <a
                            href='https://philip-mocz.medium.com/create-your-own-smoothed-particle-hydrodynamics-simulation-with-python-76e1cec505f1'
                            className='ref-url'
                        >
                            {' blog '}
                        </a>
                        written by Philip Mocz in 2020. <br />
                        <br />
                        {showSPH ? 'Click Boost to inject energy to the particles!' :
                            'Click Start to start your simulation!'}
                    </p>
                    <Button
                        className='ref-btn'
                        href='https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/sph'
                    >
                        Check my code!
                    </Button>
                </Col>
                <Col>
                    {
                        showSPH ?
                            <SPH /> :
                            <div className='preview--container' >
                                <Button onClick={() => {setShowSPH(true); setShowSlime(false)}} >
                                    Start
                                </Button>
                            </div>
                    }
                </Col>
            </Row>
            <Row className='w-100'>
                <Col className='d-flex description'>
                    <SubTitle>Slime Simulation</SubTitle>
                    <p className='section-paragraph'>
                        Demonstraction of a physarum transport networks. The code is still under construction.
                        <br></br>
                        Algrothm is coming from Jones, Jeff's
                        <a
                            href='https://uwe-repository.worktribe.com/output/980579'
                            className='ref-url'
                        >
                            {' paper.'}
                        </a>
                    </p>
                    <Button
                        className='ref-btn'
                        href='https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/slime'
                    >
                        Check my code!
                    </Button>

                </Col>
                <Col>

                    {
                        showSlime ?
                            <Slime /> :
                            <div className='preview--container' >
                                <Button onClick={() => {setShowSlime(true); setShowSPH(false)}} >
                                    Start
                                </Button>
                            </div>
                    }
                </Col>

            </Row>
        </Page>
    )
}

export default Simulation