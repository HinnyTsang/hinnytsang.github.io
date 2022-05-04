import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './Jumbotron.css'

const Jumbotron = () => {

    // get location of the visitor
    let apiKey = '5f3960b5491a49b7b612a8295fd6f988';
    let abstract_api = 'https://ipgeolocation.abstractapi.com/v1/?api_key=';

    // function to get json from the API.
    const getJSON = async url => {

        const response = await fetch(url);

        if (!response.ok)
            throw new Error(response.statusText);

        return response.json();
    }

    // update the hello sentence by the elemenet id.
    getJSON(abstract_api + apiKey)
    .then(data => {
        document.getElementById("hello")
        .innerText = "Welcome my " + data.country + " friends";
    })

    return (
        <div className='jumbotron jumbotron-fluid'>
            <Container bsPrefix='jumbotron--container'>
                <p>Hi, I am</p>
                <h1>Hinny Tsang</h1>
                <p id="hello"></p>
            </Container>
        </div>
    )
}

export default Jumbotron