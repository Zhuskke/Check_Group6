import React from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import logo from '../images/logocheck.png';

const Header = () => {
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
            <Form inline onSubmit={handleSearch} className="d-flex align-items-center justify-content-center">
              <FormControl type="search" placeholder="Search" className="mr-sm-2 mx-auto" id='searchbar'/>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;