import React, { useState, useEffect } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import HeaderRegister from "../components/HeaderRegister";
import { Link } from "react-router-dom";
import '../designs/LoginScreen.css';

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (userInfo) {
      // Redirect to the home screen
      if (userInfo.isAdmin) {
        navigate("/admin/users");
      } else {
        navigate("/home");
      }
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    await dispatch(login(username, password));
  
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <HeaderRegister />
      <section id="loginsection1">
        <strong><h1 className="title" id="loginslogan">Where questions meet their answers</h1></strong>
        <strong><h3 className="title-2" id="loginslogan2">Welcome to Check!</h3></strong>
      </section>
      
      <section id="loginsection2">
        <MDBCard className="m-5" id="login-container">
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5" id="login-text">Account Log In</h2>
            <Form onSubmit={submitHandler}>  
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                size="lg"
                id="form"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                size="lg"
                id="form"
                type="password"
                placeholder="password"
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
              <Link to="/register" className="nav-link" id="login-register">Not yet registered?</Link>
            </Form>
          </MDBCardBody>
        </MDBCard>
      </section>
    </>
  );
}

export default LoginScreen;
