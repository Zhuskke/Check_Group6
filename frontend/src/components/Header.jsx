import React from 'react'
import {Navbar, Container, Nav, Form, FormControl} from 'react-bootstrap'

const Header = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    alert('Search functionality will be implemented here!');
  };
  return (
    <Navbar expand="lg" bg='white'collapseOnSelect className="p-3">
      <Container>
        <Navbar.Brand href="#home">Check</Navbar.Brand>
        <Form inline onSubmit={handleSearch}>
          <div className="search bar container">
            <FormControl type="search" placeholder="Search" className="mr-sm-2" />
          </div>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#login">Login |</Nav.Link>
            <Nav.Link href="#join">Join now |</Nav.Link>
            <Nav.Link href="#askaquestion">Ask a Question</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header