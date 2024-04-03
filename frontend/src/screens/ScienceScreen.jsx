import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageScience, getUploadedImagesScience } from '../actions/subjectActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubjectBar from '../components/SubjectBar';
import Worksheet from '../components/Worksheet';
import '../designs/SubjectScreen.css'

function ScienceScreen() {
  const [uploadedImageScience, setUploadedImageScience] = useState(localStorage.getItem('uploadedImageScience') || null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loading: uploadLoading, error: uploadError, imageUrl } = useSelector((state) => state.uploadImage);
  const { loading: getImagesLoading, error: getImagesError, images } = useSelector((state) => state.getUploadedImages);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUploadedImagesScience());
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl) {
      setUploadedImageScience(imageUrl);
      localStorage.setItem('uploadedImageScience', imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageScience(reader.result);
        localStorage.setItem('uploadedImageScience', reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = () => {
    if (!userInfo || !image) return;
    dispatch(uploadImageScience(image));
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <><div>
    {userInfo ? <HeaderUser /> : <Header />}
    <div style={{ paddingTop: '10px', paddingBottom: '5rem', backgroundColor: '#B2D8D8' }}> <SubjectBar /> </div>

    {!userInfo && (
      <div id='subjectscreen-containerbg'>
        <div id='subjectscreen-container'>
          <p id='subjectscreentext'>You are viewing as a guest :c Sign up for a better study experience!</p>
          <button onClick={handleSignUp} id='subjectscreenbtn'>Sign up Now!</button>
        </div>
      </div>
    )}

          <div id='subjectscreen-image'>
          </div>

          <div id='subjectscreen-image2'>
          </div>

          <div id='subjectscreen-image3'>
          </div>

    {userInfo && (
      <div>
        <input type="file" onChange={handleImageChange} />
        {uploadedImageScience && (
          <div>
            <p>Uploaded Image Preview:</p>
            <img src={uploadedImageScience} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
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
  {userInfo && <Worksheet subject = "Science"/>}
  <Footer /></>
);
}


export default ScienceScreen;
