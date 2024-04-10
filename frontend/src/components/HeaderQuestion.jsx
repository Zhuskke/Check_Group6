import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';
import logo from '../images/logocheck.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { getUserPoints } from '../actions/pointsActions';
import { getProfileImage } from '../actions/userActions';
import { FaSearch } from "react-icons/fa";
import '../designs/Navbaruser.css';

const HeaderUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userPoints = useSelector((state) => state.userPoints);
  const { points } = userPoints;
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const userData = useSelector((state) => state.userLogin.userInfo);
  const userQuestionsState = useSelector((state) => state.userQuestions);
  const { loading, error, userQuestions } = userQuestionsState;
  const profilePictureState = useSelector((state) => state.getProfileImage);
  const { profileImageUrl: profilePictureUrl } = profilePictureState;
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  useEffect(() => {
    if (userData) {
      dispatch(getProfileImage())
        .catch((error) =>
          console.error("Error fetching profile image:", error)
        );
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (profilePictureUrl && profilePictureUrl !== "") {
      setProfilePicture(profilePictureUrl);
    }
  }, [profilePictureUrl]);

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
    if (searchTerm.trim() !== '') {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
        console.log("Please enter a search term");
    }
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
          <Form inline onSubmit={handleSearch} className="d-flex align-items-center justify-content-center">
            <FormControl type="search" placeholder="What is your question?" className="mr-sm-2 mx-auto" id='searchbar' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
            <Button variant="outline-success" type="submit" id='searchbarbtn'>
              <FaSearch />
            </Button>
            </Form>
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/topup" role='button' id='headeruserbtn'>{`Points: ${points}`}</Nav.Link>
            <div className='headeruserline'></div>
            <Nav.Link as={Link} to="/" role='button' id='headeruserbtn'>Home</Nav.Link>
            <div className='headeruserline'></div>
            <NavDropdown title={<img src={profilePicture} id='dropdownimage' />} id="headerdropdown" className="header-dropdown">
              <NavDropdown.Item as={Link} to="/profile" id='dropdownitem'>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/subscription" id='dropdownitem'>Join Now!</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} id='dropdownitem'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
};

export default HeaderUser;