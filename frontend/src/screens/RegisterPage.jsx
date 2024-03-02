import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { register } from '../actions/userActions';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import HeaderRegister from '../components/HeaderRegister';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords are not identical!")
      return;
    }

    // Dispatch register action and wait for it to complete
    await dispatch(register(username, email, password));

    // Check if registration was successful
    const registrationSuccessful = true;

    if (registrationSuccessful) {
      // Redirect to the HomeScreen using useNavigate
      navigate('/home');
    } else {
      // Handle registration failure, if needed
      console.error("Registration failed");
    }

    // Clear input fields after form submission
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

return (
  <><HeaderRegister /> 
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form onSubmit={submitHandler}>
            <MDBInput wrapperClass='mb-4' label='Your Username' size='lg' id='form1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div className='d-flex flex-row justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
            </div>
            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Register</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  );
}

export default RegisterPage;