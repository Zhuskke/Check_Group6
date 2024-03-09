import React, { useState, useEffect } from "react";
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";
import { Container, Button } from 'react-bootstrap';

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
  const localStorageKey = "userProfilePicture";

  const [profilePicture, setProfilePicture] = useState(() => {
    const storedProfilePicture = localStorage.getItem(localStorageKey);
    return storedProfilePicture || defaultProfilePicture;
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfilePicture = e.target.result;
        setProfilePicture(newProfilePicture);
        localStorage.setItem(localStorageKey, newProfilePicture);
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
          <p>Name</p>
          <p>Info/Description</p>
        </div>
        <p>Questions | Answers</p>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
