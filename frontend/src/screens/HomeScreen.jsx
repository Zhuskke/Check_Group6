import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuestionBox from '../components/QuestionBox'
import SubjectBar from '../components/SubjectBar'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../designs/HomeScreen.css'

function HomeScreen() {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, ); 
  }, []); 
  return (
    <><Header /><div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <section id='section-1'>
            <div id='slogan-container'>
              <div className="main-content">
                <strong><h1 className="title">SAMPLE SLOGAN TEXT!</h1></strong>
                <strong><h3 className="title-2">Sample Text Here :D</h3></strong>
              </div>
              <QuestionBox />
            </div>
            <SubjectBar />
          </section>
        </Row>
      )}
    </div>
    <Footer /></>
  );
}

export default HomeScreen;
