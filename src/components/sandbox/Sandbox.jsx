import React from 'react';
import { Button } from 'react-bootstrap';
import './Sandbox.css';

const Sandbox = ({ children, show, setShow, setShowOther }) => {
  return (
    <div className="sandbox--container">
      <div className="sandbox">
        {// determine if showing the play.
        show ? (
          children
        ) : (
          <div className="preview--container">
            <Button
              onClick={() => {
                setShow(true);
                setShowOther.forEach(item => item(false));
              }}>
              Start
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;
