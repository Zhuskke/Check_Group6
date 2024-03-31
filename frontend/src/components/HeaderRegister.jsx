import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logocheck.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import '../designs/Navbar.css'

function Header({ scrollToSpecificHeight }) {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" id='navbar' collapseOnSelect className={isScrolled ? 'navbar circular' : 'navbar p-3'}>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50"
            className='d-inline-block align-top'
            alt="Logo"
            id='logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add an empty Nav.Link to push the search bar to the center */}
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="login" role='button' id='headerbutton'>Login </Nav.Link>
            <div className='headerline'></div>
            <Nav.Link href="register" role='button' id='headerbutton'>Register</Nav.Link>
            <div className='headerline'></div>
            <Nav.Link href="/" role='button' id='headerbuttonq'>Go Back</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
