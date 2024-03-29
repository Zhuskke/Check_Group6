import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageEnglish, getUploadedImagesEnglish } from '../actions/subjectActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubjectBar from '../components/SubjectBar';
import Worksheet from '../components/Worksheet';
import '../designs/Subject.css'

function EnglishScreen() {
  const [uploadedImageEnglish, setUploadedImageEnglish] = useState(localStorage.getItem('uploadedImageEnglish') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: uploadLoading, error: uploadError, imageUrl } = useSelector((state) => state.uploadImage);
  const { loading: getImagesLoading, error: getImagesError, images } = useSelector((state) => state.getUploadedImages);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUploadedImagesEnglish());
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl) {
      setUploadedImageEnglish(imageUrl);
      localStorage.setItem('uploadedImageEnglish', imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageEnglish(reader.result);
        localStorage.setItem('uploadedImageEnglish', reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = () => {
    if (!userInfo || !image) return;
    dispatch(uploadImageEnglish(image));
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
      <div style={{ paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#B2D8D8'}}> <SubjectBar /> </div>
      <div className="subject-container">
      <h1>English</h1>
      {userInfo && (
        <div>
          <input type="file" onChange={handleImageChange} />
          {uploadedImageEnglish && (
            <div>
              <p>Uploaded Image Preview:</p>
              <img src={uploadedImageEnglish} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          )}
          <button className="upload-button" onClick={handleUpload} disabled={!image}>
            Upload Image
          </button>
        </div>
      )}
      {(uploadLoading || getImagesLoading) && <p>Loading...</p>}
      {(uploadError || getImagesError) && <p>Error: {uploadError || getImagesError}</p>}
      </div>
      {userInfo && <Worksheet subject = "English"/>}
      <div className="footer-container"><Footer /></div>
    </div>
  );
}

export default EnglishScreen;
