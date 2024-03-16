import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/userActions'; // Assuming you have this action
import HeaderUser from '../components/HeaderUser'; // Importing the HeaderUser component
import Header from '../components/Header'; // Importing the Header component for guests
import Footer from '../components/Footer';

function HistoryScreen() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = () => {
    if (image) {
      dispatch(uploadImage(userInfo.userId, image));
      // You may want to reset the image state after upload
      setImage(null);
    } else {
      // Handle error if no image selected
      console.error('No image selected.');
    }
  };

  return (
    <div>
      {/* Conditionally render HeaderUser if user is logged in, otherwise render Header */}
      {userInfo ? <HeaderUser /> : <Header />}
      {/* Display message for guests */}
      {!userInfo && (
        <div>
          <p>You are viewing as a guest. Sign up for a better study experience.</p>
          {/* Add a link or button for sign up */}
          <button onClick={() => console.log('Redirect to sign up page')}>Sign up</button>
        </div>
      )}
      <h1>History</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      <Footer />
    </div>
  );
}

export default HistoryScreen;
