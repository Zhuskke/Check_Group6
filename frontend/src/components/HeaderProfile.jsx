import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logout } from '../actions/userActions';
import logo from '../images/logocheck.png';
import '../designs/Navbar.css'
import { getUserPoints } from '../actions/pointsActions';


const HeaderProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPoints = useSelector((state) => state.userPoints);
  const { points } = userPoints;

  useEffect(() => {
    dispatch(getUserPoints());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
            <Nav.Link>{`Points: ${points}`}</Nav.Link>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/ask-a-question">Ask a Question</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderProfile;
