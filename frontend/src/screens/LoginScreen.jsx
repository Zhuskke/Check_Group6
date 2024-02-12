import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function LoginScreen() {
  return (
    <MDBContainer fluid id='bgimg' className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://assets.teenvogue.com/photos/5e6bffbbdee1770008c6d9bd/16:9/w_2560%2Cc_limit/GettyImages-577674005.jpg)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard id='cardcolor' className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Account Log In</h2>
          <MDBInput wrapperClass='mb-4' label='Username' size='lg' id='form' type='text' placeholder='spongebob'/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form' type='password' placeholder='squarepants'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Keep me logged in.' />
          </div>
          <MDBBtn id='loginbutton' className='mb-4 w-100' size='lg'>Log In</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
} 

export default LoginScreen;
