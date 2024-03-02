import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import QuestionBox from '../components/QuestionBox'
import SubjectBar from '../components/SubjectBar'
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';

function HomeScreen() {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setLoading(false); // Set loading to false after data is fetched (you may replace this with your actual data fetching logic)
    }, 2000); // Simulate a 2-second delay
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <><HeaderUser /><div>
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
    </div><Footer /></>
  );
}

export default HomeScreen;
