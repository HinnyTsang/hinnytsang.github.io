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
                <Col className='d-flex'>
                    <h1>
                        SPH
                    </h1>
                    <p>
                        Demonstraction of a smooth particle hydrodynamic
                    </p>
                </Col>
                <Col>
                    {
                        showSPH ?
                            <SPH darkMode={darkMode} /> :
                            <div className={`preview--container ${darkMode ? 'black' : 'white'}`} >
                                <Button
                                    variant={darkMode ? 'dark' : 'info'}
                                    onClick={() => setShowSPH(true)}
                                >Play</Button>
                            </div>
                    }
                </Col>
            </Row>
        </Page>
    )
}

export default Demo