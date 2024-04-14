import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagePhysics, getUploadedImagesPhysics } from '../actions/subjectActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubjectBar from '../components/SubjectBar';
import Worksheet from '../components/Worksheet';
import '../designs/SubjectScreen.css'

function PhysicsScreen() {
  const [uploadedImagePhysics, setUploadedImagePhysics] = useState(localStorage.getItem('uploadedImagePhysics') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: uploadLoading, error: uploadError, imageUrl } = useSelector((state) => state.uploadImage);
  const { loading: getImagesLoading, error: getImagesError, images } = useSelector((state) => state.getUploadedImages);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { is_premium } = userInfo || {};

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUploadedImagesPhysics());
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl) {
      setUploadedImagePhysics(imageUrl);
      localStorage.setItem('uploadedImagePhysics', imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePhysics(reader.result);
        localStorage.setItem('uploadedImagePhysics', reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = () => {
    if (!userInfo || !image) return;
    dispatch(uploadImagePhysics(image));
  };

  const handleSignUp = () => {
    if (userInfo) {
      // If user is logged in, redirect to subscription page
      navigate('/subscription');
    } else {
      // If user is a guest, redirect to register page
      navigate('/register');
    }
  };

  return (
    <>
      <div>
        {userInfo ? <HeaderUser /> : <Header />}
        <div style={{ paddingTop: '10px', paddingBottom: '5rem', backgroundColor: '#B2D8D8' }}> <SubjectBar /> </div>

        {!is_premium && (
        <div id='subjectscreen-containerbg'>
          <div id='subjectscreen-container'>
            <p id='subjectscreentext'>This content is only available for premium users. Sign up for a premium account!</p>
            <button onClick={handleSignUp} id='subjectscreenbtn'>Subscribe Now!</button>
          </div>
        </div>
      )}

        {is_premium && (
          <div>
            <input type="file" onChange={handleImageChange} />
            {uploadedImagePhysics && (
              <div>
                <p>Uploaded Image Preview:</p>
                <img src={uploadedImagePhysics} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            )}
            <button onClick={handleUpload} disabled={!image}>
              Upload Image
            </button>
          </div>
        )}
        {(uploadLoading || getImagesLoading) && <p>Loading...</p>}
        {(uploadError || getImagesError) && <p>Error: {uploadError || getImagesError}</p>}
      </div>
      {is_premium && <Worksheet subject="Physics" />}
      <Footer />
    </>
  );
}

export default PhysicsScreen;
