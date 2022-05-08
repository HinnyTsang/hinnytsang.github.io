import React from 'react'
import './Sandbox.css'

const Sandbox = ({ children }) => {
  return (
    <div className='sandbox--container'>
      <div className='sandbox'>
        {children}
      </div>
    </div>
  )
}

export default Sandbox