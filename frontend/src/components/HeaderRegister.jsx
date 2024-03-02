import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import logo from '../images/logocheck.png';

const HeaderRegister = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    alert('Search functionality will be implemented here!');
  };

  return (
    <Navbar expand="lg" id='navbar' collapseOnSelect className="p-3">
      <Container id='navbarbox'>
        <Navbar.Brand href="/">
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
            {/* Add an empty Nav.Link to push the search bar to the center */}
            <Nav.Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    );
};

export default HeaderRegister;