import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/userActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CalculusScreen() {
  const [uploadedImage, setUploadedImage] = useState(localStorage.getItem('uploadedImage') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const uploadedImage = localStorage.getItem('uploadedImage');
    console.log('Stored uploaded image:', uploadedImage);
    if (uploadedImage) {
      setUploadedImage(uploadedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = () => {
    if (userInfo && image) {
      dispatch(uploadImage(image))
        .then(() => {
          localStorage.removeItem('uploadedImage'); // Remove uploaded image from localStorage
          setImage(null);
          // Redirect after successful upload
          navigate('/english'); // Redirect to the home page or any other desired page
        })
        .catch((error) => {
          console.error('Failed to upload image:', error);
        });
    }
  };

  const handleSignUp = () => {
    // Redirect to the register screen
    navigate('/register');
  };
  
  return (
    <div>
      {userInfo ? <HeaderUser /> : <Header />}
      {!userInfo && (
        <div>
          <p>You are viewing as a guest. Sign up for a better study experience.</p>
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      )}
      <h1>English</h1>
      {userInfo && (
        <div>
          <input type="file" onChange={handleImageChange} />
          {uploadedImage && (
            <div>
              <p>Uploaded Image Preview:</p>
              <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
          <button onClick={handleUpload} disabled={!image}>
            Upload Image
          </button>
        </div>
      )}
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      <Footer />
    </div>
  );
}

export default CalculusScreen;
