import React, { useEffect, useState   } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import HeaderUser from '../components/HeaderUser';
// import Footer from '../components/Footer';
import { getPremiumDetails,activatePremium } from '../actions/premiumActions';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BiArrowBack } from "react-icons/bi";
import FooterProfile from '../components/FooterProfile';
import '../designs/Orderscreen.css';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(true);
  const [premiumDetails, setPremiumDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPremiumDetails = async () => {
      if (userInfo) {
        try {
          const details = await dispatch(getPremiumDetails());
          console.log('Premium details fetched:', details); // Log the fetched details
          setPremiumDetails(details);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching premium details:', error);
          setLoading(false); // Set loading to false even if there's an error
        }
      }
    };

    fetchPremiumDetails();
  }, [dispatch, userInfo]);

  if (!userInfo) {
    // Redirect if user is not logged in
    navigate('/login');
    return null; // Return null to prevent rendering anything
  }

  /* const handleSubscription = async () => {
    try {
      await dispatch(activatePremium(userInfo._id));
      navigate(`/home/${userInfo._id}`);
    } catch (error) {
      // Handle error if subscription activation fails
    }
  }; */

  const successPaymentHandler = (paymentResult) => {
    console.log('Payment successful:', paymentResult);
    // You can perform any necessary actions here, like updating user's subscription status
  };

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: premiumDetails.price, // Assuming premiumDetails contains price
            currency_code: 'USD',
          },
        },
      ],
    });
  };

  const onApproveHandler = async (data, actions) => {
    console.log('Payment approved:', data);
    try {
      await dispatch(activatePremium(userInfo._id)); // Activate premium for the current user
      // Perform any other necessary actions here
      // For example, you might want to show a success message or update the UI
    } catch (error) {
      console.error('Error activating premium:', error);
      // Handle error if subscription activation fails
    }
  };

  return (
    <>
        <HeaderUser />
      <div className="order-screen">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
              <Link to="/subscription">
              <button id='gobackbtn'><BiArrowBack id='btnicon'/></button>
              </Link>
            <div>
              <p id='orderscreentitle'>Greetings, {userInfo.name}! Here is your subscription plan:</p>
              <div id='ordercontainer'>
                <h2 id="ordertext">Check Premium</h2>
                <div>
                  {premiumDetails ? (
                    <>
                      <p id='ordertext2'>{premiumDetails.price} USD/mo.</p>
                      <h4 id='ordertext2'>Your plan includes:</h4>
                      <p id='ordertext2'>{premiumDetails.description}</p>
                    </>
                  ) : (
                    <p id='ordertext2'>No premium details available</p>
                  )}
                </div>
              <PayPalScriptProvider options={{ 
                "client-id": 
                "AcwQ7SsQNu37f_CvQCZTXj8CzrVdKSy-yEmXvGTWKKON9nGOWh8MPZTiGEyDAWDeOKQiJAGKEqrSrv80",
                currency: "USD",
              }}>
                <div id="paypalbtnorder">
                <PayPalButtons
              style={{layout: "horizontal" }}
              createOrder={createOrderHandler}
              onApprove={onApproveHandler}
              onSuccess={successPaymentHandler}
              />
              </div>
              </PayPalScriptProvider>
              </div>
            </div>
          </>
        )}

          <div id='orderimg'>
          </div>

          <div id='orderimg2'>
          </div>
      </div>
      <FooterProfile />
    </>
  );
};

export default OrderScreen;
