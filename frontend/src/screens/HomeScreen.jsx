import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

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
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <h2>HomePage</h2>
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
