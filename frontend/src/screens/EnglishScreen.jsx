import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listWorksheetsUser } from '../actions/worksheetActions';
import { useNavigate } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubjectBar from '../components/SubjectBar';
import Worksheet from '../components/Worksheet';
import '../designs/SubjectScreen.css';

function EnglishScreen() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { is_premium } = userInfo || {};
  const { loading, error, worksheets } = useSelector((state) => state.worksheetList);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listWorksheetsUser());
  }, [dispatch]);

  const handleSignUp = () => {
    if (userInfo) {
      navigate('/subscription');
    } else {
      navigate('/register');
    }
  };

  if (loading) {
    return null;
  }

  // Filter worksheets for the History category
  const englishWorksheets = worksheets.filter(worksheet => worksheet.category === 'English');

  return (
    <>
      <div>
        {userInfo ? <HeaderUser /> : <Header />}
        <div style={{ paddingTop: '10px', paddingBottom: '5rem', backgroundColor: '#B2D8D8' }}>
          <SubjectBar />
        </div>

        {!is_premium && (
        <div id='subjectscreen-containerbg'>
          <div id='subjectscreen-container'>
            <p id='subjectscreentext'>This content is only available for premium users. Upgrade to Premium Now!</p>
            <button onClick={handleSignUp} id='subjectscreenbtn'>Subscribe Now!</button>
          </div>

          <div id='subjectscreen-image'>
          </div>

          <div id='subjectscreen-image2'>
          </div>

          <div id='subjectscreen-image3'>
          </div>

        </div>
      )}

        {is_premium && (
          <div>
            <Worksheet
              subject="English"
              worksheets={englishWorksheets} 
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default EnglishScreen;
