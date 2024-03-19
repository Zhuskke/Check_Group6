import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImagePhysics, getUploadedImagesPhysics } from '../actions/subjectActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PhysicsScreen() {
  const [uploadedImagePhysics, setUploadedImagePhysics] = useState(localStorage.getItem('uploadedImagePhysics') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: uploadLoading, error: uploadError, imageUrl } = useSelector((state) => state.uploadImage);
  const { loading: getImagesLoading, error: getImagesError, images } = useSelector((state) => state.getUploadedImages);
  const { userInfo } = useSelector((state) => state.userLogin);
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
      <h1>Physics</h1>
      {userInfo && (
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
      <Footer />
    </div>
  );
}

export default PhysicsScreen;
