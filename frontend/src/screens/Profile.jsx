import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { fetchUserQuestions } from '../actions/questionActions';
import { updateUserDescription, fetchUserDescription } from '../actions/userActions'; // Import the updateUserDescription action
import '../designs/Profile.css'

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const localStorageDescriptionKey = "userDescription";

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin.userInfo);
  const userQuestionsState = useSelector((state) => state.userQuestions);
  const { loading, error, userQuestions } = userQuestionsState;
  const userDescriptionState = useSelector((state) => state.userDescription); // Get user description from Redux state
  const { description: userDescription } = userDescriptionState;
  
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [description, setDescription] = useState(""); // Description state for local use
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserQuestions(userData.id));
      dispatch(fetchUserDescription());
    }
  }, [userData, dispatch]);

useEffect(() => {
  setDescription(userDescription || ""); // Update 'description' state with user description
}, [userDescription]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfilePicture = e.target.result;
        setProfilePicture(newProfilePicture);
        localStorage.setItem(
          `${localStorageKey}-${userData.id}`,
          newProfilePicture
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChooseFileClick = () => {
    document.getElementById("profile-image-input").click();
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(defaultProfilePicture);
    localStorage.removeItem(`${localStorageKey}-${userData.id}`);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditDescription = () => {
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
  };

  const handleSaveDescription = async () => {
    await dispatch(updateUserDescription(description)); // Dispatch action to update user description
    localStorage.setItem(localStorageDescriptionKey, description); // Set local storage after updating Redux store
    dispatch(fetchUserDescription()); // Fetch the updated description from the server
    setShowDescriptionModal(false);
  };

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
          <Button variant="danger" onClick={handleRemoveProfilePicture}>
            Remove Profile Picture
          </Button>
          <p>Name: {userData ? userData.username : ""}</p>
          <p>Description: {description}</p>
          <Button
            className="edit-description-button"
            onClick={handleEditDescription}
          >
            Edit Description
          </Button>
        </div>
        <p>Questions: </p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : userQuestions ? (
          <ul>
            {userQuestions.map((question) => (
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

      <Modal show={showDescriptionModal} onHide={handleCloseDescriptionModal}>
        <Modal.Header>
          <Modal.Title>Add Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write your description here..."
            className="description-textarea"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDescriptionModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveDescription}>
            Save Description
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
