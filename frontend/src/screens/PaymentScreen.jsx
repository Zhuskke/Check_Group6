import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchasePoints, getPackageDetails } from "../actions/pointsActions";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HeaderUser from "../components/HeaderUser";
import { PURCHASE_POINTS_RESET } from "../constants/pointsConstants";
import Footer from "../components/Footer";
import '../designs/Paymentscreen.css';

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const packageId = new URLSearchParams(location.search).get("packageId");
  const packageDetails = useSelector((state) => state.package.packageDetails);
  const [SdkReady, setSdkReady] = useState(false);

  const onError = (err) => {
    console.error("PayPal SDK error:", err);
  };

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =  'https://www.paypal.com/sdk/js?client-id=AZCdyKNZ2p8oABKCFwy2w0_tJA1dsr5ghWDDDpLl_7YLn3b6GwL6uTK9oWb3vsImxyqQnBzdma0GdCnv&currency=USD'
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script)
  }
  

  useEffect(() => {
    if (packageId) {
      dispatch(getPackageDetails(packageId));
    }
  }, [dispatch, packageId]);

  useEffect(() => {
    if (success) {
      navigate("/home");
      window.location.reload();
      dispatch({ type: PURCHASE_POINTS_RESET });;
    }
  }, [success, navigate]);

  useEffect(() => {
    if (packageDetails && !packageDetails.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [packageDetails]);

  const handlePurchase = () => {
    if (!packageDetails) return;
    setLoading(true);
    dispatch(purchasePoints(packageId, handleSuccess));
  };

  const successPaymentHandler = (paymentResult) => {
    dispatch(purchasePoints(packageId, paymentResult))
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Purchase failed:", error);
      });
  };

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: packageDetails.price,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApproveHandler = (data, actions) => {
    return actions.order.capture().then(function (details) {
      successPaymentHandler({ id: details.id, status: details.status, update_time: details.update_time });
    });
  };

  const handleSuccess = () => {
    setLoading(false);
    console.log("Purchase successful!");
  };

  return (
    <>
    <HeaderUser />
    <div id="paymentcontainerbg">
    <div id="paymentcontainer">
    <p id='paymenttitle'>You are paying for:</p>
      {packageDetails ? (
        <div>
          <p id="paymenttext">Points: {packageDetails.points}</p>
          <p id="paymenttext">Amount: ${packageDetails.price}</p>
        </div>
      ) : (
        <p>Loading package details...</p>
      )}
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZCdyKNZ2p8oABKCFwy2w0_tJA1dsr5ghWDDDpLl_7YLn3b6GwL6uTK9oWb3vsImxyqQnBzdma0GdCnv",
          currency: "USD",
        }}
      >
        <div id="paypalbtn">
        <PayPalButtons
          style={{ layout: "horizontal"}}
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
          onSuccess={successPaymentHandler}
          onError={onError} 
        />
        </div>
      </PayPalScriptProvider>

          <div id='paymentimg'>
          </div>

          <div id='paymentimg2'>
          </div>


    </div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentScreen;
