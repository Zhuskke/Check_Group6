import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logocheck.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const HeaderUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/');
    };
  const handleSearch = (event) => {
    event.preventDefault();
    alert('Search functionality will be implemented here!');
  };

  return (
    <Navbar expand="lg" id='navbar' collapseOnSelect className="p-3">
      <Container id='navbarbox'>
        <Navbar.Brand as={Link} to="/home">
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
            <Nav.Link></Nav.Link>
            <Form inline onSubmit={handleSearch} className="d-flex align-items-center justify-content-center">
              <FormControl type="search" placeholder="Search" className="mr-sm-2 mx-auto" id='searchbar'/>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/ask-a-question">Ask a Question</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderUser;
