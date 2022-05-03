import React from 'react'
import { Container } from 'react-bootstrap'
import './Jumbotron.css'

const Jumbotron = () => {
    
    const location = 'Hong Kong';

    return (
        <div className='jumbotron jumbotron-fluid'>
            <Container>
                <p>Hi, I am</p>
                <h1>Hinny Tsang</h1>
                <p>Welcome my {location} friend</p>
            </Container>
        </div>
    )
}

export default Jumbotron