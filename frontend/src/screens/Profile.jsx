import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import FooterProfile from "../components/FooterProfile"
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
// import { fetchUser } from "../actions/userActions";
import { fetchUserQuestions } from "../actions/questionActions";
import {
  updateUserDescription,
  fetchUserDescription,
  uploadProfileImage,
  getProfileImage,
} from "../actions/userActions";
import "../designs/Profile.css";

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";
  const localStorageDescriptionKey = "userDescription";

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin.userInfo);
  const userQuestionsState = useSelector((state) => state.userQuestions);
  const { loading, error, userQuestions } = userQuestionsState;
  const userDescriptionState = useSelector((state) => state.userDescription);
  const { description: userDescription } = userDescriptionState;
  const profilePictureState = useSelector((state) => state.getProfileImage);
  const { profileImageUrl: profilePictureUrl } = profilePictureState;
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserQuestions(userData.id));
      dispatch(fetchUserDescription());
      dispatch(getProfileImage())
        .catch((error) =>
          console.error("Error fetching profile image:", error)
        );
    }
  }, [userData, dispatch]);

  useEffect(() => {
    setDescription(userDescription || "");
  }, [userDescription]);

  useEffect(() => {
    if (profilePictureUrl && profilePictureUrl !== "") {
      setProfilePicture(profilePictureUrl);
    }
  }, [profilePictureUrl]);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    dispatch(uploadProfileImage(image))
      .then(() => {
        dispatch(fetchUserDescription());
        dispatch(getProfileImage());
        setShowProfileOptions(false); // Hide the profile options after changing the image
      })
      .catch(error =>
        console.error("Error uploading profile picture:", error)
      );
  };

  const handleChooseFileClick = () => {
    setShowProfileOptions((prev) => !prev); // Toggle visibility of profile options
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(defaultProfilePicture);
    dispatch(uploadProfileImage(null))
      .then(() => {
        localStorage.removeItem(`${localStorageKey}-${userData.id}`);
        dispatch(fetchUserDescription());
        dispatch(getProfileImage());
        setShowProfileOptions(false); // Hide the profile options after removing the image
      })
      .catch(error =>
        console.error("Error removing profile picture:", error)
      );
  };

  const handleProfileOptionClick = (action) => {
    setShowProfileOptions(false);
    if (action === "change") {
      document.getElementById("profile-image-input").click();
    } else if (action === "remove") {
      handleRemoveProfilePicture();
    }
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
    await dispatch(updateUserDescription(description));
    localStorage.setItem(localStorageDescriptionKey, description);
    dispatch(fetchUserDescription());
    setShowDescriptionModal(false);
  };

  return (
    <>
    <HeaderProfile />
    <div id="profilesection">

      <div id='profileimg'>
      </div>

      <div id='profileimg2'>
      </div>

      <div className="profile-picture-container">
        <img
          src={profilePicture}
          alt="Profile"
          className="profile-picture"
          onClick={handleChooseFileClick}
        />

        {showProfileOptions && (
          <div className="profile-options">
            <Button id="profpicbtn" variant="primary" onClick={() => handleProfileOptionClick("change")}>
              Change Profile Picture
            </Button>
            <Button id="profpicbtn2" variant="danger" onClick={() => handleProfileOptionClick("remove")}>
              Remove Profile Picture
            </Button>
          </div>
        )}
        
      </div>

      <input
        type="file"
        id="profile-image-input"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div id="profile-container">
        <div>
          <p id="profileuser">{userData ? userData.username : ""}</p>
          <p id="profiledescription">Bio: {description}
          <Button
            className="edit-description-button"
            onClick={handleEditDescription}
            id="editbio"
          >
            <AiFillEdit id="editbiobtn"/>
          </Button>
          </p>
        </div>
        <div id="profile-questions-answers-container">
          <div className="profile-section">
            <p id="profileq">Questions: </p>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : userQuestions ? (
              <ul>
                {userQuestions.map((question) => (
                  <li key={question.id} id="profile-question-item">
                    <Link to={`/questions/${question.id}`}>{question.content}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions found.</p>
            )}
          </div>

          <div className="divider"></div>

          <div className="profile-section">
            <p id="profilea">Answers: </p>
          </div>
        </div>
      </div>

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
    <FooterProfile />
    </>
  );
};

export default Profile;
