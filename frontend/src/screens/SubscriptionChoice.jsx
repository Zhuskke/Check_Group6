import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';

const SubscriptionChoiceScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <>
      {userInfo ? <HeaderUser /> : <Header />}
      <div className="subscription-choice-screen">
        <h1>Subscription Choice Screen</h1>
        {/* Render sign-up message and button only if the user is not logged in */}
        {!userInfo && (
          <div style={{ marginTop: '20px' }}>
            <p>Not a registered user yet. Sign up to continue.</p>
            <Button onClick={handleSignUp} variant="primary">Sign Up</Button>
          </div>
        )}
        {/* Render subscription options only if the user is logged in */}
        {userInfo && (
          <>
            <p>Select your subscription plan:</p>
            <div style={{ display: 'flex' }}>
              {/* First Subscription Plan Card */}
              <div style={{ marginRight: '20px' }}>
                <h2>Subscription Type 1</h2>
                <p>this one is better than type 2 :D</p>
                <Button as={Link} to="/order" variant="primary">Order Now</Button>
              </div>
              {/* Second Subscription Plan Card */}
              <div>
                <h2>Subscription Type 2</h2>
                <p>this one is simpler</p>
                <Button as={Link} to="/order" variant="primary">Order Now</Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionChoiceScreen;
