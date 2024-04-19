import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import FooterProfile from "../components/FooterProfile";
import { Container, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { fetchUserQuestions } from "../actions/questionActions";
import {
  updateUserDescription,
  fetchUserDescription,
  uploadProfileImage,
  getProfileImage,
  updateUserPassword,
} from "../actions/userActions";
import { updatePoints } from '../actions/commentActions';
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

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [upvoteThresholdMessage, setUpvoteThresholdMessage] = useState("");

  const { comments, message } = useSelector((state) => state.updatePoints);
  
  useEffect(() => {
    if (userData) {
      dispatch(fetchUserQuestions(userData.id));
      dispatch(updatePoints(userData.id));
      dispatch(fetchUserDescription());
      dispatch(getProfileImage()).catch((error) =>
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

  useEffect(() => {
    if (message) {
      setUpvoteThresholdMessage(message);
    }
  }, [message]);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    dispatch(uploadProfileImage(image))
      .then(() => {
        dispatch(fetchUserDescription());
        dispatch(getProfileImage());
        setShowProfileOptions(false); // Hide the profile options after changing the image
      })
      .catch((error) => console.error("Error uploading profile picture:", error));
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
      .catch((error) => console.error("Error removing profile picture:", error));
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

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  const handleChangePassword = async () => {
    // Clear previous messages
    setPasswordChangeMessage('');

    // Add password validation logic here
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeMessage('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeMessage('New password and confirm password do not match');
      return;
    }

    try {
      await dispatch(updateUserPassword(currentPassword, newPassword));
      setPasswordChangeMessage('Password changed successfully');
      handleCloseChangePasswordModal();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setPasswordChangeMessage(error.response.data.error);
      } else {
        setPasswordChangeMessage('Failed to change password. Please try again later.');
      }
    }
  };

  return (
    <>
      <HeaderProfile />
      <div id="profilesection">
        <div className="profile-picture-container">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
            onClick={handleChooseFileClick}
          />

          {showProfileOptions && (
            <div className="profile-options">
              <Button
                id="profpicbtn"
                variant="primary"
                onClick={() => handleProfileOptionClick("change")}
              >
                Change Profile Picture
              </Button>
              <Button
                id="profpicbtn2"
                variant="danger"
                onClick={() => handleProfileOptionClick("remove")}
              >
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
            <p id="profiledescription">
              Bio: {description}
              <Button
                className="edit-description-button"
                onClick={handleEditDescription}
                id="editbio"
              >
                <AiFillEdit id="editbiobtn" />
              </Button>
            </p>
            <p id="changepassword">
              Change Password
              <Button
                className="changepassword-button"
                onClick={handleOpenChangePasswordModal}
                id="editbio"
              >
                <AiFillEdit id="editbiobtn" />
              </Button>
            </p>
          </div>
          <div id="profile-questions-answers-container">
            <div className="profile-section">
              <p id="profileq">Questions:</p>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : userQuestions ? (
                <ul>
                  {userQuestions.map((question) => (
                    <li key={question.id} id="profile-question-item">
                      <Link to={`/questions/${question.id}`}>
                        {question.content}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No questions found.</p>
              )}
            </div>

            <div className="divider"></div>

            <div className="profile-section">
              <p id="profilea">Answers:</p>
              {comments && comments.length > 0 ? (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id} id="profile-question-item">
                      {comment.content} - Upvotes: {comment.upvotes} - Downvotes: {comment.downvotes}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No comments found.</p>
              )}
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

        <Modal
          show={showChangePasswordModal}
          onHide={handleCloseChangePasswordModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="password-change-message">{passwordChangeMessage}</p>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="password-input"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="password-input"
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="password-input"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseChangePasswordModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              Change Password
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Display congratulatory message for reaching upvote threshold */}
        {upvoteThresholdMessage && (
          <Modal show={true} onHide={() => setUpvoteThresholdMessage("")}>
            <Modal.Header closeButton>
              <Modal.Title>Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{upvoteThresholdMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setUpvoteThresholdMessage("")}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <FooterProfile />
    </>
  );
};

export default Profile;
