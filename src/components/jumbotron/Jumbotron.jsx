import React from 'react';
import { Container } from 'react-bootstrap';
import './Jumbotron.css';

const Jumbotron = () => {
  // Get API to generate the location of the visitor.
  // get location of the visitor
  // function to get json from the API.
  const getJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  };
  // update the hello sentence by the elemenet id.
  getJSON(
    process.env.REACT_APP_ABSTRACT_API +
      process.env.REACT_APP_ABSTRACT_API_KEY
  )
    .then((data) => {
      document.getElementById('hello').innerText =
        'Welcome my ' + data.country + ' friends';
    })
    .catch(() => {
      document.getElementById('hello').innerText =
        'Welcome my friends';
    });

  return (
    <div className="jumbotron jumbotron-fluid">
      <Container bsPrefix="jumbotron--container">
        <div className="jumbotron--title--container">
          <p>Hi, I am</p>
          <h1>Hinny Tsang</h1>
          <p id="hello">Welcome my friends</p>
        </div>
      </Container>
    </div>
  );
};

export default Jumbotron;
