import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import HeaderRegister from '../components/HeaderRegister';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';
import '../designs/Subscreen.css'

const SubscriptionChoiceScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const isPremiumUser = userInfo?.is_premium;

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <>
      {userInfo ? <HeaderUser /> : <HeaderRegister />}
      <div className="subscription-choice-screen" id='subscreencontainer'>
        <h1>Subscription Choice Screen</h1>
        {/* Render sign-up message and button only if the user is not logged in */}
        {!userInfo && (
          <div id='subguest-containerbg'>
            <div>
              <p id='subscreentext'>You are not registered yet, Sign up to access this content and more:</p>
              <li id='sublistitems'>Homework Help</li>
              <li id='sublistitems'>Worksheets</li>
              <li id='sublistitems'>Expert Answers</li>
              <li id='sublistitems'>Unlimited Access</li>
              <button onClick={handleSignUp} id='subscreenbtn'>Join the Check team!</button>

              <div id='subscreenimg'></div>
              <div id='subscreenimg2'></div>
            </div>
          </div>
        )}
        {/* Render subscription options only if the user is logged in */}
        {userInfo && (
          <>
            <div id='subusercontainerbg'>
              {isPremiumUser ? (
                <p id='subuserslogan'>You are already a premium user! </p>
              ) : (
                <>
                  <p id='subuserslogan'>Answers from experts as well as other types of help to improve your academic performance! Join us now!</p>
                  <div style={{ display: 'flex'}}>
                    {/* First Subscription Plan Card */}
                    <div id='sub1container'>
                      <div id='sub1smalltext'>- BEST VALUE! -</div>
                      <h3 id='sub1text'>Check Study Pack Premium</h3>
                      <p>Go Above and Beyond with Premium!</p>
                      <Button as={Link} to="/order" variant="primary" id='subbtn'>Upgrade to Premium Pack!</Button>
                      <li id='subitems'>Homework Help</li>
                      <li id='subitems'>Worksheets</li>
                      <li id='subitems'>Expert Answers</li>
                      <li id='subitems'>Unlimited Access</li>
                      <h5 id='subtext2'>- for the best study experience -</h5>
                    </div>
                    {/* Second Subscription Plan Card */}
                    <div id='sub2container'>
                      <h3 id='sub2text'>Check Study Pack</h3>
                      <p>Your current plan</p>
                      <Button as={Link} to="/" variant="primary" id='subbtn'>Stay with current plan</Button>
                      <li id='subitems'>Homework Help</li>
                      <li id='subitems2'>Worksheets</li>
                      <li id='subitems2'>Expert Answers</li>
                      <li id='subitems2'>Unlimited Access</li>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionChoiceScreen;

