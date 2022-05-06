import React from 'react'
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page , SubTitle } from '../../components';
import './Home.css'

const Home = ({ darkMode }) => {




  return (
    <Page title={<p>MYstical - Universe</p>} darkMode={darkMode}>
      
      <Row className='description'>
        <Col>Hi, welcome to my universe.
          This wepage is my personal webpage created with React.js as a learning project.
          I would also upload some interesting things here. Enjoy!
        </Col>
      </Row>
      
      <SubTitle>Whats New?</SubTitle>
      <CardGroup>
        <Card
          as={Link} to='../demo/#demo'
          className="card"
          bg={darkMode ? 'secondary' : 'light'}
        >
          <Card.Img variant="top"
            src="/images/sph-icon.png" alt="sph" className='card--image' />
          <Card.Body>
            <Card.Title>
              Real time star simulation
            </Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Page>
  )
}

export default Home