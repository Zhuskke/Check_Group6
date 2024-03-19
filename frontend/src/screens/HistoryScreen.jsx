import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageHistory, getUploadedImagesHistory } from '../actions/subjectActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HistoryScreen() {
  const [uploadedImageHistory, setUploadedImageHistory] = useState(localStorage.getItem('uploadedImageHistory') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: uploadLoading, error: uploadError, imageUrl } = useSelector((state) => state.uploadImage);
  const { loading: getImagesLoading, error: getImagesError, images } = useSelector((state) => state.getUploadedImages);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUploadedImagesHistory());
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl) {
      setUploadedImageHistory(imageUrl);
      localStorage.setItem('uploadedImageHistory', imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageHistory(reader.result);
        localStorage.setItem('uploadedImageHistory', reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = () => {
    if (!userInfo || !image) return;
    dispatch(uploadImageHistory(image));
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
      <h1>History</h1>
      {userInfo && (
        <div>
          <input type="file" onChange={handleImageChange} />
          {uploadedImageHistory && (
            <div>
              <p>Uploaded Image Preview:</p>
              <img src={uploadedImageHistory} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
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

export default HistoryScreen;
