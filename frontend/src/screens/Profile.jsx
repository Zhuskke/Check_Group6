import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { fetchUserQuestions } from '../actions/questionActions'; // Import the action creator

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  
  const dispatch = useDispatch(); // Initialize dispatch function

  const userData = useSelector(state => state.userLogin.userInfo);
  const userQuestionsState = useSelector(state => state.userQuestions); // Get user questions state from Redux store
  const { loading, error, userQuestions } = userQuestionsState; // Destructure loading, error, and userQuestions from the state

  useEffect(() => {
    if (userData) {
      // Dispatch action to fetch user's questions
      dispatch(fetchUserQuestions(userData.id));
    }
  }, [userData, dispatch]);

  // Use a useEffect hook to set profilePicture once userData is available
  useEffect(() => {
    if (userData) {
      const storedProfilePicture = localStorage.getItem(`${localStorageKey}-${userData.id}`);
      setProfilePicture(storedProfilePicture || defaultProfilePicture);
    }
  }, [userData]);

  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfilePicture = e.target.result;
        setProfilePicture(newProfilePicture);
        localStorage.setItem(`${localStorageKey}-${userData.id}`, newProfilePicture);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChooseFileClick = () => {
    document.getElementById("profile-image-input").click();
  };

  useEffect(() => {
    // No cleanup needed for now
  }, []);

  return (
    <div>
      <HeaderProfile />
      <Container className="container" id="profile-container">
        <div className="profile-picture-container">
          <label htmlFor="profile-image-input">
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          </label>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Button variant="primary" onClick={handleChooseFileClick}>
            Change Profile Picture
          </Button>
          <p>Name: {userData ? userData.username : ''}</p>
          <p>Info/Description: </p>
        </div>
        <p>Questions: </p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userQuestions ? (
          <ul>
            {userQuestions.map(question => (
              <li key={question.id}>
                <Link to={`/questions/${question.id}`}>{question.content}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions found.</p>
        )}
        <p>Answers: </p>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
