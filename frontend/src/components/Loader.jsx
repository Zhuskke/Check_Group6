import React from 'react'
import { Spinner } from 'react-bootstrap'
import '../designs/Loader.css'

function Loader() {
  return (
    <Spinner
        animation="border"
        role="status"
        style={{width: '85px', height: '85px', marginLeft: '53rem', padding: '5rem', display: 'block'}}
        id='Loader'
    >
        <span className="sr-only"></span>
    </Spinner>
  )
}

export default Loader