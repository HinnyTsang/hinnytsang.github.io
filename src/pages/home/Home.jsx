import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page, SubTitle } from '../../components';
import './Home.css';

const Home = () => {
  return (
    <Page title={<p>MYstical - Universe</p>}>
      <Row className="description">
        <Col>
          Hi, welcome to my universe. This wepage is my personal webpage created with React.js as a
          learning project. I would also upload some interesting things here. Enjoy!
        </Col>
      </Row>

      <SubTitle>Whats New?</SubTitle>
      <CardGroup className="card-group mt-5">
        <Card as={Link} to="../simulation#sph" className="card">
          <Card.Img variant="top" src="/images/sph-icon.png" alt="sph" className="card--image" />
          <Card.Body>
            <Card.Title>Real time star simulation</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <Card as={Link} to="../simulation#slime" className="card">
          <Card.Img variant="top" src="/images/slime-icon.png" alt="sph" className="card--image" />
          <Card.Body>
            <Card.Title>Real time slime mold simulation</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Page>
  );
};

export default Home;
