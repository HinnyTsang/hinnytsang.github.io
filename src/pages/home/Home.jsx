import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Page } from '../../components';

const Home = ({darkMode}) => {




  return (
    <Page title={<p>MYstical - Universe</p>} darkMode={darkMode}>
      
      <Row>
        <Col>Hi, welcome to my universe.
          This wepage is my personal webpage created with React.js as a learning project.
          I would also upload some interesting things here. Enjoy!
        </Col>
      </Row>
    </Page>
  )
}

export default Home