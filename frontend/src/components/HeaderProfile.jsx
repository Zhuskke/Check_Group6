import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../actions/userActions'; // Import logout action
import logo from '../images/logocheck.png';

const HeaderProfile = () => {
  const dispatch = useDispatch(); // Get dispatch function

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <Navbar expand="lg" id='navbar' collapseOnSelect className="p-3">
      <Container id='navbarbox'>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50"
            className='d-inline-block align-top'
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link href="#ask-a-question">Ask a Question</Nav.Link>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderProfile;
