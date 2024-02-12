import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const defaultProfilePicture =
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"; //link of default prof pic
  const [profilePicture, setProfilePicture] = useState(
    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    // Handle the change event when a new image is selected
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div>
      <Header />
      <div className="green-background">
        <div className="container">
          <div className="profile-picture-container">
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <p>Name</p>
          <p>Info/Description</p>
          <p>Questions | Answers</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
