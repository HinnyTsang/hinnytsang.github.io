import React from 'react'
import { Page, SubTitle } from '../../components'
import { Button, Form } from 'react-bootstrap'
import { TelephoneInbound, EnvelopeOpen, Github, Linkedin } from 'react-bootstrap-icons';
import './Contact.css'

const Contact = ({ darkMode }) => {

  return (
    <Page title={"Send me a Message"} darkMode={darkMode} >
      <p className="mb-5">
        Feel free to contact me any time. I will get back to you as soon as possible! Thank you so much!
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" readOnly />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your feedback</Form.Label>
          <Form.Control as="textarea" placeholder='under construction' rows={3} readOnly />
        </Form.Group>

      </Form>
      <Button className='mb-5'>Submit</Button>
      <SubTitle>
        Contact informations
      </SubTitle>
      {/* <div  className='info'>
        <TelephoneInbound/><p href="mailto:hinnytsang@link.cuhk.edu.hk">(852) 68425770</p>
      </div> */}
      <div className='info mt-5'>
        <EnvelopeOpen style={{ fontSize: "30px" }} />
        <a role="button" href="mailto:hinnytsang@link.cuhk.edu.hk"  className={`ml-3 text-${darkMode? 'light': 'dark'}`}>
          hinnytsang@link.cuhk.edu.hk
        </a>
      </div>
      <div className='info' >
        <Github style={{ fontSize: "30px" }} />
        <a role="button" href="https://github.com/hinnytsang"  className={`ml-3 text-${darkMode? 'light': 'dark'}`}>
          github.com/HinnyTsang
        </a>
      </div>
      <div className='info' >
        <Linkedin style={{ fontSize: "30px" }} />
        <a role="button" href="https://www.linkedin.com/in/hinnytsang/" className={`ml-3 text-${darkMode? 'light': 'dark'}`}>
          linkedin.com/in/hinnytsang/
        </a>
      </div>
    </Page>
  )
}

export default Contact