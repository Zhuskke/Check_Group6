import React, { useState, useEffect } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBContainer } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if login was successful before redirecting
    if (!loading && !error && userInfo) {
      // Redirect to the home screen
      navigate("/home");
    }
  }, [loading, error, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch login action with username and password
    dispatch(login(username, password));

    // Clear input fields after form submission
    setUsername('');
    setPassword('');
  };

  return (
    <MDBContainer fluid id='bgimg' className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://assets.teenvogue.com/photos/5e6bffbbdee1770008c6d9bd/16:9/w_2560%2Cc_limit/GettyImages-577674005.jpg)'}}>
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Account Log In</h2>
          <Form onSubmit={submitHandler}>  
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              size="lg"
              id="form"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="Keep me logged in."
              />
            </div>
            <MDBBtn id="loginbutton" className="mb-4 w-100" size="lg" type="submit">
              Log In
            </MDBBtn>
          </Form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginScreen;

