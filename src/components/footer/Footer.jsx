import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  EnvelopeOpen,
  Github,
  Linkedin,
} from 'react-bootstrap-icons';
import './Footer.css';

const Footer = () => {
  return (
    <Container className="w-100 text-center" bsPrefix="footer">
      <Container className="w-75 d-flex flex-row justify-content-between">
        <div style={{ fontSize: '10px', textShadow: 'none' }}>
          space-travel theme from{' '}
          <a href="https://www.npmjs.com/package/space-travel">
            frequin
          </a>
        </div>
        <div>
          <a
            role="button"
            href="mailto:hinny@hinnytsang.com"
            className="ml-3"
          >
            <EnvelopeOpen style={{ fontSize: '20px' }} />
          </a>
          <a
            role="button"
            href="https://github.com/hinnytsang"
            className="ml-3"
          >
            <Github
              style={{ fontSize: '20px' }}
              role="button"
              href="https://github.com/hinnytsang"
            />
          </a>
          <a
            role="button"
            href="https://www.linkedin.com/in/hinnytsang/"
            className="ml-3"
          >
            <Linkedin style={{ fontSize: '20px' }} />
          </a>
        </div>
      </Container>
      <div className="footer--copyright">
        <div style={{ fontSize: '12px', textShadow: 'none' }}>
          © 2022 Copyright:{' '}
          <Link
            to="/about"
            className="footer--link"
            style={{ textShadow: 'none' }}
          >
            Tsang Man Hin
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
