import React from 'react'
import { Page, SubTitle } from '../../components'
import { Button, Form, Row } from 'react-bootstrap'
import { EnvelopeOpen, Github, Linkedin } from 'react-bootstrap-icons';
import './Contact.css'

const Contact = () => {

  return (
    <Page title={"Send me a Message"}>
      <p className="mb-5">
        Feel free to contact me any time. I will get back to you as soon as possible! Thank you so much!
      </p>
      <Form className="w-100">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control className="text-input" type="email" placeholder="name@example.com" readOnly />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your feedback</Form.Label>
          <Form.Control className="text-input" as="textarea" placeholder='under construction' rows={3} readOnly />
        </Form.Group>
      </Form>
      <Button className='mb-5 btn'>Submit</Button>
      <SubTitle>
        Contact informations
      </SubTitle>
      <Row className='info--container'>
        <div className='info mt-5'>
          <EnvelopeOpen style={{ fontSize: "25px" }} />
          <a role="button" href="mailto:hinny@hinnytsang.com" className={`ml-3`}>
            hinny@hinnytsang.com
          </a>
        </div>
        <div className='info' >
          <Github style={{ fontSize: "25px" }} />
          <a role="button" href="https://github.com/hinnytsang" className={`ml-3`}>
            github.com/HinnyTsang
          </a>
        </div>
        <div className='info' >
          <Linkedin style={{ fontSize: "25px" }} />
          <a role="button" href="https://www.linkedin.com/in/hinnytsang/" className={`ml-3`}>
            linkedin.com/in/hinnytsang/
          </a>
        </div>
      </Row>
    </Page>
  )
}

export default Contact