import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logocheck.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { getUserPoints } from '../actions/pointsActions';

const HeaderUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userPoints = useSelector((state) => state.userPoints);
  const { points } = userPoints;

  useEffect(() => {
      if (userInfo) {
          dispatch(getUserPoints());
      }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
      dispatch(logout());
      navigate('/');
  };

  const handleSearch = (event) => {
      event.preventDefault();
      navigate(`/search?q=${searchTerm}`);
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
                            <FormControl type="search" placeholder="Search" className="mr-sm-2 mx-auto" id='searchbar' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link>{`Points: ${points}`}</Nav.Link>
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
