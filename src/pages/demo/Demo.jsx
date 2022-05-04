import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Page, SPH } from '../../components'

const Demo = ({ darkMode }) => {
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
                    <SPH darkMode={darkMode} />
                </Col>
            </Row>
        </Page>
    )
}

export default Demo