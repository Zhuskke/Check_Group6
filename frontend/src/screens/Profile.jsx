import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchUserQuestions } from "../actions/questionActions";

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const localStorageDescriptionKey = "userDescription";

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin.userInfo);
  const userQuestionsState = useSelector((state) => state.userQuestions);
  const { loading, error, userQuestions } = userQuestionsState;

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserQuestions(userData.id));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (userData) {
      const storedProfilePicture = localStorage.getItem(
        `${localStorageKey}-${userData.id}`
      );
      setProfilePicture(storedProfilePicture || defaultProfilePicture);
    }
  }, [userData]);

  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    const storedDescription = localStorage.getItem(localStorageDescriptionKey);
    setDescription(storedDescription || "");
  }, []);

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

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
  };

  const handleSaveDescription = () => {
    localStorage.setItem(localStorageDescriptionKey, description);
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
            className="add-description-button"
            onClick={() => setShowDescriptionModal(true)}
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
