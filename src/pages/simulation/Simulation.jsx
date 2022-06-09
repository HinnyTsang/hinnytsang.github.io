import React from 'react';
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page, SPH, SubTitle, Slime, Sandbox } from '../../components';
import './Simulation.css';

const Remark = () => <Link to="/simulation#remarks">*</Link>;

const Simulation = () => {
  const [showSPH, setShowSPH] = useState(false);
  const [showSlime, setShowSlime] = useState(false);

  return (
    <Page title="Simulation" id="demo">
      <Row className="w-100">
        <Col className="d-flex description">
          <SubTitle>
            SPH
            <Remark />
          </SubTitle>
          <p className="section-paragraph">
            Demonstraction of a smooth particle hydrodynamics (SPH) simulation in 2D. We are
            simulating a toy star with SPH with a random initial conditions and a constant potential
            field.
            <br></br>
            The code is receferenced by the
            <a
              href="https://philip-mocz.medium.com/create-your-own-smoothed-particle-hydrodynamics-simulation-with-python-76e1cec505f1"
              className="ref-url">
              {' blog '}
            </a>
            written by Philip Mocz in 2020.
            <br />
            <br />
            {showSPH
              ? 'Click Boost to inject energy to the particles!'
              : 'Click Start to start your simulation!'}
          </p>
          <Button
            className="ref-btn"
            href="https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/sph">
            Check my code!
          </Button>
        </Col>
        <Col>
          <Sandbox show={showSPH} setShow={setShowSPH} setShowOther={[setShowSlime]}>
            <SPH />
          </Sandbox>
        </Col>
      </Row>
      <Row className="w-100">
        <Col className="d-flex description">
          <SubTitle>
            Slime Simulation
            <Remark />
          </SubTitle>
          <p className="section-paragraph">
            Demonstraction of a physarum transport networks. Inspired by Sebasian's
            <a href="https://www.youtube.com/watch?v=X-iSQQgOd1A">{' video '}</a> and the algrothm
            is coming from Jones, Jeff's
            <a href="https://uwe-repository.worktribe.com/output/980579" className="ref-url">
              {' paper.'}
            </a>
            <br></br>
            Click on the sandbox to give the slime some food!.
          </p>
          <Button
            className="ref-btn"
            href="https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/slime">
            Check my code!
          </Button>
        </Col>
        <Col>
          <Sandbox show={showSlime} setShow={setShowSlime} setShowOther={[setShowSPH]}>
            <Slime />
          </Sandbox>
        </Col>
      </Row>
      <p id="remarks" style={{ bottom: '0px', paddingTop: '50px' }}>
        Current version is written by pure JavaScript. WebGL version for better performence will be
        update in the future.
      </p>
    </Page>
  );
};

export default Simulation;
