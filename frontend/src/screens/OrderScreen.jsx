import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderUser from '../components/HeaderUser';
import Footer from '../components/Footer';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <HeaderUser />
      <div className="order-screen">
        <h1>Order Screen</h1>
        {userInfo ? (
          <div>
            <p>Welcome, {userInfo.name}!</p>
            <p>Your order details:</p>
            {/* Add order details */}
            {/* PayPal buttons wrapped with PayPalScriptProvider */}
            <PayPalScriptProvider options={{ 
            "client-id": 
            "YOUR_PAYPAL_CLIENT_ID" }}>
              <PayPalButtons />
            </PayPalScriptProvider>
          </div>
        ) : (
          <div>
            <p>Please log in to view your order.</p>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderScreen;
