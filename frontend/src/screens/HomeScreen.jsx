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
import GuestQuestionBox from '../components/GuestQuestionBox';

function HomeScreen() {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate(); 

  const handleSignUp = () => {
    navigate('/register');
  };

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


            <div className="main-content">
              <strong><h1 className="title">Go from asking questions to knowing answers </h1></strong>
              <strong><h3 className="title-2">Check is a website wherein you can ask about a question of your own and everyone helps in on answering them. It is a community of experts who can help with your homework.</h3></strong>
            </div>

            <div id='homescreen-image'>
            </div>

            <div id='homescreen-image2'>
            </div>

            <div id='homescreen-image3'>
            </div>

            <div>
            <GuestQuestionBox />
            </div>

            <SubjectBar />
          </section>

          <section id='section-2'>

          <div id='section2-image'>
          </div>

          <div className="main-content">
              <strong><h1 className="section2title">Get Better Grades!!</h1></strong>
              <strong><h3 className="section2title-2">Check is a website wherein you can ask about a question of your own and everyone helps in on answering them. It is a community of experts who can help with your homework. NOTE: we are changing this</h3></strong>
              <button onClick={handleSignUp} id='homescreenbtn'>Sign up Now!</button>
            </div>

          </section>

          <section id='section-3'>
          <strong><h1 className="section3title">Get Instant Study Help!!</h1></strong>
              <strong><h3 className="section3title-2">Be equiped with the right tools towards academic exellence with Check Study Pack!</h3></strong>
              <button onClick={handleSignUp} id='homescreenbtn2'>Join Now!</button>

          <div id='section3-image'>
          </div>

          <div id='section3-image2'>
          </div>

          </section>

          <section id='section-4'>

              <strong><h1 className="section4title">Go Above and Beyond!</h1></strong>
              <strong><h3 className="section4title-2">text about the check study pack premium yippee yatta yatta grah grah</h3></strong>

              <div id='section4-container'>
                  <h3 id='listtext'>Check Study Pack Premium</h3>
                  <button onClick={handleSignUp} id='homescreenbtn3'>Join Now!</button>
                  <li id='listitems'>Homework Help</li>
                  <li id='listitems'>Worksheets</li>
                  <li id='listitems'>Expert Answers</li>
                  <li id='listitems'>Unlimited Access</li>
                  <h5 id='listtext2'>- for the best study experience -</h5>
              </div>

              <div id='section4-image'>
              </div>

              <div id='section4-image2'>
              </div>



          </section>
        </Row>
      )}
    </div>
    <Footer /></>
  );
}

export default HomeScreen;
