import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Page } from '../../components';
import './About.css';

const About = ({ darkMode }) => {
  return (
    <Page className="about" title="Tsang Man Hin" darkMode={darkMode}>
      <Row>
        <Col>
          <p>
            I am an MPhil student at The Chinese University of Hong Kong. Under the supervision of
            Prof. Li Hua-bai, I am now working on the numerical study of star formation.
            {/* I optained my Bachelor's Degree in Physics
            at The Hong Kong University of Science and Technology together
            with "Astronomy and Cosmology" and "Information Technology" Minors. */}
          </p>
        </Col>
        <Col>
          <Image src={process.env.PUBLIC_URL + '/images/mcnugget.jpg'} className="w-75" />
        </Col>
      </Row>
    </Page>
  );
};

export default About;
