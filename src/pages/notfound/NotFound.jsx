import React from 'react'
import { Page } from '../../components'

const NotFound = ({darkMode}) => {
  return (
    <Page title="Page Not Found" darkMode={darkMode}>
      <p style={{textAlign: 'center', fontSize:20}}>{window.location.href} doesn't exist.</p>
    </Page>
  )
}

export default NotFound