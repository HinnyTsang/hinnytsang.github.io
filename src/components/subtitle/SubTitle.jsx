import React from 'react';
import './SubTitle.css';

const SubTitle = ({ children }) => {
  return (
    <div className="subtitle--container">
      <div className="subtitle">{children}</div>
    </div>
  );
};

export default SubTitle;
