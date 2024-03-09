import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner
        animation="border"
        role="status"
        style={{width: '85px', height: '85px', margin: 'auto', display: 'block'}}
    >
        <span className="sr-only"></span>
    </Spinner>
  )
}

export default Loader